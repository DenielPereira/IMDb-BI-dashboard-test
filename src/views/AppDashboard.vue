<template>
  <v-container>
    <h1>Bem vindo <b>{{ firstName }}</b>!</h1>
    <h3>
      Aqui estão <strong>{{ movies.length }}</strong> filmes que você pode gostar:
    </h3>
    <v-icon icon="mdi-loading" class="spin" v-if="loading" size="x-large"></v-icon>
    <div class="cards" v-if="!loading">
      <template v-for="(movie, key) in movies" :key="key">
        <div v-if="movie.poster">
          <v-card class="card" variant="tonal" width="200">
            <v-img :src="movie.poster" height="200" cover></v-img>
            <v-card-title>{{ movie.title }}</v-card-title>
            <v-card-subtitle>{{ movie.genres }}</v-card-subtitle>
            <v-card-text>
              <p><strong>Nota:</strong> {{ movie.averageRating }}</p>
            </v-card-text>
          </v-card>
        </div>
      </template>
    </div>
  </v-container>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
    {{ snackbar.message }}
  </v-snackbar>
</template>
<script setup lang="">
import { ref, onMounted } from 'vue'
import * as DashboardService from '@/services/dashboard.service'
import { updateMovies } from '../stores/movieStore.ts'

const snackbar = ref({
  show: false,
  color: 'error',
  timeout: 3000
})
const movies = ref([])
const user = ref('')
const firstName = ref('')
const loading = ref(false)

onMounted(() => {
  getUser()
  getUserFirstName()
  getMovies()
})

const getMovies = async () => {
  try {
    loading.value = true
    const response = await DashboardService.getMovies()
    movies.value = response.slice(0, 200)
    updateMovies(movies.value)
    await Promise.all(
      movies.value.map(async (movie) => {
        movie.poster = await getMoviePoster(movie.title)
      })
    )
  } catch (error) {
    showSnackbar('Ocorreu um erro, tente novamente mais tarde.')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const getMoviePoster = async (movieName) => {
  try {
    const response = await DashboardService.getPoster(movieName)
    for (const result of response.results) {
      if (result.poster_path !== null) {
        return `https://image.tmdb.org/t/p/w500${result.poster_path}`
      }
      if (result.backdrop_path !== null) {
        return `https://image.tmdb.org/t/p/w500${result.backdrop_path}`
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const getUser = () => {
  user.value = JSON.parse(localStorage.getItem('userAuthenticated'))
}

const getUserFirstName = () => {
  firstName.value = user.value.name.split(' ')[0]
  return firstName
}

const showSnackbar = (message) => {
  snackbar.value.message = message
  snackbar.value.show = true
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin-top: 1em;
  margin-right: 1em;
  min-width: 150px;
  cursor: pointer;
}
.card p {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.first-name {
  color: #6900f2;
}

.spin {
  animation: spin 2s linear infinite;
  font-size: 40px;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
