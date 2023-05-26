const textarea = document.querySelector('textarea[name="review[body]"]');
  const characterCount = document.getElementById('characterCount');

  textarea.addEventListener('input', function() {
    const remainingCharacters = 500 - textarea.value.length;
    characterCount.textContent = remainingCharacters + ' characters remaining';
  });