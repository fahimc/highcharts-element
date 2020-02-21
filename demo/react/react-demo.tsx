import * as React from 'react';
import { HighchartsElementEvents } from '../../src/component/hightcharts-element';

interface ReactDemoState {
  options: Partial<Highcharts.Options>;
}
export class ReactDemo extends React.Component<{},ReactDemoState> {
  private highchartWrapperRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      options: {
        title: {
          text: 'React Solar Employment Growth by Sector, 2010-2016'
        },
        series: [{
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
          name: 'Manufacturing',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
          name: 'Sales & Distribution',
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
          name: 'Project Development',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
          name: 'Other',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }] as any

      }
    };
    this.highchartWrapperRef = React.createRef();

  }
  public componentDidMount() {
    this.highchartWrapperRef.current.eventDispatcher.subscribe(HighchartsElementEvents.Loaded,this.onChartLoaded);
    this.updateChart();
    setTimeout(() => {
      this.setState({
        options: {
          title: {
            text: 'Changed title'
          },
          series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          }] as any
        }
      });
    },5000);
  }
  public componentDidUpdate() {
    this.updateChart();
  }
  public updateChart() {
    this.highchartWrapperRef.current.options = this.state.options;
  }
  public render() {
    return (
            <>
            <highcharts-element
            ref={this.highchartWrapperRef}
            ></highcharts-element>
        </>
    );
  }
  private onChartLoaded = (data: any) => {
    console.log('react callback', data);
  }
}
