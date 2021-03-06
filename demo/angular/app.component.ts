import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Rendering Chart</h1>
    <highcharts-element
    [loadedcallback]="onReady"
    [options]="config"
    [data]="seriesData"
    >
    </highcharts-element>
    `,
})
export class AppComponent {
  public config: any = {
    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016',
    },
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
    }],

  };
  public seriesData: any = [];
  constructor() {
    setTimeout(() => {
      this.config = {
        title: {
          text: 'Changed Angular Title',
        },
        series: [{
          name: 'Project Development',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
        }, {
          name: 'Other',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
        }],
      };
      this.seriesData = [{
        name: 'Series 1',
        y: 12908,
      },
      {
        name: 'Series 1',
        y: 5948,
      },
      {
        name: 'Series 1',
        y: 8105,
      },
      {
        name: 'Series 1',
        y: 8989,
      },
      {
        name: 'Series 1',
        y: 11816,
      }];
    }, 3000);
  }
  public onReady(api: any) {
    console.log('angular callback', api);
  }
}
