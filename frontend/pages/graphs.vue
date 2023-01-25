<template>
    <div>
        <AppHeader />
        <div style="padding: 5px; padding-top: 10px">Pick a date <client-only><date-picker v-model="current_date"
                    @input="changeDate()" valueType="format" type="date" range></date-picker></client-only></div>
        <div class="p-2 border border-gray-500 mt-4">
            <label class="block mb-2 font-bold"> Temperature chart </label>

            <client-only>
                <LineChart :data="temperatureChart" />
            </client-only>
        </div>
        <div class="p-2 border border-gray-500 mt-4">
            <label class="block mb-2 font-bold"> Humidity chart </label>

            <client-only>
                <LineChart :data="humidityChart" />
            </client-only>
        </div>
        <div class="p-2 border border-gray-500 mt-4">
            <label class="block mb-2 font-bold"> Sound chart </label>

            <client-only>
                <LineChart :data="soundChart" />
            </client-only>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
    name: "graphs",
    head() {
        return {
            title: "Graphs"
        }
    },
    computed: {
        soundLabels() {
            return this.deviceLogs.filter(deviceLog => deviceLog.device_id == 2).map(deviceLog => deviceLog.created_at.split('T')[0]) || [];
        },
        soundData() {
            return this.deviceLogs.filter(deviceLog => deviceLog.device_id == 2).map(deviceLog => deviceLog.message) || [];

        },
        temperatureData() {
            return this.deviceLogs.filter(deviceLog => deviceLog.device_id == 1).map(deviceLog => deviceLog.message) || [];
        },
        temperatureLabels() {
            return this.deviceLogs.filter(deviceLog => deviceLog.device_id == 1).map(deviceLog => deviceLog.created_at.split('T')[0]) || [];
        },
        humidityData() {
            return this.deviceLogs.filter(deviceLog => deviceLog.device_id == 3).map(deviceLog => deviceLog.message) || [];
        },
        humidityLabels() {
            return this.deviceLogs.filter(deviceLog => deviceLog.device_id == 3).map(deviceLog => deviceLog.created_at.split('T')[0]) || [];
        },
        soundChart() {
            return {
                labels: this.soundLabels,
                datasets: [
                    {
                        label: 'Visualization',
                        data: this.soundData,
                        backgroundColor: [
                            'rgba(20, 255, 0, 0.85)',
                            'rgba(200, 5, 0, 0.85)',
                            'rgba(10, 220, 0, 0.85)',
                            'rgba(2, 100, 0, 0.85)',
                            'rgba(20, 55, 0, 0.85)',
                            'rgba(120, 155, 0, 0.85)'
                        ],
                        borderColor: 'rgba(100, 155, 0, 1)',
                        borderWidth: 0
                    }
                ]
            }
        },
        temperatureChart() {
            return {
                labels: this.temperatureLabels,
                datasets: [
                    {
                        label: 'Visualization',
                        data: this.temperatureData,
                        backgroundColor: [
                            'rgba(20, 255, 0, 0.85)',
                            'rgba(200, 5, 0, 0.85)',
                            'rgba(10, 220, 0, 0.85)',
                            'rgba(2, 100, 0, 0.85)',
                            'rgba(20, 55, 0, 0.85)',
                            'rgba(120, 155, 0, 0.85)'
                        ],
                        borderColor: 'rgba(100, 155, 0, 1)',
                        borderWidth: 0
                    }
                ]
            }
        },
        humidityChart() {
            return {
                labels: this.humidityLabels,
                datasets: [
                    {
                        label: 'Visualization',
                        data: this.humidityData,
                        backgroundColor: [
                            'rgba(20, 255, 0, 0.85)',
                            'rgba(200, 5, 0, 0.85)',
                            'rgba(10, 220, 0, 0.85)',
                            'rgba(2, 100, 0, 0.85)',
                            'rgba(20, 55, 0, 0.85)',
                            'rgba(120, 155, 0, 0.85)'
                        ],
                        borderColor: 'rgba(100, 155, 0, 1)',
                        borderWidth: 0
                    }
                ]
            }
        },
    },
    data() {
        return {
            current_date: [new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]],
            deviceLogs: [],
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom',
                },
                layout: {
                    padding: {
                        top: 35,
                        right: 15,
                    }
                },
            }
        }
    },
    async fetch() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
            }
        }
        await axios.get(`http://192.168.1.10/api/arduinoLogs/date1/${this.current_date[0]}/date2/${this.current_date[1]}`, config)
            .then(res => {
                this.deviceLogs = res.data;
                this.deviceLogs.sort((a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at);
                });
            })
            .catch(err => console.log(err));
    },
    methods: {
        changeDate() {
            this.$fetch();
        }
    }
}

</script>


<style>

</style>