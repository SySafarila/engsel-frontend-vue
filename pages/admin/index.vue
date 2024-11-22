<script setup lang="ts">
import useUserData from '~/composables/useUserData'

const { userData, setUserData } = useUserData()

</script>

<template>
    <NuxtLayout name="authenticated">
        <div class="flex flex-col gap-4">
            <h1 class="text-2xl font-semibold">Hello {{ userData?.name }}</h1>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div class="bg-gray-100 border p-3 flex items-center gap-y-1 gap-x-2 justify-center flex-wrap flex-col lg:flex-row">
                    <span class="text-center">Donations</span>
                    <span class="font-bold">0</span>
                </div>
                <div class="bg-gray-100 border p-3 flex items-center gap-y-1 gap-x-2 justify-center flex-wrap flex-col lg:flex-row">
                    <span class="text-center">Users</span>
                    <span class="font-bold">5</span>
                </div>
                <div class="bg-gray-100 border p-3 flex items-center gap-y-1 gap-x-2 justify-center flex-wrap flex-col lg:flex-row">
                    <span class="text-center">Pending Withdraw</span>
                    <span class="font-bold">0</span>
                </div>
                <div class="bg-gray-100 border p-3 flex items-center gap-y-1 gap-x-2 justify-center flex-wrap flex-col lg:flex-row">
                    <span class="text-center">Success Withdraw</span>
                    <span class="font-bold">5</span>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>