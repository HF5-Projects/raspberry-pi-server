<template>
    <div>
      <nav class="bg-gray-100">
        <div class="px-8 mx-auto border ">
          <div class="flex justify-between">
            <div class="flex space-x-4">
              <div>
                <nuxt-link to="/" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
                  <span class="font-bold">Scuffedware</span>
              </nuxt-link>
              </div>
              <!--First nav-->
              <div class="hidden md:flex flex items-center space-x-1">
                <nuxt-link to="/devices" class="py-5 px-2 text-gray-700 hover:text-gray-900">Devices</nuxt-link>
                <nuxt-link to="/graph" class="py-5 px-2 text-gray-700 hover:text-gray-900">Graph</nuxt-link>
              </div>
            </div>
            <!--second nav-->
          <div class="hidden md:flex flex items-center space-x-1">
            <nuxt-link  to="/login" class="py-5 px-3 hover:text-gray-900">Login</nuxt-link>
            <nuxt-link  to="/signup" class="py-2 px-3 bg-yellow-400 text-yellow-900 rounded hover:text-gray-900 hover:bg-yellow-300 hover:text-yellow-800 transition duration-300">Register</nuxt-link>
          </div>
    
            <!--Mobile button goes here -->
            <div class="md:hidden flex items-center mobile-menu-button">
              <button @click="hamburger">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!--Mobile menu-->
        <div class="mobile-menu" :class="{ hidden: hamburgerHidden }">
          <nuxt-link to="" class="block py-2 px-2 text-sm hover:bg-gray-200">Forside</nuxt-link>
          <nuxt-link to="" class="block py-2 px-2 text-sm hover:bg-gray-200">Dagens tilbud</nuxt-link>
          <nuxt-link to="" class="block py-2 px-2 text-sm hover:bg-gray-200">Login</nuxt-link>
          <nuxt-link to="" class="block py-2 px-2 text-sm hover:bg-gray-200">Register</nuxt-link>
        </div>
      </nav>
    </div>
    </template>
    
    
    <script>
    export default {
    name: 'AppNavbar',
      data() {
        return {
          hamburgerHidden: true
        }
      },
      methods:{
        hamburger(){
          this.hamburgerHidden = !this.hamburgerHidden
        }
      }
    };
    </script>
    
    
    <style>
    </style>