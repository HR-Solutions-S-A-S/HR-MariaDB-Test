import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const searchByUserName = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not logged in!" });

    try {
        const userInfo = jwt.verify(token, "secretkey");

        const query = `
            SELECT ut.*, st.student_cgpa
            FROM usertable ut
            LEFT JOIN studenttable st ON ut.user_if_student_id = st.student_id
            WHERE ut.user_fullname LIKE ?
        `;

        const conn = await db.getConnection(); // Obtener conexión del pool
        const rows = await conn.query(query, [req.params.search + "%"]);
        conn.release(); // Liberar conexión

        return res.status(200).json(rows);
    } catch (err) {
        console.error("Error en searchByUserName:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
