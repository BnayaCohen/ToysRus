<template>
    <h1>STATS</h1>
    <PieChart :chartData="testDataPrices" />
    <DoughnutChart :chartData="testDataInStock" />
</template>

<script>
import { defineComponent } from 'vue'
import { DoughnutChart, PieChart } from 'vue-chart-3'
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default {
    name: 'dashboard-page',
    components: {
        PieChart,
        DoughnutChart
    },
    created() {
        console.log( this.$store.getters.toysPricesByLabel);
        // this.$store.dispatch('loadToys')
    },
    computed: {
        testDataPrices() {
            const { labels, prices } = this.$store.getters.toysPricesByLabel
            return {
                labels: labels,
                datasets: [
                    {
                        data: prices,
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            }
        },
        testDataInStock() {
            const { labels, inStock } = this.$store.getters.toysInStockByLabel
            return {
                labels: labels,
                datasets: [
                    {
                        data: inStock,
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            }
        }
    },
    data() {
        return {
        }
    },
}
</script>