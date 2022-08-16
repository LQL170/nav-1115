import { defineComponent, onMounted, ref } from "vue";
import { getData } from "@/data";
import type { Data } from "@/data";

import VCard from "@/components/card/index.vue";

export const setup = defineComponent({
  components: {
    VCard,
  },
  setup() {
    const data = ref<Data>({ data: [] });

    onMounted(async () => {
      data.value = await getData();
    });

    return {
      data,
    };
  },
});
