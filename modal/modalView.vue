<template>
    <div>
        <button @click="showModal = true">Show Modal</button>
        <modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">Custom Header</h3>
        </modal>
    </div>
</template>

<script>
import modal from "./modal.vue"

    export default {
        name:"modalView",
        data(){return{
            showModal:false
        }},
        components:{
            modal
        }
    }
</script>

<style scoped>

</style>