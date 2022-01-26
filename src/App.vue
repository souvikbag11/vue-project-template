<template>
  <div id="app">
    <component :is="this.$route.meta.layout || 'default-layout'">
      <router-view/>
    </component>
  </div>
</template>

<script>
import defaultLayout from '@/layouts/default'

export default {
  components: {
    defaultLayout
  },
}
</script>
