import mariadb from "mariadb";

export const db = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "social",
  connectionLimit: 5, // Limitar el número de conexiones simultáneas
});

// Verificar la conexión al iniciar
db.getConnection()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });
