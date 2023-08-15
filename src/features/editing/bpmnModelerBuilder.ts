'use strict';
export class BpmnModelerBuilder {
  contents: string;
  resources: any;

  public constructor(contents: string, resources: any) {
    this.contents = contents;
    this.resources = resources;
  }

  private removeNewLines(contents: string): string {
    return contents.replace(/(\r\n|\n|\r)/gm, ' ');
  }

  private replaceSingleQuotes(contents: string): string {
    return contents.replace(/'/gm, '&#39;');
  }

  public buildModelerView(): string {
    this.contents = this.removeNewLines(
      this.replaceSingleQuotes(this.contents)
    );

    const head = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />

          <title>BPMN Modeler</title>

          <!-- modeler distro -->
          <script src="${this.resources.activitiBpmnDistro}"></script>

          <!-- required modeler styles -->
          <link rel="stylesheet" href="${this.resources.activitiBpmnStyles}">

          <!-- vscode icons -->
          <link rel="stylesheet" href="${this.resources.codiconsFont}">

          <style>
            /*
             * Will be otherwise overridden by VSCode default styles
             */
            .djs-context-pad,
            .djs-popup {
              color: black;
            }
          </style>
        </head>`;

    const body = `
      <body>
        <div class="content">
          <div id="canvas"></div>
          <div id="properties"></div>
        </div>

        <div class="buttons">
          <div class="icon codicon codicon-save" onclick="saveChanges()"></div>
          <div class="spinner"></div>
        </div>

        <script>

          const vscode = acquireVsCodeApi();

          // (1) persist web view state
          vscode.setState({ resourcePath: '${this.resources.resourceUri}'});

          // (2) react on messages from outside
          window.addEventListener('message', (event) => {
            const message = event.data;

            switch(message) {
              case 'saveFile': saveChanges(); break;
            }
          })

          // (3) bootstrap modeler instance
          console.log("FUK", window._ActivitiBpmn);
          const _ActivitiBpmn = window._ActivitiBpmn;
          const bpmnModeler = new _ActivitiBpmn.BpmnJS({
            container: '#canvas',
            propertiesPanel: {
              parent: '#properties'
            },
            additionalModules: [
              _ActivitiBpmn.BpmnPropertiesPanelModule,
              _ActivitiBpmn.BpmnPropertiesProviderModule,
              _ActivitiBpmn.activitiExtensionModule,
              _ActivitiBpmn.ActivitiPropertiesProvider,
            ],
            moddleExtensions: {
              activiti: _ActivitiBpmn.activitiModdle
            },
            keyboard: { bindTo: document }
          });

          keyboardBindings();

          /**
           * Open diagram in our modeler instance.
           *
           * @param {String} bpmnXML diagram to display
           */
          async function openDiagram(bpmnXML) {

            // import diagram
            try {
              await bpmnModeler.importXML(bpmnXML);
            } catch (err) {
              const {
                warnings
              } = err;

              return console.error('could not import BPMN 2.0 diagram', err, warnings);
            }
          }

          async function saveDiagramChanges() {
            try {
              const {
                xml
              } = await bpmnModeler.saveXML({ format: true });

              return vscode.postMessage({
                command: 'saveContent',
                content: xml
              });
            } catch (err) {
              return console.error('could not save BPMN 2.0 diagram', err);
            }
          }

          async function saveChanges() {
            const spinner = document.getElementsByClassName("spinner")[0];
            spinner.classList.add("active");

            const saveIcon = document.getElementsByClassName("codicon-save")[0];
            saveIcon.classList.add("hidden");

            await saveDiagramChanges()

            setTimeout(function() {
              spinner.classList.remove("active");
              saveIcon.classList.remove("hidden");
            }, 1000);
          }

          function keyboardBindings() {
            const keyboard = bpmnModeler.get('keyboard');

            keyboard.addListener(function(context) {
              console.log("keyboard event", context);

              const event = context.keyEvent;

              if (keyboard.isKey(['s', 'S'], event) && keyboard.isCmd(event)) {
                saveChanges();
                return true;
              }
            });
          }

          // open diagram
          openDiagram('${this.contents}');
        </script>
      </body>
    `;

    const tail = ['</html>'].join('\n');

    return head + body + tail;
  }
}
