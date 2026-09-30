const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const assignmentRoutes = require("./routes/assignments");
const courseRoutes = require("./routes/courses");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/courses", courseRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "JoinEazy API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`JoinEazy API running on http://localhost:${PORT}`);
});
