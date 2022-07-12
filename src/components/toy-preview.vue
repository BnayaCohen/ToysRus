<template>
    <li class="toy-preview">
        <el-row>
            <el-col>
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image" />
                    <div style="padding: 14px">
                        <span>{{ toy.name }}</span>
                        <p class="toy-price"><span>Price:</span> {{ $filters.currencyUSD(toy.price) }}</p>
                        <p class="toy-in-stock"><span>In stock:</span> {{ toy.inStock ? 'Yes' : 'No' }}</p>
                        <div class="toy-bottom">
                            <el-button-group class="ml-4">
                                <el-button @click="goToEdit" type="primary" plain>Edit</el-button>
                                <el-button @click="goToDetail" type="warning" plain>Eetails</el-button>
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

<style>
.toy-preview{
width: 250px;
}

.toy-price,
.toy-in-stock {
    font-size: 12px;
    color: #999;
}

.toy-bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.image {
    width: 100%;
    display: block;
}
</style>