// Step 1: first name, last name, vehicle type, colour, wheel size. The
// colours offered follow the type chosen. On submit every field is checked
// and every error shown at once; from then on a field is checked again as
// soon as it changes.
"use strict";
/* global vehicleTypes, vehicle, loadCar, saveCar, markInvalid, markValid */

const WHEEL_MIN = 15;
const WHEEL_MAX = 50;

const form = document.getElementById("step1");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const typeSelect = document.getElementById("type");
const colourSelect = document.getElementById("colour");
const wheels = document.getElementById("wheels");
const wheelsValue = document.getElementById("wheelsValue");

let submitted = false;

function addOption(select, value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  select.append(option);
}

function fillTypes() {
  for (const type of vehicleTypes()) {
    addOption(typeSelect, type, vehicle(type).label);
  }
}

// The colour list is rebuilt for the type chosen; a colour that no longer
// exists is dropped.
function fillColours(keep) {
  while (colourSelect.options.length > 1) {
    colourSelect.remove(1);
  }
  const chosen = vehicle(typeSelect.value);
  if (chosen === null) return;
  for (const colour of chosen.colours) {
    addOption(colourSelect, colour, colour);
  }
  colourSelect.value = chosen.colours.includes(keep) ? keep : "";
}

function showWheels() {
  wheelsValue.textContent = wheels.value;
}

// One check per field, each returning true when the field is fine.
function checkName(field, message) {
  if (field.value.trim() === "") {
    markInvalid(field, message);
    return false;
  }
  markValid(field);
  return true;
}

function checkType() {
  if (typeSelect.value === "") {
    markInvalid(typeSelect, "Please choose a vehicle type.");
    return false;
  }
  markValid(typeSelect);
  return true;
}

function checkColour() {
  if (colourSelect.value === "") {
    markInvalid(colourSelect, "Please choose a colour.");
    return false;
  }
  markValid(colourSelect);
  return true;
}

function checkWheels() {
  const size = Number(wheels.value);
  if (!Number.isInteger(size) || size < WHEEL_MIN || size > WHEEL_MAX) {
    markInvalid(wheels, "The wheel size must be between " + WHEEL_MIN + " and " + WHEEL_MAX + ".");
    return false;
  }
  markValid(wheels);
  return true;
}

function checkFirstName() {
  return checkName(firstName, "The first name is required.");
}

function checkLastName() {
  return checkName(lastName, "The last name is required.");
}

// Every check runs, so every error shows at once.
function checkAll() {
  const results = [checkFirstName(), checkLastName(), checkType(), checkColour(), checkWheels()];
  return results.every(Boolean);
}

function onSubmit(event) {
  event.preventDefault();
  submitted = true;
  if (!checkAll()) return;
  const car = loadCar() || {};
  car.firstName = firstName.value.trim();
  car.lastName = lastName.value.trim();
  car.type = typeSelect.value;
  car.colour = colourSelect.value;
  car.wheels = Number(wheels.value);
  saveCar(car);
  location.assign("features.html");
}

// After the first submit, a field is checked again as soon as it changes.
function recheck(check) {
  function handler() {
    if (submitted) check();
  }
  return handler;
}

function onTypeChange() {
  fillColours(colourSelect.value);
  if (submitted) {
    checkType();
    checkColour();
  }
}

// A visitor coming back from a later step finds the fields filled in.
function restore() {
  const car = loadCar();
  if (car === null) return;
  firstName.value = car.firstName || "";
  lastName.value = car.lastName || "";
  typeSelect.value = car.type || "";
  fillColours(car.colour || "");
  if (car.wheels) wheels.value = car.wheels;
  showWheels();
}

function init() {
  fillTypes();
  restore();
  showWheels();
  firstName.addEventListener("input", recheck(checkFirstName));
  lastName.addEventListener("input", recheck(checkLastName));
  typeSelect.addEventListener("change", onTypeChange);
  colourSelect.addEventListener("change", recheck(checkColour));
  wheels.addEventListener("input", showWheels);
  wheels.addEventListener("input", recheck(checkWheels));
  form.addEventListener("submit", onSubmit);
}

init();
