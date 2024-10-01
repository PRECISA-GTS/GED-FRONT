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

const canConfigForm = (menu, route) => {
  let canConfig = false
  menu.map(divisor => {
    divisor.menu.map(menu_ => {
      if (menu_.submenu && menu_.submenu.length > 0) {
        menu_.submenu.map(submenu => {
          if (submenu.rota == route) canConfig = true
        })
      }
    })
  })
  return canConfig
}

const convertNewLinesToBr = (text) => {
  return text.replace(/\n/g, '<br />')
}

const limitString = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
}

export { truncateString, fractionedToFloat, floatToFractioned, canConfigForm, convertNewLinesToBr, limitString }
