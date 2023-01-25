<template>
    <div>
        <AppHeader />
        <div class="grid grid-rows-10 grid-flow-col gap-4 p-4">

            <!-- temp -->
            <div :class="currentTempColor" class="pt-2" role="alert">
                <strong class="font-bold">{{ currentTempText }}</strong>
            </div>
            
            <!-- humid -->
            <div :class="currentHumidColor" role="alert">
                <strong class="font-bold">{{ currentHumidText }}</strong>
            </div>

            <!-- sound -->
            <div :class="currentSoundColor" role="alert">
                <strong class="font-bold">{{ currentSoundText }}</strong>
            </div>

            <div class="row-span-5 col-span-1">
                <div class="p-2 border border-gray-500">
                    <label class="block mb-2 font-bold"> Server room settings </label>
                    <div v-for="alarmSetting in alarmSettings" :key="alarmSetting.id">
                        <span class="block sm:inline">{{ alarmSetting.name }}: </span>
                        <span class="block sm:inline font-bold">{{ alarmSetting.value }}</span>
                    </div>
                </div>
            </div>
        </div>




    </div>
</template>


<script>
import axios from "axios";

export default {
    name: "alarms",
    head() {
        return {
            title: "Alarms"
        }
    },
    data() {
        return {
            tempColors: {
                alarm: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
                alert: "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative",
                success: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative",
            },
            tempTexts: {
                alarm: "Alarm - The temperature is too high",
                alert: "Alert - The temperature is too low",
                success: "Success - The temperature is normal",
            },
            humidColors: {
                alarm: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
                alert: "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative",
                success: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative",
            },
            humidTexts: {
                alarm: "Alarm - The humidity is too high",
                alert: "Alert - The humidity is too low",
                success: "Success - The humidity is normal",
            },
            soundColors: {
                alarm: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
                alert: "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative",
                success: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative",
            },
            soundTexts: {
                alarm: "Alarm - The noise is too high",
                success: "Success - The noise is normal",
            },
            currentTempColor: "",
            currentTempText: "",
            currentHumidColor: "",
            currentHumidText: "",
            currentSoundColor: "",
            currentSoundText: "",
            newestTemp: 0,
            newestHum: 0,
            newestSound: 0,
            alarmSettings: [],
            temp_tooHigh_alert: 0,
            temp_tooLow_warning: 0,
            humid_tooHigh_alert: 0,
            humid_tooLow_warning: 0,
            noise_tooHigh_alert: 0

        }
    },
    async fetch() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
            }
        }
        await axios.get(`http://192.168.1.10/api/arduinoLogs/date1/${new Date().toISOString().split('T')[0]}/date2/${new Date().toISOString().split('T')[0]}`, config)
            .then(res => {
                this.newestTemp = res.data.filter(device => device.device_id === 1).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0].message;
                this.newestHum = res.data.filter(device => device.device_id === 3).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0].message;
                this.newestSound = res.data.filter(device => device.device_id === 2).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0].message;
                console.log(this.newestTemp);
                console.log(this.newestHum);
                console.log(this.newestSound);
            })
            .catch(err => console.log(err));
        await axios.get(`http://192.168.1.10/api/settings`, config)
            .then(res => {
                this.alarmSettings = res.data;
                this.setAlerts();
            })
            .catch(err => console.log(err));
    },
    methods: {
        setAlerts() {

            this.temp_tooHigh_alert = this.alarmSettings.find(x => x.name === "temp_tooHigh_alert").value;
            this.temp_tooLow_warning = this.alarmSettings.find(x => x.name === "temp_tooLow_warning").value;
            this.humid_tooHigh_alert = this.alarmSettings.find(x => x.name === "humid_tooHigh_alert").value;
            this.humid_tooLow_warning = this.alarmSettings.find(x => x.name === "humid_tooLow_warning").value;
            this.noise_tooHigh_alert = this.alarmSettings.find(x => x.name === "noise_tooHigh_alert").value;


            if (this.newestTemp > this.temp_tooHigh_alert) {
                this.currentTempColor = this.tempColors.alarm;
                this.currentTempText = this.tempTexts.alarm;
            }
            else if (this.newestTemp < this.temp_tooLow_warning) {
                this.currentTempColor = this.tempColors.alert;
                this.currentTempText = this.tempTexts.alert;
            }
            else {
                this.currentTempColor = this.tempColors.success;
                this.currentTempText = this.tempTexts.success;
            }
            if (this.newestHumid > this.humid_tooHigh_alert) {
                this.currentHumidColor = this.humidColors.alarm;
                this.currentHumidText = this.humidTexts.alarm;
            }
            else if (this.newestHumid < this.humid_tooLow_warning) {
                this.currentHumidColor = this.humidColors.alert;
                this.currentHumidText = this.humidTexts.alert;
            }
            else {
                this.currentHumidColor = this.humidColors.success;
                this.currentHumidText = this.humidTexts.success;
            }
            if (this.newestSound > this.noise_tooHigh_alert) {
                this.currentSoundColor = this.soundColors.alarm;
                this.currentSoundText = this.soundTexts.alarm;
            }
            else {
                this.currentSoundColor = this.soundColors.success;
                this.currentSoundText = this.soundTexts.success;
            }
        }
    }
}

</script>


<style>

</style>