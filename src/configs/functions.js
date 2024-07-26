function truncateString(text, maxLength) {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '..';
  } else {
    return text;
  }
}

export { truncateString }
