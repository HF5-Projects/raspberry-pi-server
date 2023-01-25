<template>
    <div>
        <div class=" ml-4 max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" :src="devicesData.images_path" :alt="devicesData.name">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{ devicesData.name }}</div>
            </div>
            <div class="px-6 pt-4 pb-2">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="updateDevice">Update Info</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="viewLogs">View Log</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteDevice">Delete</button>
            </div>
        </div>
    </div>
</template>


<script>
import swal from "sweetalert2";
import axios from "axios";

export default {
    name: "DevicesData",
    props: ["devicesData", "id", "images_path"],

    methods: {
        updateDevice() {
            swal.fire({
                title: 'Update device infor',
                html: `<input type="text" id="updateDevice" class="swal2-input" placeholder="Device new name">`,
                confirmButtonColor: "green",
                confirmButtonText: 'Update',
                focusConfirm: false,
                preConfirm: (res) => {
                    const updateDevices = swal.getPopup().querySelector('#updateDevice').value
                    return { updateDevice: updateDevices }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: 'put',
                        url: "http://192.168.1.10/api/arduinoDevice/id/" + this.devicesData.id,
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
                        },
                        data: {
                            name: result.value.updateDevice
                        }
                    }).then(()=>{
                        this.devicesData.name = result.value.updateDevice;
                    }).catch(err => console.log(err));
                }

            })
        },
        viewLogs() {
            swal({
                title: `ViewLogs!`,
                text: "Write something interesting:",
                input: 'text',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {

                }
            })
        },
        deleteDevice() {
            swal({
                title: `Here's a message!`,
                text: "Write something interesting:",
                input: 'text',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {

                }
            })
        }
    }
}
</script>


<style>
.dataBox {
    padding: 1rem;
    border: 1px dotted #ccc;
    margin: 1rem 0;
}
</style>
