<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from "vue";
import type { Users } from "~/utils/Types";

const config = useRuntimeConfig()

const users = ref<Users>()

onMounted(() => {
    getUsers()
})

const getUsers = async () => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/users`, {
            withCredentials: true
        })
        const data = res.data.users as Users
        users.value = data

    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <NuxtLayout name="authenticated">
        <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-semibold">Users</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div v-for="user in users" class="bg-gray-100 p-3 border">
                    <p>{{ user.name }} ({{ user.username }})</p>
                    <p>{{ user.email }}</p>
                    <p>Balance: Rp {{ user.balance }}</p>
                    <div class="flex items-start gap-1">
                        <p>Roles</p>
                        <div class="flex flex-wrap gap-1">
                            <span v-for="role in user.roles"
                                class="bg-gray-500 text-white py-1 px-2 border text-xs uppercase">
                                {{ role.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>