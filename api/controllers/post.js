import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Obtener posts (del usuario o del feed)
export const getPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const userId = req.query.userId;
    console.log("UserID recibido:", userId);

    const query =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, u.user_name, u.user_profile_img 
               FROM poststable AS p 
               JOIN usertable AS u ON u.id = p.user_id 
               WHERE p.user_id = ? 
               ORDER BY p.post_creation_time DESC`
        : `SELECT p.*, u.id AS userId, u.user_name, u.user_profile_img 
               FROM poststable AS p 
               JOIN usertable AS u ON u.id = p.user_id 
               LEFT JOIN userrelationshiptable AS r 
               ON p.user_id = r.followeduserid AND r.followeruserid = ? 
               WHERE r.followeruserid IS NULL OR p.user_id = ? 
               ORDER BY p.post_creation_time DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    const conn = await db.getConnection();
    const rows = await conn.query(query, values);
    conn.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error en getPosts:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Crear un nuevo post
export const addPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const userQuery = "SELECT user_fullname FROM usertable WHERE id = ?";
    const [user] = await conn.query(userQuery, [userInfo.id]);

    if (!user) {
      conn.release();
      return res.status(404).json({ error: "User not found!" });
    }

    const postQuery =
      "INSERT INTO poststable (`post_desc`, `img`, `post_creation_time`, `user_id`, `user_fullname`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.post_desc,
      req.body.img,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      user.user_fullname,
    ];

    await conn.query(postQuery, values);
    conn.release();

    return res.status(200).json({ message: "Post has been created!" });
  } catch (err) {
    console.error("Error en addPost:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Eliminar un post
export const deletePost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const query = "DELETE FROM poststable WHERE `post_id`=? AND `user_id`=?";
    const conn = await db.getConnection();
    const result = await conn.query(query, [req.params.id, userInfo.id]);
    conn.release();

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Post has been deleted!" });
    } else {
      return res.status(403).json({ error: "You can delete only your post" });
    }
  } catch (err) {
    console.error("Error en deletePost:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
