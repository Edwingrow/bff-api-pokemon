<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# BFF-API-POKEMON

## 📝 Requerimientos básicos

- Node.js v 20.15.0 o superior
- YARN v1.22.22 o superior
- NPM v10.9.0 o superior
- Docker v27.3.1 o superior

## 🛠 Levantar proyecto de forma local

1. Clonar repositorio
2. Instalar dependencias con yarn install
3. clonar archivo `.env.example `y renombrar a .env
4. Configurar variables de entorno
5. Levantar base de datos de redis con docker-compose up -d
6. Levantar servidor con yarn start:dev
8. Ver la documentación en la carpeta docs


#### 📚 Swagger
El proyecto incluye swagger para documetación de los endpoints.
[URL Pública](http://localhost:3000/public/api/v1)

## 🐳 Docker
El proyecto cuenta con un archivo "docker-compose.yml" para levantar la base de datos de redis. Actualmente no cuenta con un archivo Dockerfile para levantar la aplicación en entorno de producción.