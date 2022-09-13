<template>
    <div class="runningApps">
        <div class="apps">
            <div class="app" v-for="(item, index) in recommendData" :key="index">
                <img :src="getSrcStartIcon(`${item.url}.png`)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { recommendData } from '@/data/StartData.json';
import { getSrcStartIcon } from '@/utils/getSrc.js'

</script>

<style lang="scss" scoped>
.runningApps {
    position: absolute;
    right: 120px;
    bottom: 58px;
    width: 50px;
    background-color: $myBlue;
    padding: 10px;
    .apps {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        img {
            width: 18px;
            padding: 4px 2px 2px 0; 
        }
}
}
</style>