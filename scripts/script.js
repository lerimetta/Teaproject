$(document).ready(function () {
  new WOW(
    { animateClass: 'animate__animated',}
  ).init();

  $('.test-popup-link').magnificPopup({
    type: 'image'
  });
  $("#accordion").accordion();
  $("#alert").hide();
  let allInputs = $("div > input");
  let postCode = $("#postcode")
  postCode.keydown((e) => {
    if (!parseInt(e.key) && e.key !== "Backspace") {
      return false;
    }
  });

  let formButton = $("#form-button");
  function checkField(field, message) {
    if (field.val() === "") {
      alert(message);
    }
  }
  function checkAllFields(arr) {
    let counter = 0;
    $(arr).each(function (index, element) {
      if ($(element).val() === "") {
        counter++;
      }
    })
    if (counter === 0) {
      return true;
    }
    return false;
  }

  $(formButton).click(
    function () {
      checkField($("#firstName"), "Заполните поле Имя");
      checkField($("#lastName"), "Заполните поле Фамилия");
      checkField($("#phone"), "Заполните поле Телефон");
      checkField($("#country"), "Заполните поле Страна");
      checkField($("#postcode"), "Заполните поле Индекс");
      if ($("#postcode").val().length !== 6) {
        alert("Индекс должен быть из шести цифр");
      }
      checkField($("#address"), "Заполните поле Адрес");
      if (checkAllFields(allInputs) && $("#postcode").val().length === 6) {
        $("#main-form").remove();
        $("#form-title").remove();
        $("#alert").show();
      }

    }
  );
});
