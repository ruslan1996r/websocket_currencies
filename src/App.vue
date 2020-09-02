<template>
  <v-app>
    <div class="container">
      <v-app-bar app class="primary" outlined>
        <router-link to="/">
          <h2 class="white--text ml-4">Instruments</h2>
        </router-link>
        <router-link to="/orders">
          <h2 class="white--text ml-4">Orders</h2>
        </router-link>
      </v-app-bar>
      <v-layout class="grey lighten-4">
        <v-main class="mx-4 my-4">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-main>
      </v-layout>
    </div>
  </v-app>
</template>
<style>
a {
  text-decoration: none;
  cursor: pointer;
}
</style>