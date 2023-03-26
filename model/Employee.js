const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        age: { type: Number, required: true },
        department: { type: String, required: true },
        status: {
            type: String,
            enum: ["Remote Location", "Contract Employee", "Full-Time"],
        },
        lat: { type: String, required: true },
        long: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
