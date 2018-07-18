'use strict';

var input = document.querySelector('#quantity__item1');
var itemPrice = document.querySelector('.price__item1');
var itemValue = document.querySelector('.value__item1');
var popup = document.querySelector('.popup');
var pricePopup = document.querySelector('.popup__price');
var inputPopup = document.querySelector('#quantity__item');
var valuePopup = document.querySelector('.popup__value');
var submitButton = document.querySelector('.ad-form__submit');

input.addEventListener('click', function () {
  popup.classList.remove('popup_hidden');
  inputPopup.value = input.value;
  pricePopup.textContent = itemPrice.textContent;
  return valuePopup.textContent = String(Number(pricePopup.textContent) * Number(inputPopup.value));
});

inputPopup.addEventListener('change', function () {
  return valuePopup.textContent = String(Number(pricePopup.textContent) * Number(inputPopup.value));
});

submitButton.addEventListener('click', function () {
  input.value = inputPopup.value;
  itemValue.textContent = valuePopup.textContent;
  popup.classList.add('popup_hidden');
});
