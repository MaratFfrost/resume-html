const textInput = document.getElementById('textInput');

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  let charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}



textInput.addEventListener('input', function () {
  this.value = this.value.replace(/[^a-zA-Zа-яА-Я]/g, '');
});
