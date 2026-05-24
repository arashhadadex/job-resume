const year = document.querySelector("#year");
const printButton = document.querySelector("#printResume");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}
