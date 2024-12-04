import p5 from "p5";

export class MemeEntity {
  constructor(p) {
      this.p = p;
      this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
      this.velocity = p5.Vector.random2D();
      this.isInside = false;
  }

  updateDirection() {
      console.log("Hola");
      this.velocity = p5.Vector.random2D();
  }

  mouseOver() {
      if (this.p.mouseX > this.position.x && this.p.mouseX < this.position.x + 180 &&
          this.p.mouseY > this.position.y && this.p.mouseY < this.position.y + 180) {
          this.velocity = this.p.createVector(0, 0); // Detén el movimiento
          this.isInside = true;
      } else if (this.isInside) {
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

  show() {
      this.p.fill(255);
      this.p.rect(this.position.x, this.position.y, 180, 180);
  }

  clicked() {
      if (this.p.mouseX > this.position.x && this.p.mouseX < this.position.x + 180 &&
          this.p.mouseY > this.position.y && this.p.mouseY < this.position.y + 180) {
          this.updateDirection();
      }
  }
}
