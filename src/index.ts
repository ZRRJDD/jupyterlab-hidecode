import {
  IDisposable, DisposableDelegate
} from '@phosphor/disposable';

import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookActions, NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';


const plugin: JupyterFrontEndPlugin<void> = {
  activate,
  id: 'jupyterlab-hidecode',
  autoStart: true
};


export
class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {

  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
  
    let hideInputCode = () => {
      NotebookActions.hideAllCode(panel.content);
    };
	let showInputCode = () => {
	  NotebookActions.showAllCode(panel.content);
	};
  
    let buttonHideInput = new ToolbarButton({
      className: 'myButton',
      iconClassName: 'fa fa-eye-slash',
      onClick: hideInputCode,
      tooltip: 'Hide Input'
    });
	
	let buttonShowInput = new ToolbarButton({
      className: 'myButton',
      iconClassName: 'fa fa-eye',
      onClick: showInputCode,
      tooltip: 'Show Input'
    });

    panel.toolbar.insertItem(10, 'hideInput', buttonHideInput);
	panel.toolbar.insertItem(10, 'showInput', buttonShowInput);
	
    return new DisposableDelegate(() => {
      buttonHideInput.dispose();
	  buttonShowInput.dispose();
    });
  }

  
}

function activate(app: JupyterFrontEnd) {
  app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
};

export default plugin;
