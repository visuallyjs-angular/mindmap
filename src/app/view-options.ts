import { MainNodeComponent } from "./components/main-node.component"
import { SubtopicNodeComponent } from "./components/subtopic-node.component"
import { MAIN, SUBTOPIC } from "./definitions"
import {AngularViewOptions} from '@visuallyjs/browser-ui-angular';

/**
 * View options map node/group types to the components used to render them and to various aspects of the given vertex type's behaviour
 */
const viewOptions:AngularViewOptions = {
    // These are mappings for node type. They are in fact optional; if you don't provide them, VisuallyJs will
    // use a default component. But in most apps you're probably going to want to provide components for your nodes.
    nodes:{
        [MAIN]:{
            component:MainNodeComponent
        },
        [SUBTOPIC]:{
            component:SubtopicNodeComponent
        }
    }
}

export default viewOptions
