import { defineStore } from 'pinia';
import axios from 'axios';


export const store =  defineStore('main', {
  state(){
    return {
      messages: [],
      modules: []
    }
  },
  action: {
    setMessageAction(newValue) {
      this.state.messages.push(newValue)
    },
    clearMessageAction(index) {
      this.state.messages.splice(index, 1)
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

  actions: {
    async fetchModules() {
      try {
        const response = await axios.get('http://localhost:3000/modules');
        this.modules = response.data;
      } catch (error) {
      console.error('Error fetching modules:', error);
      }
    },
  }
})