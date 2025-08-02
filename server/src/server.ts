import express from "express";
import dotenv from "dotenv";

import authRoutes from './routes/auth.route'
import restaurantRoutes from './routes/restaurant.route'
import userRoutes from "./routes/auth.route";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for form data 

// routes
app.use('/api/auth', authRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript + Express!");
});

// listing to port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
