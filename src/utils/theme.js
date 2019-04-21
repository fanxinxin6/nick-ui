import '../assets/style/common/index.less'
import Color from 'color'
let prefix = 'nick-ui'
let theme = {
  primary: '#3f51b5',
  error: '#65bccb',
  warn: '#f10',
  accent: '#999',
  text: '#999'
}
let outlineActiveDarkness = 0.6
let outlineHoverBrightness = 0.6

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
const updateStyle = () => {
  let styleRules = ''
  for (let [themeName, themeColor] of Object.entries(theme)) {
    const baseColor = Color(themeColor)
    for (let i = 1; i <= 10; i++) {
      const num = i * 0.05
      const lightenColor = baseColor.lighten(num).hex()
      const darkenColor = baseColor.darken(num).hex()
      theme[`${themeName}-lighten-${i}`] = lightenColor
      theme[`${themeName}-darken-${i}`] = darkenColor
      styleRules += `
      .${prefix}-${themeName}-lighten-${i}{
        background-color:${lightenColor};
      }
      .${prefix}-${themeName}-inherit-lighten-${i}{
        color:${lightenColor};
      }
      .${prefix}-${themeName}-darken-${i}{
        background-color:${darkenColor};
      }
      .${prefix}-${themeName}-inherit-darken-${i}{
        color:${darkenColor};
      }
      `
    }
    const hoverColor = theme[`${themeName}-lighten-3`]
    // const focusColor = theme[`${themeName}-lighten-3`]
    const activeColor = theme[`${themeName}-darken-2`]
    const disabledColor = 'rgba(0,0,0,0.12)'// theme[`${themeName}-lighten-8`]
    const disabledCurrentColor = 'rgba(0,0,0,0.26)'
    // 每个主题色加亮暗度10个级别
    styleRules += `
  .${prefix}-${themeName}:enabled .${prefix}-${themeName},.${prefix}-${themeName}-currentColor{
    color:${baseColor};
  }
  .${prefix}-${themeName}:enabled:hover .${prefix}-${themeName}{
    color:${hoverColor};
  }
  .${prefix}-${themeName}:disabled .${prefix}-${themeName}{
    color:${disabledColor};
  }
  .${prefix}-${themeName}:disabled.${prefix}-${themeName}-currentColor{
    color:${disabledCurrentColor};
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
  update () {
    updateStyle()
  }
}
// 加若干主题 每个主题色设置10个明亮色值
// hover  focus active  disabled 单独设置或从十个值中取
