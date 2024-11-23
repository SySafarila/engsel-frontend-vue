<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { onMounted } from "vue";
import Sidebar from '~/components/admin/Sidebar.vue';
import useUserData from "~/composables/useUserData";
import type { CurrentUserResponse } from '~/utils/Types';
import logout from '~/utils/logout';

const { userData, setUserData } = useUserData()

const config = useRuntimeConfig()

onMounted(() => {
    getCurrentUser()
})

const getCurrentUser = async () => {
    const acceptedRoles = ['super-admin', 'admin']
    let pass: boolean = false;
    if (userData.value) {
        return
    }
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/auth/me`, {
            withCredentials: true
        })
        const data = res.data as CurrentUserResponse

        data.roles.forEach(role => {
            if (acceptedRoles.includes(role.name)) {
                pass = true
            }
        })

        if (!pass) {
            await logout().then(() => {
                setTimeout(() => {
                    window.location.href = '/login'
                }, 500);
            })
        }

        setUserData({
            email: data.user.email,
            id: data.user.id,
            name: data.user.name
        })
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
            await logout().then(() => {
                setTimeout(() => {
                    window.location.href = '/login'
                }, 500);
            })
        }
    }
}
</script>

<template>
    <div class="max-w-screen-lg w-full mx-auto flex">
        <Sidebar />
        <div class="p-5 border-r w-full">
            <slot />
        </div>
    </div>
</template>