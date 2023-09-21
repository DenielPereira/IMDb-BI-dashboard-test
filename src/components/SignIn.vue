<template>
  <h1>Seja bem-vindo!</h1>
  <h4>Faça login para continuar</h4>
  <h3 class="error-message mt-5 text-error" v-if="loginError">E-mail ou senha incorretos!</h3>
  <form @submit="handleLogin">
    <v-text-field
      class="rounded-md mb-5"
      label="Email"
      v-model="email"
      type="email"
      variant="outlined"
      :error="loginError"
    />
    <v-text-field
      class="rounded-md"
      label="Password"
      v-model="password"
      type="password"
      variant="outlined"
      :error="loginError"
    />
    <v-btn type="submit" class="button" size="large">Entrar</v-btn>
    <div class="create-account text-center mt-5">
      <p>Não tem uma conta? <a href="#" @click="signUp">Crie uma!</a></p>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { generateToken, setAuthData } from '@/auth/authUtils'

const emit = defineEmits(['signUpClick'])
const router = useRouter()

const email = ref('')
const password = ref('')
const loginError = ref(false)

const signUp = () => {
  emit('signUpClick')
}

const handleLogin = (event) => {
  event.preventDefault()

  const storedUsers = JSON.parse(localStorage.getItem('users')) || []
  const user = storedUsers.find(
    (user) => user.email === email.value && user.password === btoa(password.value)
  )

  if (user) {
    const token = generateToken(user)
    const expiration = new Date()

    expiration.setHours(expiration.getHours() + 1)
    setAuthData(token, expiration)

    router.push('/dashboard')
  } else {
    loginError.value = true
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
