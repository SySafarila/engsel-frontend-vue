<script setup lang="ts">
import { onMounted } from "vue";
import axios from 'axios';

const config = useRuntimeConfig()

onMounted(() => {
    getCurrentUser()
})

const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/auth/me`, {
            withCredentials: true
        })

        console.log(res);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <slot />
</template>