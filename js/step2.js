// Step 2: four ratings that must add up to fifty, and two or three options
// from the list of the vehicle type chosen at step 1. The options are built
// here, not hidden and shown. Same two-stage validation as step 1.
"use strict";
/* global vehicle, requireCar, saveCar, markInvalid, markValid */

const RATING_MIN = 5;
const RATING_MAX = 15;
const RATING_TOTAL = 50;
const OPTIONS_MIN = 2;
const OPTIONS_MAX = 3;
const RATINGS = ["speed", "handling", "strength", "efficiency"];

const form = document.getElementById("step2");
const ratingFields = [];
for (const rating of RATINGS) {
  ratingFields.push(document.getElementById(rating));
}
const totalMessage = document.getElementById("totalMessage");
const optionsTitle = document.getElementById("optionsTitle");
const optionsList = document.getElementById("optionsList");
const optionsMessage = document.getElementById("optionsMessage");

let submitted = false;
let car = null;

function hasStepOne(saved) {
  return typeof saved.type === "string" && vehicle(saved.type) !== null;
}

// One checkbox per option of the type, in Bootstrap's form-check markup.
function buildOptions() {
  const chosen = vehicle(car.type);
  const ticked = new Set(Array.isArray(car.options) ? car.options : []);
  optionsTitle.textContent = "Options, " + chosen.label + " type";
  for (let index = 0; index < chosen.options.length; index++) {
    const option = chosen.options[index];
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-3";
    const check = document.createElement("div");
    check.className = "form-check";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.className = "form-check-input";
    box.name = "options";
    box.value = option;
    box.id = "option-" + index;
    box.checked = ticked.has(option);
    const label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = box.id;
    label.textContent = option;
    check.append(box, label);
    column.append(check);
    optionsList.append(column);
  }
}

function checkedOptions() {
  const chosen = [];
  for (const box of optionsList.querySelectorAll("input:checked")) {
    chosen.push(box.value);
  }
  return chosen;
}

// A rating is a whole number from 5 to 15.
function checkRating(field) {
  const value = Number(field.value);
  if (field.value.trim() === "" || !Number.isInteger(value) || value < RATING_MIN || value > RATING_MAX) {
    markInvalid(field, "A whole number from " + RATING_MIN + " to " + RATING_MAX + ".");
    return false;
  }
  markValid(field);
  return true;
}

function ratingsTotal() {
  let total = 0;
  for (const field of ratingFields) {
    total += Number(field.value);
  }
  return total;
}

// The four ratings must add up to exactly fifty; the message sits under the
// group, since no single field is at fault.
function checkTotal() {
  let allFine = true;
  for (const field of ratingFields) {
    if (!checkRating(field)) allFine = false;
  }
  if (!allFine) {
    totalMessage.textContent = "";
    return false;
  }
  const total = ratingsTotal();
  if (total !== RATING_TOTAL) {
    totalMessage.textContent = "The four ratings add up to " + total + "; they must add up to " + RATING_TOTAL + ".";
    return false;
  }
  totalMessage.textContent = "";
  return true;
}

function checkOptions() {
  const count = checkedOptions().length;
  if (count < OPTIONS_MIN || count > OPTIONS_MAX) {
    optionsMessage.textContent = "Choose " + OPTIONS_MIN + " or " + OPTIONS_MAX + " options; " + count + " chosen.";
    optionsMessage.classList.replace("text-success", "text-danger");
    return false;
  }
  optionsMessage.textContent = count + " options chosen.";
  optionsMessage.classList.replace("text-danger", "text-success");
  return true;
}

function checkAll() {
  const results = [checkTotal(), checkOptions()];
  return results.every(Boolean);
}

function onSubmit(event) {
  event.preventDefault();
  submitted = true;
  if (!checkAll()) return;
  car.ratings = {};
  for (const field of ratingFields) {
    car.ratings[field.id] = Number(field.value);
  }
  car.options = checkedOptions();
  saveCar(car);
  location.assign("summary.html");
}

function onRatingInput() {
  if (submitted) checkTotal();
}

function onOptionChange() {
  if (submitted) checkOptions();
}

function restore() {
  if (!car.ratings) return;
  for (const field of ratingFields) {
    if (car.ratings[field.id] !== undefined) field.value = car.ratings[field.id];
  }
}

function init() {
  car = requireCar(hasStepOne);
  if (car === null) return;
  buildOptions();
  restore();
  for (const field of ratingFields) {
    field.addEventListener("input", onRatingInput);
  }
  optionsList.addEventListener("change", onOptionChange);
  form.addEventListener("submit", onSubmit);
}

init();
