<template>
    <section v-if="toyToEdit" class="toy-edit py-2">
        <form @submit.prevent="saveToy" class="form">
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
                <label for="labels" class="form-label">Toy Labels</label>
                <select v-model="toyToEdit.labels" id="labels" class="form-input" multiple>
                    <option value="On wheels">On wheels</option>
                    <option value="Box game">Box game</option>
                    <option value="Art">Art</option>
                    <option value="Baby">Baby</option>
                    <option value="Doll">Doll</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Outdoor">Outdoor</option>
                </select>
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
        </form>
    </section>
</template>

<script>
import { toyService } from '../services/toy-service'

export default {
    name: 'toy-edit',
    data() {
        return {
            toyToEdit: null,
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
}
</script>
