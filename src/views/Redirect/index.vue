<template>
  <div></div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Redirect' })

const route = useRoute()
const router = useRouter()

/** created */
router.replace({ path: `/${route.params.path}`, query: route.query })
</script>
