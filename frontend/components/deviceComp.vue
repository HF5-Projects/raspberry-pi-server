<template>
    <div class="dataBox">
        <p>{{ devicesData.name }}</p>
    </div>
  </template>
  
  <script lang="ts">
  
  export default{
    name: "DevicesData",
    props: ["devicesData", "id"]

  }
  </script>


<style>
.dataBox{
    padding: 1rem;
    border: 1px dotted #ccc;
    margin: 1rem 0;
}
</style>
  