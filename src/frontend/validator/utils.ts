export const containsOnlyEnglishLetters = (value: string) => {
  for (const char of value) {
    if (/\p{L}/u.test(char) && !/[A-Za-z]/.test(char)) {
      return false;
    }

    if (/\p{M}/u.test(char)) {
      return false;
    }
  }

  return true;
};

export const filterEnglishText = (value: string) => {
  return [...value]
    .filter((char) => {
      if (/\p{M}/u.test(char)) {
        return false;
      }

      return !/\p{L}/u.test(char) || /[A-Za-z]/.test(char);
    })
    .join("");
};
