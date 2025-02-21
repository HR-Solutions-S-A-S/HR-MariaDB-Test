import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Crear un anuncio
export const createAnnouncement = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const query = `
            INSERT INTO announcementtable (announcement_content, announcement_creation_time, announcement_title, user_id) 
            VALUES (?, ?, ?, ?)
        `;

    const values = [
      req.body.announcement_content,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      req.body.announcement_title,
      userInfo.id,
    ];

    await conn.query(query, values);
    conn.release();

    return res.status(200).json({ message: "Announcement has been created!" });
  } catch (err) {
    console.error("Error en createAnnouncement:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Obtener todos los anuncios
export const getAllAnnouncements = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const query = `
            SELECT a.announcement_id, a.announcement_content, a.announcement_creation_time, 
                   a.announcement_title, a.user_id, u.user_fullname, u.user_profile_img 
            FROM announcementtable a 
            INNER JOIN usertable u ON a.user_id = u.id 
            ORDER BY a.announcement_creation_time DESC
        `;

    const [rows] = await conn.query(query);
    conn.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error en getAllAnnouncements:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Eliminar un anuncio
export const deleteOneAnnouncement = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");
    const announcementId = req.params.id;

    const conn = await db.getConnection();

    // Verificar si el anuncio existe y pertenece al usuario autenticado
    const checkQuery =
      "SELECT user_id FROM announcementtable WHERE announcement_id = ?";
    const [checkData] = await conn.query(checkQuery, [announcementId]);

    if (checkData.length === 0) {
      conn.release();
      return res.status(404).json({ error: "Announcement not found" });
    }

    if (checkData[0].user_id !== userInfo.id) {
      conn.release();
      return res
        .status(403)
        .json({
          error: "You do not have permission to delete this announcement",
        });
    }

    // Eliminar el anuncio
    const deleteQuery =
      "DELETE FROM announcementtable WHERE announcement_id = ?";
    await conn.query(deleteQuery, [announcementId]);
    conn.release();

    return res.status(200).json({ message: "Announcement has been deleted!" });
  } catch (err) {
    console.error("Error en deleteOneAnnouncement:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
