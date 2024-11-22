<script setup lang="ts">
import { onMounted } from "vue";
import axios from 'axios';
import useUserData from "~/composables/useUserData";

const { userData, setUserData } = useUserData()

const config = useRuntimeConfig()

onMounted(() => {
    getCurrentUser()
})

const getCurrentUser = async () => {
    if (userData.value) {
        return
    }
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/auth/me`, {
            withCredentials: true
        })

        console.log(res);
        setUserData({
            email: res.data.user.email,
            id: res.data.user.id,
            name: res.data.user.name
        })
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <slot />
</template>