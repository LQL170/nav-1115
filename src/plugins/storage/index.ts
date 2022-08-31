import { getNow } from "@m170/utils/b-utils";
import { Theme } from "@/types";

interface Data<T> {
  data: T;
  expire?: number;
}

/** 缓存有效时间 */
interface Options {
  duration?: number;
}

function parse<T>(data: any, callback?: () => void): T | null {
  try {
    return JSON.parse(data);
  } catch (error) {
    callback?.();
    return null;
  }
}

class StorageSyncInit<Initial extends Record<string, any>> {
  private client: Storage;
  private initial: Initial;
  constructor(
    initial: Initial,
    type: "sessionStorage" | "localStorage" = "localStorage"
  ) {
    this.client = globalThis[type];
    this.initial = initial as any;
  }
  get<Key extends keyof Initial>(key: Key) {
    const val = (() => {
      const _val = this.client.getItem(key as string);
      return _val === null
        ? null
        : parse<Data<Initial[Key]>>(_val, () => {
            this.set(key, null);
          });
    })();
    if (val && (!val.expire || val.expire > getNow())) {
      return val.data;
    }
    return this.initial[key];
  }
  set<Key extends keyof Initial>(
    key: Key,
    value: Initial[Key] | null,
    option?: Options
  ) {
    if (value === null) {
      this.client.removeItem(key as string);
    } else {
      const data: Data<Initial[Key]> = {
        data: value,
      };
      if (option?.duration) {
        data.expire = getNow() + option.duration;
      }
      this.client.setItem(key as string, JSON.stringify(data));
    }
  }
  clear() {
    this.client.clear();
  }
}

export const storage = new StorageSyncInit({
  theme: "light" as Theme,
});
