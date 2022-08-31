import { getKeys } from "@m170/utils/b-utils";
import { computed, ref } from "vue";
import type { Ref, ComputedRef } from "vue";
import type { Theme } from "@/types";

type Func = (...items: any[]) => any;
type RefWrap<T extends Record<string, any>> = {
  [key in keyof T]: Ref<T[key]>;
};
type ComputedRefWrap<T extends Record<string, any>> = {
  [key in keyof T]: ComputedRef<ReturnType<T[key]>>;
};
type Store<
  State extends Record<string, any>,
  Actions extends Record<string, Func>,
  Getters extends Record<string, Func>
> = {
  state?: State;
  actions?: Actions &
    ThisType<RefWrap<State> & ComputedRefWrap<Getters> & Actions>;
  getters?: Getters &
    ThisType<RefWrap<State> & ComputedRefWrap<Getters> & Actions>;
};

const key = Symbol();
const error = new Error("store 键值重复");

function initStore<
  State extends Record<string, any>,
  Actions extends Record<string, Func>,
  Getters extends Record<string, Func>
>({
  state,
  actions,
  getters,
}: Store<State, Actions, Getters>): RefWrap<State> &
  ComputedRefWrap<Getters> &
  Actions & { $clear: () => void } {
  if (!(globalThis as any)[key]) {
    const store = {} as any;
    if (state) {
      getKeys(state).forEach((x) => {
        if (store[x]) {
          throw error;
        }
        store[x] = ref(state[x]);
      });
    }
    if (getters) {
      getKeys(getters).forEach((x) => {
        if (store[x]) {
          throw error;
        }
        store[x] = computed(getters[x].bind(store));
      });
    }
    if (actions) {
      getKeys(actions).forEach((x) => {
        if (store[x]) {
          throw error;
        }
        store[x] = actions[x].bind(store);
      });
      store["$clear"] = () => {
        if (state) {
          getKeys(state).forEach((x) => {
            store[x].value = state[x];
          });
        }
      };
    }
    (globalThis as any)[key] = store;
  }
  return (globalThis as any)[key];
}

export const store = initStore({
  state: {
    theme: "light" as Theme,
  },
});
