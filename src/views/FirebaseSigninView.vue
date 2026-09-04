<template>
    <div class="container">
        <h1>Login</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="login">Login</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { userRole } from '../firebaseAuth'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (data) => {
            console.log("Firebase Login Successful!")
            console.log(auth.currentUser)

            const userDoc = await getDoc(doc(db, "users", data.user.uid))
            if (userDoc.exists()) {
                userRole.value = userDoc.data().role
                console.log("User role:", userRole.value)
            }

            router.push('/')
        }).catch((error) => {
            console.log(error.code)
        })
}
</script>