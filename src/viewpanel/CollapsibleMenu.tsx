import * as React from 'react';
import { VscodeButton, VscodeCheckbox, VscodeCollapsible } from './VscodeComponents';

export interface ICollapsibleMenuProps {
  item: any;
  isOpen: any;
  trigger: (command: string, data: any) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CollapsibleMenu: React.FunctionComponent<ICollapsibleMenuProps> = ({ item, isOpen, trigger }: React.PropsWithChildren<ICollapsibleMenuProps>) => {

  return (
    <VscodeCollapsible title={item.title} open={isOpen}>
      <div slot="body" style={{ padding: "0 20px" }}>
      
      {
        item.description && <p>{item.description}</p>
      }

      {
        item.actions?.map((actionItem: any, index: number) => (
          <div key={`${actionItem.command}-${index}`} style={{ marginTop: "10px", width: "100%", textAlign: "center", display: "flex", alignItems: "center" }}>
            {
              actionItem.type === "checkbox" ? (
                <VscodeCheckbox
                                label={actionItem.title}
                                checked={actionItem.data}
                                onClick={
                                  (e: React.MouseEvent<HTMLInputElement>) => trigger(actionItem.command, e.currentTarget.checked)
                                } />
              ) : (
                <VscodeButton onClick={() => trigger(actionItem.command, actionItem.data)}>{actionItem.title}</VscodeButton>
              )
            }
          </div>
        ))
      }
      </div>
    </VscodeCollapsible>
  );
};