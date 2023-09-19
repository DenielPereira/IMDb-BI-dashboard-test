<template>
  <v-app>
    <v-navigation-drawer v-if="!loginRoute" app>
      <v-list class="menu-items">
        <div class="main-items">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="navigate(item.route)"
            :disabled="item.disabled"
            :active="item.active"
            color="#6900f2"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <v-list-item class="logout-item" @click="logout">
          <template v-slot:prepend>
            <v-icon :icon="logoutItem.icon"></v-icon>
          </template>
          <v-list-item-content>
            <v-list-item-title>{{ logoutItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    route: '/dashboard',
    disabled: false,
    active: true
  },
  { title: 'Conta', icon: 'mdi-account', route: '/', disabled: true, active: false },
  { title: 'Configurações', icon: 'mdi-cog', route: '/', disabled: true, active: false }
]

const logoutItem = { title: 'Sair', icon: 'mdi-exit-to-app', route: '/logout' }

const router = useRouter()
function navigate(route) {
  router.push(route)
}

const loginRoute = computed(() => {
  return router.currentRoute.value.name === 'login'
})

function logout() {
  localStorage.removeItem('expiration');
  localStorage.removeItem('token');
  localStorage.removeItem('userAuthenticated');
  router.push('/')
}
</script>

<style>
.v-field__outline__start {
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.v-field__outline__end {
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}
.v-btn {
  text-transform: none !important;
}
.menu-items {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.main-items {
  margin-top: auto;
  gap: 30px;
  display: flex;
  flex-direction: column;
}

.logout-item {
  margin-top: auto;
}
</style>
