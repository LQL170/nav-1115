<template>
  <div class="wrap mx-auto p-4">
    <div class="py-4 first:pt-0" v-for="item in data.data">
      <div
        class="title mb-4 inline-block rounded bg-gradient-to-r from-primary to-blue-500 bg-clip-text py-1 text-xl font-bold text-white"
      >
        {{ item.role }}
      </div>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <v-card
          class="card block w-full cursor-pointer break-inside-avoid rounded transition-all duration-300 hover:scale-105 hover:shadow-lg"
          v-for="(card, i) in item.list"
          :key="i"
          :card="card"
        ></v-card>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.wrap {
  max-width: 1200px;
  width: 100%;
  .title {
    -webkit-text-fill-color: transparent;
  }
  .card {
    background-color: var(--white-soft);
    border: 1px solid var(--white-soft);
  }
}
</style>

<script lang="ts">
import { setup } from "./app";
export default setup;
</script>
