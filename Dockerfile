# Используем легковесный образ nginx
FROM nginx:alpine

# Копируем статические файлы
COPY . /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
