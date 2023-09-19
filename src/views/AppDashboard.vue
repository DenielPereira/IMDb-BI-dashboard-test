<template>
  <v-container>
    <h1>
      Bem vindo(a), <strong class="first-name">{{ firstName }}</strong
      >!
    </h1>
    <h3>Aqui estão as principais cotações de moedas atualizadas.</h3>
    <div class="cards">
      <v-card class="card" variant="tonal" v-for="(currency, key) in filteredCurrencies" :key="key">
        <v-card-title>{{ key }}</v-card-title>
        <v-card-subtitle>{{ currency.name }}</v-card-subtitle>
        <v-card-text>
          <p>
            Compra: <strong>{{ formatCurrency(currency.buy) }}</strong>
          </p>
          <p>
            Venda: <strong>{{ formatCurrency(currency.sell) || '?' }}</strong>
          </p>
          <p>
            Variação:
            <strong :class="currency.variation > 0 ? 'text-green' : 'text-red'">
              {{ (currency.variation).toFixed(2) }}%
            </strong>
          </p>
        </v-card-text>
      </v-card>
    </div>
    <div class="chart">
      <ChartComponent />
    </div>
  </v-container>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
    {{ snackbar.message }}
  </v-snackbar>
</template>
<script setup>
import { ref, computed } from 'vue'
import * as DashboardService from '@/services/dashboard.service'
import ChartComponent from '@/components/ChartComponent.vue'

const snackbar = ref({
  show: false,
  color: 'error',
  timeout: 3000
})
const currencies = ref('')
const user = ref('')
const firstName = ref('')

const getCurrencies = async () => {
  try {
    const response = await DashboardService.currencies()
    currencies.value = response.results.currencies
  } catch (error) {
    showSnackbar('Ocorreu um erro, tente novamente mais tarde.')
    console.error(error)
  }
}

getCurrencies()

const getUser = () => {
  user.value = JSON.parse(localStorage.getItem('userAuthenticated'))
}

getUser()

const getUserFirstName = () => {
  firstName.value = user.value.name.split(' ')[0]
  return firstName
}

getUserFirstName()

const filteredCurrencies = computed(() => {
  return Object.fromEntries(Object.entries(currencies.value).filter(([key]) => key !== 'source'))
})

const showSnackbar = (message) => {
  snackbar.value.message = message
  snackbar.value.show = true
}

function formatCurrency(value) {
  if (!value) {
    return value
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
</style>
