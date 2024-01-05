import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { UUID } from 'angular2-uuid';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeNode, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-model-tree',
  templateUrl: './model-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelTreeComponent {
  list!: any[];
  selectedTreeNode?: NzTreeNode;
  projectId = '';
  loading = true;
  project: any = null;
  readonly defaultModelNode = {
    Name: 'NewNode',
    DefaultValue: 0,
    ValueType: 1,
    IsHiden: false,
    IsStored: false,
    Expression: '',
    Action: '',
    BoundDevice: '',
    BoundField: ''
  };
  selectedModelNode: any;
  nodes: any;
  ////nodes : Array<any> = [];
  // nodes = [
  //   {
  //     title: '应用模型',
  //     key: '100',
  //     expanded: true,
  //     children: [
  //       {
  //         title: 'parent 1-0',
  //         key: '1001',
  //         expanded: true,
  //         children: [
  //           { title: 'leaf', key: '10010', isLeaf: true },
  //           { title: 'leaf', key: '10011', isLeaf: true },
  //           { title: 'leaf', key: '10012', isLeaf: true }
  //         ]
  //       },
  //       {
  //         title: 'parent 1-1',
  //         key: '1002',
  //         children: [{ title: 'leaf', key: '10020', isLeaf: true }]
  //       },
  //       {
  //         title: 'parent 1-2',
  //         key: '1003',
  //         children: [
  //           { title: 'leaf', key: '10030', isLeaf: true },
  //           { title: 'leaf', key: '10031', isLeaf: true }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  constructor(
    public activatedRouter: ActivatedRoute,
    private http: _HttpClient,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private nzContextMenuService: NzContextMenuService
  ) {
    this.activatedRouter.queryParams.subscribe(value => {
      this.projectId = value?.['projectId'];
    });
    this.loading = true;
    this.http
      .post('controlpanel/www', { function: 'GetProject', projectId: this.projectId })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        if (res.Status == 200) {
          if (res.Data == null) {
            this.project = {};
            this.project.Nodes = [];
          } else {
            this.project = res.Data;
            if (this.project.Nodes == null) {
              this.project.Nodes = [];
            }
          }

          if (this.project != null && this.project.Nodes != null) {
            let _nodes: any[] = [
              {
                title: '应用模型',
                key: '100',
                expanded: true,
                children: []
              }
            ];
            this.LoadNodeTree(_nodes[0].children, this.project.Nodes);
            this.nodes = _nodes;
          }
        } else if (res.Status != 200) {
          this.modalSrv.error({
            nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
          });
        }
      });
  }

  SaveNodeTree(): void {
    if (this.project != null) {
      this.loading = true;
      this.project.Nodes = [];
      this.UpdateNodeTree(this.nodes[0].children, this.project.Nodes);
      this.http.post('controlpanel/www', { function: 'UpdateProject', projectId: this.projectId, data: this.project }).subscribe(res => {
        if (res.Status != 200) {
          this.modalSrv.error({
            nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
          });
        }
        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  LoadNodeTree(node: any[], moduleNodes: any[]): void {
    moduleNodes.forEach(element => {
      let _isLeaf = element.Nodes == null || element.Nodes.length == 0;
      let newNode = { title: element.Name, key: UUID.UUID(), modelNode: element, expanded: !_isLeaf, isLeaf: _isLeaf, children: [] };
      if (!_isLeaf) {
        this.LoadNodeTree(newNode.children, element.Nodes);
      }
      element.Nodes = [];
      node.push(newNode);
    });
  }

  UpdateNodeTree(nodes: any[], moduleNodes: any[]): void {
    nodes.forEach(element => {
      let node = JSON.parse(JSON.stringify(element.modelNode));
      moduleNodes.push(node);
      if (element.children) {
        node.Nodes = [];
        //element.modelNode.Nodes = [];
        this.UpdateNodeTree(element.children, node.Nodes);
      }
    });
  }

  clickOnNode(data: NzFormatEmitEvent): void {
    this.selectedTreeNode = data.node!;
    this.selectedModelNode = data.node?.origin?.['modelNode'];
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  copyPasteAddNewSubNode(data: NzTreeNode): void {
    if (data.origin?.['modelNode'] != null) {
      this.addNewNodeInternel(data, data.origin?.['modelNode']);
    }
  }

  copyPasteAddNewBrotherNode(data: NzTreeNode): void {
    let parent = data.getParentNode();
    if (parent != null && data.origin?.['modelNode'] != null) {
      this.addNewNodeInternel(parent, data.origin?.['modelNode']);
    }
  }

  addNewNode(data: NzTreeNode): void {
    this.addNewNodeInternel(data, this.defaultModelNode);
  }

  addNewNodeInternel(data: NzTreeNode, modelNode: any): void {
    if (data.isLeaf) data.isLeaf = false;
    let newModelNode = JSON.parse(JSON.stringify(modelNode));
    newModelNode.Nodes = [];
    data.addChildren([{ title: modelNode.Name, key: UUID.UUID(), modelNode: newModelNode, isLeaf: true }]);
    if (!data.isExpanded) data.isExpanded = true;
    this.SaveNodeTree();
  }

  updateModelHandler(changedModelNode: any): void {
    if (this.selectedTreeNode != null) {
      this.selectedTreeNode.origin['modelNode'] = changedModelNode;
      if (this.selectedTreeNode.title != changedModelNode.Name) {
        this.selectedTreeNode.title = changedModelNode.Name;
      }
      this.SaveNodeTree();
    }
  }

  deleteNode(data: NzTreeNode): void {
    if (this.selectedTreeNode != null && this.selectedTreeNode.key == data.key) {
      this.selectedTreeNode = undefined;
      this.selectedModelNode = null;
    }
    if (data.isLeaf && data.parentNode != null) data.parentNode.isLeaf = true;
    data.remove();
    this.SaveNodeTree();
  }

  dclickOnNode(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }
}
