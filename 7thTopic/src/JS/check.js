import { btn } from "../app.js";
export function checkParams(){
  const a = [...document.querySelectorAll('input')].map((input) => (input.value && !input.classList.contains('wrong')));
  const isValidForm = a.every((el) => el)
  isValidForm ? btn.disabled = false : btn.disabled = true;
}
