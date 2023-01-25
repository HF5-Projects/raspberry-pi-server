<template>
    <div>
        <appHeader/>
        <div class="flex flex-row mt-8 ml-3 justify-center">
            <deviceComp v-for="devicesData in devices" :key="devicesData.id" :id="devicesData.id" :devicesData="devicesData"/>
        </div>
    </div>
</template>

<script>

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
        devices: {}
      }
    },
    async fetch() { 
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
            }
        }
        await axios.get("http://192.168.1.10/api/arduinoDevice/", config)
        .then(res => {
            this.devices = res.data;
        })
        .catch(err => console.log(err));
    }
}

</script>