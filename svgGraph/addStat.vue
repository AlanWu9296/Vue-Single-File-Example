<template>
    <div>
        <input type="text" v-model="input">
        <button @click="added()">Add a Stat</button>
        <p>* input[type="range"] requires IE10 or above.</p>
    </div>
</template>

<script>
export default{
    name:"addStat",
    data(){
        return{
            input:""
        }
    },
    methods:{
        added:function(){
            this.$emit('added',this.input)
        }
    }
}
</script>