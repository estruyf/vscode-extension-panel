import * as React from "react";
import { render } from "react-dom";
import { ViewPanel } from "./ViewPanel";
import '@bendera/vscode-webview-elements/dist/vscode-collapsible';
import '@bendera/vscode-webview-elements/dist/vscode-button';
import '@bendera/vscode-webview-elements/dist/vscode-checkbox';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vscode-collapsible": any;
      "vscode-button": any;
    }
  }
}

const elm = document.querySelector("#app");
render(<ViewPanel />, elm);
