const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Employee = require("./model/Employee");
app.use(
    cors({
        origin: process.env.front_end_url,
    })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.post("/create", async (req, res, next) => {
    const name = req.body.e_name;
    const address = req.body.e_address;
    const age = req.body.e_age;
    const department = req.body.e_department;
    const status = req.body.e_status;
    try {
        const employee = new Employee({
            name,
            address,
            age,
            department,
            status,
        });
        let res_emp = await employee.save();
        //console.log(res_emp);
        res.send({ message: "Employee created successfully!" });
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
});

app.post("/update", async (req, res, next) => {
    const id = req.body.e_id;
    const name = req.body.e_name;
    const address = req.body.e_address;
    const age = req.body.e_age;
    const department = req.body.e_department;
    const status = req.body.e_status;
    try {
        //update code
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
});

mongoose.connect(process.env.mongodb_uri).then((result) => {
    //console.log(result);
    const port = 8000;
    app.listen(port, () => {
        console.log("Server started at port " + port);
    });
});