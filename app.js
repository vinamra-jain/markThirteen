const dateEl = document.querySelector("#dob");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector("#output");

const reverseStr = (str) => str.split("").reverse().join("");
const isPalindrome = (str) => str === reverseStr(str);
const convertDateToString = (date) => {
  let convertedDate = {};
  if (date.day < 10) {
    convertedDate.day = "0" + date.day;
  } else {
    convertedDate.day = date.day.toString();
  }
  if (date.month < 10) {
    convertedDate.month = "0" + date.month;
  } else {
    convertedDate.month = date.month.toString();
  }
  convertedDate.year = date.year.toString();
  return convertedDate;
};
const getAllVariations = (date) => {
  date = convertDateToString(date);
  const ddmmyyyy = date.day + date.month + date.year;
  const mmddyyyy = date.month + date.day + date.year;
  const yyyymmdd = date.year + date.month + date.day;
  const ddmmyy = date.day + date.month + date.year.slice(-2);
  const mmddyy = date.month + date.day + date.year.slice(-2);
  const yymmdd = date.year.slice(-2) + date.month + date.day;

  const variations = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  return variations;
};
const isPalindromeForAnyVariation = (date) => {
  const variations = getAllVariations(date);
  for (const typeVar of variations) {
    if (isPalindrome(typeVar)) {
      return true;
    }
  }
  return false;
};
const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};
const nextDate = (date) => {
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(date.year)) {
    daysInMonth[1] = 29;
  }
  date.day++;
  if (date.day > daysInMonth[date.month - 1]) {
    date.day = 1;
    date.month++;
  }
  if (date.month > 12) {
    date.month = 1;
    date.year++;
  }
  return date;
};
const nextPalindromeDate = (date) => {
  let numOfDays = 0;
  while (true) {
    numOfDays++;
    date = nextDate(date);
    if (isPalindromeForAnyVariation(date)) {
      return [numOfDays, date];
    }
  }
};

checkBtn.addEventListener("click", () => {
  let message = "";
  const dob = dateEl.value;
  if (dob !== "") {
    const dobArr = dob.split("-");
    const date = {
      day: Number(dobArr[2]),
      month: Number(dobArr[1]),
      year: Number(dobArr[0]),
    };
    if (isPalindromeForAnyVariation(date)) {
      message = "Yay! 🥳 Your Birthday is a Palindrome.";
    } else {
      let arr = nextPalindromeDate(date);
      const dayOrDays = arr[0] === 1 ? "day" : "days";

      message = `Alas! 😢 You missed by ${arr[0]} ${dayOrDays}. Next Palindrome date is ${arr[1].day}-${arr[1].month}-${arr[1].year}`;
    }
  }else{
    message = "You haven't entered your Date of Birth, yet!"
  }
  output.innerText = message;
});
