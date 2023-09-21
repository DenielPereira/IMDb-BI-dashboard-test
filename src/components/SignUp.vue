<template>
  <h1>Crie sua conta!</h1>
  <h4>Preencha todos os campos:</h4>
  <form @submit="handleSignUp">
    <v-text-field
      class="rounded-md mb-5"
      label="Nome completo"
      v-model="userName"
      variant="outlined"
      :error-messages="errorMessage"
    />
    <v-text-field
      class="rounded-md mb-5"
      label="Email"
      v-model="email"
      type="email"
      variant="outlined"
      :error-messages="errorMessage"
    />
    <v-text-field
      class="rounded-md"
      label="Escolha uma senha"
      v-model="password"
      type="password"
      variant="outlined"
      :error-messages="errorMessage"
    />
    <v-btn type="submit" class="button" size="large">Cadastrar</v-btn>
    <div class="create-account text-center mt-5">
      <p>Já tem uma conta? <a href="#" @click="signUp">Entre aqui!</a></p>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { generateToken, setAuthData } from '@/auth/authUtils'

const router = useRouter()
const email = ref('')
const password = ref('')
const userName = ref('')
const errorMessage = ref('')

const emit = defineEmits(['signUpClick'])

const signUp = () => {
  emit('signUpClick')
}

const checkIfEmailExists = (email) => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || []

  return storedUsers.some((user) => user.email === email)
}

const checkIfIsNotEmpty = (value) => {
  return value !== ''
}

function login(user) {
  const token = generateToken(user)
  const expiration = new Date()

  expiration.setHours(expiration.getHours() + 1)
  setAuthData(token, expiration)
  router.push('/dashboard')
}

const handleSignUp = (event) => {
  event.preventDefault()

  const user = {
    name: userName.value,
    email: email.value,
    password: btoa(password.value)
  }

  if (checkIfEmailExists(user.email)) {
    errorMessage.value = 'Este e-mail já está cadastrado'
    return
  }

  if (
    !checkIfIsNotEmpty(user.name) ||
    !checkIfIsNotEmpty(user.email) ||
    !checkIfIsNotEmpty(user.password)
  ) {
    errorMessage.value = 'Preencha todos os campos'
    return
  }

  try {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    storedUsers.push(user)
    localStorage.setItem('users', JSON.stringify(storedUsers))
    login(user)
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error)
  }
}
</script>

<style scoped>
.button {
  background-color: #6900f2;
  color: white;
}
form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: 60%;
}
</style>
