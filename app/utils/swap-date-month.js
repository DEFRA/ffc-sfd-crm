const swapDateMonth = (date) => {
  const [datePart, timePart] = date.split(' ')
  const [day, month, year] = datePart.split('/')
  const newDate = `${month}/${day}/${year}`
  return `${newDate} ${timePart}`
}

module.exports = swapDateMonth
