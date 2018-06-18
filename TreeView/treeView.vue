<template>
    <div>
      <p>(You can double click on an item to turn it into a folder.)</p>
      <Item :list="model"/>
    </div>
</template>

<script>
import Item from "./item.vue"
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

    export default{
        name:'treeView',
        data(){
          return {
            model:data
          }
        },
        components:{
          Item
        }
    }
</script>