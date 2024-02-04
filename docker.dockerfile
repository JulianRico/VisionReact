# Usa la imagen oficial de Node.js 16.20.2
FROM node:16.20.2

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /src/app

# Copia el archivo package.json e package-lock.json para aprovechar el caché de las capas de Docker
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto 3000 (o el puerto que necesites para tu aplicación React)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]