<template>
    <div>
        <div v-for="data in barDatas" :key="data.id">
            <p style="display:inline">{{data.label}}</p>
            <input type="range" max=100 min=0 v-model="data.value">
            <p style="display:inline">{{data.value}}</p>
            <button @click="delData(data)">X</button>
        </div>
    </div>
</template>

<script>
    export default {
        name:"slideBar",
        props:["barDatas"],
        methods:{
            delData:function(data){
                this.$emit('delete',data)
            }
        }
    }
</script>

<style scoped>

</style>