import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import loginRoutes from "./routes/loginlogout.js";
import registerRoutes from "./routes/register.js";
import educationRoutes from "./routes/education.js";
import aboutyouRouter from "./routes/aboutyou.js";
import careerPreferencesRoutes from "./routes/CareerPreferences.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.timeout = 60000;

app.use(express.urlencoded({ extended: true }));
app.use("/", loginRoutes);
app.use(registerRoutes);
app.use("/api", aboutyouRouter);
app.use("/api", educationRoutes);
app.use("/api", careerPreferencesRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
