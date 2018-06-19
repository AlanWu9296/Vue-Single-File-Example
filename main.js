import Vue from 'vue'
// import Markdown from './markdown.vue'
//import Github from './github.vue'
//import GridComponent from './gridComponent'
//import TreeView from './TreeView/treeView.vue'

import SvgView from './svgGraph/svgView.vue'

new Vue({
    el:"#app",
    render:h=>h(SvgView)
})
