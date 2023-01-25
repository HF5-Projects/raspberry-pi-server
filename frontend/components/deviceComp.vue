<template>
    <div>
        <div class=" ml-4 max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" :src="devicesData.images_path" :alt="devicesData.name">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{ devicesData.name }}</div>
            </div>
            <div class="px-6 pt-4 pb-2">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="updateDevice()">Update Info</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="viewLogs()">View Log</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="deleteDevice()">Delete</button>
            </div>
        </div>
    </div>
</template>


<script>
import swal from "sweetalert2";
import axios from "axios";

export default {
    name: "DevicesData",
    props: ["devicesData", "id"],

    methods: {
        updateDevice() {
            swal.fire({
                title: 'Update device infor',
                html: `<input type="text" id="updateDevice" class="swal2-input" placeholder="Device new name"><br/><input type="file" id="myFile" name="filename">`,
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
                    }).then(() => {
                        this.devicesData.name = result.value.updateDevice;
                    }).catch(err => console.log(err));
                }

            })
        },
        async viewLogs() {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
                }
            }
            await axios.get("http://192.168.1.10/api/arduinoLogs/device_id/" + this.devicesData.id, config)
                .then(res => {
                    let htmlS = "<table><tr><th>ID</th><th>Device ID</th><th>Message</th><th>Created at</th><th>Updated at</th>";

                    for (let index = 0; index < res.data.length; index++) {
                        htmlS += "<tr><td>" + res.data[index].id + "</td><td>" + res.data[index].device_id + "</td><td>" + res.data[index].message + "</td><td>" + new Date(res.data[index].created_at).toLocaleString() + "</td><td>" + new Date(res.data[index].updated_at).toLocaleString() + "</td></tr>"
                    }

                    htmlS += "</tr></table>";

                    swal.fire({
                        title: this.devicesData.name + ` logs`,
                        html: htmlS,
                        customClass: 'swal-wide',
                    })
                })
                .catch(err => console.log(err));
        },
        deleteDevice() {
            swal.fire({
                title: 'Are you sure you want to delete ' + this.devicesData.name,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                console.log(this.devicesData.id);
                if (result.isConfirmed) {
                    axios({
                        method: 'delete',
                        url: "http://192.168.1.10/api/arduinoDevice/id/" + this.devicesData.id,
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTZXJ2ZXJBUEkiLCJuYW1lIjoiU2VydmVyQVBJVG9rZW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk2OTAwMjU2MiwiaXNzIjoiU2VydmVyQVBJIiwiYXVkIjoiU2VydmVyQVBJVXNlcnMifQ.yJ7gnG7GXkJvL1oECQ7bdIs5JVC-X1gUUe87q7Wm42U'
                        }
                    }).then(() => {
                        swal.fire(
                            'Deleted!',
                            this.devicesData.name + " has been delete",
                            'success'
                        )
                    }).catch(() => {
                        swal.fire({
                            title: 'Error!',
                            text: 'You cant delete let the device because it has logs',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    });
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

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

.swal-wide {
    width: 900px !important;
    overflow-y: scroll;
    max-height: 90vh;
}
</style>
