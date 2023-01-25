<template>
   <div>
  <AppHeader/>
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div class="grid grid-cols-2 row-gap-8 md:grid-cols-3">
        <div class="text-center md:border-r">
          <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl" v-if="deviceLogs1.length > 0 && deviceLogs3.length > 0">
             {{ deviceLogs1[0].message }}&#8451; / {{ deviceLogs3[0].message }}%
          </h6>
          <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
            Current Temperature / Humidity
          </p>
        </div>
        <div class="text-center md:border-r">
          <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">12</h6>
          <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
            New Alerts
          </p>
        </div>
        <div class="text-center">
          <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">5</h6>
          <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
            New Alarms
          </p>
        </div>
      </div>
    </div>
    <div class="px-20 mx-auto">
       <div class="grid grid-rows-1 grid-flow-col gap-4">
          <div v-if="isOutdated" class="alert-box bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert" style="border: solid;">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
            </svg>
            Outdated data - No data was recived by server!
          </div>
        </div>
      </div>
    </div>
</template>

<script >
import axios from 'axios';

export default {
  name: "deviceLogs",
    head() {
        return {
            title: "Index"
        }
    },
    data() {
      return {
        deviceLogs: [],
        deviceLogs1: [],
        deviceLogs3: []
      }
    },
    async fetch() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
            }
        }
        await axios.get("http://192.168.1.10/api/arduinoLogs/", config)
        .then(res => {
          this.deviceLogs = res.data;
          this.deviceLogs.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
          this.deviceLogs1 = this.deviceLogs.filter(log => log.device_id === 1) // filter by device_id 1
              .reduce((unique, item) => { // reduce to only one entry
                  return unique.find(log => log.device_id === item.device_id) ? unique : [...unique, item];
              }, []);
          this.deviceLogs3 = this.deviceLogs.filter(log => log.device_id === 3) // filter by device_id 3
              .reduce((unique, item) => { // reduce to only one entry
                  return unique.find(log => log.device_id === item.device_id) ? unique : [...unique, item];
              }, []);
        })
        .catch(err => console.log(err));
    },
    computed: {
        isOutdated() {
            if (!this.deviceLogs1.length || !this.deviceLogs3.length) {
                return false;
            }
            const currentTime = new Date();
            const logTime = new Date(this.deviceLogs1[0].created_at);
            const diffTime = currentTime - logTime;
            const diffMinutes = diffTime / (1000 * 60);
            return diffMinutes > 60;
        }
    },
  }

</script>
