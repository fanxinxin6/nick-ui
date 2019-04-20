<style>
#app,
body,
html {
  height: 100%;
}
.nick-scroll {
  width: 200px;
  height: 200px;
}
.test {
  height: 600px;
  background: pink;
  border: 2px solid blue;
}
</style>

<template>
  <div id="app" style="padding:100px">
    <Button>按钮1</Button>
    <Button size="small">按钮2</Button>
    <Button size="large">按钮3</Button>
    <Button shape="circle" size="small">按钮2</Button>
    <Button shape="circle" size="large">按钮3</Button>
    <Button shape="round" size="small">按钮2</Button>
    <Button shape="round" size="large">按钮3按钮3</Button>
    <Button shape="round" >按钮3按钮3按钮3按钮3</Button>
    <Button outline>按钮2</Button>
    <Button outline size="small">按钮2</Button>
    <Button outline size="large">按钮2</Button>
    <Button outline>按钮2</Button>
    <Button flat size="small">按钮2</Button>
    <Button flat size="large">按钮2</Button>
    <Button style="width:100px;height:32px" flat>按钮2</Button>
  </div>
</template>

<script>
import Button from './components/button/'
import ButtonGroup from './components/buttonGroup/'
import Radio from './components/radio/'
import RadioGroup from './components/radioGroup/'
import CheckBox from './components/checkbox/'
import CheckboxGroup from './components/checkboxGroup/'
import Switch1 from './components/switch/'
import SwitchGroup from './components/switchGroup/'
import Toast, { message } from './components/toast/'

export default {
  name: 'app',
  components: {
    Button,
    ButtonGroup,
    Radio,
    RadioGroup,
    CheckBox,
    CheckboxGroup,
    Switch1,
    SwitchGroup,
    Toast
  },
  data () {
    setTimeout(() => {
      //   this.a = true
    }, 1000)
    return {
      r: '1',
      c: ['2'],
      s: ['3'],
      h: 0,
      a: '2'
    }
  },
  methods: {
    msg () {
      const { t1, t2 } = this.$refs
      t2.message({
        message: '423d'
      })
    }
  }
}
</script>
