import { defineStore } from 'pinia';
import axios from 'axios';


export const useMainStore =  defineStore('main', {
  state(){
    return {
      messages: [],
      books: [],
      modules: [],
      cart: JSON.parse(localStorage.getItem('cart')) || []
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
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data;
      } catch (error) {
        this.addMessage(error.message);
      }
    },
    async addBook(newBook) {
      try {
        const response = await axios.post('http://localhost:3000/books', newBook);
        this.books.push(response.data);
        this.addMessage('Libro añadido correctamente');
      } catch (error) {
        this.addMessage(error.message);
      }
    },
    async updateBook(id, updatedBook) {
      try {
        await axios.put(`http://localhost:3000/books/${id}`, updatedBook);
        const index = this.books.findIndex((book) => book.id === id);
        if (index !== -1) {
          this.books[index] = { ...this.books[index], ...updatedBook };
        }
        this.addMessage('Libro actualizado correctamente');
      } catch (error) {
        this.addMessage(error.message);
      }
    },
    async deleteBook(id) {
      try {
        await axios.delete(`http://localhost:3000/books/${id}`);
        this.books = this.books.filter((book) => book.id !== id);
        this.addMessage('Libro eliminado correctamente');
      } catch (error) {
        this.addMessage(error.message);
      }
    },
    addTocart(book) {
      const exists = this.cart.find((item) => item.id === book.id);
      if (!exists) {
        this.cart.push(book);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      } else {
        console.warn('El libro ya está en el carrito');
      }
    },
    async removeToCart(idbook){
      this.cart = this.cart.filter((book) => book.id !== idbook);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    async clearCart(){
      this.cart = [];
      localStorage.removeItem('cart');
    },
    addMessage(message) {
      this.messages.push(message);
    },
    clearMessage(index) {
      this.messages.splice(index, 1);
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