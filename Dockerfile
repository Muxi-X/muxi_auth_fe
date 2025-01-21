# 第一阶段：构建阶段
FROM node:16 AS builder

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖并构建静态文件
RUN yarn install
RUN yarn build

# 第二阶段：最终镜像
FROM nginx:1.27.3-alpine


# 复制构建完成的静态文件到 Nginx 的公共目录
COPY --from=builder /app/build /usr/share/nginx/html

# 暴露 Nginx 的默认端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]