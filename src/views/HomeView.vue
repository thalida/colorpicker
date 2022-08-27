<template>
  <div class="wrapper">
    <ColorPicker style="margin: 50px" mode="solid" :degree="45" :gradients="g" @colorChanged="changed" />
    <ColorPicker style="margin: 50px" mode="solid" :supportedModes="['linear', 'solid']" :degree="45" :gradients="g"
      @colorChanged="changed" :showOpacityPicker="false" />
    <ColorPicker ref="colorPickerRef" style="margin: 50px" mode="solid" :supportedModes="['linear', 'solid']"
      :degree="45" :gradients="g" @colorChanged="changed" :showOpacityPicker="false" />
    <ColorPicker ref="colorPickerRef" style="margin: 50px" mode="solid" :supportedModes="['linear', 'solid']"
      :degree="45" :color="{ r: 255, g: 255, b: 0, a: 1 }" :gradients="[]" @colorChanged="changed"
      :showOpacityPicker="false" />
    <ColorPicker style="margin: 50px" mode="solid" :supportedModes="['solid', 'linear']" :degree="45" :gradients="g"
      @colorChanged="changed" :showOpacityPicker="false" :showDegreePicker="false" :showPanelOnly="true" />
  </div>
</template>

<script setup>
import ColorPicker from '../components/ColorPicker.vue'
// import ColorPicker from '@mcistudio/vue-colorpicker'
// import '@mcistudio/vue-colorpicker/dist/style.css'
import { onMounted, ref } from 'vue'
const colorPickerRef = ref(null)
const g = ref([
  { id: 0, percent: 0, color: { r: 255, g: 10, b: 20, a: 1 } },
  { id: 1, percent: 100, color: { r: 59, g: 50, b: 240, a: 1 } },
])
function changed(color) {
  console.log('changed', color)
}

onMounted(() => {
  colorPickerRef.value.openPanel()
})
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
}
</style>
