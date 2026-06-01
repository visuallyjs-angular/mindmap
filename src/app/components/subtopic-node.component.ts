import { BaseNodeComponent } from "@visuallyjs/browser-ui-angular";
import { Component } from '@angular/core';
import { CLASS_ADD_CHILD, CLASS_MINDMAP_DELETE, CLASS_MINDMAP_INFO, SUBTOPIC } from "../definitions";
import {uuid} from '@visuallyjs/browser-ui';

@Component({
  template: `
    <div class="vjs-mindmap-subtopic vjs-mindmap-vertex">
        <div class="vjs-mindmap-title">{{data.label}}</div>
        <div class="vjs-mindmap-notes">{{data.notes}}</div>
        <div class="vjs-mindmap-info" (click)="showInfo()"></div>
        <div class="${CLASS_ADD_CHILD}" [attr.data-direction]="data.direction" (click)="addChild()"></div>
        <div class="${CLASS_MINDMAP_DELETE}" (click)="deleteVertex()"></div>
    </div>
  `
})
export class SubtopicNodeComponent extends BaseNodeComponent {

  showInfo() {
    this.model.setSelection(this.getNode());
  }

  addChild() {
    const payload = {
      id: uuid(),
      parentId: this.getNode().id,
      label: "New subtopic",
      children: [],
      type: SUBTOPIC,
      direction: this.data.direction
    };

    this.model.transaction(() => {
      const node = this.model.addNode(payload);
      this.model.addEdge({ source: this.getNode(), target: node });
    });

    this.relayout();
  }

  deleteVertex() {
    const nodeAndDescendants = this.model.selectDescendants(this.getNode(), true);
    this.model.transaction(() => {
      this.model.remove(nodeAndDescendants);
    });

    this.relayout();
  }

  relayout() {
    requestAnimationFrame(() => {
      this.surface.relayout();
    });
  }
}
