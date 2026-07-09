import { BaseNodeComponent } from "@visuallyjs/browser-ui-angular";
import { Component } from '@angular/core';
import { CLASS_ADD_CHILD, LEFT, RIGHT } from "../definitions";
import {uuid} from '@visuallyjs/browser-ui';

@Component({
  template: `
    <div class="vjs-mindmap-main vjs-mindmap-vertex">
        <div class="vjs-mindmap-title">{{data.label}}</div>
        <div class="vjs-mindmap-notes">{{data.notes}}</div>
        <div class="vjs-mindmap-info"(click)="showInfo()"></div>
        <div class="${CLASS_ADD_CHILD}" [attr.data-direction]="LEFT" (click)="addChild(LEFT)"></div>
        <div class="${CLASS_ADD_CHILD}" [attr.data-direction]="RIGHT" (click)="addChild(RIGHT)"></div>
    </div>
  `
})
export class MainNodeComponent extends BaseNodeComponent {
  LEFT = LEFT;
  RIGHT = RIGHT;

  showInfo() {
    this.model.setSelection(this.getNode());
  }

  addChild(direction: string) {
    const source = this.getPort(direction);
    const payload = {
      id: uuid(),
      parentId: this.getNode().id,
      label: "New subtopic",
      children: [],
      type: "subtopic",
      direction
    };

    this.surface.model.transaction(() => {
      const node = this.surface.model.addNode(payload);
      this.surface.model.addEdge({ source, target: node });
    });

    this.relayout();
  }

  relayout() {
      requestAnimationFrame(() => {
          this.surface.relayout();
      });
  }
}
