// import mysql from "serverless-mysql";

// export const conn = mysql({
//   config: {
//     host: process.env.MYSQLHOST,
//     user: process.env.USUARIOMYSQL,
//     password: process.env["CONTRASEÑA MYSQL"],
//     port: parseInt(process.env.MYSQLPUERTO),
//     database: process.env["BASE DE DATOS MYSQL"],
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// });

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   port: process.env.MYSQL_PORT,
//   database: process.env.MYSQL_DATABASE,
// });

// connection.connect((error) => {
//   if (error) {
//     console.error("Error al conectar a la base de datos:", error);
//   } else {
//     console.log("Conexión exitosa a la base de datos.");
//   }
//   connection.end(); // Cierra la conexión después de probarla
// });

import mysql from "mysql2/promise"; // Importa la versión promise de mysql2

// Configuración de la conexión
export const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },

  // No es necesario configurar ssl cuando usas mysql2 con conexiones locales
});

try {
  // Intenta conectarse a la base de datos
  await conn.connect();
  console.log("Conexión exitosa a la base de datos.");
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
}

// import mysql from "serverless-mysql";

// export const conn = mysql({
//   config: {
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     port: parseInt(process.env.MYSQL_PORT),
//     database: process.env.MYSQL_DATABASE,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// });

// // Conexión exitosa
// conn
//   .connect()
//   .then(() => {
//     console.log("Conexión exitosa a la base de datos.");
//   })
//   .catch((error) => {
//     console.error("Error al conectar a la base de datos:", error);
//   });
