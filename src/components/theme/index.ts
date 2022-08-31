import { defineComponent, h, computed } from "vue";
import { toggleTheme, store } from "@/plugins";
import { Icon } from "../icon";
import { VIcon } from "../icon";
import type { Theme } from "@/types";

export const VTheme = defineComponent({
  setup() {
    type Item = {
      icon: Icon;
      model: Theme;
    };

    const data: Item[] = [
      {
        icon: "sun#outline",
        model: "light",
      },
      {
        icon: "dark-mode",
        model: "dark",
      },
    ];

    const theme = store.theme;

    const toggle = () => {
      theme.value = theme.value === "dark" ? "light" : "dark";
      toggleTheme(theme.value);
    };

    const icon = computed(
      () => data.find((x) => x.model === theme.value)!.icon
    );

    return {
      data,
      theme,
      icon,
      toggle,
    };
  },
  render() {
    return h(
      "span",
      {
        class:
          "cursor-pointer select-none inline-block p-1 rounded hover:bg-gray-100 transition-all",
        onClick: this.toggle,
      },
      this.data.map((item) => {
        return item.model === this.theme
          ? h(VIcon, {
              name: this.icon,
              size: 20,
            })
          : null;
      })
    );
  },
});
