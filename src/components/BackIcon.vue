<template>
    <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
        <g :fill="fill">
            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>
        </g>
    </svg>
</template>
<script>
    export default{
        name: "BackIcon",
        props: {
            size: {
                type: Number,
                default: function () {
                    return 24;
                }
            },
            fill:{
                default:() =>{
                    return "#000000"
                }
            }
        }
    }
</script>