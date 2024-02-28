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
const clAccBtn = document.getElementById("cl-acc-btn");
const clAcc = document.getElementById("cl-acc");
const clPin = document.getElementById("cl-pin");
const reqBtn = document.getElementById("req-btn");
const loanAmt = document.getElementById("loan-amt");
const sortBtn = document.getElementById("sort-btn");
const today = document.getElementsByClassName("today");

// Selector for int in and out Amount
let inH3Val;
let outH3Val;
let intH3Val;

// User Info
const user1 = {
  uName: "Johnnie Casey",
  trans: [1120, 4850, -600, 175, 9650, -2120, 5800, -4600],
  dates: [
    "2023-03-03T00:00:00.000Z",
    "2023-03-09T00:00:00.000Z",
    "2023-03-17T00:00:00.000Z",
    "2023-05-02T00:00:00.000Z",
    "2023-05-15T00:00:00.000Z",
    "2023-05-22T00:00:00.000Z",
    "2023-05-24T00:00:00.000Z",
    "2023-05-25T00:00:00.000Z",
  ],
  intRate: 1.2,
  pin: 1111,
};

const user2 = {
  uName: "Yanis Octavia",
  trans: [5400, -4800, 9500, -1200, 9600, 8250, -8000, 23500],
  dates: [
    "2023-04-12T00:00:00.000Z",
    "2023-04-28T00:00:00.000Z",
    "2023-05-18T00:00:00.000Z",
    "2023-06-05T00:00:00.000Z",
    "2023-07-06T00:00:00.000Z",
    "2023-07-17T00:00:00.000Z",
    "2023-07-26T00:00:00.000Z",
    "2023-08-07T00:00:00.000Z",
  ],
  intRate: 1.1,
  pin: 2222,
};

const user3 = {
  uName: "Fedor Alisa",
  trans: [2745, 8190, -5465, -2030, 7355, -2340, 8765, -5090, 7215, 3980],
  dates: [
    "2023-02-27T00:00:00.000Z",
    "2023-03-02T00:00:00.000Z",
    "2023-05-01T00:00:00.000Z",
    "2023-06-09T00:00:00.000Z",
    "2023-07-03T00:00:00.000Z",
    "2023-07-13T00:00:00.000Z",
    "2023-08-11T00:00:00.000Z",
    "2023-09-05T00:00:00.000Z",
    "2023-09-22T00:00:00.000Z",
    "2023-10-10T00:00:00.000Z",
  ],
  intRate: 1.5,
  pin: 3333,
};

const acc = [user1, user2, user3];

// Working on Dates
const currentTime = new Date();

// Format for date
const curr_dd = String(currentTime.getDate()).padStart(2, "0");
const curr_mm = String(currentTime.getMonth() + 1).padStart(2, "0");
const curr_yr = String(currentTime.getFullYear());

// Format for time
const curr_hr = String(currentTime.getHours()).padStart(2, "0");
const curr_min = String(currentTime.getMinutes()).padStart(2, "0");

// Replacing the date with the current date
today[0].textContent = `As on ${curr_dd}/${curr_mm}/${curr_yr}, ${curr_hr}:${curr_min}`;

// Recording transaction Date
const transDate = (user, i) => {
  const DDMMYY = [];
  const dateOfTrans = new Date(user["dates"][i]);

  // Pushing Date
  DDMMYY.push(String(dateOfTrans.getDate()).padStart(2, "0"));

  // Pushing Month
  DDMMYY.push(String(dateOfTrans.getMonth() + 1).padStart(2, "0"));

  // Pushing Year
  DDMMYY.push(String(dateOfTrans.getFullYear()));

  return DDMMYY;
};

// Pushing Transactions function
const transDetail = (user) => {
  user["trans"].forEach((item, index) => {
    if (item < 0) {
      miniStatement.insertAdjacentHTML(
        "afterbegin",
        `<div class="trans">
        <div class="date-tran-type">
          <div class="withdraw">${index + 1} WITHDRAW</div>
          <div class="date">${transDate(user, index)[0]}/${
          transDate(user, index)[1]
        }/${transDate(user, index)[2]}</div>
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
          <div class="date">${transDate(user, index)[0]}/${
          transDate(user, index)[1]
        }/${transDate(user, index)[2]}</div>
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

// Using login button
logInBtn.addEventListener("click", () => {
  loginFunc();
  clearInput();
});

// Recording User details
let currUsr;
let currUsrPIN;
let currUsrIndex;

// Recordig currUsrIndex
const calIndex = function (currUsr) {
  return acc.findIndex((users) => users.uid == currUsr);
};

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
      currUsrPIN = pinInput;
      currUsrIndex = calIndex(currUsr);

      // Backing up the transaction array for sorting
      transBackup = transDuplicate(currUsrIndex);
    }
  });
};

// Assigning enter to login, transfer, loan and close account
body.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    loginFunc();
    clearInput();
    transferFunc();
    closingAcc();
    clearClAcc();
    transLoan();
    clearLoan();
  }
});

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

// Update the records
const update = function (index) {
  transDetail(acc[index]);
  inAmt(acc[index]);
  int(acc[index]);
  outAmt(acc[index]);
  mainBal.textContent = `₹${(
    Number(inH3Val) +
    Number(intH3Val) +
    Number(outH3Val)
  ).toFixed(2)}`;
};

// Transferring money on Click
transAmtBtn.addEventListener("click", () => {
  transferFunc();
});

// Transfer money Function
const transferFunc = function () {
  acc.forEach((accountUid, i) => {
    if (
      payee.value == accountUid.uid &&
      payee.value != currUsr &&
      Number(transAmt.value) > 0 &&
      Number(transAmt.value) <=
        Number(inH3Val) + Number(intH3Val) + Number(outH3Val)
    ) {
      acc[currUsrIndex].trans.push(Number(`-${transAmt.value}`));
      acc[currUsrIndex].dates.push(currentTime.toISOString());
      update(currUsrIndex);

      // Add amount to transfree account
      acc[i].trans.push(Number(`${transAmt.value}`));
      acc[i].dates.push(currentTime.toISOString());

      // Deducting money to backup trans too
      transBackup.push(Number(`-${transAmt.value}`));
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

// Close Account on button click
clAccBtn.addEventListener("click", () => {
  closingAcc();
  clearClAcc();
});

// Closing Account Function
const closingAcc = function () {
  if (clAcc.value == currUsr && clPin.value == currUsrPIN) {
    acc.splice(currUsrIndex, 1);

    // Closing Acocunt

    // Changing the Welcome Message
    welcome.innerHTML = `Log in to get started`;

    // Adding the classes to hide components
    totalInAmt.classList.add("hidden");
    totalInt.classList.add("hidden");
    header.classList.add("hidden");
    actions.classList.add("hidden");
    logout.classList.add("hidden");
    sort.classList.add("hidden");
    totalOutAmt.classList.add("hidden");
    miniStatement.classList.add("opacity");
  }
};

// Clear Close Account Fields
const clearClAcc = function () {
  clAcc.value = "";
  clPin.value = "";
  clAcc.blur();
  clPin.blur();
};

// Granting Loan on click
reqBtn.addEventListener("click", () => {
  transLoan();
  clearLoan();
});

// Transferring the loan amount
const transLoan = function () {
  if (currUsrIndex != undefined) {
    const grantLoan = acc[currUsrIndex]["trans"].some(
      (amt) => Number(loanAmt.value) * 0.1 < amt
    );
    if (grantLoan == true && Number(loanAmt.value) > 0) {
      acc[currUsrIndex]["trans"].push(Math.trunc(Number(loanAmt.value)));
      acc[currUsrIndex]["dates"].push(currentTime.toISOString());
      update(currUsrIndex);
      transBackup.push(Math.trunc(Number(loanAmt.value)));
    }
  }
};

// Clear Laon Fields
const clearLoan = function () {
  loanAmt.value = "";
  loanAmt.blur();
};

// Sort Function

// Backing up trans array for sort purpose
const transDuplicate = () => acc[currUsrIndex].trans.slice();
let transBackup;

// Storing sorted values
const tranSort = () => {
  return acc[currUsrIndex]["trans"].sort((a, b) => a - b);
};

// Assigning default value to sort button
let sortCondition = false;

sortBtn.addEventListener("click", () => {
  miniStatement.innerHTML = "";
  if (!sortCondition) {
    tranSort();
    transDetail(acc[currUsrIndex]);
    sortCondition = true;
  } else {
    acc[currUsrIndex].trans = [...transBackup];
    transDetail(acc[currUsrIndex]);
    sortCondition = false;
  }
});

// For Testing Purpose

// Fake login on reload
body.addEventListener("keypress", (e) => {
  if (e.key === "i") {
    uId.value = "jc";
    PIN.value = "1111";
    logInBtn.click();
  }
});
