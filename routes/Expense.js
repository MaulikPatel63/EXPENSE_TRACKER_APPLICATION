const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
const {
  expenseAdd,
  expensesGet,
  expenseDelete,
  expenseUpdate,
  expensesUpload,
} = require("../controllers/ExpenseController.js");
const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware } = require("../middleware/authMiddleware.js");
router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with unique name
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || file.mimetype === "application/vnd.ms-excel") {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed!"), false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit: 5MB
  fileFilter: fileFilter,
});

//? expense router
router.post("/expense-add", AddValidation, expenseAdd);
router.get("/expense-get", expensesGet);
router.put("/expense-update/:id", UpdateValidation, expenseUpdate);
router.delete("/expense-delete/:id", expenseDelete);
router.post("/expense-upload", upload.single("file"), expensesUpload);

function AddValidation(req, res, next) {
  const schema = Joi.array().items(
    Joi.object({
      amount: Joi.number().positive().required(),
      description: Joi.string().min(3).max(255).required(),
      date: Joi.date().required(),
      category: Joi.string().min(3).max(50).required(),
      paymentmethod: Joi.string().valid("cash", "credit").required(),
    })
  );
  validateRequest(req, res, next, schema);
}
function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    amount: Joi.number().positive().optional(),
    description: Joi.string().min(3).max(255).optional(),
    date: Joi.date().optional(),
    category: Joi.string().min(3).max(50).optional(),
    paymentmethod: Joi.string().valid("cash", "credit").optional(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
