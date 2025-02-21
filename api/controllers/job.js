import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Crear un empleo
export const createJob = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const query = `
            INSERT INTO jobtable (
                job_provider_user_name, job_provider_company_name, job_provider_company_linkedin, 
                job_provider_company_website, job_provider_company_email, job_description, 
                job_requirement, job_salary, job_provider_company_twitter, job_provider_company_facebook, 
                user_id, job_creation_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      req.body.job_provider_user_name,
      req.body.job_provider_company_name,
      req.body.job_provider_company_linkedin,
      req.body.job_provider_company_website,
      req.body.job_provider_company_email,
      req.body.job_description,
      req.body.job_requirement,
      req.body.job_salary,
      req.body.job_provider_company_twitter,
      req.body.job_provider_company_facebook,
      userInfo.id,
      moment().format("YYYY-MM-DD HH:mm:ss"),
    ];

    await conn.query(query, values);
    conn.release();

    return res.status(200).json({ message: "Job has been created!" });
  } catch (err) {
    console.error("Error en createJob:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Obtener todos los empleos
export const getAllJobs = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    jwt.verify(token, "secretkey");

    const conn = await db.getConnection();
    const query = `
            SELECT j.job_id, j.job_provider_user_name, j.job_provider_company_name, 
                   j.job_provider_company_linkedin, j.job_provider_company_website, 
                   j.job_provider_company_email, j.job_description, j.job_requirement, 
                   j.job_salary, j.job_provider_company_twitter, j.job_provider_company_facebook, 
                   j.user_id, j.job_creation_time, u.user_fullname, u.user_profile_img
            FROM jobtable j
            INNER JOIN usertable u ON j.user_id = u.id
        `;

    const [rows] = await conn.query(query);
    conn.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error en getAllJobs:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Eliminar un empleo
export const deleteOneJob = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  try {
    const userInfo = jwt.verify(token, "secretkey");

    const jobId = req.params.id;
    const conn = await db.getConnection();

    // Verificar si el empleo existe y pertenece al usuario autenticado
    const checkQuery = "SELECT user_id FROM jobtable WHERE job_id = ?";
    const [checkData] = await conn.query(checkQuery, [jobId]);

    if (checkData.length === 0) {
      conn.release();
      return res.status(404).json({ error: "Job not found" });
    }

    if (checkData[0].user_id !== userInfo.id) {
      conn.release();
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this job" });
    }

    // Eliminar el empleo
    const deleteQuery = "DELETE FROM jobtable WHERE job_id = ?";
    await conn.query(deleteQuery, [jobId]);
    conn.release();

    return res.status(200).json({ message: "Job has been deleted!" });
  } catch (err) {
    console.error("Error en deleteOneJob:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
