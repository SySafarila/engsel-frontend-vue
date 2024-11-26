<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from "vue";
import type { Withdraws } from "~/utils/Types";

const config = useRuntimeConfig()
const route = useRoute()
const withdraws = ref<Withdraws>([])
const firstLoading = ref<boolean>(true)
const showMore = ref<boolean>(true)

onMounted(() => {
    getWithdraws()
})

const getWithdraws = async (cursor?: string) => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/admin/withdraws`, {
            withCredentials: true,
            params: {
                is_pending: route.query.is_pending,
                cursor: cursor
            }
        })
        const data = res.data.data as Withdraws
        if (cursor) {
            withdraws.value = withdraws.value.concat(data)
            if (data.length == 0) {
                showMore.value = false
            }
        } else {
            withdraws.value = data
        }

        if (firstLoading.value) {
            firstLoading.value = false
        }
    } catch (error) {
        console.error(error);
    }
}

const acceptWithdraw = async (id: string) => {
    const confirmation = confirm('Accept?')
    if (!confirmation) {
        return
    }
    try {
        await axios.patch(`${config.public.BACKEND_URL}/admin/withdraws/${id}/accept`, null, {
            withCredentials: true
        })
        await getWithdraws()
    } catch (error) {
        // 
    }
}

watch(() => route.query, () => {
    getWithdraws()
})
</script>

<template>
    <NuxtLayout name="authenticated">
        <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-semibold">Withdraws</h1>
            <div class="flex gap-2">
                <NuxtLink to="/admin/withdraws?is_pending=true"
                    :class="`bg-gray-100 border w-full text-center py-2 px-3 ${route.query.is_pending == 'true' ? 'bg-gray-200' : ''}`">
                    Pending</NuxtLink>
                <NuxtLink to="/admin/withdraws?is_pending=false"
                    :class="`bg-gray-100 border w-full text-center py-2 px-3 ${route.query.is_pending == 'false' ? 'bg-gray-200' : ''}`">
                    Success</NuxtLink>
            </div>
            <p v-if="firstLoading">Loading...</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2" v-if="!firstLoading">
                <div v-for="withdraw in withdraws" class="p-3 bg-gray-100 border" :key="withdraw.id" :id="withdraw.id">
                    <p>Rp {{ withdraw.amount }}</p>
                    <p>By {{ withdraw.user.username }}</p>
                    <div class="flex justify-between items-center">
                        <p v-if="withdraw.is_pending == true">Pending</p>
                        <p v-if="withdraw.is_pending == false">Sukses</p>
                        <button type="button" class="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-2"
                            @click="acceptWithdraw(withdraw.id)" v-if="withdraw.is_pending == true">ACCEPT</button>
                    </div>
                </div>
                <button type="button" class="md:col-span-2 bg-gray-100 py-2 border hover:bg-gray-200"
                    @click="getWithdraws(withdraws[withdraws.length - 1].id)"
                    v-if="withdraws.length > 0 && showMore == true">More</button>
            </div>
        </div>
    </NuxtLayout>
</template>