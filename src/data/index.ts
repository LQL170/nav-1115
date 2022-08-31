interface CardItem {
  name: string;
  desc: string;
  url: string;
  icon?: string;
}

interface Cards {
  role: string;
  list: CardItem[];
}

interface Conf {
  title: string;
}

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

/** 配置设置 */
function handleConf(conf?: Conf) {
  if (conf?.title) {
    document.title = conf.title;
  }
}

export async function getData() {
  const res = await fetch("/conf/data.json");
  const data: Data = await res.json();
  handleConf(data.config);
  data.data.forEach(({ list }) => {
    list.forEach((item) => {
      if (item.icon) {
        item.icon = handleUrl(item.icon);
      }
    });
  });
  return data;
}
