<template>
  <br>
  math {{ Math.random() }}
  <hr>
  sotre: {{ account }}
  <br>
  ---
  <br>
  {{ userRoleInfo }}
  <br>

  user/role/getter#getUserRoleInfo: {{ getUserRoleInfo }}
  <br>
  <br>
  user/getter#getInfo: {{ getInfo }}
  <br>
  ===
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
import { defineComponent, ref } from 'vue'

import { useRouter } from 'vue-router'
import { mapState, mapGetters } from 'vuex'
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
    }),
    ...mapGetters('user/role', {
      getUserRoleInfo: 'getUserRoleInfo'
    }),
    ...mapGetters('user', {
      getInfo: 'getInfo'
    })

  }
})
</script>
