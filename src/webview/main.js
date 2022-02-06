/*
 * this collates all the dependencies required for the webview
*/

import BpmnJS from 'bpmn-js/lib/Modeler';
import PropertiesPanel from 'bpmn-js-properties-panel';
import ActivitiPanelProvider from 'bpmn-js-properties-panel/lib/provider/activiti';

import ActivitiModdleDescriptor from 'camunda-bpmn-moddle/resources/activiti.json';

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import 'vscode-codicons/dist/codicon.css';

import './modeler.css';

global.BpmnJS = BpmnJS;

global.PropertiesPanel =  PropertiesPanel;
global.ActivitiPanelProvider = ActivitiPanelProvider;
global.ActivitiModdleDescriptor = ActivitiModdleDescriptor;