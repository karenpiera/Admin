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

import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
