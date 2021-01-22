<template>
  <div>
    <p>hi {{ name }} {{ name2 }}</p>
    <p class="text-sm opacity-50">
      <em>dynamic.route</em>
    </p>
    <button class="btn m-3 text-sm mt-8" @click="change">
      点击
    </button>
    <div>
      <button class="btn m-3 text-sm mt-8" @click="back">
        Back
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  setup () {
    const name2 = reactive({
      random: 0
    })
    const router = useRouter()
    const back = () => router.push('/')
    const change = () => {
      name2.random = Math.random()
    }
    return {
      back,
      change,
      name2
    }
  }
})
</script>
