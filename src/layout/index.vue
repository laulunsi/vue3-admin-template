<template>
  <SideLayout />
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import SideLayout from './SideLayout/index.vue'

const settingStore = useSetting()

watchEffect(() => {
  const classes = ['showGreyMode', 'showColorWeakness']
  const rootClassList = document.documentElement.classList
  classes.forEach((className) => rootClassList.contains(className) && rootClassList.remove(className))
  if (settingStore.showGreyMode) rootClassList.add('showGreyMode')
  if (settingStore.showColorWeakness) rootClassList.add('showColorWeakness')
})
</script>

<style lang="scss" scoped></style>
