<template>
    <div>
        <AppHeader />
        <div>
            <h1>{{ devices }}</h1>
        </div>
    </div>
</template>

<script lang="ts">

import axios from "axios";

export default {
    name: "devices",
    head() {
        return {
            title: "Devices"
        }
    },
    data() {
      return {
        devices: []
      }
    },
    async asyncData({   }) {
        const config = {
            headers:{
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
            }
        }
        const devices = await axios.get("http://192.168.1.10/api/arduinoDevice/", config);
        return { devices };
    },
}

</script>