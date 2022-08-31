<template>
  <a target="_blank" class="p-6 " :href="card.url">
    <div class="icon mb-4 inline-block h-16 rounded p-2">
      <img :src="card.icon" v-if="card.icon" class="h-full max-w-full" />
      <div class="flex h-full items-center px-1 text-xl font-bold" v-else>
        <span>{{ card.name.toUpperCase() }}</span>
      </div>
    </div>
    <div class="flex w-full items-center pl-1">
      <div>
        <div class="mb-4 text-lg font-bold opacity-80" v-if="card.icon">
          {{ card.name }}
        </div>
        <div class="info h-14 leading-6 opacity-75 line-clamp-2">
          {{ card.desc }}
        </div>
      </div>
    </div>
  </a>
</template>

<style lang="postcss" scoped>
.icon {
  background-color: var(--gray-light);
}
.info {
  color: var(--text-light);
}
</style>

<script lang="ts">
import { setup } from ".";
export default setup;
</script>
