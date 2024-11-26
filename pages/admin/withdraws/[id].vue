<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from "vue";

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const withdraw = ref<Withdraw>()
const firstLoading = ref<boolean>(true)
const showMore = ref<boolean>(true)
const image = ref<File>()

onMounted(() => {
    getWithdraw()
})

const getWithdraw = async (cursor?: string) => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/admin/withdraws/${route.params.id}`, {
            withCredentials: true
        })

        withdraw.value = res.data.data

        if (firstLoading.value) {
            firstLoading.value = false
        }
    } catch (error) {
        console.error(error);
    }
}

const acceptWithdraw = async (event: Event) => {
    event.preventDefault()

    const confirmation = confirm('Accept?')
    if (!confirmation || !image.value) {
        return
    }

    try {
        const formData = new FormData()
        formData.append('image', image.value)

        const res = await axios.patch(`${config.public.BACKEND_URL}/admin/withdraws/${route.params.id}/accept`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })

        console.log(res);
        router.push('/admin/withdraws')
    } catch (error) {
        // 
    }
}

const handleFile = (event: Event) => {
    const input = event.target as HTMLInputElement
    console.log(input.files);
    if (input.files) {
        image.value = input.files[0]
    }
}

watch(() => route.query, async () => {
    await getWithdraw()
    showMore.value = true
})
</script>

<template>
    <NuxtLayout name="authenticated">
        <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-semibold">Withdraw</h1>
            <p v-if="firstLoading">Loading...</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2" v-if="!firstLoading && withdraw">
                <form @submit="acceptWithdraw" class="p-3 bg-gray-100 border" :id="withdraw.id">
                    <p>Rp {{ withdraw.amount }}</p>
                    <p>By {{ withdraw.user.username }}</p>
                    <div class="grid mt-2 gap-1">
                        <input type="file" name="image" id="image" v-on:change="handleFile" required>
                        <button type="submit"
                            class="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-2">ACCEPT</button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>