<template>
    <li class="toy-preview">
        <el-row>
            <el-col>
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="toyImgSrc"
                        class="image" />
                    <div style="padding: 14px">
                        <span>{{ toy.name }}</span>
                        <p class="toy-price"><span>Price:</span> {{ $filters.currencyUSD(toy.price) }}</p>
                        <p class="toy-in-stock"><span>In stock:</span> {{ toy.inStock ? 'Yes' : 'No' }}</p>
                        <div class="toy-bottom">
                            <el-button-group class="ml-4">
                                <el-button @click="goToEdit" type="primary" plain>Edit</el-button>
                                <el-button @click="goToDetail" type="warning" plain>Details</el-button>
                                <el-button @click="removeToy" type="danger" plain>Remove</el-button>
                            </el-button-group>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </li>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'toy-preview',
    props: {
        toy: {
            type: Object,
        }
    },
    computed:{
toyImgSrc(){
    return `https://robohash.org/${this.toy.name}`
}
    },
    methods: {
        goToDetail() {
            this.$router.push(`/toy/${this.toy._id}`)
        },
        goToEdit() {
            this.$router.push(`/toy/edit/${this.toy._id}`)
        },
        removeToy() {
            this.$emit('removeToy', this.toy._id)
        }
    }
}
</script>