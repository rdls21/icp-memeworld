import p5 from "p5";

let img;

export class MemeEntity {
  constructor(p, image) {
    this.p = p;
    this.image = image;
    this.like = p.loadImage('/like.png');
    this.squareSize = 180;
    this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
    this.velocity = p5.Vector.random2D();
    this.isInside = false;
  }
  // Other functions
  updateDirection() {
      this.velocity = p5.Vector.random2D();
  }

  mouseOver() {
      if (this.p.mouseX > this.position.x && this.p.mouseX < this.position.x + 180 &&
        this.p.mouseY > this.position.y && this.p.mouseY < this.position.y + 180) {
        this.velocity = this.p.createVector(0, 0); // Stop the movement
        this.isInside = true;
        this.squareSize = 240;
      } else if (this.isInside) {
        this.squareSize = 180;
        this.updateDirection();
        this.isInside = false;
      }
  }

  edges() {
      if (this.position.x > this.p.width) {
          this.position.x = 0;
      } else if (this.position.x < 0) {
          this.position.x = this.p.width;
      }
      if (this.position.y > this.p.height) {
          this.position.y = 0;
      } else if (this.position.y < 0) {
          this.position.y = this.p.height;
      }
  }

  update() {
      this.position.add(this.velocity);
  }
  // TODO: Image Origin
  show() {
    // Draw the image squareSize * squareSize.
    this.p.image(this.image, this.position.x, this.position.y, this.squareSize, this.squareSize);
    //this.p.fill(255);
    //this.p.rect(this.position.x, this.position.y, this.squareSize, this.squareSize);
    // Draw the like button at the bottom.
    this.p.fill(255);
    this.p.rect(this.position.x+this.squareSize-46, this.position.y+this.squareSize-31, 40, 26);
    this.p.image(this.like, this.position.x+this.squareSize-29, this.position.y+this.squareSize-29, 22, 22);
    this.p.textSize(24);
    this.p.fill(0);
    this.p.text('0',this.position.x+this.squareSize-42, this.position.y+this.squareSize-11);
  }

  clicked() {
      if (this.p.mouseX > this.position.x && this.p.mouseX < this.position.x + this.squareSize &&
          this.p.mouseY > this.position.y && this.p.mouseY < this.position.y + this.squareSize) {
          this.updateDirection();
      }
  }
}
