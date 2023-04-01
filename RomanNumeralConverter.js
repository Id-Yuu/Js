function convertToRoman(num) {
const number = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

let arrs = "";

for (var index = 0; index < number.length; index++) {
   while (number[index] <= num) {
      arrs += roman[index];
      num -= number[index];
   }
}

return arrs;
}

convertToRoman(36);
