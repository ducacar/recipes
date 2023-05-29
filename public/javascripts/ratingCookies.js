
function selectRating(rating) {
  const ratingIndicator = document.getElementById('rating-indicator');
  
  ratingIndicator.innerHTML = 'Rating: ';
  for (let i = 1; i <= rating; i++) {
    ratingIndicator.innerHTML += '&#x1F370;';
  }

  const radioButtons = document.querySelectorAll('input[name="review[rating]"]');
  radioButtons.forEach((radio) => {
    radio.checked = false;
  });

  const selectedRadioButton = document.querySelector(`input#rating${rating}`);
  selectedRadioButton.checked = true;
}


const labels = document.querySelectorAll('.cake-rating label');
labels.forEach((label, index) => {
  label.addEventListener('click', () => {
    selectRating(index + 1);
  });
});
