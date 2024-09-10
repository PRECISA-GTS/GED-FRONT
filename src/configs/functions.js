function truncateString(text, maxLength) {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '..';
  } else {
    return text;
  }
}

const fractionedToFloat = value => {
  if (!value) return
  const formattedStr = value.replace('.', '').replace(',', '.')
  const floatNumber = parseFloat(formattedStr)
  return floatNumber
}

const floatToFractioned = (value) => {
  if (!value) return '0,000'

  return value
    .toFixed(3)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export { truncateString, fractionedToFloat, floatToFractioned }
