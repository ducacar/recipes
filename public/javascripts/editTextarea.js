function resizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  window.addEventListener("DOMContentLoaded", function () {
    const descriptionTextarea = document.querySelector("#description");
    const ingredientsTextarea = document.querySelector("#ingredients");
    const instructionsTextarea = document.querySelector("#instructions");

    resizeTextarea(descriptionTextarea);
    resizeTextarea(ingredientsTextarea);
    resizeTextarea(instructionsTextarea);
  });

  document.querySelector("#description").addEventListener("input", function () {
    resizeTextarea(this);
  });

  document.querySelector("#ingredients").addEventListener("input", function () {
    resizeTextarea(this);
  });

  document
    .querySelector("#instructions")
    .addEventListener("input", function () {
      resizeTextarea(this);
    });