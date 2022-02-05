"use strict";
import * as vscode from "vscode";
import * as path from "path";

import { BpmnModelerBuilder } from "./bpmnModelerBuilder";

const fs = require("fs");

export class EditingProvider {
  public constructor(private _context: vscode.ExtensionContext) {}

  private getUri(webview: vscode.Webview, ...p: string[]): vscode.Uri {
    const fileUri = vscode.Uri.file(
      path.join(this._context.extensionPath, ...p)
    );

    return webview.asWebviewUri(fileUri);
  }

  public provideTextDocumentContent(
    localResource: vscode.Uri,
    webview: vscode.Webview
  ): string {
    const localDocumentPath = localResource.fsPath;

    const contents = fs.readFileSync(localDocumentPath, { encoding: "utf8" });

    const builder = new BpmnModelerBuilder(contents, {
      main: this.getUri(webview, "out", "assets", "main.js"),
      resourceUri: localResource,
    });

    return builder.buildModelerView();
  }
}
