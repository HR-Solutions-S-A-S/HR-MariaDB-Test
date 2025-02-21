import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Obtener los likes de un post
export const getLikes = async (req, res) => {
  try {
    const conn = await db.getConnection();
    const query = "SELECT user_id FROM likestable WHERE post_id = ?";
    const rows = await conn.query(query, [req.query.post_id]);
    conn.release();

    return res.status(200).json(rows.map((like) => like.user_id));
  } catch (err) {
    console.error("Error en getLikes:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Dar like a un post
export const addLike = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const query = "INSERT INTO likestable (`user_id`,`post_id`) VALUES (?, ?)";
    await conn.query(query, [userInfo.id, req.body.post_id]);
    conn.release();

    return res.status(200).json({ message: "Post has been liked!" });
  } catch (err) {
    console.error("Error en addLike:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Quitar like de un post
export const deleteLike = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const query =
      "DELETE FROM likestable WHERE `user_id` = ? AND `post_id` = ?";
    await conn.query(query, [userInfo.id, req.query.post_id]);
    conn.release();

    return res.status(200).json({ message: "Post has been disliked!" });
  } catch (err) {
    console.error("Error en deleteLike:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
