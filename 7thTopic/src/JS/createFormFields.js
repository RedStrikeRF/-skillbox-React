import { checkParams } from "./check.js";
import { el, setChildren } from "redom";
import Inputmask from "inputmask";
import { cardImages } from "./card.js";

export function createInputField(name, ownId, mask, validatorFunc){
  const div = el('div', {class: "form-floating mb-3 col-7"});
  const input = el('input', {
      type: "text", 
      class: "form-control", 
      id: ownId, 
      required: "true",
      onblur: function(){
          if (this.value){
              validatorFunc(this.value)
              ? this.classList.remove('wrong') 
              : this.classList.add('wrong');
          }
          else{
              this.classList.remove('wrong');
          }
          checkParams()
      },
  });
  Inputmask(mask).mask(input);
  const label = el('label', name, {for: ownId});
  setChildren(div, [input, label]);
  return div;
}

export function createCardNumberField(name, ownId, mask, validatorFunc){
  const div = el('div', {class: "d-flex flex-row gap-3 mb-3"});
  const image = el('img', {src: cardImages.defaultCard});
  const inputDiv = el('div', {class: "form-floating col-6"});
  const input = el('input', {
      type: "text", 
      class: "form-control", 
      id: ownId, 
      required: "true",
      onblur: function(){
          if (this.value){
              if (validatorFunc(this.value)){
                  this.classList.remove('wrong');
                  const cardType = valid.number(this.value).card.type;
                  image.src = cardImages[cardType];
              }
              else{
                  this.classList.add('wrong');
                  image.src = cardImages.defaultCard;
              }
          }
          else{
              this.classList.remove('wrong');
          }
          checkParams()
      },
  });
  Inputmask(mask).mask(input);
  const label = el('label', name, {for: ownId});
  setChildren(inputDiv, [input, label]);
  setChildren(div, [inputDiv, image])
  return div;
}