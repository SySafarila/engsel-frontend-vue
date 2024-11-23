<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from "vue";
import type { Roles, User } from "~/utils/Types";

const route = useRoute()
const config = useRuntimeConfig()
const user = ref<User>()
const roles = ref<Roles>([])
const name = ref<string>("")
const username = ref<string>("")


onMounted(() => {
    getRoles()
    getUser()
})

const getRoles = async () => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/roles`, {
            withCredentials: true
        })
        const data = res.data.data as Roles
        roles.value = data
    } catch (error) {
        // 
    }
}

const getUser = async () => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/users/${route.params.username}`, {
            withCredentials: true
        })
        const data = res.data.user as User
        user.value = {
            balance: data.balance,
            // email: data.email,
            id: data.id,
            name: data.name,
            username: data.username,
            roles: data.roles,
        }

        name.value = data.name
        username.value = data.username
    } catch (error) {
        console.error(error);
    }
}

const checkRole = (roleCheck: string): boolean => {
    let found = false
    user.value?.roles.forEach(role => {
        if (role.name == roleCheck) {
            found = true
        }
    });
    return found
}

const saveUser = async (event: Event) => {
    event.preventDefault()
    const rolesDOM = document.querySelectorAll("[name=role]");
    const selectedRoles: string[] = []
    rolesDOM.forEach(el => {
        const el2 = el as HTMLInputElement
        if (el2.checked == true) {
            selectedRoles.push(el2.value)
        }
    })

    const body = {
        name: name.value,
        username: username.value,
        roles: selectedRoles
    }

    try {
        await axios.patch(`${config.public.BACKEND_URL}/users/${route.params.username}`, body, {
            withCredentials: true
        })
        await getUser()
        alert('updated!')
    } catch (error) {
        // 
    }
}
</script>

<template>
    <NuxtLayout name="authenticated">
        <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-semibold">Edit Users</h1>
            <form class="grid grid-cols-1 md:grid-cols-2 gap-2" @submit="saveUser">
                <div class="grid gap-1">
                    <label for="name" class="capitalize">name</label>
                    <input type="text" name="name" id="name" v-model="name" class="border py-1 px-2" required>
                </div>

                <div class="grid gap-1">
                    <label for="username" class="capitalize">username</label>
                    <input type="text" name="username" id="username" v-model="username" class="border py-1 px-2"
                        required>
                </div>
                <div class="grid gap-1">
                    <label for="roles" class="capitalize">roles</label>
                    <div class="flex items-center gap-2" v-for="role in roles">
                        <input type="checkbox" name="role" :id="`role-${role.name}`" :checked="checkRole(role.name)"
                            :value="role.name">
                        <label :for="`role-${role.name}`">{{ role.name }}</label>
                    </div>
                </div>
                <div class="md:col-span-2">
                    <button type="submit"
                        class="bg-green-500 text-white hover:bg-green-600 py-2 px-3 disabled:bg-green-600">Save</button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>