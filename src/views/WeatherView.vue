<template>
    <div class="container">
        <div class="header">
            <h1>WEATHER APP</h1>
            <div class="search-bar">
                <input
                    type="text"
                    v-model="city"
                    placeholder="Enter city name"
                    class="search-input"
                    @keyup.enter="searchByCity"
                />
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
        </div>

        <main>
            <p v-if="error">{{ error }}</p>
            <div v-if="weatherData">
                <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
                <div>
                    <img :src="iconUrl" alt="Weather Icon" />
                    <p>{{ temperature }} °C</p>
                </div>
                <span>{{ weatherData.weather[0].description }}</span>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apikey = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const city = ref('')
const weatherData = ref(null)
const error = ref(null)

// units=metric makes the API return Celsius, so no manual conversion is needed
const temperature = computed(() => {
    return weatherData.value ? Math.round(weatherData.value.main.temp) : null
})

const iconUrl = computed(() => {
    return weatherData.value
        ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
        : null
})

// Weather for the browser's current location
const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
        error.value = 'Geolocation is not supported by this browser.'
        return
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const response = await axios.get(baseUrl, {
                    params: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        units: 'metric',
                        appid: apikey
                    }
                })
                weatherData.value = response.data
                error.value = null
            } catch (err) {
                error.value = 'Could not load the weather for your location.'
                console.error(err)
            }
        },
        () => {
            error.value = 'Location access was denied. Search by city instead.'
        }
    )
}

// Weather for a typed city, e.g. "Clayton, AU"
const searchByCity = async () => {
    if (!city.value.trim()) return
    try {
        const response = await axios.get(baseUrl, {
            params: {
                q: city.value,
                units: 'metric',
                appid: apikey
            }
        })
        weatherData.value = response.data
        error.value = null
    } catch (err) {
        weatherData.value = null
        error.value = 'City not found. Try a format like "Clayton, AU".'
        console.error(err)
    }
}

onMounted(() => {
    getCurrentLocationWeather()
})
</script>