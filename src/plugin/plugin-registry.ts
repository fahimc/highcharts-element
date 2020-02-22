import { Plugin } from './plugin';
import { ErrorMessage } from '../constant/error-message';
import { HighchartsElementProps } from '../component/hightcharts-element';

class PluginRegistry {
  private pluginList: {
    [key: string]: Plugin;
  };
  private defaultPlugins: string[] = ['DataToSeriesPlugin'];

  constructor() {
    this.pluginList = { };
  }

  public initialisePlugins(highchartElementProps: HighchartsElementProps) {
    this.getAvailablePlugins(highchartElementProps).forEach(plugin => {
      plugin.initialise(highchartElementProps);
    });
  }

  public addPlugin(plugin: Plugin) {
    if (this.pluginList[plugin.getpluginConfig().name]) {
      throw new Error(ErrorMessage.PluginNameAlreadyExists);
    } else {
      this.pluginList[plugin.getpluginConfig().name] = plugin;
    }
  }

  public removePlugin(plugin: Plugin) {
    if (!this.pluginList[plugin.getpluginConfig().name]) {
      throw new Error(ErrorMessage.PluginNameDoesntExists);
    } else {
      delete this.pluginList[plugin.getpluginConfig().name];
    }
  }

  public update(highchartElementProps: HighchartsElementProps, setProps: (newProps: Partial<HighchartsElementProps>) => void) {
    this.getAvailablePlugins(highchartElementProps).forEach(plugin => {
      plugin.update(highchartElementProps, setProps);
    });
  }

  private getAvailablePlugins(highchartElementProps: HighchartsElementProps) {
    return Object.values(this.pluginList).filter(plugin => {
      return (highchartElementProps.plugins && this.defaultPlugins.concat(highchartElementProps.plugins).includes(plugin.getpluginConfig().name));
    });
  }
}
export const pluginRegistry = new PluginRegistry();
