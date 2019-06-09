<template>
    <button @click="sendMessageToPdfService"> SEND </button>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import axios from 'axios';

    @Component
    export default class UploadComponent extends Vue{

      sendMessageToPdfService(): void {
        const uploadUrl = "http://localhost:3001/pdf";
        const fileDetails = { 'fileName': 'uploaded-file', 'fileId': 'uploaded-file-id'}

        axios.post(uploadUrl, fileDetails);
      }

    }
</script>

<style scoped>

</style>
