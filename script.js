"use strict";

// Selectors elements
const body = document.querySelector("body");
const miniStatement = document.getElementsByClassName("mini-state")[0];
const totalInAmt = document.getElementsByClassName("IN-amt")[0];
const totalOutAmt = document.getElementsByClassName("OUT-amt")[0];
const totalInt = document.getElementsByClassName("INT-amt")[0];
const logInBtn = document.getElementsByClassName("arrow")[0];
const uId = document.getElementById("uid");
const PIN = document.getElementById("pin");
const welcome = document.getElementById("welcome");
const mainBal = document.getElementsByClassName("total-bal")[0];
const header = document.getElementsByClassName("header")[0];
const actions = document.getElementsByClassName("actions")[0];
const logout = document.getElementsByClassName("logout")[0];
const sort = document.getElementsByClassName("sort")[0];
const payee = document.getElementById("payee");
const transAmt = document.getElementById("trans-amt");
const transAmtBtn = document.getElementById("trans-amt-ico");

// Selector for int in and out Amount
let inH3Val;
let outH3Val;
let intH3Val;

// User Info
const user1 = {
  uName: "Johnnie Casey",
  trans: [1120, 4850, -600, 175, 9650, -2120, 5800, -4600],
  intRate: 1.2,
  pin: 1111,
};

const user2 = {
  uName: "Yanis Octavia",
  trans: [5400, -4800, 9500, -1200, 9600, 8250, -8000, 23500],
  intRate: 1.1,
  pin: 2222,
};

const user3 = {
  uName: "Fedor Alisa",
  trans: [2745, 8190, -5465, -2030, 7355, -2340, 8765, -5090, 7215, 3980],
  intRate: 1.5,
  pin: 3333,
};

const acc = [user1, user2, user3];

// Pushing Transactions function
const transDetail = (user) => {
  user["trans"].forEach((item, index) => {
    if (item < 0) {
      miniStatement.insertAdjacentHTML(
        "afterbegin",
        `<div class="trans">
        <div class="date-tran-type">
          <div class="withdraw">${index + 1} WITHDRAW</div>
          <div class="date">01/02/2024</div>
        </div>
        <div class="amt">-₹${Math.abs(item)}</div>
      </div>`
      );
    } else {
      miniStatement.insertAdjacentHTML(
        "afterbegin",
        `<div class="trans">
        <div class="date-tran-type">
          <div class="deposit">${index + 1} DEPOSIT</div>
          <div class="date">01/02/2024</div>
        </div>
        <div class="amt">₹${item}</div>
      </div>`
      );
    }
  });
};

// Automatically creating UserId

const uid = (user) => {
  user.uid = user.uName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toLowerCase();
};

// Calculating IN values
const inAmt = (user) => {
  const total = user["trans"]
    .filter((amt) => amt > 0)
    .reduce((accumulator, amt) => accumulator + amt);

  totalInAmt.classList.remove("hidden");
  totalInAmt.innerHTML = `IN
        <div><h3>₹${total}</h3></div>`;

  inH3Val = total;
};

// Calculating OUT values
const outAmt = (user) => {
  const total = user["trans"]
    .filter((amt) => amt < 0)
    .reduce((accumulator, amt) => accumulator + amt);

  totalOutAmt.classList.remove("hidden");
  totalOutAmt.innerHTML = `OUT
        <div><h3>₹${Math.abs(total)}</h3></div>`;

  outH3Val = total;
};

// Calculating INT values
const int = (user) => {
  const total = user["trans"]
    .filter((amt) => amt > 0)
    .map((amt) => amt * (user["intRate"] / 100))
    .reduce((accumulator, curr) => accumulator + curr)
    .toFixed(2);

  totalInt.classList.remove("hidden");
  totalInt.innerHTML = `INT
        <div><h3>₹${total}</h3></div>`;

  intH3Val = total;
};

// Using input button
logInBtn.addEventListener("click", () => {
  loginFunc();
  clearInput();
});

// Recording User details
let currUsr;

// Login Function
const loginFunc = function () {
  const uIdInput = uId.value;
  const pinInput = Number(PIN.value);
  const accs = acc;
  acc.forEach((acc, i) => {
    if (acc.uid === uIdInput && acc.pin === pinInput) {
      // Putting the in int and transDetails
      inAmt(accs[i]);
      outAmt(accs[i]);
      int(accs[i]);
      transDetail(accs[i]);

      // Printing the Welcome Message
      welcome.innerHTML = `Welcome, ${accs[i].uName}`;

      // Printing the Main Balance
      mainBal.textContent = `₹${inH3Val + outH3Val + Number(intH3Val)}`;
      miniStatement.classList.remove("opacity");

      // Removing the classes to show up components
      header.classList.remove("hidden");
      actions.classList.remove("hidden");
      logout.classList.remove("hidden");
      sort.classList.remove("hidden");

      // Recording current User
      currUsr = uIdInput;
    }
  });
};

// Clear Login Fields
const clearInput = function () {
  PIN.value = uId.value = "";
  uId.blur();
  PIN.blur();
};

// To insert the uid for each account
acc.forEach((acc) => {
  uid(acc);
});

// Adding enter to login
body.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    loginFunc();
    clearInput();
    transferFunc();
  }
});

// Transferring money on Click
transAmtBtn.addEventListener("click", () => {
  transferFunc();
});

const transferFunc = function () {
  acc.forEach((accountUid, i) => {
    if (
      payee.value == accountUid.uid &&
      payee.value != currUsr &&
      Number(transAmt.value) > 0 &&
      Number(transAmt.value) <
        Number(inH3Val) + Number(intH3Val) + Number(outH3Val)
    ) {
      // Deduct and update in Sender's Account
      const currUsrDetail = acc.findIndex((usr) => usr.uid == currUsr);
      acc[currUsrDetail].trans.push(Number(`-${transAmt.value}`));
      transDetail(acc[currUsrDetail]);
      outAmt(acc[currUsrDetail]);
      mainBal.textContent = `₹${
        Number(inH3Val) + Number(intH3Val) + Number(outH3Val)
      }`;

      // Add amount to transfree account
      acc[i].trans.push(Number(`${transAmt.value}`));
    }
  });
  clearTransfer();
};

// Clear Transfer Fields
const clearTransfer = function () {
  payee.value = transAmt.value = "";
  payee.blur();
  transAmt.blur();
};

// Closing Account
