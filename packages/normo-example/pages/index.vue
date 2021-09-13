<template>
  <hr>
  sotre: {{ account }}
  {{ userRoleInfo }}
  <div>
    <p>
      <a href="https://github.com/fulus06/normojs" target="_blank"> normojs </a>
    </p>
    <p class="text-sm opacity-50">
      <em>描述：仿nuxtjs</em>
    </p>

    <input
      v-model="name"
      placeholder="请输入 name"
      style="width: 250px"
      @keydown.enter="go"
    >

    <div>
      <button class="btn m-3 text-sm" :disabled="!name" @click="go">
        go
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@normo/vue'

import { useRouter } from '@normo/vue-router'
import { mapState } from '@normo/vuex'
export default defineComponent({
  setup () {
    const name = ref('')
    const router = useRouter()
    const go = () => {
      if (name.value) router.push(`/hi/${encodeURIComponent(name.value)}`)
    }

    return {
      go,
      name
    }
  },
  computed: {
    ...mapState({
      state: state => state,
      // @ts-nocheck
      account: state => state.account,
      // @ts-nocheck
      accountInfo: (state) => { return state.account.info },
      // @ts-nocheck
      userRole: state => state.user.role,
      // @ts-nocheck
      userRoleInfo: state => state.user.role.info
    })
  }
})
</script>
