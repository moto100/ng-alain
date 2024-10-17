import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as echarts from 'echarts';
import { NzMessageService } from 'ng-zorro-antd/message';

// import {
//   TitleComponent,
//   TitleComponentOption,
//   TooltipComponent,
//   TooltipComponentOption,
//   GridComponent,
//   GridComponentOption,
//   VisualMapComponent,
//   VisualMapComponentOption
// } from 'echarts/components';
// import { LineChart, LineSeriesOption } from 'echarts/charts';
// import { UniversalTransition } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   VisualMapComponent,
//   LineChart,
//   CanvasRenderer,
//   UniversalTransition
// ]);
// type EChartsOption = echarts.ComposeOption<
//   | TitleComponentOption
//   | TooltipComponentOption
//   | GridComponentOption
//   | VisualMapComponentOption
//   | LineSeriesOption
// >;

interface DataItem {
  name: string;
  value: [string, number];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges {
  data: DataItem[] = [];
  data1: DataItem[] = [];
  option: echarts.EChartsOption = {
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }
    ],
    title: {
      left: 'center',
      text: 'Dynamic Data & Time Axis'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: ['Fake Data']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
        color: '#000'
      }
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all'
        }
      ],
      label: {
        backgroundColor: '#777'
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: true
      },
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        //xAxisIndex: [0, 1],
        start: 98,
        end: 100
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: this.data
      }
    ]
  };

  form!: FormGroup;
  submitting = false;
  @Input() modelNode: any;
  @Output() readonly modelNodeChange = new EventEmitter<object>();

  now: Date = new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;

  now1: Date = new Date(1997, 9, 3);

  value1 = Math.random() * 1000;
  myChart: any;
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    var chartDom = document.getElementById('main')!;
    this.myChart = echarts.init(chartDom);
    var dataArr = this.randomData();
    var dataArr1 = this.randomData();
    for (var i = 0; i < 1000; i++) {
      this.data.push(dataArr);
      this.data1.push(dataArr1);
    }

    setInterval(() => {
      for (var i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      this.myChart.setOption({
        series: [
          {
            data: this.data
          }
        ]
      });
    }, 1000);

    this.option && this.myChart.setOption(this.option);
    window.addEventListener('resize', this.myChart.resize);
  }
  randomData(): DataItem {
    this.now = new Date(+this.now + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [[this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'), Math.round(this.value)]
    };
  }
  randomData1(): DataItem {
    this.now1 = new Date(+this.now1 + this.oneDay);
    this.value1 = this.value1 + Math.random() * 121 - 10;
    return {
      name: this.now1.toString(),
      value: [[this.now1.getFullYear(), this.now1.getMonth() + 1, this.now1.getDate()].join('/'), Math.round(this.value1)]
    };
  }
}
