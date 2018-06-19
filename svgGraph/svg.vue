<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height=250 width=250>
            <g>
                <polygon :points="points" fill="green"></polygon>
                <circle cx="100" cy="100" r="80" stroke="grey" stroke-width=2px fill=none></circle>
                <nameLabel v-for="(data, index) in datas" :stat="data" :index="index" :total="datas.length" :key="data.id" />
            </g>
        </svg>
    </div>
</template>

<script>
import nameLabel from './nameLable'

    function valueToPoint(value, index, total) {
        var x = 0
        var y = -value * 0.8
        var angle = Math.PI * 2 / total * index
        var cos = Math.cos(angle)
        var sin = Math.sin(angle)
        var tx = x * cos - y * sin + 100
        var ty = x * sin + y * cos + 100
        return {
            x: tx,
            y: ty
        }
    }

    export default {
        name: "svgDisplay",
        props: ['datas'],
        computed: {
            points: function () {
                {
                    var total = this.datas.length
                    return this.datas.map(function (data, i) {
                        var point = valueToPoint(data.value, i, total)
                        return point.x + ',' + point.y
                    }).join(' ')
                }
            }
        },
        components: {
            nameLabel,
        }
    }
</script>

<style scoped>
</style>