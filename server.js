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
    const lat = req.body.lat;
    const long = req.body.long;
    try {
        const employee = new Employee({
            name,
            address,
            age,
            department,
            status,
            lat,
            long
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
    const lat = req.body.lat;
    const long = req.body.long;
    try {
        //update code
        const employee = await Employee.findById(id);
        if (!employee) {
            throw new Error("Employee with id " + id + " not found");
        }
        employee.name = name;
        employee.address = address;
        employee.age = age;
        employee.department = department;
        employee.status = status;
        employee.lat = lat;
        employee.long = long;
        employee.save();
        res.send({ message: "Updated Successfully" });
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
});


app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find({});
        //console.log(employees);
        res.send(employees);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
});

app.get("/employees/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const employees = await Employee.findById(id);
        //console.log(employees);
        res.send(employees);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
});

mongoose.connect(process.env.mongodb_uri).then((result) => {
    //console.log(result);
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log("Server started at port " + port);
    });
});
