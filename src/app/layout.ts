import {
    AbstractLayout, isNode, Layouts, ParentRelativePlacementStrategy, BrowserUIModel, Vertex,
  LayoutParameters, Node, InternalLayoutOptions
} from "@visuallyjs/browser-ui"

import {LEFT, MAIN, RIGHT} from "./definitions"
import {PointXY, Size} from '@visuallyjs/browser-ui/types/core/util';


export interface MindmapLayoutOptions extends LayoutParameters {}

/**
 * Places the focus vertex in the center of the canvas and then branches out to the left and right with children of the focus.
 *
 */
export class MindmapLayout extends AbstractLayout<MindmapLayoutOptions> {

    focusVertex!:Node|null;

    type = "mindmap"

  constructor(params:InternalLayoutOptions<MindmapLayoutOptions>) {
    super(params)
  }

    begin(model:BrowserUIModel, parameters:MindmapLayoutOptions) {
        const focusCandidates = model.filter(o => isNode(o) && o.data.type === MAIN)
        if (focusCandidates.getNodeCount() > 0) {
            this.focusVertex = focusCandidates.getNodeAt(0)
        } else {
            this.focusVertex = null
        }
    }

    end(model:BrowserUIModel, parameters:MindmapLayoutOptions) { }

    getDefaultParameters() {
        return {
            padding:{x:100, y:100}
        };
    }

    reset() { }

    step(model:BrowserUIModel, getPosition:(id: string) => PointXY, setPosition:(id: string, x: number, y: number) => void, sizes: Record<string, Size>, params:MindmapLayoutOptions) {

        if (this.focusVertex != null) {

            //
            // We use a helper class here to draw out the left/right trees - ParentRelativePlacementStrategy.
            //
            const _preparePlacementStrategy = (dir:string) => {
                return new ParentRelativePlacementStrategy(model, {
                    rootNode:this.focusVertex,
                    idFunction:(d) => d.id,
                    sizeFunction:(id) => {
                        return sizes[id]
                    },
                    childVerticesFunction:(d:Node) => {
                        if (d.data.type === MAIN) {
                            return d.getAllEdges().filter(e => e.target.data.direction === dir).map(e => e.target) as Array<Node>
                        } else {
                            return d.getAllEdges().map(e => e.target) as Array<Node>
                        }
                    },
                    padding:{x:150, y:80},
                    absolutePositionFunction:(v) => {
                       return {x:0, y:0 }
                    },
                    axisIndex:1
                })
            }

            const rightPositions = _preparePlacementStrategy(RIGHT).execute()
            rightPositions.forEach((info, id) => {
                setPosition(id, info.position.x, info.position.y)
            })

            const leftPositions = _preparePlacementStrategy(LEFT).execute()
            leftPositions.forEach((info, id) => {
                setPosition(id, info.position.x * -1, info.position.y)
            })
        }


        this.done = true

    }
}

