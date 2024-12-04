import { MemeEntity } from './memeEntity';

export const memeVerse = (p) => {
  const memes = [];
  let container;

  p.setup = () => {
    container = document.getElementById('sketch-holder');
    const canvasWidth = container.offsetWidth;
    const canvasHeight = container.offsetHeight || 800;
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i<10; i++) {
      memes.push(new MemeEntity(p));
    }
  }
  
  p.draw  = () => {
    p.background(0);
    // Update meme Entities (meme 'of' memes, not 'in' memes)
    for (let meme of memes) {
      meme.edges();
      meme.mouseOver();
      meme.update();
      meme.show();
    }
  }
  
  p.mousePressed = () => {
    for (let meme of memes) {
      // When clicked on: update the velocity with a random 2D vector
      meme.clicked();
    }
  }
}