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
    <div>
      <Button>auto按钮</Button>
      <Button size="small">small按钮</Button>
      <Button size="large">large按钮</Button>
      <Button disabled size="large">large按钮</Button>
      <Button custom="accent" size="large">large按钮</Button>
    </div>
    <div>
      <Button custom="accent" outline>flat auto按钮</Button>
      <Button outline size="small">small按钮</Button>
      <Button flat size="large">flat按钮</Button>
      <Button outline disabled size="large">large按钮</Button>
    </div>
    <div>
      <Radio>asdf</Radio>
    </div>
    <div v-if="0">
      <template v-if="1">
        <nick-button disabled>按钮</nick-button>
        <nick-button size="small" shape="circle">按钮</nick-button>
        <nick-button flat size="large" shape="round">按钮flat</nick-button>
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
        <nick-switch size="small" v-model="s" value="2">002</nick-switch>
        <nick-switch size="large" disabled v-model="s" value="3">003</nick-switch>
        <nick-switch v-model="s" disabled value="4">004</nick-switch>
        <nick-switch-group v-model="s">
          <nick-switch value="1">001</nick-switch>
          <nick-switch value="2">002</nick-switch>
          <nick-switch value="3">003</nick-switch>
          <nick-switch value="4">004</nick-switch>
        </nick-switch-group>
        <nick-select></nick-select>
        <nick-dropdown></nick-dropdown>
        <nick-toast></nick-toast>
        <nick-modal :visible.sync="a" :full-screen="false">456asdf</nick-modal>
        <nick-tabs></nick-tabs>
        <nick-dialog></nick-dialog>
      </template>
      <div v-if="1" class="display-flex flex-wrap">
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
        <nick-scroll>
          <div class="test"></div>
        </nick-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import Theme from './utils/theme'
import Button from './components/button/'
import Radio from './components/radio/'
Theme.prefix = 'nick'
export default {
  name: 'app',
  components: {
    Button, Radio
  },
  data () {
    setTimeout(() => {
      //   this.a = true
    }, 1000)
    return {
      r: '1',
      c: ['2'],
      s: ['3'],
      a: false,
      h: 0
    }
  }
}
</script>
