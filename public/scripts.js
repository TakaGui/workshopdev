function onOff() {
  document
    .querySelector("#modal")
    .classList
    .toggle("hide")

  document
    .querySelector("#modal")
    .classList
    .toggle("addScroll")
  
  document
    .querySelector("body")
    .classList
    .toggle("hideScroll")
}

function checkFields(event) {

  const valuesToCheck = [
    "title",
    "image",
    "category",
    "description",
    "link"
  ]

  // Isso é como se fosse um for
  // Para cada value, ele vai executar uma função
  const isEmpty = valuesToCheck.find(function(value) {
    const checkIfIsString = typeof event.target[value].value === "string";
    const checkIfIsEmpty = !event.target[value].value.trim();

    if (checkIfIsString && checkIfIsEmpty) {
      return true;
    } else {
      return false;
    }
  })

  if (isEmpty) {
    // Se for true, vai parar antes de continuar o evento, no caso o POST
    event.preventDefault();

    alert("Por favor, preencha todos os campos.");
  }

}