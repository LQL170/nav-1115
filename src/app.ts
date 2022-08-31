import { defineComponent, onMounted, ref } from "vue";
import { getData } from "@/data";
import { VCard, VTheme } from "@/components";

import type { Data } from "@/data";

export const setup = defineComponent({
  components: {
    VCard,
    VTheme
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
