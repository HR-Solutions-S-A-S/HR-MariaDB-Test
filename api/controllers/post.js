import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId; // Obtener el userId de la query string
  const token = req.cookies.accessToken; // Obtener el token de las cookies

  // Verifica si el token está presente
  console.log("Token:", token); // Verifica si el token está presente
  if (!token) return res.status(401).json("Not logged in!");

  // Verifica y decodifica el token
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      console.log("Token is invalid:", err); // Agrega un log para el error de token
      return res.status(403).json("Token is not valid!");
    }

    // Si todo está bien, el userInfo tendrá los datos decodificados del token
    console.log("UserInfo from token:", userInfo);

    // Si el userId no es 'undefined', usa el valor proporcionado en la query, sino usa el userId del token
    console.log("UserId from query:", userId);
    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS user_id, u.name, u.profilePic FROM posts AS p 
          JOIN users AS u ON (u.id = p.userId) 
          WHERE p.userId = ? 
          ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS user_id, u.name, u.profilePic FROM posts AS p 
          JOIN users AS u ON (u.id = p.userId)
          LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) 
          WHERE r.followerUserId = ? OR p.userId = ? 
          ORDER BY p.createdAt DESC`;

    // Si el userId está definido en la query, lo usamos; de lo contrario, usamos el userId del token
    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    // Realizamos la consulta a la base de datos
    db.query(q, values, (err, data) => {
      if (err) {
        console.log("Database error:", err); // Agrega un log en caso de error en la base de datos
        return res.status(500).json(err);
      }

      console.log("Data from DB:", data); // Verifica qué datos se están recibiendo de la base de datos

      // Retorna la respuesta con los datos obtenidos de la base de datos
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
