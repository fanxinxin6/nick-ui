<template>
  <div id="app">
    <div>
      asdf
      <ui-button></ui-button>
      <ui-button-group></ui-button-group>
      <ui-radio></ui-radio>
      <ui-radio-group></ui-radio-group>
      <ui-checkbox></ui-checkbox>
      <ui-checkbox-group></ui-checkbox-group>
      <ui-select></ui-select>
      <ui-dropdown></ui-dropdown>
      <ui-switch></ui-switch>
      <ui-toast></ui-toast>
      <ui-modal></ui-modal>
      <ui-tabs></ui-tabs>
      <ui-dialog></ui-dialog>
    </div>
  </div>
</template>

<script>
import ui from './'
import vue from 'vue'
vue.use(ui)
export default {
  name: 'app',
  components: {
  }
}
</script>
