import { MemeEntity } from './memeEntity';

export const memeVerse = (p, image_names) => {
  const memes = [];
  // Contains the images, only images!
  // Bug: I was assigning the image_names to images, making it having [String,... ,IMAGE, ...]
  // Making P5 unable to do that [Type error]
  let images = [];
  let container;
  // To load the iamage before executing
  p.preload = () => {
    if (image_names.length == 0) {
      let img = p.loadImage('/404nf.png');
      images.push(img);
    } else {
      console.log("loading memes!");
      image_names.forEach(function (image) {
        let img = p.loadImage(`/public/${image}`);
        images.push(img);
      });
      console.log("Finished loading memes");
    }
  }

  p.setup = () => {
    container = document.getElementById('sketch-holder');
    const canvasWidth = container.offsetWidth;
    const canvasHeight = container.offsetHeight || 800;
    p.createCanvas(canvasWidth, canvasHeight);
    // p.debugMode();
    for (let image of images) {
      memes.push(new MemeEntity(p, image))
    }
  }
  
  p.draw  = () => {
    p.background(0);
    // Update meme Entities (meme 'of' memes, not 'in' memes)
    for (let meme of memes) {
      meme.mouseOver();
      meme.update();
      meme.edges();
      meme.show();
    }
  }
  // Check if a meme was clicked on
  p.mousePressed = () => {
    for (let meme of memes) {
      // When clicked on: update the velocity with a random 2D vector
      meme.clicked();
    }
  }
  // Handle window resizes
  p.windowResized = () => {
    if (container) {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight || 800;
      p.resizeCanvas(newWidth, newHeight);
    }
  };
}