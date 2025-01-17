import { defineStore } from 'pinia';
import axios from 'axios';


export const useMainStore =  defineStore('main', {
  state(){
    return {
      messages: [],
      modules: []
    }
  },
  actions: {
    async setMessageAction(newValue) {
      await this.messages.push(newValue)     
    },
    async clearMessageAction(index) {
      await this.messages.splice(index, 1)
    },
    async fetchModules() {
      try {
        const response = await axios.get('http://localhost:3000/modules');
        this.modules = response.data;
      } catch (error) {
      console.error('Error fetching modules:', error);
      }
    },
  },
  getters: {
    getModulesCliteral(){
      return this.modules.map(module => {
        return {
          code: module.code,
          cliteral: module.cliteral,
        }
      })
      
    },
    
  },

})