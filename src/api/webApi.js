import axios from 'axios'

export const MoviesAPI = axios.create({
  baseURL: 'http://localhost:3000',
})

export const MoviesPosterAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search/movie?',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGFhYjJmZDJjOGRlYTgxNDJkNmRhZTUzNjgyODkxZCIsInN1YiI6IjY1MDkwYzdlM2NkMTJjMDBlYjQ1ZTFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.44X-1GUrXYLYXAOmo7N0G_AKl6ToF_Ww93N3z8O34rI'
  }
})

export default {
  MoviesAPI,
  MoviesPosterAPI,
}
