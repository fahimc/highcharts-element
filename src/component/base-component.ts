import { EventDispatcher } from '../event/event-dispatcher';

export interface CustomElement {
  connectedCallback: () => void;
  render: () => void;
  attributeChangedCallback: (name: string, oldValue: any, newValue: any) => void;
}

export class BaseComponent<ComponentProps, ComponentState> extends HTMLElement implements CustomElement {
  public shadow: ShadowRoot;
  public props: ComponentProps;
  public state: ComponentState;
  public eventDispatcher: EventDispatcher;

  public static get observedAttributes() { return []; }

  constructor() {
    super();
    this.props = {} as ComponentProps;
    this.state = {} as ComponentState;
    this.eventDispatcher = new EventDispatcher();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  public connectedCallback() {
      // connectedCallback
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (this[name]) this[name] = newValue;
  }

  public render() {
      // render
  }
}
