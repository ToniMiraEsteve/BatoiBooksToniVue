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
    async fetchModules() {
      try {
        const response = await axios.get('http://localhost:3000/modules');
        this.modules = response.data;
      } catch (error) {
        this.addMessage({ text: 'Error fetching modules', type: 'error' });
      }
    },
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data;
      } catch (error) {
        this.addMessage({ text: error.message, type: 'error'});
      }
    },
    async addBook(newBook) {
      try {
        const response = await axios.post('http://localhost:3000/books', newBook);
        this.books.push(response.data);
        this.addMessage({ text: 'Libro añadido correctamente', type: 'success'});
      } catch (error) {
        this.addMessage({ text: error.message, type: 'error'});
      }
    },
    async updateBook(id, updatedBook) {
      try {
        await axios.put(`http://localhost:3000/books/${id}`, updatedBook);
        const index = this.books.findIndex((book) => book.id === id);
        if (index !== -1) {
          this.books[index] = { ...this.books[index], ...updatedBook };
        }
        this.addMessage({ text: 'Libro actualizado correctamente', type: 'success'});
      } catch (error) {
        this.addMessage({ text: error.message, type: 'error'});
      }
    },
    async deleteBook(id) {
      try {
        await axios.delete(`http://localhost:3000/books/${id}`);
        this.books = this.books.filter((book) => book.id !== id);
        this.cart = this.cart.filter((book) => book.id !== id);
        this.addMessage({ text:'Libro eliminado correctamente', type: 'success'});
      } catch (error) {
        this.addMessage({ text: error.message, type: 'error'});
      }
    },
    async addTocart(book) {
      const exists = this.cart.find((item) => item.id === book.id);
      if (!exists) {
        await this.cart.push(book);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      } else {
        console.warn({ text: 'El libro ya está en el carrito', type: 'error'});
      }
    },
    removeToCart(idbook){
      this.cart = this.cart.filter((book) => book.id !== idbook);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    clearCart(){
      this.cart = [];
      localStorage.removeItem('cart');
    },
    async addMessage(message) {
      await this.messages.push(message);
    },
    async clearMessage(index) {
      await this.messages.splice(index, 1);
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