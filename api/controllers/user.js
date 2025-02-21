import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    const userId = req.params.userId;
    let conn;
    
    try {
        conn = await db.getConnection(); // Obtener conexión
        const q = "SELECT * FROM usertable WHERE id=?";
        const rows = await conn.query(q, [userId]);

        if (rows.length === 0) {
            conn.release();
            return res.status(404).json({ message: "User not found" });
        }

        const { user_password, ...info } = rows[0]; // Excluir la contraseña
        conn.release();
        return res.json(info);
    } catch (err) {
        if (conn) conn.release();
        console.error("Error en getUser:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not authenticated!" });

    try {
        const userInfo = jwt.verify(token, "secretkey");
        const userId = req.params.userId;

        // Solo el usuario propietario puede actualizar su perfil
        if (parseInt(userInfo.id) !== parseInt(userId)) {
            return res.status(403).json({ error: "You can update only your profile!" });
        }

        const conn = await db.getConnection();

        // Verificar si el usuario existe
        const checkUserQuery = "SELECT id FROM usertable WHERE id=?";
        const [existingUser] = await conn.query(checkUserQuery, [userId]);

        if (!existingUser) {
            conn.release();
            return res.status(404).json({ error: "User not found" });
        }

        // Actualizar el usuario
        const updateQuery = `
            UPDATE usertable 
            SET user_fullname=?, user_city=?, user_website=?, user_profile_img=?, user_cover_img=?
            WHERE id=?
        `;

        const result = await conn.query(updateQuery, [
            req.body.user_fullname,
            req.body.user_city,
            req.body.user_website,
            req.body.user_profile_img,
            req.body.user_cover_img,
            userId
        ]);

        conn.release();

        if (result.affectedRows > 0) {
            return res.json({ message: "Profile updated successfully!" });
        } else {
            return res.status(400).json({ error: "No changes were made" });
        }
    } catch (err) {
        console.error("Error en updateUser:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
