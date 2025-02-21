import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ?";

  await db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLike = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    const userInfo = jwt.verify(token, "secretkey");
    if (!userInfo) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?, ?)";
    const values = [userInfo.id, req.body.postId];

    await db.query(q, values);

    return res.status(200).json("Post has been liked.");
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const deleteLike = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    const userInfo = jwt.verify(token, "secretkey");
    if (!userInfo) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    const values = [userInfo.id, req.query.postId];

    await db.query(q, values);

    return res.status(200).json("Post has been disliked.");
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
