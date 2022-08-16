<template>
  <a target="_blank" class="p-6" :href="card.url">
    <div class="icon mb-3 inline-block h-12 rounded p-2">
      <img :src="card.icon" v-if="card.icon" class="h-full max-w-full" />
      <div class="flex h-full items-center px-1 font-bold text-lg" v-else>
        <span>{{ card.name.toUpperCase() }}</span>
      </div>
    </div>
    <div class="flex w-full items-center pl-2">
      <div>
        <div class="font-bold opacity-80">{{ card.name }}</div>
        <div class="info h-14 pt-2 leading-6 opacity-75 line-clamp-2">
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
