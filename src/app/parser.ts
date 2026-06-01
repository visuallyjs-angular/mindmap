
import { isNode,  Node, Edge, VisuallyJsModel } from "@visuallyjs/browser-ui"
import {LEFT, MAIN, RIGHT, SUBTOPIC} from "./definitions"

export const MINDMAP_JSON = "mindmap-json"

export const mindmapJsonParser = (jd:string, model:VisuallyJsModel, parameters:any) => {

    const json = typeof jd === "string" ? JSON.parse(jd) : jd
    const data = json.data
    data.type = MAIN
    let mainTopic = model.addNode(data)

    // add logical ports for connections to each side of the
    // main node
    model.addPort(mainTopic, {id:LEFT})
    model.addPort(mainTopic,{id:RIGHT})

    const _processChildren = (focus:Node, direction:string) => {
        const c = focus.data.children || []
        c.forEach((_c:any) => {
            _c.direction = direction
            _c.type = SUBTOPIC
            _c.children = _c.children || []
            const __c = model.addNode(_c)
            model.addEdge({source:focus, target:__c})
            _processChildren(__c, direction)
        })
    }

    const _processRootChildren = (direction:string) => {
        const n = data[direction]
        const source = mainTopic.getPort(direction)
        n.forEach((l:any) => {
            l.type = SUBTOPIC
            l.direction = direction
            l.children = l.children || []
            const ln = model.addNode(l)
            model.addEdge({source, target:ln, data:{direction:direction}})
            _processChildren(ln, direction)
        })
    }

    _processRootChildren(LEFT)
    _processRootChildren(RIGHT)

}



export const mindmapJsonExporter = (model:VisuallyJsModel, parameters:any) => {

    const mainTopic = model.filter(o => isNode(o) && o.data.type === MAIN).getNodeAt(0)

    const _one = (v:Node, direction:string) => {
        const edges = v.getAllSourceEdges()
        const d:any = {
            id:v.data.id,
            type:SUBTOPIC,
            direction,
            label:v.data.label,
            notes:v.data.notes || "",
            children:edges.map((e:Edge) => _one(e.target as Node, direction))
        }

        return d
    }

    const mainLeft = mainTopic.getAllEdges().filter(e => e.target.data.direction === LEFT)
    const mainRight = mainTopic.getAllEdges().filter(e => e.target.data.direction === RIGHT)
    const left = mainLeft.map(ml => _one(ml.target as Node, LEFT))
    const right = mainRight.map(ml => _one(ml.target as Node, RIGHT))

    return {
        name:"mindmap",
        data:{
            id:mainTopic.data.id,
            label:mainTopic.data.label,
            notes:mainTopic.data.notes || "",
            left,
            right
        }
    }
}


