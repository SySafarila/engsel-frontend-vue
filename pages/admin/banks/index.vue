<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from "vue";
import type { Banks, Withdraws } from "~/utils/Types";

const config = useRuntimeConfig()
const route = useRoute()
const banks = ref<Banks>([])
const firstLoading = ref<boolean>(true)
const showMore = ref<boolean>(true)

onMounted(() => {
    getPendingBanks()
})

const getPendingBanks = async (cursor?: string) => {
    try {
        const res = await axios.get(`${config.public.BACKEND_URL}/admin/banks`, {
            withCredentials: true,
        })
        const data = res.data.data as Banks
        banks.value = data

        // if (cursor) {
        //     withdraws.value = withdraws.value.concat(data)
        //     if (data.length == 0) {
        //         showMore.value = false
        //     }
        // } else {
        //     withdraws.value = data
        // }

        if (firstLoading.value) {
            firstLoading.value = false
        }
    } catch (error) {
        console.error(error);
    }
}

const acceptBank = async (id: string) => {
    const confirmation = confirm('Accept?')
    if (!confirmation) {
        return
    }
    try {
        await axios.patch(`${config.public.BACKEND_URL}/admin/banks/${id}/accept`, null, {
            withCredentials: true
        })
        await getPendingBanks()
    } catch (error) {
        // 
    }
}

// watch(() => route.query, async () => {
//     await getPendingBanks()
//     showMore.value = true
// })
</script>

<template>
    <NuxtLayout name="authenticated">
        <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-semibold">Unverified Banks</h1>
            <p v-if="firstLoading">Loading...</p>
            <p v-if="!firstLoading && banks.length == 0">Data tidak ada</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2" v-if="!firstLoading">
                <div v-for="bank in banks" class="p-3 bg-gray-100 border" :key="bank.id" :id="bank.id">
                    <p class="uppercase">{{ bank.bank }}</p>
                    <p>No: {{ bank.number }}</p>
                    <p>Name: {{ bank.user.name }}</p>
                    <div class="flex justify-end items-center">
                        <button type="button"
                            class="bg-green-500 text-white hover:bg-green-600 py-2 px-3 disabled:bg-green-600"
                            @click="acceptBank(bank.id)">Accept</button>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>