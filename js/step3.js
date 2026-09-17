// Step 3: the summary of the two forms, read from what they saved. Start
// over clears the saved car and returns to step 1.
"use strict";
/* global vehicle, requireCar, clearCar */

const RATING_LABELS = { speed: "Speed", handling: "Handling", strength: "Strength", efficiency: "Efficiency" };

function hasBothSteps(saved) {
  return typeof saved.type === "string" && vehicle(saved.type) !== null && typeof saved.ratings === "object" && Array.isArray(saved.options);
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function fillList(id, items) {
  const list = document.getElementById(id);
  for (const item of items) {
    const line = document.createElement("li");
    line.textContent = item;
    list.append(line);
  }
}

function ratingLines(ratings) {
  const lines = [];
  for (const key of Object.keys(RATING_LABELS)) {
    lines.push(RATING_LABELS[key] + ": " + ratings[key]);
  }
  return lines;
}

function show(car) {
  setText("fullName", car.firstName + " " + car.lastName);
  setText("vehicleType", vehicle(car.type).label);
  setText("wheels", car.wheels + " inches");
  setText("colour", car.colour);
  fillList("ratings", ratingLines(car.ratings));
  fillList("options", car.options);
}

function startOver() {
  clearCar();
  location.assign("index.html");
}

function init() {
  const car = requireCar(hasBothSteps);
  if (car === null) return;
  show(car);
  document.getElementById("btnStartOver").addEventListener("click", startOver);
}

init();
