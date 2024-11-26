<script setup lang="ts">
import logout from '~/utils/logout'

const logoutNow = async () => {
    await logout()
    setTimeout(() => {
        window.location.href = '/login'
    }, 500);
}
</script>

<template>
    <aside class="sticky top-0 w-40 border-r h-screen flex-shrink-0 flex-grow-0 overflow-y-hidden">
        <div class="flex flex-col overflow-y-auto h-full pt-5">
            <NuxtLink to="/admin" class="hover:bg-gray-200 py-2 px-3" active-class="bg-gray-100">Home</NuxtLink>
            <NuxtLink to="/admin/users" class="hover:bg-gray-200 py-2 px-3" active-class="bg-gray-100">Users</NuxtLink>
            <NuxtLink to="/admin/withdraws?is_pending=true" class="hover:bg-gray-200 py-2 px-3" active-class="bg-gray-100">Withdraws</NuxtLink>
            <button type="button" class="hover:bg-gray-200 py-2 px-3 text-red-500" @click="logoutNow">Logout</button>
        </div>
    </aside>
</template>