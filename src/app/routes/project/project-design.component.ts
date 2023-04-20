import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, zip } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-project-design',
  templateUrl: './project-design.component.html',
  styleUrls: ['./project-design.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDesignComponent implements OnInit, OnDestroy {
  constructor(
    public activatedRouter: ActivatedRoute,
    private router: Router,
    private http: _HttpClient,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}
  private router$!: Subscription;
  tabs = [
    {
      key: 'model-tree',
      tab: '应用模型'
    },
    {
      key: 'device-list',
      tab: '虚拟设备'
    },
    {
      key: 'device-security',
      tab: '设备安全'
    },
    {
      key: 'data-storage',
      tab: '数据存储'
    }
  ];
  loading = true;
  project: any = null;
  pos = 0;
  projectId = '';

  private setActive(): void {
    const key = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => key.startsWith(w.key));
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  ngOnInit(): void {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
    this.activatedRouter.queryParams.subscribe(value => {
      this.projectId = value?.['projectId'];
      this.http.post('controlpanel/www', { function: 'GetProjectInfo', projectId: this.projectId }).subscribe(res => {
        if (res.Status == 200 && res.Data != null) {
          this.project = res.Data;
        } else if (res.Status != 200) {
          this.modalSrv.error({
            nzTitle: `操作出错！错误代码：${res.Status}; 错误信息：${res.Message}`
          });
        }
        this.loading = false;
        this.cdr.detectChanges();
      });
    });
  }

  to(item: { key: string }): void {
    this.router.navigate([`/project/project-design/${item.key}`], { queryParams: { projectId: this.projectId } });
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
