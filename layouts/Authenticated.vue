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

const handleSidebarBackdrop = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const sidebar = document.getElementById('sidebar')
    const sidebarBackdrop = document.getElementById('sidebar-backdrop')
    if (sidebar && sidebarBackdrop) {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open')
            sidebarBackdrop.classList.add('hidden')
        } else {
            sidebar.classList.add('open')
            sidebarBackdrop.classList.remove('hidden')
        }
    }
}
</script>

<template>
    <nav class="px-5 py-3 border-b md:hidden flex justify-between fixed w-full bg-white">
        <NuxtLink to="/admin">Engsel</NuxtLink>
        <button @click="handleSidebarBackdrop">Menu</button>
    </nav>
    <div class="max-w-screen-lg w-full mx-auto flex">
        <Sidebar />
        <div id="sidebar-backdrop"
            class="fixed top-0 left-0 w-full h-full bg-black/25 backdrop-blur-[2px] z-10 md:hidden hidden"
            @click="handleSidebarBackdrop" />
        <div class="p-5 border-r w-full mt-[49px] md:mt-0">
            <slot />
        </div>
    </div>
</template>