export interface CardItem {
  name: string;
  desc: string;
  url: string;
  icon?: string;
}

export interface Cards {
  role: string;
  list: CardItem[];
}

export interface Conf {}

export interface Data {
  data: Cards[];
  config?: Conf;
}

const urls = ["data:image", "https", "http"];

function handleUrl(name: string) {
  if (urls.some((x) => name.startsWith(x))) {
    return name;
  }
  return `/conf/icon/${name}`;
}

export async function getData() {
  const res = await fetch("/conf/data.json");
  const data: Data = await res.json();
  data.data.forEach(({ list }) => {
    list.forEach((item) => {
      if (item.icon) {
        item.icon = handleUrl(item.icon);
      }
    });
  });
  return data;
}
