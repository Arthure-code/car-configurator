// Shared by the three pages: the catalogue of vehicle types and the car being
// built, kept in sessionStorage from one page to the next. Named functions
// only; the page scripts, loaded after this file, call them.
"use strict";
/* exported vehicleTypes, vehicle, loadCar, saveCar, clearCar, requireCar */

const STORAGE_KEY = "car-configurator";

// The three vehicle types: label, the colours offered, the options offered.
function vehicle(type) {
  const catalogue = {
    eco: {
      label: "Eco",
      colours: ["Green", "White", "Silver", "Sky blue"],
      options: ["Power windows", "Cargo nets", "Long-life battery"],
    },
    sport: {
      label: "Sport",
      colours: ["Red", "Black", "Yellow", "Orange"],
      options: ["Sunroof", "Alloy wheels", "Tinted windows", "Bose sound system", "Spoiler"],
    },
    suv: {
      label: "SUV",
      colours: ["Grey", "Brown", "Dark blue", "White"],
      options: ["Power liftgate", "Power sliding doors"],
    },
  };
  return catalogue[type] || null;
}

function vehicleTypes() {
  return ["eco", "sport", "suv"];
}

// The car as saved so far, or null when nothing has been saved.
function loadCar() {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved === null) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function saveCar(car) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(car));
}

function clearCar() {
  sessionStorage.removeItem(STORAGE_KEY);
}

// A page that needs the earlier steps sends the visitor back to the start
// when they are missing; it returns the car otherwise.
function requireCar(isComplete) {
  const car = loadCar();
  if (car === null || !isComplete(car)) {
    location.replace("index.html");
    return null;
  }
  return car;
}
