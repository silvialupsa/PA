/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model")
const equipmentsName = require("./equipmentsName.json")
const equipmentsType = require("./equipmentsType.json")
const equipmentsAmount = require("./equipmentsAmount.json")
const mongoUrl = process.env.MONGO_URL;
const BrandModel = require("../db/brand.model") 
const brandsList = require("./brands.json")
const ColorModel = require("../db/color.model")
const colorsList = require("./colors.json")
const books = require("./books.json")
const LocationModel = require("../db/location.model")
const locationsList = require("./locations.json")
const PositionModel = require("../db/position.model")
const positionsList = require("./positionAndSalaries.json")

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populatePosAndSal = async () => {
  await PositionModel.deleteMany({});
  const positions = positionsList.map((position) => ({
    name: position.name,
    salary: position.salary
  }));

  await PositionModel.create(...positions);
  console.log("Positions created");
};

const populateColors = async () => {
  await ColorModel.deleteMany({});
  const colors = colorsList.map((name) => ({
    name
  }));

  await ColorModel.create(...colors);
  console.log("Colors created");
};

const populateLocations = async () => {
  await LocationModel.deleteMany({});
  const locations = locationsList.map((location) => ({
    city: location.city,
    country: location.country
  }));

  await LocationModel.create(...locations);
  console.log("Locations created");
};

//de ce daca schimb numele din map nu mi se face populate? ex: color 

const populateBrands = async () => {
  await BrandModel.deleteMany({});
  const brands = brandsList.map((name) => ({
    name
  }));

  await BrandModel.create(...brands);
  console.log("Brands created");
};

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});
  const equipments = equipmentsName.map((name) => ({
    name,
    type: pick(equipmentsType),
    amount: pick(equipmentsAmount),
  }));

  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function choosePosSal(salary) {
  if (1 <= salary && salary <=100) {
    return "Junior"
  } else if (101 <= salary && salary <= 300) {
    return "Medior"
  } else if (301 <= salary && salary <= 400) {
    return "Senior"
  } else if (401 <= salary && salary <= 800) {
    return "Expert"
  } else if (801 <= salary) {
    return "Godlike"
  }
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find()
  const brands = await BrandModel.find()
  const colors = await ColorModel.find()
  const locations = await LocationModel.find();
  const positionsAndSalaries = await PositionModel.find()

  const employees = names.map((name) => {
    let pickedBooks = []
    for(let i = 0; i<3; i++){
      pickedBooks.push(pick(books))
  }
    return {
      name,
      present: false,
      position: pick(positionsAndSalaries),
      equipment: pick(equipments),
      brand: pick(brands),
      color: pick(colors),
      location: pick(locations),
      readBooks: [... new Set(pickedBooks)].map((book) => {
        return {
          name: book.name,
          author: book.author,
        };
      }),
      height: randomIntFromInterval(100, 190)
  }
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populatePosAndSal()
  await populateLocations()
  await populateColors()
  await populateBrands()
  await populateEquipments()
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
