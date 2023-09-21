<template>
  <div class="container">
    <h1>Dashboard</h1>
    <p>Aqui estao alguns dados da nossa base de filmes</p>

    <div class="charts-container">
      <div class="chart-data">
        <div class="category-title">Filmes de terror com o passar dos anos</div>
        <div class="chart-container">
          <div ref="chartdiv" class="chart"></div>
        </div>
      </div>
      <div class="chart-data">
        <div class="category-title">Percentual de categorias</div>
        <div class="chart-container">
          <div ref="chartdivpie" class="chart"></div>
        </div>
      </div>
      <div class="chart-data">
        <div class="category-title">Media da nota durante os anos</div>
        <div class="chart-container">
          <div ref="chartdivline" class="chart"></div>
        </div>
      </div>
      <div class="chart-data">
        <div class="category-title">Percentual de continentes</div>
        <div class="chart-container">
          <div ref="chartdivstacked" class="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, watchEffect, ref } from 'vue'
import { createBarChart, updateChart } from '../services/barChart.service'
import { createPieChart } from '../services/pieChart.service'
import { createLineChart } from '../services/lineChart.service'
import { createStackedChart } from '../services/stackedChart.service'
import { movieSubject } from '../stores/movieStore'

const chartdiv = shallowRef(null)
const chartdivpie = shallowRef(null)
const chartdivline = shallowRef(null)
const chartdivstacked = shallowRef(null)
const movies = ref([])
const loading = ref(true)

function contarFilmesPorAno(data: any[]) {
  const filmesPorAno = {}

  for (const filme of data) {
    const ano = filme.startYear
    const generos = filme.genres.split(',')

    if (generos.includes('Horror')) {
      if (!filmesPorAno[ano]) {
        filmesPorAno[ano] = 1
      } else {
        filmesPorAno[ano]++
      }
    }
  }

  const resultado = Object.keys(filmesPorAno).map((ano) => ({
    ano,
    filmes_terror: filmesPorAno[ano]
  }))
  return resultado
}

const getMoviesFromStore = () => {
  const subscription = movieSubject.subscribe((newMovies) => {
    movies.value = newMovies
    loading.value = false
  })

  watchEffect(() => {
    return () => {
      subscription.unsubscribe()
    }
  })
}

onMounted(() => {
  getMoviesFromStore()

  createBarChart(chartdiv.value)
  createPieChart(chartdivpie.value)
  createLineChart(chartdivline.value)
  createStackedChart(chartdivstacked.value)

  updateChart(contarFilmesPorAno(movies.value))
})
</script>

<style scoped>
.container {
  padding: 24px;
}
.charts-container {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.category-title{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.chart-data {
  width: 560px;
  height: 300px;
  margin-bottom: 56px;
}
.chart {
  width: 100%;
  height: 300px;
}
</style>
