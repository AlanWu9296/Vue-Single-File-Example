<template>
 <div>
     <div>
        <label for="search">search</label>
        <input type="text" id="search" v-model="input">
     </div>
     <table>
        <thead>
            <tr >
                <th v-for="column in columns" :key="column.id" @click="sort(column.toLowerCase())">{{column}}</th>
            </tr>
        </thead>
         <tbody v-for="data in displayData" :key="data.id">
             <tr>
                 <td v-for="column in columns" :key="column.id">{{data[column.toLowerCase()]}}</td>
             </tr>
         </tbody>
     </table>
 </div>
</template>

<script>
    export default {
        name: "gridComponent",
        data() {
            return {
                input:"",
                columns:["Name","Power"],
                gridData: [{
                        name: 'Chuck Norris',
                        power: Infinity
                    },
                    {
                        name: 'Bruce Lee',
                        power: 9000
                    },
                    {
                        name: 'Jackie Chan',
                        power: 7000
                    },
                    {
                        name: 'Jet Li',
                        power: 8000
                    }
                ],
                orders:{name:1,power:1}
            }
        },
        computed:{
            displayData: function(){
                var reg = ".*"+this.input+".*"
                if(this.input!=""){
                    var result=[]
                    this.gridData.forEach(function(data){
                        if(data.name.toLowerCase().search(reg)!=-1){
                            result.push(data)
                        }
                    })
                    return result
                }else{
                    return this.gridData
                }
            }
        },
        methods:{
            sort:function(key){
                var order = this.orders[key]
                this.orders[key] = order*(-1)
                this.gridData.sort(function(a,b){
                    a=a[key]
                    b=b[key]
                    return (a === b ? 0 : a > b ? 1 : -1) * order 
                })
            }
        }
    }
</script>