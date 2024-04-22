import { showPrototypes } from './prototypes.js';

export const prototypesContainer = document.getElementById('prototypes-container');

const inputClass = document.getElementById('input-class');
const btnSubmit = document.getElementById('btn-submit');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  // Очистка красной подсветки
  inputClass.classList.remove('error');

  const inputValue = inputClass.value.trim();

  if (inputValue) {
    showPrototypes(inputValue);
  }
});
