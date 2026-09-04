<template>
    <div class="container">
        <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                        >Home (Week 5)</router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link" active-class="active">About</router-link>
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
                </li>
                <li class="nav-item" v-else>
                    <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
                </li>
                <li class="nav-item">
                    <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
                </li>
                <li class="nav-item" v-if="firebaseUser">
                    <span class="nav-link">Role: {{ userRole }}</span>
                </li>
                <li class="nav-item" v-if="firebaseUser">
                    <a href="#" class="nav-link" @click.prevent="handleFirebaseLogout">Firebase Logout</a>
                </li>
            </ul>
        </header>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from '../auth'
import { firebaseUser, userRole, logoutFirebase } from '../firebaseAuth'

const router = useRouter()

const handleLogout = () => {
    logout()
    router.push('/login')
}

const handleFirebaseLogout = async () => {
    await logoutFirebase()
    router.push('/FireLogin')
}
</script>