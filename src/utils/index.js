export const createFrameworkClass = (props = {}, prefix, prefixClass = 'nick') => {
  const className = new Set()
  const themeClass = new Set(['custom', 'outline', 'flat'])
  for (let [key, value] of Object.entries(props)) {
    if (value === true || value === '') {
      if (themeClass.has(key)) {
        className.add(`${prefix}-${props.custom}-${key}`)
      } else {
        className.add(prefixClass === key ? prefixClass : `${prefixClass}-${key}`)
      }
    } else if (value) {
      if (themeClass.has(key)) {
        className.add(`${prefix}-${value}`)
      } else {
        className.add(prefixClass === value ? prefixClass : `${prefixClass}-${value}`)
      }
    }
  }
  return [...className].join(' ')
}
