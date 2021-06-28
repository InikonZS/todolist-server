class Vector {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  scale(scaler) {
    this.x *= scaler;
    this.y *= scaler;
    return this;
  }

  normalize() {
    let abs = this.abs();
    if (!Number.isNaN(abs) && abs != 0) {
      this.scale(1 / abs);
    }
    return this;
  }

  abs() {
    return (this.x ** 2 + this.y ** 2) ** 0.5;
  }
}

module.exports = { Vector };
