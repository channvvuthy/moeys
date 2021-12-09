<template>
    <div class="flex justify-center items-center h-screen relative">
        <div class="text-center">
            <img src="/logo/Moeys.png" class="w-36" v-if="moeys">
            <img src="/logo/UYFC.png" class="w-36" v-else>
            <LoadingIndicator></LoadingIndicator>
        </div>
        <div class="footer fixed bottom-0 left-0 h-20 w-full"></div>
    </div>
</template>
<script>
import LoadingIndicator from "./../../components/LoadingIndicator.vue"
export default {
    name:"SplashScreen",
    components:{
        LoadingIndicator
    },
    data(){
        return{
            moeys: true
        }
    },
    methods:{
        splashScreenSlide(){
            let movingSplashScreen = 1;
            let movingIndicator = setInterval(()=>{
                movingSplashScreen ++

                if(movingSplashScreen >= 3){
                    this.moeys = false
                }
                if(movingSplashScreen >= 5){
                    clearInterval(movingIndicator)
                    this.$router.push({
                        name:"Login"
                    })
                }

            },1000)
        }
    },
    mounted(){
        this.splashScreenSlide()
    }
}
</script>
<style>
    .footer{
        background-image: url("/assets/footer.png");
        background-size:cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
</style>