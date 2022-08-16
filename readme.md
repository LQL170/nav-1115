## docker-compose.yml

```yml
version: "3.9"
services:
  aaaa:
    image: liqiling/nav-1115
    restart: always
    volumes:
      - public/conf:/app/dist/conf
    ports:
      - 3000:80
```

## menu

```
|- conf
  |- icon
    |- baidu.png
  |- data.json
```
