import { HighchartsElementProps } from '../component/hightcharts-element';

export enum PluginType {
DataTransformer,
}
export interface PluginConfig {
  name: string;
  type: PluginType;
}

export class Plugin {
  private pluginConfig: PluginConfig;
  constructor(pluginConfig: PluginConfig) {
    this.pluginConfig = pluginConfig;
  }
  public getpluginConfig(): PluginConfig {
    return this.pluginConfig;
  }
  public initialise(props: HighchartsElementProps) {
    // initialise
  }
  public update(props: HighchartsElementProps, setProps: (newProps: Partial<HighchartsElementProps>) => void) {
    // update
  }
}
