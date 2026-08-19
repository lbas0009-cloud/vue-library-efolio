<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1 class="text-center">Login</h1>
                <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                        <label for="login-username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="login-username" v-model="username" />
                    </div>
                    <div class="mb-3">
                        <label for="login-password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="login-password" v-model="password" />
                    </div>
                    <div v-if="loginError" class="text-danger mb-3">{{ loginError }}</div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth'

const username = ref('')
const password = ref('')
const loginError = ref(null)
const router = useRouter()

const handleLogin = () => {
    const success = login(username.value, password.value)
    if (success) {
        loginError.value = null
        router.push('/about')
    } else {
        loginError.value = 'Invalid username or password'
    }
}
</script>