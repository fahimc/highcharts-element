/** @jsx createElement */
import { createElement } from '@turtlemay/jsx-dom';
import * as Highcharts from 'highcharts';
import { EventDispatcher } from '../event/event-dispatcher';
import { BaseComponent } from './base-component';
import { pluginRegistry } from '../plugin/plugin-registry';

export interface HighchartsElementApi {
  highchartsInstance: Highcharts.Chart;
}

export enum HighchartsElementEvents {
    Loaded = 'HighchartsElementEventsLoaded',
}

export interface HighchartsElementData {
  name: string;
  color?: string;
  y: number;
  x?: number;
}

export interface HighchartsElementProps {
  loadedcallback?: (HighchartsElementApi) => void;
  options?: Partial<Highcharts.Options>;
  data?: HighchartsElementData[];
  plugins?: string[];
}

export interface HighchartsElementState {

}

export class HighchartsElement extends BaseComponent<HighchartsElementProps, HighchartsElementState> {
  public static get observedAttributes() { return ['loadedcallback', 'options', 'data', 'plugins']; }
  private container: HTMLElement;
  private highchart: Highcharts.Chart;

  constructor() {
    super();
    this.container = <div></div>;
    this.props = {
      loadedcallback: undefined,
      options: undefined,
      data: undefined,
      plugins: [],
    };
    this.state = {

    };
    this.eventDispatcher = new EventDispatcher([{
      eventName: HighchartsElementEvents.Loaded,
      dispatchOnSubscribe: true,
    }]);
    pluginRegistry.initialisePlugins(this.props);
  }

  public set loadedcallback(callback: any) {
    this.props.loadedcallback = callback;
    const eventItem = this.eventDispatcher.getEvent(HighchartsElementEvents.Loaded);
    if (this.highchart && eventItem && eventItem.dispatched) {
      this.props.loadedcallback({
        highchartsInstance: this.highchart,
      });
    }
  }

  public set options(options: Partial<Highcharts.Options>) {
    this.props.options = options;
    this.render();
  }

  public set data(data: HighchartsElementData[]) {
    this.props.data = data;
    this.render();
  }

  public setProps = (newProps: Partial<HighchartsElementProps>) => {
    this.props = {
      ...this.props,
      ...newProps,
    };
  }

  public connectedCallback() {
    this.shadow.appendChild(this.container);
    this.createHighchartInstance();
  }

  public render() {
    pluginRegistry.update(this.props, this.setProps);
    if (this.highchart) {
      this.highchart.update({
        ...this.props.options,
      }, true, true);
    }
  }

  private createHighchartInstance() {
    this.highchart = new Highcharts.Chart({
      ...this.props.options,
      chart: {
        renderTo: this.container,
        events: {
          load: () => {
            this.dispatch(HighchartsElementEvents.Loaded);
          },
        },
      },
    });
    this.dispatch(HighchartsElementEvents.Loaded);
  }

  private executeReadyCallback() {
    const eventItem = this.eventDispatcher.getEvent(HighchartsElementEvents.Loaded);
    if (this.highchart && eventItem && !eventItem.dispatched) {
      const api = {
        highchartsInstance: this.highchart,
      };
      if (this.props.loadedcallback) {
        this.props.loadedcallback(api);
      }
      this.eventDispatcher.dispatch(HighchartsElementEvents.Loaded, api);
    }
  }

  private dispatch(eventName: HighchartsElementEvents, data?: any) {
    switch (eventName) {
      case HighchartsElementEvents.Loaded:
        this.executeReadyCallback();
        break;
    }

  }

}
customElements.define('highcharts-element', HighchartsElement);
