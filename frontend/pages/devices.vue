<template>
    <appHeader/>
</template>

<script lang="ts">

import  axios  from "axios";

export default{
    data(){
        return{
            devicesData: []
        }
    },
    async created(){
        const config = {
            headers:{
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
            }
        }

        try {
            const res = await axios.get("http://192.168.1.10/api/arduinoDevice/", config);
            this.devicesData = res.data;
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }   
}

</script>