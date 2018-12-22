/* eslint-disable no-console */
class MyArray {
  constructor(...a) {
    if (a.length === 0) {
      this.length = 0;
    } else if (a.length === 1 && typeof a[0] === 'number') {
      if (Number.isFinite(a[0]) && a[0] >= 0) {
        this.length = a[0];
      }
      else {
        throw new RangeError('Invalid length of array');
      }
    }
    else {
      for (let i = 0; i < a.length; i++) {
        this[i] = a[i];
      }

      this.length = a.length;
    }
  }
  // Method push to the end of arr
  push(...a) {
    for (let i = 0; i < a.length; i++) {
      this[this.length] = a[i];
      this.length += 1;
    }
    return this.length;
  }
  // Method pop, delete last el
  pop() {
    if (this.length === 0) {
      return undefined;
    }
    else {
      delete this[this.length - 1];
      return this[this.length - 1];
    }
  }
  // Method callback on each
  foreach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }
  // Method map by callback
  map(callback) {
    const arr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      arr.push(callback(this[i], i, this));
    }
    return arr;
  }
  // Method filter by callback
  filter(callback) {
    const arr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        arr.push(this[i]);
      }
    }
    return arr;
  }
  // Method create arr from value
  static from(value) {
    const arr = new MyArray();

    for (let i = 0; i < value.length; i++) {
      arr.push(value[i]);
    }
    return arr;
  }

  // Method reduce arr
  reduce(callback, start) {
    let res = start;
    res === undefined ? res = this[0] : start;

    for (let i = 0; i < this.length; i++) {
      res = callback(null, res, this[i], i, this);
    }
    return res;
  }
  // Method convert to string
  toString() {
    let str = String();

    if (this.length === 0 || this.length === undefined) {
      return str;
    }

    for (let i = 0; i < this.length; i++) {
      if (i === this.length - 1) {
        str += `${this[i]}`;
      }
      else {
        str += `${this[i]},`;
      }
    }
    return str;
  }
  // вставками + пузырьком
  sort(callback) {
    if (callback) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1; j++) {
          if (!(callback(this[j], this[j + 1]) <= 0)) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    }
    else {
      for (let i = 1; i < this.length; i++) {
        const current = this[i];
        let j = i;

        while (j > 0 && String(this[j - 1]) > String(current)) {
          this[j] = this[j - 1];
          j -= 1;
        }
        this[j] = current;
      }
    }
    return this;
  }
  // spread
  * [Symbol.iterator]() {
    // let l = this.length;
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}


export default MyArray; // отчистить сверху консоль

const arr = new MyArray(5);
console.log(arr.length);