import unicodedata


def contains_only_english_letters(value: str) -> bool:
    for char in value:
        category = unicodedata.category(char)

        if category.startswith("L") and not char.isascii():
            return False

        if category.startswith("M"):
            return False

    return True