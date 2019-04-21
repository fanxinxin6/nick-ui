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
    <div class="button-test">
      <button-group>
        <Button>按钮1</Button>
        <Button size="small">按钮2</Button>
        <Button disabled custom="error" size="large">按钮3</Button>
        <Button shape="circle" size="small">按钮2</Button>
        <Button shape="circle" size="large">按钮3</Button>
      </button-group>
      <Button shape="round" size="small">按钮2</Button>
      <Button shape="round" size="large">按钮3按钮3</Button>
      <Button shape="round">按钮3按钮3按钮3按钮3</Button>
      <Button outline>按钮2</Button>
      <Button outline size="small">按钮2</Button>
      <Button outline size="large">按钮2</Button>
      <Button outline>按钮2</Button>
      <Button flat size="small">按钮2</Button>
      <Button flat size="large">按钮2</Button>
      <Button flat>按钮2</Button>
    </div>
    <div class="radio-test">
      <Radio v-model="r" value="1">1111</Radio>
      <Radio size="small" v-model="r" value="2">2222</Radio>
      <Radio size="large" v-model="r" value="3">3333</Radio>
      <Radio size="large" disabled v-model="r" value="3">444</Radio>
      <Radio size="large" v-model="r" value="5">555</Radio>
    </div>
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
