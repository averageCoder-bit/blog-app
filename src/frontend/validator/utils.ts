export const containsOnlyEnglishLetters = (value: string) => {
  for (const char of value) {
    if (/\p{L}/u.test(char) && !/[A-Za-z]/.test(char)) {
      return false;
    }
  }

  return true;
};

export const filterEnglishText = (value: string) => {
  return [...value]
    .filter((char) => !/\p{L}/u.test(char) || /[A-Za-z]/.test(char))
    .join("");
};
