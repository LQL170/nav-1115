import { getKeys } from "@m170/utils/b-utils";
import { defineAsyncComponent } from "vue";
import { _icons } from "./icons";
import type { KebabCase } from "@m170/types";
import type { Icon as Component } from "@icon-park/vue-next/es/runtime/index";

export interface IconOption {
  theme: "outline" | "filled" | "two-tone" | "multi-color";
  size: number | string;
  spin: boolean;
  fill: string | string[];
  strokeLinecap: "butt" | "round" | "square";
  strokeLinejoin: "miter" | "round" | "bevel";
  strokeWidth: number;
}

export type _Icon = KebabCase<keyof typeof _icons>;

function getKeyBase(str: string) {
  if (str) {
    return `${str[0].toLowerCase()}${str.slice(1).replace(/[A-Z]/g, (e) => {
      return `-${e.toLowerCase()}`;
    })}` as _Icon;
  }
  return str as _Icon;
}

export type Icon = _Icon | `${_Icon}#${IconOption["theme"]}`;

export const icons = (() => {
  const temp = {} as Record<_Icon, Component>;
  getKeys(_icons).forEach((x) => {
    temp[getKeyBase(x)] = defineAsyncComponent({
      loader: _icons[x] as unknown as () => Promise<Component>,
    });
  });
  return temp;
})();
