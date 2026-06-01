### Mindmap Demo

This demo illustrates a Mindmap editor using VisuallyJS in an Angular application.

#### How it works

The mindmap demo uses the `vjs-surface` component with a custom layout engine (`MindmapLayout`) to automatically organize topics and subtopics. It also demonstrates how to register custom JSON parsers and exporters.

#### Components Used

- `vjs-surface`: The core canvas for the mindmap.
- `vjs-controls`: Navigation and zoom controls.
- `vjs-miniview`: A small navigation window.

#### Component Options

The `vjs-surface` component is configured with:
- `viewOptions`: Defines the node types for main topics and subtopics.
- `renderOptions`: Specifies visual styles and identifies the layout to use.
- `layout`: A custom "mindmap" layout is registered and used to position nodes.

#### Stylesheets

For the VisuallyJS components to render correctly, the following stylesheets must be included in the project (usually in `styles.css`):

```css
@import "@visuallyjs/browser-ui/css/visuallyjs.css";
@import "@visuallyjs/browser-ui-angular/css/visuallyjs-angular.css";
```
