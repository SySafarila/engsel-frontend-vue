<script setup lang="ts">
definePageMeta({
    // middleware: ['auth']
})
</script>

<template>
    <NuxtLayout name="authenticated">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ullam architecto, animi aperiam facere amet
            incidunt accusantium nesciunt dolore veniam officia praesentium suscipit quasi, ducimus pariatur autem
            voluptatibus labore tenetur.</p>
        <NuxtLink to="/admin/a">Page</NuxtLink>
    </NuxtLayout>
</template>