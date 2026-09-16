<template>
    <div>
        <h1>Books with ISBN > 1000</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                <template v-if="editingId === book.id">
                    <input v-model="editName" type="text" />
                    <input v-model="editIsbn" type="number" />
                    <button @click="saveEdit(book.id)">Save</button>
                    <button @click="cancelEdit">Cancel</button>
                </template>
                <template v-else>
                    {{ book.name }} (ISBN: {{ book.isbn }})
                    <button @click="startEdit(book)">Edit</button>
                    <button @click="removeBook(book.id)">Delete</button>
                </template>
            </li>
        </ul>

        <h2>Top 3 books ordered by ISBN</h2>
        <ul>
            <li v-for="book in orderedBooks" :key="book.id">
                {{ book.name }} (ISBN: {{ book.isbn }})
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const books = ref([]);
const orderedBooks = ref([]);
const editingId = ref(null);
const editName = ref('');
const editIsbn = ref('');

const fetchBooks = async () => {
    try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
    } catch (error) {
        console.error('Error fetching books: ', error);
    }
};

const fetchOrderedBooks = async () => {
    try {
        const q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000),
            orderBy('isbn'),
            limit(3)
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        });
        orderedBooks.value = booksArray;
    } catch (error) {
        console.error('Error fetching ordered books: ', error);
    }
};

const startEdit = (book) => {
    editingId.value = book.id;
    editName.value = book.name;
    editIsbn.value = book.isbn;
};

const cancelEdit = () => {
    editingId.value = null;
};

const saveEdit = async (id) => {
    try {
        await updateDoc(doc(db, 'books', id), {
            name: editName.value,
            isbn: Number(editIsbn.value)
        });
        console.log('Book updated successfully!');
        editingId.value = null;
        fetchBooks();
        fetchOrderedBooks();
    } catch (error) {
        console.error('Error updating book: ', error);
    }
};

const removeBook = async (id) => {
    try {
        await deleteDoc(doc(db, 'books', id));
        console.log('Book deleted successfully!');
        fetchBooks();
        fetchOrderedBooks();
    } catch (error) {
        console.error('Error deleting book: ', error);
    }
};

onMounted(() => {
    fetchBooks();
    fetchOrderedBooks();
});
</script>