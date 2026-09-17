// Field feedback shared by the two form pages, in Bootstrap's terms: a red
// frame and a red message under the field in error, a green frame once it
// is corrected. The browser's own validation bubbles are turned off with
// novalidate on each form.
"use strict";
/* exported markInvalid, markValid, clearMark, feedbackOf */

// The message element that follows a field, created once when missing.
function feedbackOf(field) {
  let feedback = field.parentElement.querySelector(".invalid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    field.parentElement.append(feedback);
  }
  return feedback;
}

function markInvalid(field, message) {
  field.classList.remove("is-valid");
  field.classList.add("is-invalid");
  feedbackOf(field).textContent = message;
}

function markValid(field) {
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
  feedbackOf(field).textContent = "";
}

function clearMark(field) {
  field.classList.remove("is-invalid", "is-valid");
  feedbackOf(field).textContent = "";
}
