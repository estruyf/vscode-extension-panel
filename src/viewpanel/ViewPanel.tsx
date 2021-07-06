import * as React from 'react';
import { useEffect, useState } from 'react';
import { CollapsibleMenu } from './CollapsibleMenu';

interface ClientVsCode<T> {
  getState: () => T;
  setState: (data: T) => void;
  postMessage: (msg: unknown) => void;
}

declare const acquireVsCodeApi: <T = unknown>() => ClientVsCode<T>;

const vscode = acquireVsCodeApi();

export interface IViewPanelProps {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ViewPanel: React.FunctionComponent<IViewPanelProps> = (props: React.PropsWithChildren<IViewPanelProps>) => {
  const [settings, setSettings] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  window.addEventListener('message', event => {
    const message = event.data;
    
    switch (message.command) {
      case "settings":
        setSettings(message.data);
        setLoading(false);
        break;
    }
  });

  useEffect(() => {
    if (!settings) {
      setLoading(true);
      vscode.postMessage({
        command: "getSettings",
      });
    }
  }, ['']);

  const triggerBtn = React.useCallback((command: string, data: any) => {
    vscode.postMessage({ command: 'trigger', data: { command, data } });
  }, ['']);

  if (loading) {
    return (
      <div style={{padding:"0 20px"}}>
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div>
      </div>
    );
  }

  if (!settings) {
    return <div style={{padding:"0 20px"}}>Nothing yet to show</div>;
  }

  return (
    <div>
      {
        settings.map((item: any) => (
          <CollapsibleMenu key={item.id} item={item} isOpen={settings.length < 10} trigger={triggerBtn} />
        ))
      }
    </div>
  );
};