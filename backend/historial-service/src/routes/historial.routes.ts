import express, { Request, Response } from "express";
import axios from "axios";
import { Historial, IHistorial } from "../models/historial.model";

const router = express.Router();

// URLs de tus microservicios (ajusta puertos o nombres de servicio de Docker)
const USER_SERVICE_URL = "http://user-service:8000/user";
const CONTENT_SERVICE_URL = "http://content-service:8080/video";

/**
 * Helper para validar que un usuario exista.
 */
async function validateUser(userId: string): Promise<boolean> {
  const url = `${USER_SERVICE_URL}/${userId}`;
  console.log("→ validateUser: GET", url);
  try {
    const { data } = await axios.get(url, { timeout: 2000 });
    console.log("✅ user exists:", data);
    return true;
  } catch (err: any) {
    console.error("❌ validateUser error:", err.code || err.response?.status, err.message);
    return false;
  }
}

/**
 * Helper para validar que un video exista.
 */
async function validateVideo(videoId: string): Promise<boolean> {
  const url = `${CONTENT_SERVICE_URL}/${videoId}`;
  console.log("→ validateVideo: GET", url);
  try {
    const { data } = await axios.get(url, { timeout: 2000 });
    return !!data;
  } catch {
    return false;
  }
}

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "Historial service is healthy" });
});

// POST /historial
router.post("/", async (req: Request, res: Response) => {
  const { user_id, video_id } = req.body as { user_id: string; video_id: string };

  // 1) Validar existencia
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  if (!(await validateVideo(video_id))) {
    return res.status(404).json({ error: "Video no encontrado" });
  }

  // 2) Insertar en historial
  let historial = await Historial.findOne({ user_id });
  if (!historial) {
    historial = new Historial({ user_id, videos: [] });
  }
  historial.videos.push({ video_id, watched_at: new Date() });
  await historial.save();

  res.status(201).json(historial);
});

// GET /historial?user_id=xyz
router.get("/", async (req: Request, res: Response) => {
  const user_id = String(req.query.user_id || "");

  // Validar usuario antes de devolver historial
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const historial = await Historial.findOne({ user_id });
  res.json(historial?.videos || []);
});

// DELETE /historial?user_id=xyz
router.delete("/", async (req: Request, res: Response) => {
  const user_id = String(req.query.user_id || "");

  // Validar usuario
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  await Historial.deleteOne({ user_id });
  res.json({ message: "Historial eliminado" });
});

// PUT /historial/:video_id?user_id=xyz
router.put("/:video_id", async (req: Request, res: Response) => {
  const user_id = String(req.query.user_id || "");
  const video_id = req.params.video_id;

  // Validar usuario y video
  if (!(await validateUser(user_id))) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  if (!(await validateVideo(video_id))) {
    return res.status(404).json({ error: "Video no encontrado" });
  }

  // Eliminar la entrada del video en el historial
  await Historial.updateOne(
    { user_id },
    { $pull: { videos: { video_id } } }
  );

  res.json({ message: "Video eliminado del historial" });
});


// GET /historial/all → Retorna todos los historiales completos
router.get("/all", async (_req: Request, res: Response) => {
  try {
    const historiales = await Historial.find();
    res.json(historiales);
  } catch (err) {
    console.error("Error al obtener historiales:", err);
    res.status(500).json({ error: "Error interno al obtener historiales" });
  }
});


export default router;
