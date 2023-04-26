require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const BrandModel = require("./db/brand.model");
const ColorModel = require("./db/color.model");
const LocationModel = require("./db/location.model");
const PositionModel = require("./db/position.model");
const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().populate("equipment brand color location position").sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id).populate("equipment brand color location position");
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;
  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

// app.patch("/api/employees/", async (req, res, next) => {
//   try {
//     const newList = req.body.map(async (employee) => employee = await EmployeeModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: { ...employee } },
//       { new: true }
//     )
//     )

//     console.log(newList)
//     // const employees = await EmployeeModel.find().updateMany(
//     //   {_id: req.body },
//     //   {$set: {res: <value> } }
//     //     );
//     // console.log(res)
//     // console.log(employees)
//     return res.json(newList);
//   } catch (err) {
//     return next(err);
//   }
// });

app.patch("/api/employees/", async (req, res, next) => {
  try {
    const promises = req.body.map(async (employee) => {
      const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { _id: employee._id }, // Updated to use the employee ID from the request body
        { $set: { ...employee } },
        { new: true }
      );
      return updatedEmployee;
    });

    const newList = await Promise.all(promises); // Wait for all promises to resolve

    return res.json(newList);
  } catch (err) {
    return next(err);
  }
});


app.patch("/api/employees/", async (req, res, next) => {
  try {
    const newList = [];
    for (const employee of req.body) {
      const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { _id: employee._id },
        { $set: { ...employee } },
        { new: true }
      );
      newList.push(updatedEmployee);
    }
    return res.json(newList);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/brands/", async (req, res) => {
  const brands = await BrandModel.find().sort({ created: "desc" });
  return res.json(brands);
});

app.get("/api/equipments/", async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipments);
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipment/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/equipment/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/equipments/", async (req, res, next) => {
  const equipment = req.body;
  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

// app.get("/api/present", async (req, res, next) => {
//   try {
//     const equipment = await EmployeeModel.find({present: "true"});
//     return res.json(equipment);
//   } catch (err) {
//     return next(err);
//   }
// });

app.get("/api/missing", async (req, res, next) => {
  try {
    const missingPeople = await EmployeeModel.find({ present: "false" });
    return res.json(missingPeople);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/years-of/experience/:years", async (req, res, next) => {
  try {
    const yearsOfExperiencePeople = await EmployeeModel.find({ yearsOfExperience: { $gt: req.params.years } }).populate("equipment brand color location position");
    return res.json(yearsOfExperiencePeople);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/positions", async (req, res, next) => {
  try {
    const positions = await PositionModel.find().sort({ created: "desc" })
    return res.json(positions);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/colors/", async (req, res) => {
  const colors = await ColorModel.find().sort({ created: "desc" });
  return res.json(colors);
});

app.get("/api/locations/", async (req, res) => {
  const locations = await LocationModel.find().sort({ created: "desc" });
  return res.json(locations);
});

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
