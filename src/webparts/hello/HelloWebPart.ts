import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDom from 'react-dom';
import App from "./components/App"; // Assuming Hello is your React component

export interface IHelloWebPartProps {
  description: string;
}

export default class HelloWebPart extends BaseClientSideWebPart<IHelloWebPartProps> {
  
  private _sp: ReturnType<typeof spfi>;

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      this._sp = spfi().using(SPFx(this.context));
    });
  }

  public render(): void {
    const element: React.ReactElement = React.createElement(
      App,
      { sp: this._sp }
    );

    ReactDom.render(element, this.domElement);
  }
}
