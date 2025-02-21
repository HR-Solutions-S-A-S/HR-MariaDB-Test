import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Obtener comentarios de un post
export const getComments = async (req, res) => {
  try {
    const conn = await db.getConnection();
    const query = `
            SELECT c.*, u.id AS userId, u.user_name, u.user_profile_img 
            FROM commentstable AS c 
            JOIN usertable AS u ON u.id = c.user_id
            WHERE c.post_id = ?
            ORDER BY c.comment_creation_time DESC
        `;

    const [rows] = await conn.query(query, [req.query.post_id]);
    conn.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error en getComments:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Agregar un comentario a un post
export const addComment = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const query = `
            INSERT INTO commentstable (comment_desc, comment_creation_time, user_id, post_id) 
            VALUES (?, ?, ?, ?)
        `;

    const values = [
      req.body.comment_desc,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.post_id,
    ];

    await conn.query(query, values);
    conn.release();

    return res.status(200).json({ message: "Comment has been created!" });
  } catch (err) {
    console.error("Error en addComment:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Eliminar un comentario
export const deleteComment = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");
    const commentId = req.params.commentId;

    const conn = await db.getConnection();

    // Verificar si el comentario existe y pertenece al usuario autenticado
    const checkQuery = "SELECT user_id FROM commentstable WHERE id = ?";
    const [checkData] = await conn.query(checkQuery, [commentId]);

    if (checkData.length === 0) {
      conn.release();
      return res.status(404).json({ error: "Comment not found" });
    }

    if (checkData[0].user_id !== userInfo.id) {
      conn.release();
      return res
        .status(403)
        .json({ error: "You don't have permission to delete this comment" });
    }

    // Eliminar el comentario
    const deleteQuery = "DELETE FROM commentstable WHERE id = ?";
    await conn.query(deleteQuery, [commentId]);
    conn.release();

    return res.status(200).json({ message: "Comment has been deleted!" });
  } catch (err) {
    console.error("Error en deleteComment:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
