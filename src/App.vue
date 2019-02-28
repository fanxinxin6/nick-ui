<template>
  <div id="app">
    <div>asdf
      <nick-button disabled>按钮</nick-button>
      <nick-button size="small" shape="circle">按钮</nick-button>
      <nick-button size="large" shape="round">按钮</nick-button>
      <nick-button-group>
        <div>asdflk</div>
        <div>asdflk</div>
        <Button size="small">asdfasd</Button>
        <nick-button size="small" shape="circle">按钮</nick-button>
        <nick-button size="small" shape="circle">按钮</nick-button>
      </nick-button-group>
      <nick-radio v-model="r" value="2" disabled size="small">2222</nick-radio>
      <nick-radio v-model="r" value="3" size="large">3333</nick-radio>
      <nick-radio-group v-model="r">
        <h2>asdlfk</h2>
        <nick-radio value="1">1111</nick-radio>
        <Radio value="2">2222</Radio>
      </nick-radio-group>
      <nick-radio v-model="r" value="1">1111</nick-radio>
      <Radio v-model="r" value="2">2222</Radio>
      <Radio v-model="r" disabled value="3">3333</Radio>
      <Radio v-model="r" value="3">3333</Radio>
      <hr>
      <nick-checkbox v-model="c" value="1">001</nick-checkbox>
      <nick-checkbox size="small" v-model="c" value="2">002</nick-checkbox>
      <nick-checkbox size="large" v-model="c" value="3">003</nick-checkbox>
      <nick-checkbox v-model="c" value="4">004</nick-checkbox>
      <nick-checkbox-group v-model="c">
        <nick-checkbox value="1">001</nick-checkbox>
        <nick-checkbox disabled value="2">002</nick-checkbox>
      </nick-checkbox-group>
      <hr>
      <nick-switch v-model="s" value="1">001</nick-switch>
      <nick-switch v-model="s" value="2">002</nick-switch>
      <nick-switch v-model="s" value="3">003</nick-switch>
      <nick-switch v-model="s" value="4">004</nick-switch>

      <nick-select></nick-select>
      <nick-dropdown></nick-dropdown>
      <nick-toast></nick-toast>
      <nick-modal></nick-modal>
      <nick-tabs></nick-tabs>
      <nick-dialog></nick-dialog>
    </div>
  </div>
</template>

<script>
import ui, { Button, Radio } from './'
import vue from 'vue'
vue.use(ui)
export default {
  name: 'app',
  components: {
    Button,
    Radio
  },
  data () {
    return {
      r: '1',
      c: ['2'],
      s: ['3']
    }
  }
}
</script>
