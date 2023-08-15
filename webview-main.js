// eslint-disable-next-line no-undef
console.log('SETTING WINDOW');

import BpmnJS from 'bpmn-js/lib/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';
import ActivitiPropertiesProvider from 'activiti-bpmn-properties-provider/src/index.js';
import activitiExtensionModule from 'activiti-bpmn-moddle/lib';
import activitiModdle from 'activiti-bpmn-moddle/resources/activiti.json';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
import './src/assets/modeler.css';

// eslint-disable-next-line no-undef
console.log('SETTING WINDOW');

// eslint-disable-next-line no-undef
window._ActivitiBpmn = {
  BpmnJS,
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ActivitiPropertiesProvider,
  activitiExtensionModule,
  activitiModdle,
};
