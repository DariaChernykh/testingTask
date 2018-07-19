'use strict';

var mainTable = document.querySelector('.main-table');
var inputs = Array.from(mainTable.querySelectorAll('input[type="text"]'));
var popup = document.querySelector('.popup');
var pricePopup = popup.querySelector('.popup__price');
var inputPopup = popup.querySelector('#quantity__item');
var valuePopup = popup.querySelector('.popup__value');
var submitButton = document.querySelector('.popup__submit');
var resetButton = document.querySelector('.popup__reset');
var selectedElements = document.querySelector('.first-row__span');
var itemCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]'));
var removeSelected = document.querySelector('.remove_checked-elements');
var changeInputButton = document.querySelectorAll('.input__counter');

function inputHandler(event) {

  var input = event.target || event.srcElement;
  var id = input.id;

  popup.classList.remove('popup_hidden');
  inputPopup.value = input.value;
  inputPopup.setAttribute('item_id', id);

  setPopupPrice(id);
  setPopupValue()
}

function setPopupPrice(id) {
  var priceObject = document.querySelector('.price-' + id);
  pricePopup.textContent = priceObject.textContent;
}

function getItemValue() {
  var price = StrToInt(pricePopup.textContent);
  return IntToStr(Number(price) * Number(inputPopup.value));
}

function setPopupValue() {
  valuePopup.textContent = getItemValue();
}

function StrToInt(string) {
  string = string.replace(/\s*/g, '').replace('р', '');
  return string
}

function IntToStr(int) {
  var match = Array.from(String(int)).reverse().join('').match(/.{1,3}/g);
  var string = [];
  match.forEach(function (item) {
    string.push(Array.from(String(item)).reverse().join(''))
  });
  return string.reverse().join('\u00A0') + '\u00A0р';
}

function setSelectedItems() {
  var checked = document.querySelectorAll('input[type=checkbox]:checked').length;
  selectedElements.textContent = String(checked);
}


function validatePopup() {
  var value = Number(inputPopup.value);
  var min = Number(inputPopup.getAttribute('min'));
  var max = Number(inputPopup.getAttribute('max'));

  if (value < min) inputPopup.value = min;
  if (value > max) inputPopup.value = max;

  valuePopup.textContent = getItemValue();
}

function summaryValue() {
  var costs = document.querySelectorAll('.inner-table__cell-right');
  var sum = 0;
  costs.forEach(function (cost) {
    sum += Number(StrToInt(cost.textContent));
  });
  var tax = Math.round(sum * 0.18);

  document.querySelector('.sum__number').textContent = IntToStr(sum);
  document.querySelector('.tax__number').textContent = IntToStr(tax);
  document.querySelector('.result__number').textContent = IntToStr(sum + tax);
}

inputs.forEach(function (input) {
  input.addEventListener("click", inputHandler);
});

inputPopup.addEventListener('keyup', validatePopup);

submitButton.addEventListener('click', function () {
  var item_id = inputPopup.getAttribute('item_id');
  var item_input = document.querySelector('#' + item_id);
  var item_value = document.querySelector('.value-' + item_id);

  item_input.value = inputPopup.value;
  item_value.textContent = valuePopup.textContent;
  popup.classList.add('popup_hidden');
  summaryValue();
});

resetButton.addEventListener('click', function () {
  popup.classList.add('popup_hidden');
});

itemCheckbox.forEach(function (checkbox) {
  checkbox.addEventListener('change', setSelectedItems);
});

changeInputButton.forEach(function (button) {
  button.addEventListener('click', function (event) {
    inputPopup.value = Number(inputPopup.value) + Number(event.target.textContent + 1);
    validatePopup();
  });
});

removeSelected.addEventListener('click', function () {
  var checked = document.querySelectorAll('input[type=checkbox]:checked');
  checked.forEach(function (checkbox) {
    checkbox.parentElement.parentElement.parentElement.remove()
  });
  setSelectedItems();
});



