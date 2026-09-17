<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required>
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required>
            </div>
            <button type="submit">Add Book</button>
        </form>

        <BookList />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'
import axios from 'axios'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
    try {
        const response = await axios.post('https://us-central1-fit5032-8102c.cloudfunctions.net/addBookCapitalized', {
            isbn: isbn.value,
            name: name.value
        })
        console.log("Book added successfully with capitalized name:", response.data)
        isbn.value = ''
        name.value = ''
    } catch (error) {
        console.error("Error adding book: ", error)
    }
}
</script>