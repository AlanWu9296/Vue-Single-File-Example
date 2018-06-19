<template>
    <div>
        <addBar @added="addToData($event)"/>
        <dataDisplay :displayData="data"/>
        <slideBars :barDatas="data" @delete="delData($event)"/>
        <svgDisplay :datas="data"/>
    </div>
</template>

<script>
import addBar from "./addStat.vue"
import dataDisplay from "./dataDisplay.vue"
import slideBars from "./slideBar"
import svgDisplay from './svg'

let initData = [
  {
    "label": "A",
    "value": 100
  },
  {
    "label": "B",
    "value": 100
  },
  {
    "label": "C",
    "value": 100
  },
  {
    "label": "D",
    "value": 100
  },
  {
    "label": "E",
    "value": 100
  },
  {
    "label": "F",
    "value": 100
  }
]
    export default{
        name:"svgGraph",
        data(){
            return {
                data: initData
            }
        },
        components:{
            addBar,
            dataDisplay,
            slideBars,
            svgDisplay,
        },
        methods:{
            addToData:function(e){
                this.data.push({"label":e,"value":100})
            },
            delData:function(e){
                this.data.splice(this.data.indexOf(e),1)

            }

        }

    }
</script>