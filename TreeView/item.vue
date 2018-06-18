<template>
    <div>
        <li :class="{bold :isFolder}">
            <span @click="open()" @dblclick="makeFolder()">
                {{list.name}}
                <span v-if="isFolder">[{{isOpen? '-' : '+'}}]</span>
            </span>
        </li>
        <ul v-show="isOpen" v-if="isFolder">
            <li>
                <item v-for="l in list.children" :key="l.id" :list="l" />
            </li>
            <li @click="createNew()">+</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "item",
        props: ['list'],
        data(){
            return{
                isOpen:false
            }
        },
        computed:{
            isFolder:function(){
                return this.list.children && this.list.children.length
            }
        },
        methods:{
            open:function(){
                this.isOpen = ! this.isOpen
            },
            createNew:function(){
                this.list.children.push({name:'New Stuff'})
            },
            makeFolder:function(){
                if(!this.isFolder){
                    this.$set(this.list, 'children', [])
                    this.list.children.push({name:"New Stuff"})
                    this.isOpen = true
                }
            }
        }
    }
</script>

<style>
.bold{
    font-weight:700;
}
</style>