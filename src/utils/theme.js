import '../assets/style/common/index.less'
import Color from 'color'
let prefix = 'nick-ui'
let theme = {
  primary: '#65BCCB',
  error: '#f00',
  warn: '#f10',
  accent: '#666'
}
let activeDarkness = 0.2
let hoverBrightness = 0.2
let focusBrightness = 0.2
let outlineActiveDarkness = 0.6
let outlineHoverBrightness = 0.6
let outlineFocusBrightness = 0.6

let style
const createStyleSheet = () => {
  const styleId = `${prefix}-theme`
  style = document.querySelector(`#${styleId}`) || document.createElement('style')
  if (!style[styleId]) {
    style.id = styleId
    document.head.append(style)
  }
  updateStyle()
}
const parseColor = (value) => {
  const valueNumber = parseFloat(value, 10)
  if (valueNumber && value > 0) {
    return valueNumber / 100
  }
}
const updateStyle = () => {
  let styleRules = ''
  for (let [themeName, themeColor] of Object.entries(theme)) {
    const baseColor = Color(themeColor)
    const hoverColor = baseColor.lighten(hoverBrightness).hex()
    const activeColor = baseColor.darken(activeDarkness).hex()
    const disabledColor = baseColor.grayscale(1)
    const outlineHoverColor = baseColor.lighten(outlineHoverBrightness).hex()
    const outlineActiveColor = baseColor.lighten(outlineActiveDarkness).hex()

    styleRules += `
    .${prefix}-${themeName} .${prefix}-ripple{
      color:${baseColor};
    }
  .${prefix}-${themeName}:enabled::before{
    background-color:${themeColor};
    border-color:${themeColor};
  }
  .${prefix}-${themeName}:enabled .${prefix}-inherit-${themeName}{
    color:${themeColor};
  }
  .${prefix}-${themeName}:disabled::before{
    background-color:${disabledColor};
    border-color:${disabledColor};
  }
  .${prefix}-${themeName}.${prefix}-${themeName}-outline:disabled{
    color:${disabledColor};
  }
  .${prefix}-${themeName}.${prefix}-${themeName}-outline:enabled{
    color:${activeColor};
    border:1px solid transparent;
  }
  .${prefix}-${themeName}.${prefix}-${themeName}-outline::before{
    background-color:initial;
  }
  .${prefix}-${themeName}.${prefix}-${themeName}-flat{
    color:${activeColor};
  }
  .${prefix}-${themeName}:enabled:hover .${prefix}-inherit-${themeName},.${prefix}-${themeName}:enabled .${prefix}-inherit-${themeName}-hover{
    color:${hoverColor};
  }
  .${prefix}-${themeName}:enabled:active .${prefix}-inherit-${themeName},.${prefix}-${themeName}:enabled .${prefix}-inherit-${themeName}-active{
    color:${activeColor};
  }
  .${prefix}-${themeName}.${prefix}-${themeName}-flat::before{
    background-color:initial;
  }
  .${prefix}-${themeName}.${prefix}-${themeName}-outline:enabled:hover::before,.${prefix}-${themeName}.${prefix}-${themeName}-flat:enabled:hover::before{
    background-color:${outlineHoverColor};
  }
  .${prefix}-${themeName}.${prefix}-${themeName}-outline:enabled:active::before,.${prefix}-${themeName}.${prefix}-${themeName}-flat:enabled:active::before{
    background-color:${outlineActiveColor};
  }
  .${prefix}-${themeName}:enabled:hover::before{
    background-color:${hoverColor};
    border-color:${hoverColor};
  }
  .${prefix}-${themeName}:enabled:active::before{
    background-color:${activeColor};
    border-color:${activeColor};
  }
`
  }
  style.innerHTML = styleRules
  // document.head.replaceChild(style, style)
}
// setInterval(() => {
//   theme.primary = Color({ r: parseInt(Math.random() * 255), g: parseInt(Math.random() * 255), b: parseInt(Math.random() * 255) })
//   updateStyle()
// }, 3000)

export default {
  get prefix () {
    return prefix
  },
  set prefix  (value) {
    if (value) {
      prefix = value
      createStyleSheet()
    }
  },
  get theme () {
    return theme
  },
  set theme  (value) {
    theme = Object.assign(theme, value)
    updateStyle()
  },
  set activeDarkness  (value) {
    activeDarkness = parseColor(value) || activeDarkness
  },
  set hoverBrightness  (value) {
    hoverBrightness = parseColor(value) || hoverBrightness
  },
  set focusBrightness  (value) {
    focusBrightness = parseColor(value) || focusBrightness
  },
  set outlineActiveDarkness  (value) {
    outlineActiveDarkness = parseColor(value) || outlineActiveDarkness
  },
  set outlineHoverBrightness  (value) {
    outlineHoverBrightness = parseColor(value) || outlineHoverBrightness
  },
  set outlineFocusBrightness  (value) {
    outlineFocusBrightness = parseColor(value) || outlineFocusBrightness
  },
  update () {
    updateStyle()
  }
}
