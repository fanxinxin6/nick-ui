<style>
html,
body {
  height: 100%;
}
.nick-scroll {
  width: 200px;
  height: 200px;
}
.test {
  width: 50px;
  background: pink;
  border: 2px solid blue;
}
.test1 {
  position: absolute;
  left: 50%;
  top: 50px;
  border: 2px solid red;
}
  .test2 {
    position: absolute;
    width: 200px;
    background: pink;
    animation: a 2s  both;
    bottom: 0;
  }

@keyframes a{
  0%{
    height: 0;
  }
  100%{
    height: 200px;
  }
}
.ttf {
  width: 350px;
  height: 200px;
  border: 2px solid red;
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
      <Radio custom="accent" size="large" v-model="r" value="3">3333</Radio>
      <Radio size="large" disabled v-model="r" value="3">444</Radio>
      <Radio size="large" v-model="r" value="5">555</Radio>
      <radio-group v-model="r">
        <Radio size="small" value="2">2222</Radio>
        <Radio custom="accent" size="large" value="3">3333</Radio>
        <Radio size="large" disabled value="3">444</Radio>
        <Radio size="large" value="5">555</Radio>
      </radio-group>
    </div>
    <div class="checkbox-test">
      <CheckBox @change="c1" value="1">c11111</CheckBox>
      <CheckBox disabled v-model="c" value="2">c2222</CheckBox>
      <CheckBox @change="c1" v-model="c" value="3">c33333</CheckBox>
      <CheckBox v-model="c" value="4">c4444</CheckBox>
      <checkbox-group v-model="c">
        <CheckBox @change="c1" value="1">1111</CheckBox>
        <CheckBox value="2">1111</CheckBox>
        <CheckBox value="3">1111</CheckBox>
        <CheckBox value="4">1111</CheckBox>
      </checkbox-group>
    </div>
    <div class="switch-test">
      <Switch1 value="1">asdfds</Switch1>
      <Switch1 custom="error" size="small" v-model="c" value="2">asdfds</Switch1>
      <Switch1 size="large" v-model="c" value="3">asdfds</Switch1>
    </div>
    <div class="popover-test">
      <Popover :duration="0" placement="top">
        <div class="test">
          asdlkal
          <Button size="small">按钮2</Button>
        </div>
        <Button @click="test" slot="reference" size="small">按钮2s</Button>
      </Popover>
    </div>
    <div class="tooltip-test">
      <Tooltip tooltip-class="fff" class="afb" placement="right-bottom" trigger="click" content="afasd">
        <Button @click="test2" size="small">按钮662</Button>
      </Tooltip>
      {{f1}}
    </div>
    <div class="toast-test">
      <!-- <Toast class="ttf" :inner="true" :duration="0">
        <p slot="content" a="sdf" @click="close">afffff</p>
      </Toast>-->
    </div>
    <div class="notice-test">
      <Notice content="aa66">
        <div @click="close1">asdaf999--{{f1}}</div>
      </Notice>
    </div>
    <div class="modal-test">
      <Modal>asdf</Modal>
    </div>
    <div class="test1">
      <div class="test2"></div>
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
import Toast, { toast } from './components/toast/'
import Popover from './components/popover/'
import Tooltip from './components/tooltip/'
import Notice from './components/notice/'
import Modal from './components/modal/'
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
    Toast,
    Popover,
    Tooltip,
    Notice,
    Modal
  },
  data () {
    setInterval(() => {
      // this.f1++
    }, 200)
    setTimeout(() => {
      //   this.a = true
    }, 200)
    return {
      r: '1',
      c: ['2'],
      s: ['3'],
      h: 0,
      a: '2',
      f1: 1
    }
  },
  methods: {
    close (context) {
      context.close()
      console.log(context, 2)
    },
    close1 (context) {
      context.close()
      console.log(context, 2)
    },
    c1 (a) {
      // console.log(a)
    },
    msg () {
      const { t1, t2 } = this.$refs
      // t2.message({
      //   message: '423d'
      // })
    },
    test () {
      const f = toast({
        // duration: 0,
        content: <div>a1</div>
      })
      setTimeout(() => {
        // f.content = <div>a2</div>
      }, 1000)
    },
    test2 () {
      this.f1++
    }
  }
}
</script>
