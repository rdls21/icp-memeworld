import { html, render } from 'lit-html';
import { memeworld_backend } from 'declarations/memeworld_backend';
import { memeVerse } from './memeVerse/memeVerse';
import logo from './logo.svg';

import p5 from 'p5';

class App {
  greeting = '';
  p5Instance = null;

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.greeting = await memeworld_backend.greet(name);
    this.#render();
  };

  #initializeP5 = () => {
    if(!this.p5Instance) {
      // Creamos una instancia de p5.js en el contenedor 'sketch-holder'
      this.p5Instance = new p5(memeVerse, document.getElementById('sketch-holder'));
    }
  }

  #render() {
    let body = html`
      <main>
        <img src="${logo}" alt="MEMEWORLD logo" />
        <div class="Login">
          <h1>Login</h1>
          <form action="#">
            <label for="name">Name: &nbsp;</label>
            <input id="name" alt="Name" type="text" />
            <button type="submit">Click Me!</button>
          </form>
        </div>
        <section id="greeting">${this.greeting}</section>
        <br />
        <br />
        <!-- Contenedor para p5.js -->
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
