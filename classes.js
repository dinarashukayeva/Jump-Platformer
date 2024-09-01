class Floor {
  constructor(x, y, l, w) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
  }
  display() {
    fill(0)
    rect(this.x, this.y, this.l, this.w);
  }
}


//unused
class Item {
  constructor(x, y, n) {
    this.x = x;
    this.y = y;
    this.n = n;
  }

  display() {
    //image(this.picture, this.x, this.y, 45, 55);
    fill(255);
    circle(this.x, this.y, 30);
    fill(0);
  }
}
