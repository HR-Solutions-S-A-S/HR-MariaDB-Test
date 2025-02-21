import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("Datos recibidos:", req.body);

  let conn;
  try {
    conn = await db.getConnection(); // Obtiene una conexión del pool

    // Verificar si el usuario ya existe
    const rows = await conn.query(
      "SELECT * FROM usertable WHERE user_name = ?",
      [req.body.user_name]
    );

    if (rows.length > 0) {
      conn.release(); // Liberar conexión
      return res.status(409).json("User already exists!");
    }

    // Hashear la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.user_password, salt);

    // Insertar usuario
    const query =
      "INSERT INTO usertable (`user_name`, `user_fullname`, `user_email`, `user_occ`, `user_password`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.user_name,
      req.body.user_fullname,
      req.body.user_email,
      req.body.user_occ,
      hashedPassword,
    ];

    await conn.query(query, values);
    conn.release(); // Liberar conexión después de usarla

    console.log("Usuario creado correctamente.");
    return res.status(200).json("User has been created successfully!");
  } catch (err) {
    console.error("Error en register:", err);
    return res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  console.log("Datos recibidos en login:", req.body);
  let conn;
  try {
    conn = await db.getConnection(); // Obtener conexión

    // Buscar usuario
    const rows = await conn.query(
      "SELECT * FROM usertable WHERE user_name = ?",
      [req.body.user_name]
    );

    conn.release(); // Liberar conexión

    if (rows.length === 0) {
      return res.status(404).json("User not found!");
    }

    // Comparar contraseña
    const user = rows[0];
    const checkPassword = bcrypt.compareSync(
      req.body.user_password,
      user.user_password
    );

    if (!checkPassword) {
      return res.status(400).json("Wrong password or username!");
    }

    // Crear token JWT
    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });

    // Remover la contraseña de la respuesta
    const { user_password, ...userData } = user;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // Cambia a `true` si usas HTTPS
      sameSite: "lax",
    });

    return res.status(200).json(userData);
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: false, // Cambia a `true` si usas HTTPS
      sameSite: "lax",
    })
    .status(200)
    .json("User has been logged out!");
};
