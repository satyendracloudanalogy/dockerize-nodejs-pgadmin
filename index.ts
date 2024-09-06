import express, { Application } from "express";
import userRoutes from "./routes/user/userRoutes";
import postRoutes from "./routes/post/postRoutes";

const app: Application = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;