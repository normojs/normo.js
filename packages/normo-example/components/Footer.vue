<template>
  <div class="text-xl" style="display: flex;">
    <div class="icon-btn mx-2" @click="isDark = !isDark">
      DM
    </div>
    footer
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '@/utils'

export default defineComponent({
  setup () {
    return { isDark }
  }
})
</script>
