<template>
    <div></div>
</template>
<script>
export default {
    created(){
        this.$router.push({
            name:"Watch",
            params:{
                vidId: this.$route.params.vidId
            }
        })
    }
}
</script>