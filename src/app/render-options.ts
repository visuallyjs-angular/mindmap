import {
    AnchorLocations,
    CONNECTOR_TYPE_STRAIGHT,
    EVENT_CANVAS_CLICK, Surface
} from "@visuallyjs/browser-ui"
import {AngularRenderOptions} from '@visuallyjs/browser-ui-angular';

/**
 * Render options control the basic behaviour and appearance of the UI. There are a lot of render options available,
 * and we'd encourage you to read the docs for a full overview, but we've included a few here to give you some
 * food for thought.
 */
const renderOptions:AngularRenderOptions = {

    // in this app, elements are not draggable; they are fixed by the layout.
    elementsDraggable:false,
    // after load, zoom the display so all nodes are visible.
    zoomToFit:true,
    // show connections to ports as being attached to their parent nodes. We use this for the main node: its edges
    // are connected to either a `right` or `left` port on the main node, but these ports are logical ports only - they
    // do not have their own DOM element assigned.
    logicalPorts:true,
    // Run a relayout whenever a new edge is established, which happens programmatically when the user adds a new subtopic.
    refreshLayoutOnEdgeConnect:true,
    // for the purposes of testing. Without this the right mouse button is disabled by default.
    consumeRightClick:false,
    // Use our custom mindmap layout.
    layout:{
        type:"mindmap",
    },
    edges:{
        connector:{
            type:CONNECTOR_TYPE_STRAIGHT,
            options:{
                stub:20
            }
        },
        anchor:[ AnchorLocations.Left, AnchorLocations.Right ]
    },
    events:{
        [EVENT_CANVAS_CLICK]:(surface:Surface) => surface.model.clearSelection()
    },
    dragOptions:{
      cssFilter:".vjs-mindmap-info"
    }
}

export default renderOptions
