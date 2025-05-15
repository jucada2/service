import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import historialRoutes from "./routes/historial.routes";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { RequestHandler } from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({origin: "*",              
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]}));
app.use("/historial", historialRoutes);

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));
app.use(
  "/api-docs",
  swaggerUi.serve as unknown as RequestHandler,
  swaggerUi.setup(swaggerDocument) as unknown as RequestHandler
);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("MongoDB conectado"))
  .catch(console.error);

export default app;
