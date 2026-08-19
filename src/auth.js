import { ref } from 'vue'

export const isAuthenticated = ref(false)

const HARDCODED_USERNAME = 'admin'
const HARDCODED_PASSWORD = 'password123'

export function login(username, password) {
    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
        isAuthenticated.value = true
        return true
    }
    return false
}

export function logout() {
    isAuthenticated.value = false
}