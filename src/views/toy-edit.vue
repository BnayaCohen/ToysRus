<template>
    <section v-if="toyToEdit" class="toy-edit py-2">

        <el-form :model="toyToEdit" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="Toy name" prop="name">
                <el-input v-model="toyToEdit.name" />
            </el-form-item>
            <el-form-item label="Toy price" prop="price">
                <el-input v-model.number="toyToEdit.price" />
            </el-form-item>
            <el-form-item label="Toy labels" prop="labels">

                <el-select v-model="toyToEdit.labels" multiple collapse-tags placeholder="Select labels">
                    <el-option v-for="(label, i) in getLabels" :key="i" :label="label" :value="label" />
                </el-select>
            </el-form-item>
            <el-form-item label="Is in stock" prop="inStock">
                <el-switch v-model="toyToEdit.inStock" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveToy">Save</el-button>
                <el-button @click="goBack">Back</el-button>
            </el-form-item>
        </el-form>
        <!-- <form @submit.prevent="saveToy" class="form">
            <div class="form-control">
                <label for="txt" class="form-label">Toy Name</label>
                <input required v-model="toyToEdit.name" id="txt" type="text" class="form-input"
                    placeholder="Enter your toy name here..." />
            </div>
            <div class="form-control">
                <label for="price" class="form-label">Toy Price</label>
                <input required v-model.number="toyToEdit.price" id="price" type="number" class="form-input" />
            </div>
            <div class="form-control">
                <el-select v-model="toyToEdit.labels" multiple collapse-tags placeholder="Filter by Labels"
                    style="width: 240px">
                    <el-option v-for="(label, i) in getLabels" :key="i" :label="label" :value="label" />
                </el-select>
            </div>
            <div class="form-control">
                <label for="stock" class="form-label">Toy In stock</label>
                <select v-model="toyToEdit.inStock" id="stock" class="form-input">
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                </select>
            </div>
            <div class="btn-group">
                <button @click="saveToy" class="btn btn-info">Save</button>
                <button @click="goBack" class="btn btn-danger-text">Back</button>
            </div>
        </form> -->
    </section>
</template>

<script>
import { toyService } from '../services/toy-service'
import { reactive, ref } from 'vue'
// import type { FormInstance, FormRules } from 'element-plus'

export default {
    name: 'toy-edit',
    data() {
        return {
            toyToEdit: null,
            formSize: ref('default')
        }
    },
    created() {
        const { id } = this.$route.params
        if (id) {
            this.$store.dispatch({ type: 'getToyById', id }).then((toy) => {
                this.toyToEdit = toy
            })
        } else this.toyToEdit = toyService.getEmptyToy()
    },
    methods: {
        goBack() {
            this.$router.push('/toy')
        },
        saveToy() {
            this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
                .then(() => {
                    this.$router.push('/toy')
                })
        },
    },
    computed: {
        getLabels() {
            return this.$store.getters.toysLabels
        }
    },
}
</script>
