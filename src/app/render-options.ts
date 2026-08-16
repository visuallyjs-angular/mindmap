import {
    AnchorLocations,
    CONNECTOR_TYPE_STRAIGHT,
    EVENT_CANVAS_CLICK, Surface, BowtieLayout, DataSource, Vertex
} from "@visuallyjs/browser-ui"
import {AngularRenderOptions} from '@visuallyjs/browser-ui-angular';
import {LEFT, MAIN, RIGHT} from './definitions';

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
    // show connections to ports as being attached to their parent nodes. We use this for the main node: its edges are connected to either a `right` or `left` port on the main node, but these ports are logical ports only - they do not have their own DOM element assigned.
    logicalPorts:true,
    // Run a relayout whenever a new edge is established, which happens programmatically when the user adds a new subtopic.
    relayoutOnEdgeConnect:true,
    // Use a bowtie layout.
    layout:{
      type:BowtieLayout.type,
      options:{
        getRootNode:(ds:DataSource) => ds.getNodes().filter(d => d.data.type === MAIN)[0],
        getUpstream:(ds:DataSource, v:Vertex) => v.getAllEdges().filter(e => e.target.data.direction === LEFT).map(e => e.target),
        getDownstream:(ds:DataSource, v:Vertex) => v.getAllEdges().filter(e => e.target.data.direction === RIGHT).map(e => e.target)
      }
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
    }
}

export default renderOptions
