<template>
  <div class="login-page">
    <Transition>
      <div class="form-container" v-if="signIn">
        <SignIn @signUpClick="signUp" />
      </div>
    </Transition>
    <div class="form-helper"></div>
    <Transition>
      <div class="form-container" v-if="!signIn">
        <SignUp @signUpClick="signUp" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

const signIn = ref(true)

const signUp = () => {
  signIn.value = !signIn.value
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: width .3s, opacity .2s;
  width: 50% !important;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  width: 0% !important;
}

.login-page {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
}
.form-container {
  width: 50%;
  padding: 16px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form-helper {
  background: #6900f2;
  background: linear-gradient(150deg, rgba(105, 0, 242, 1) 0%, rgba(105, 15, 189, 1) 100%);
  height: 100%;
  width: 50%;
  border-radius: 30px;
}
</style>
