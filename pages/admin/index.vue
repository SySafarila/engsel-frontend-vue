<script setup lang="ts">
import useUserData from '~/composables/useUserData'
definePageMeta({
    // middleware: ['auth']
})
const { userData, setUserData } = useUserData()

</script>

<template>
    <NuxtLayout name="authenticated">
        <p>{{ userData?.name }}</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ullam architecto, animi aperiam facere amet
            incidunt accusantium nesciunt dolore veniam officia praesentium suscipit quasi, ducimus pariatur autem
            voluptatibus labore tenetur.</p>
        <NuxtLink to="/admin/a">Page</NuxtLink>
    </NuxtLayout>
</template>