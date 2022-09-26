<template>
    <div class="PdfFullBox FullBox">
        <ToolBar>pdf</ToolBar>
        <main>
             <div style="height:100%;">
                <embed width="100%" height="100%"  src="http://101.200.127.178/kiss.pdf">
            </div>
        </main>
    </div>
</template>

<script setup>
import ToolBar from '../ToolBar'
</script>

<style lang="scss" scoped>
 main {
     height: 100%
 }
</style>