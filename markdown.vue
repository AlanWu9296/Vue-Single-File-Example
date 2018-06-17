<template>
    <div>
        <textarea :value="text" @input="update"></textarea>
        <div v-html="renderResult"></div>
    </div>
</template>

<script>
import marked from "marked"
import _ from "lodash"

    export default{
        name:'markdown',
        data(){
            return {text:"# Hello Vue !"}
        },
        computed:{
            renderResult:function(){
                return marked(this.text,{sanitize:true})
            }
        },
        methods:{
            update:
                 _.debounce(function(e){
                     this.text = e.target.value
                },300)
            
        }
    }
</script>

<style scoped>
    textarea{
        width:500px;
    }    
</style>