import { html, render } from 'lit-html';
import { memeworld_backend } from 'declarations/memeworld_backend';
import { memeVerse } from './memeVerse/memeVerse';
import logo from './logo.svg';

import p5 from 'p5';

const Meme = {
  imageName: '',
  author: '',
  likes: '',
  create: function (imageName, author, likes) {
    const newMeme = Object.create(this);
    newMeme.imageName = imageName;
    newMeme.author = author;
    newMeme.likes = likes;
    return newMeme;
  }
};

class App {
  greeting = '';
  p5Instance = null;
  memes = [];

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    this.greeting = await memeworld_backend.greet(name);
    this.#render();
  };

  #initializeP5 = async () => {
    // For debugging porpuses
    // Make some 'image' dummies to debug the frontend.
    let memes = [];
    for (let i = 0; i <= 33; i++) {
        memes.push(`M_${i}.png`);
    }
    //await memeworld_backend.loadAllMemes();
    if(!this.p5Instance) {
      // Creamos una instancia de p5.js en el contenedor 'sketch-holder'
      this.p5Instance = new p5((p5) => memeVerse(p5, memes), document.getElementById('sketch-holder'));
    }
  }

  #render() {
    let body = html`
    <main>
      <!-- Navbar -->
      <div class="navbar">
        <!-- Logo -->
        <img src="${logo}" alt="MEMEWORLD logo" class="navbar-logo" />
        <!-- Right Section: Login and Form -->
        <div class="navbar-right">
          <form action="#" class="login-form">
            <label for="username" class="login-label">Username: </label>
            <input id="username" name="username" type="text" placeholder="Enter Username" class="login-box" />
            <label for="userId" class="login-label">User ID: </label>
            <input id="userId" name="userId" type="text" class="login-box" />
            <button type="submit" class="login-button">Login</button>
          </form>
        </div>
      </div>
      <!-- Greeting Section -->
      <section id="greeting">${this.greeting}</section>
      <!-- Container for p5.js -->
      <div id="sketch-holder"></div>
    </main>
    `;
    render(body, document.getElementById('root'));
    document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit);
    this.#initializeP5();
  }
}

export default App;
