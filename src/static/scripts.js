const accountIDInput = document.getElementById("accountID");
const toInput = document.getElementById("to");
const amountInput = document.getElementById("amount");
const loginButton = document.getElementById("login");
const transferButton = document.getElementById("transfer");
const checkBalanceButton = document.getElementById("checkBalance");

const URL = "http://localhost:5000/api";

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(URL+"/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accountID: accountIDInput.value
    })
  })
  .then(promise => promise.json())
  .then((res) =>{
    console.log(res)
  })
});

transferButton.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(URL+`/transfer/${toInput.value}/${amountInput.value}`, {
    method: "POST"
  })
  .then(promise => promise.json())
  .then((res) =>{
    console.log(res)
  })
});

checkBalanceButton.addEventListener("click", (e) => {
  e.preventDefault();
  
  fetch(URL+"/balance")
  .then(promise => promise.json())
  .then((res) =>{
    console.log(res)
  })
});
