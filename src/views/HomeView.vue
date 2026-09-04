<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <h1 class="text-center">W5. Library Registration Form</h1>
                <p class="text-center">Let's build some more advanced features into our form.</p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <input
                                type="text"
                                class="form-control"
                                id="username"
                                v-model="formData.username"
                                @blur="() => validateName(true)"
                                @input="() => validateName(false)"
                            />
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select
                                class="form-select"
                                id="gender"
                                v-model="formData.gender"
                                @change="() => validateGender(true)"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-lg-6">
                            <label for="password" class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                v-model="formData.password"
                                @blur="() => validatePassword(true)"
                                @input="() => validatePassword(false)"
                            />
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="confirm-password" class="form-label">Confirm password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="confirm-password"
                                v-model="formData.confirmPassword"
                                @blur="() => validateConfirmPassword(true)"
                            />
                            <div v-if="errors.confirmPassword" class="text-danger">
                                {{ errors.confirmPassword }}
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="isAustralian"
                                    v-model="formData.isAustralian"
                                    @change="() => validateResident(true)"
                                />
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                            </div>
                            <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea
                            class="form-control"
                            id="reason"
                            rows="3"
                            v-model="formData.reason"
                            @blur="() => validateReason(true)"
                            @input="() => validateReason(false)"
                        ></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                        <div v-if="showFriendMessage" class="text-success">Great to have a friend</div>
                    </div>
                    <div class="mb-3">
                        <label for="suburb" class="form-label">Suburb</label>
                        <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>

                <div class="row mt-5" v-if="submittedCards.length">
                    <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
                        <Column field="username" header="Username"></Column>
                        <Column field="password" header="Password"></Column>
                        <Column field="isAustralian" header="Australian Resident"></Column>
                        <Column field="gender" header="Gender"></Column>
                        <Column field="reason" header="Reason"></Column>
                        <Column v-if="userRole === 'admin'" header="Actions">
                            <template #body="slotProps">
                                <button class="btn btn-sm btn-warning me-2" @click="editEntry(slotProps.index)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteEntry(slotProps.index)">Delete</button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import { userRole } from '../firebaseAuth'

const formData = reactive({
    username: "",
    password: "",
    confirmPassword: "",
    isAustralian: false,
    gender: "",
    reason: "",
    suburb: "Clayton"
})

const submittedCards = ref([])

const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
})

const showFriendMessage = ref(false)

const validateName = (blur) => {
    if (formData.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters"
    } else {
        errors.value.username = null
    }
}

const validatePassword = (blur) => {
    const password = formData.password
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter."
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter."
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number."
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character."
    } else {
        errors.value.password = null
    }
}

/**
 * Confirm password validation function that checks if the password and confirm password fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
const validateConfirmPassword = (blur) => {
    if (formData.password !== formData.confirmPassword) {
        if (blur) errors.value.confirmPassword = "Passwords do not match."
    } else {
        errors.value.confirmPassword = null
    }
}

const validateResident = (blur) => {
    if (!formData.isAustralian) {
        if (blur) errors.value.resident = "You must confirm your residency status"
    } else {
        errors.value.resident = null
    }
}

const validateGender = (blur) => {
    if (formData.gender === "") {
        if (blur) errors.value.gender = "Please select a gender"
    } else {
        errors.value.gender = null
    }
}

const validateReason = (blur) => {
    if (formData.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters"
    } else {
        errors.value.reason = null
    }

    showFriendMessage.value = formData.reason.toLowerCase().includes("friend")
}

const submitForm = () => {
    validateName(true)
    validatePassword(true)
    validateConfirmPassword(true)
    validateResident(true)
    validateGender(true)
    validateReason(true)

    if (
        !errors.value.username &&
        !errors.value.password &&
        !errors.value.confirmPassword &&
        !errors.value.resident &&
        !errors.value.gender &&
        !errors.value.reason
    ) {
        submittedCards.value.push({ ...formData })
        clearForm()
    }
}

const clearForm = () => {
    formData.username = ""
    formData.password = ""
    formData.confirmPassword = ""
    formData.isAustralian = false
    formData.gender = ""
    formData.reason = ""
    formData.suburb = "Clayton"
}

const editEntry = (index) => {
    const entry = submittedCards.value[index]
    formData.username = entry.username
    formData.password = entry.password
    formData.confirmPassword = entry.password
    formData.isAustralian = entry.isAustralian
    formData.gender = entry.gender
    formData.reason = entry.reason
    formData.suburb = entry.suburb
    submittedCards.value.splice(index, 1)
}

const deleteEntry = (index) => {
    submittedCards.value.splice(index, 1)
}
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}
.list-group-item {
    padding: 10px;
}
</style>