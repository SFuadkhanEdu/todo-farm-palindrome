const form = document.querySelector("form");
const inp = document.querySelector("input");
const result = document.querySelector("#result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const expression = inp.value;
  resultRecorder(expression);
});
function resultRecorder(expression) {
  if (checkPalindrome(expression)) {
    result.textContent = "IT'S A PALINDROME";
  } else {
    result.textContent = "IT ISN'T A PALINDROME";
  }
}
function checkPalindrome(expression) {
  for (let i = 0; i < expression.length / 2; i++) {
    if (expression[i] !== expression[expression.length - i - 1]) {
      return false;
    }
  }
  return true;
}
