import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/auth.route";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for form data   

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript + Express!");
});

// routes
app.use("/api/users", userRoutes);

// listing to port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
