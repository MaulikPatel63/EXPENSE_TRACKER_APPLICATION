const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/", require("./routes/index.js"));

// Welcome Route
app.get("/", (req, res) => {
  res.send(`
    <center>
        <h1>Welcome to the EXPENSE TRACKER APPLICATION!</h1>
        <br>
        <p>
            Get EXPENSE TRACKER APPLICATION: 
        <a href="https://github.com/MaulikPatel63/EXPENSE_TRACKER_APPLICATION.git" target="_blank">
            Repository: EXPENSE TRACKER APPLICATION
        </a>
        </p>
    </center>
  `);
});

// Error Handler Middleware (placed after routes)
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
