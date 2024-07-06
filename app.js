const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const pharmacyRoutes = require("./routes/pharmacies");
const medicineRoutes = require("./routes/medicines");

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


 

app.get('/', (req, res) => {
    res.send("welcome to the Pharmacy app")
})
app.use("/auth", authRoutes);
app.use("/pharmacies", pharmacyRoutes);
app.use("/medicines", medicineRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
