import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Crear un artículo
export const createArticle = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not logged in!" });

    try {
        const userInfo = jwt.verify(token, "secretkey");

        const conn = await db.getConnection();
        const query = `
            INSERT INTO articletable (article_content, article_creation_time, user_id, article_title) 
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            req.body.article_content,
            moment().format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.article_title
        ];

        await conn.query(query, values);
        conn.release();

        return res.status(200).json({ message: "Article has been created!" });
    } catch (err) {
        console.error("Error en createArticle:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Obtener todos los artículos
export const getAllArticles = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not logged in!" });

    try {
        const userInfo = jwt.verify(token, "secretkey");

        const conn = await db.getConnection();
        const query = `
            SELECT a.article_id, a.article_content, a.user_id, a.article_title, a.article_creation_time,
                   u.user_fullname, u.user_profile_img
            FROM articletable a
            INNER JOIN usertable u ON a.user_id = u.id
        `;

        const [rows] = await conn.query(query);
        conn.release();

        return res.status(200).json(rows);
    } catch (err) {
        console.error("Error en getAllArticles:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Eliminar un artículo
export const deleteOneArticle = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not logged in!" });

    try {
        const userInfo = jwt.verify(token, "secretkey");
        const articleId = req.params.id;

        const conn = await db.getConnection();

        // Verificar si el artículo existe y pertenece al usuario autenticado
        const checkQuery = "SELECT user_id FROM articletable WHERE article_id = ?";
        const [checkData] = await conn.query(checkQuery, [articleId]);

        if (checkData.length === 0) {
            conn.release();
            return res.status(404).json({ error: "Article not found" });
        }

        if (checkData[0].user_id !== userInfo.id) {
            conn.release();
            return res.status(403).json({ error: "You do not have permission to delete this article" });
        }

        // Eliminar el artículo
        const deleteQuery = "DELETE FROM articletable WHERE article_id = ?";
        await conn.query(deleteQuery, [articleId]);
        conn.release();

        return res.status(200).json({ message: "Article has been deleted!" });
    } catch (err) {
        console.error("Error en deleteOneArticle:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
