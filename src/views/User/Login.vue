<template>
    <div class="login flex flex-col justify-center items-center h-screen text-white font-mono">
        <div>
            <img src="/logo/Moeys.png" class="w-36">
            <p class="mt-2 text-sm">កម្មវិធី</p>
            <p class="font-bold text-2xl mt-2">ស្វ័យសិក្សា</p>
        </div>
        <div class="flex mt-10 text-sm">
            <button class="w-40 text-center border rounded-full h-10 hover:bg-white hover:text-primary">ទស្សនកិច្ចកម្មវិធី</button>
            <button class="w-40 text-center border rounded-full h-10 mx-5 hover:bg-white hover:text-primary">ចូលកម្មវិធី</button>
            <button class="w-40 text-center border rounded-full h-10 hover:bg-white hover:text-primary">គណនីថ្មី</button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .login{
        background-image: url("/assets/bg-login.jpg");
        background-size: cover;
        background-position: center center;
        
    }
</style>