import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData, STPage } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-project-log',
  templateUrl: './project-log.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectLogComponent implements OnInit {
  q: {
    level: string;
    days: number;
  } = {
    level: '',
    days: 30
  };
  data: any[] = [];
  loading = false;
  loglevel = [
    { index: 0, text: 'TRACE', datavalue: 'TRACE', value: false, type: 'default', checked: false },
    { index: 1, text: 'DEBUG', datavalue: 'DEBUG', value: false, type: 'default', checked: false },
    { index: 2, text: 'INFO', datavalue: 'INFO', value: false, type: 'default', checked: false },
    { index: 3, text: 'WARN', datavalue: 'WARN', value: false, type: 'warning', checked: false },
    { index: 4, text: 'ERROR', datavalue: 'ERROR', value: false, type: 'error', checked: false }
  ];
  page: STPage = {
    front: false,
    show: false
  };

  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    {
      title: '日期',
      index: 'Date',
      type: 'date',
      sort: {
        compare: (a, b) => a.Date - b.Date
      },
      fixed: 'left',
      width: 200
    },
    {
      title: '级别',
      index: 'Level',
      render: 'Level',
      filter: {
        menus: this.loglevel,
        fn: (filter, record) => record.Level === filter['datavalue']
      },
      fixed: 'left',
      width: 100
    },
    { title: '记录来源', index: 'Logger' },
    { title: '消息', index: 'Message' },
    { title: '错误内容', index: 'Exception' }
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(private http: _HttpClient, public msg: NzMessageService, private modalSrv: NzModalService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.http
      .post('controlpanel/www', { function: 'GetRuntimeLog', level: this.q.level, days: this.q.days })
      .pipe(
        map((list: { Data: Array<{ Level: string; statusText: string; statusType: string; Date: Date }> }) =>
          list.Data.map(i => {
            let level = this.loglevel.find(item => {
              return item.datavalue === i.Level;
            });
            //const statusItem = this.status[i.status];
            if (level != null) {
              i.statusText = level.text;
              i.statusType = level.type;
            }
            i.Date = new Date(i.Date);
            return i;
          })
        ),
        tap(() => (this.loading = false))
      )
      .subscribe(res => {
        this.data = res;
        this.cdr.detectChanges();
      });
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'filter':
        this.getData();
        break;
    }
  }
  clearAll(): void {
    this.q.days = -1000;
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }

  searchByDays(days: number): void {
    this.q.days = days;
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }

  reset(): void {
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }
}
