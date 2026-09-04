import { ref } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'

export const firebaseUser = ref(null)
export const userRole = ref(null)

onAuthStateChanged(auth, (user) => {
    firebaseUser.value = user
    if (!user) {
        userRole.value = null
    }
})

export async function logoutFirebase() {
    console.log("Current user before logout:", auth.currentUser)
    await signOut(auth)
    console.log("Current user after logout:", auth.currentUser)
}