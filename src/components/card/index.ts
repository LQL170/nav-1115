import { defineComponent } from "vue";
import type { CardItem } from "@/data";
import type { PropType } from "vue";

export const setup = defineComponent({
  props: {
    card: {
      type: Object as PropType<CardItem>,
      required: true,
    },
  },
});
