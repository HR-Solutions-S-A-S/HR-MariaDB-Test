import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Obtener seguidores de un usuario
export const getRelationships = async (req, res) => {
    try {
        const query = "SELECT followeruserid FROM userrelationshiptable WHERE followeduserid = ?";
        const conn = await db.getConnection();
        const rows = await conn.query(query, [req.query.followeduserid]);
        conn.release();

        return res.status(200).json(rows.map(relationship => relationship.followeruserid));
    } catch (err) {
        console.error("Error en getRelationships:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Seguir a un usuario
export const addRelationship = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not logged in!" });

    try {
        const userInfo = jwt.verify(token, "secretkey");

        const query = "INSERT INTO userrelationshiptable (`followeruserid`, `followeduserid`) VALUES (?, ?)";
        const conn = await db.getConnection();
        await conn.query(query, [userInfo.id, req.body.userId]);
        conn.release();

        return res.status(200).json({ message: "Following" });
    } catch (err) {
        console.error("Error en addRelationship:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Dejar de seguir a un usuario
export const deleteRelationship = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not logged in!" });

    try {
        const userInfo = jwt.verify(token, "secretkey");

        const query = "DELETE FROM userrelationshiptable WHERE `followeruserid` = ? AND `followeduserid` = ?";
        const conn = await db.getConnection();
        await conn.query(query, [userInfo.id, req.query.userId]);
        conn.release();

        return res.status(200).json({ message: "Unfollowed" });
    } catch (err) {
        console.error("Error en deleteRelationship:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
