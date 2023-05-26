document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("image").addEventListener("change", function (event) {
      const fileList = event.target.files;
      const messageElement = document.getElementById("image-added-message");
      const cancelBtn = document.getElementById("cancel-image-btn");

      if (fileList.length > 0) {
        messageElement.style.display = "block";
        cancelBtn.style.display = "inline-block";
        messageElement.textContent = `Image added: ${fileList[0].name}`;
      } else {
        messageElement.style.display = "none";
        cancelBtn.style.display = "none";
      }
    });

    document.getElementById("cancel-image-btn").addEventListener("click", function () {
      const fileInput = document.getElementById("image");
      fileInput.value = ""; 
      fileInput.dispatchEvent(new Event("change")); 
    });
  });