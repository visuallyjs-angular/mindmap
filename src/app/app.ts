import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { VisuallyJsModule, SurfaceComponent } from "@visuallyjs/browser-ui-angular";
import { registerParser, registerExporter, uuid, EVENT_GRAPH_CLEARED, EVENT_UNDO, EVENT_REDO} from "@visuallyjs/browser-ui"

import renderOptions from "./render-options"
import viewOptions from "./view-options"
import { MINDMAP_JSON, mindmapJsonExporter, mindmapJsonParser } from "./parser";
import { MAIN } from "./definitions";

import { MindmapInspectorComponent } from "./components/inspector.component"

@Component({
  selector: 'app-root',
  imports: [VisuallyJsModule, MindmapInspectorComponent],
  templateUrl: './app.html'
})
export class App implements AfterViewInit {

  @ViewChild(SurfaceComponent) surfaceComponent !: SurfaceComponent;

  renderOptions = renderOptions
  viewOptions = viewOptions

  constructor() {
    registerParser(MINDMAP_JSON, mindmapJsonParser)
    registerExporter(MINDMAP_JSON, mindmapJsonExporter)
  }

  ngAfterViewInit() {
    const surface = this.surfaceComponent.surface
    const model = surface.model;

    model.bind(EVENT_UNDO, () => this.relayout());
    model.bind(EVENT_REDO, () => this.relayout());

    model.bind(EVENT_GRAPH_CLEARED, () => {
      model.addNode({
        id: uuid(),
        type: MAIN,
        left: [],
        right: [],
        label: "Main"
      })
      surface.zoomToFit()
    })

    model.load({
      url: "./dataset.json",
      type: MINDMAP_JSON
    })
  }

  relayout() {
    requestAnimationFrame(() => {
      this.surfaceComponent.surface.relayout();
    })
  }
}
