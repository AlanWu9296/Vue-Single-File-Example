<template>
    <div>
        <h1>Latest Vue.js Commits</h1>
        <input type="radio" name="option" value="master" v-model="option">master
        <input type="radio" name="option" value="dev" v-model="option">dev
        <p>vuejs/vue@{{option}}</p>
        <ul v-for="data in datas" :key="data.id">
            <li>
                <p>{{data.sha.slice(0,7)}} -{{data.commit.message}}</p>
                <p>by {{data.commit.author.name}} at {{data.commit.author.date}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='
    export default ({
        name: 'github',
        data() {
            return {
                option: "master",
                datas:""
            }
        },

        created:function(){
            this.fetchData()
        },

        methods:{
            fetchData:function(){
                var xml = new XMLHttpRequest()
                var self = this
                xml.open("GET",apiURL+self.option)
                xml.onload=function () {
                    self.datas = JSON.parse(xml.responseText)
                }
                xml.send()
            }
        },

        watch:{
            option:"fetchData"
        }

    })
</script>