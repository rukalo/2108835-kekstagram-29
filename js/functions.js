const isStringMaxLenght = (string, maxLength) => string.lenght <= maxLength;

isStringMaxLenght ('проверяемая строка', 20);

const isPalindrome = (text) => {
  const rawStr = text
    .replaceAll(' ', '')
    .toLowerCase();

  return rawStr === text.split(' ').reverse().join('');
};

isPalindrome('Клоп Лёва вёл полк');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого
// положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
const returnNumber = (text) => {
  if (text === 'number') {
    return text;
  }

  let result = ' ';

  for (const char of text) {
    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }
  return parseInt(result, 10) ;
};

returnNumber('2023 год');
