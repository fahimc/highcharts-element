import { Plugin, PluginType } from '../plugin';
import { pluginRegistry } from '../plugin-registry';
import { HighchartsElementProps } from '../../component/hightcharts-element';
export class DataToSeriesPlugin extends Plugin {
  constructor() {
    super({
      name: 'DataToSeriesPlugin',
      type: PluginType.DataTransformer,
    });
  }
  public initialise() {
    console.log('initialsed');
  }
  public update(props: HighchartsElementProps, setProps: (newProps: Partial<HighchartsElementProps>) => void) {
    if (!props.data) return;
    const seriesData = [];
    props.data.forEach(item => {
      let seriesItem = seriesData.find(existSeriesItem => existSeriesItem.name === item.name);
      if (seriesItem) {
        seriesItem.data.push(item.x !== undefined ? [item.x, item.y] : item.y);
      } else {
        seriesData.push({
          name: item.name,
          data: [],
        });
      }
    });
    setProps({
      options: {
        ...props.options,
        series: seriesData,
      },
    });
  }
}
pluginRegistry.addPlugin(new DataToSeriesPlugin());
