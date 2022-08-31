import { computed, defineComponent, h, PropType } from "vue";
import { icons, _Icon } from "./utils";
import type { Icon, IconOption } from "./utils";
import type { App } from "vue";

export type { Icon, IconOption } from "./utils";

export const VIcon = defineComponent({
  inheritAttrs: false,
  props: {
    name: {
      type: String as PropType<Icon>,
      required: true,
    },
    theme: {
      type: String as PropType<IconOption["theme"]>,
      default: () => "filled",
    },
    size: {
      type: [String, Number] as PropType<IconOption["size"]>,
      default: () => "1em",
    },
    spin: {
      type: Boolean as PropType<IconOption["spin"]>,
      default: () => false,
    },
    fill: {
      type: (String || Array) as PropType<IconOption["fill"]>,
      default: () => "currentColor",
    },
    strokeLinecap: {
      type: String as PropType<IconOption["strokeLinecap"]>,
      default: () => "round",
    },
    strokeLinejoin: {
      type: String as PropType<IconOption["strokeLinejoin"]>,
      default: () => "round",
    },
    strokeWidth: {
      type: Number as PropType<IconOption["strokeWidth"]>,
      default: () => 4,
    },
  },
  setup(props, { attrs }) {
    const conf = computed(() => {
      const [name, theme] = (props.name ?? "").split("#") as [
        _Icon,
        IconOption["theme"]?
      ];

      return {
        name,
        theme,
      };
    });

    const component = computed(() => icons[conf.value.name] ?? null);

    const handleAttrs = computed(() => {
      let style = attrs["class"] || "";
      style += " align-top";
      return Object.assign({}, attrs, {
        class: style,
      });
    });

    const handleTheme = computed(() => {
      return conf.value.theme ?? props.theme;
    });

    return {
      conf,
      component,
      handleAttrs,
      handleTheme,
    };
  },
  render() {
    const component = this.component;
    if (component) {
      const iconNode = h(component, {
        ...this.handleAttrs,
        theme: this.handleTheme,
        size: this.size,
        spin: this.spin,
        fill: this.fill,
        strokeLinecap: this.strokeLinecap,
        strokeLinejoin: this.strokeLinejoin,
        strokeWidth: this.strokeWidth,
        name: this.name,
      });
      return iconNode;
    }
    return h("div", {}, `ICON[${this.name}]`);
  },
});

export const icon = {
  install(app: App) {
    app.component("v-icon", VIcon);
  },
};
