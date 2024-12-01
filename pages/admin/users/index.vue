<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch, watchEffect } from "vue";
import type { Users } from "~/utils/Types";

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const users = ref<Users>()
const search = ref<string>("")

onMounted(() => {
    getUsers()
})

const getUsers = async () => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/admin/users`, {
            withCredentials: true,
            params: {
                identifier: route.query.identifier
            }
        })
        const data = res.data.users as Users
        users.value = data

    } catch (error) {
        console.error(error);
    }
}

const deleteUser = async (username: string) => {
    const confirmation = window.confirm('Delete confirmation')
    if (!confirmation) {
        return
    }
    try {
        await axios.delete(`${config.public.BACKEND_URL}/admin/users/${username}`, {
            withCredentials: true
        })
        await getUsers()
        alert('Deleted!')
    } catch (error) {
        console.error(error);
    }
}

const onSearch = (e: Event) => {
    e.preventDefault();
    router.push(`/admin/users?identifier=${search.value}`)
}

watch(() => route.query, () => {
    getUsers()
})

// watchEffect(() => {
//     getUsers()
// })
</script>

<template>
    <NuxtLayout name="authenticated">
        <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-semibold">Users</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <form class="flex w-full items-center md:col-span-2 gap-2" @submit="onSearch">
                    <input type="text" name="identifier" id="identifier" class="border py-2 px-3 w-full"
                        placeholder="Username/Email" v-model="search">
                    <button type="submit" class="py-2 px-3 bg-green-500 text-white">Search</button>
                </form>
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
                    <div class="flex gap-2 justify-between">
                        <NuxtLink :to="`/admin/users/${user.username}/edit`" class="text-blue-500 hover:text-blue-600">
                            Edit</NuxtLink>
                        <button type="button" class="text-red-500 hover:text-red-600"
                            @click="deleteUser(user.username)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>