import { Component } from '@angular/core';
import { PROPERTY_LABEL, PROPERTY_NOTES } from '../definitions';
import {InspectorComponent} from '@visuallyjs/browser-ui-angular';

@Component({
  selector: 'app-mindmap-inspector',
  template: `
    <div class="vjs-mindmap-inspector vjs-node-inspector">
        <div class="vjs-mindmap-inspector-section">
            <div>Label</div>
            <input type="text" [attr.vjs-att]="PROPERTY_LABEL" vjs-focus/>
        </div>

        <div class="vjs-mindmap-inspector-section">
            <div>Notes</div>
            <textarea rows="10" [attr.vjs-att]="PROPERTY_NOTES"></textarea>
        </div>
    </div>
  `
})
export class MindmapInspectorComponent extends InspectorComponent {
  PROPERTY_LABEL = PROPERTY_LABEL;
  PROPERTY_NOTES = PROPERTY_NOTES;
}
