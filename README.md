# Muxi Pass Frontend

# Development

- node.js 16
- yarn

```bash
yarn install
yarn start
```
## Build

```bash
yarn build
```

使用docker进行部署,二阶段打包成静态文件并用nginx-alpine进行代理,极大地压缩了镜像的体积和运行成本.