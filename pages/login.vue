<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref } from "vue";

const email = ref<string>('')
const password = ref<string>('')
const isSending = ref<boolean>(false)
const config = useRuntimeConfig()

const login = async (e: Event) => {
    e.preventDefault()
    isSending.value = true

    try {
        const res = await axios.post(`${config.public.BACKEND_URL}/auth/login`, {
            email: email.value,
            password: password.value
        })
        const accessToken = res.data.token
        await axios.post('/api/save-token', {
            access_token: accessToken
        })

        isSending.value = false
    } catch (error) {
        isSending.value = false
        if (error instanceof AxiosError) {
            console.error(error.message);
        }
    }
}
</script>

<template>
    <NuxtLayout name="main">
        <div class="max-w-screen-md mx-auto p-5">
            <form @submit="login" class="grid gap-3">
                <div class="grid gap-1">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" class="border py-1 px-2" placeholder="user@mail.com"
                        required>
                </div>
                <div class="grid gap-1">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" class="border py-1 px-2" required>
                </div>
                <div>
                    <button type="submit"
                        class="bg-green-500 text-white hover:bg-green-600 py-2 px-3 disabled:bg-green-600"
                        :disabled="isSending">{{
                            isSending ? 'Loading...' : 'Login' }}</button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>