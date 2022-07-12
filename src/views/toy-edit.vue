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
