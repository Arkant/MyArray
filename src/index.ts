class MyArray<T> implements IMyArray<T> {
  [i:number]: T;
  length: number;

  constructor(...args: T[] | number[]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      if (Number.isFinite(args[0]) && args[0] >= 0) {
        this.length = <number>args[0];
      }
      else {
        throw new RangeError('Invalid length of array');
      }
    }
    else {
      for (let i = 0; i < args.length; i++) {
        this[i] = <T>args[i];
      }

      this.length = args.length;
    }
  }

  // Method push to the end of arr
  public push = (...args: T[]) =>  {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
    return this.length;
  }
    
  // Method pop, delete last el
  public pop = () => {
    if (this.length === 0) {
      return undefined;
    }
    else {
      const returnedValue = this[this.length - 1];
      delete this[this.length - 1];
      this.length -= 1;
      return returnedValue;
    }
  }

  // Method callback on each
  public forEach = (callback: (value: T, index: number, array: MyArray<T>) => void, thisArg?: any) => {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  // Method map by callback
  public map = (callback: (value: T, index: number, array: MyArray<T>) => void, thisArg?: any) => {
    const arr = new MyArray<T>();

    for (let i = 0; i < this.length; i++) {
      arr[i] = callback.call(thisArg, this[i], i, this);
      arr.length += 1;
    }
    return arr;
  }

  // Method filter by callback
  public filter = (callback: (value: T, index: number, array: MyArray<T>) => any, thisArg = this) => {
    const arr = new MyArray<T>();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        arr[arr.length] = this[i];
        arr.length += 1;
      }
    }
    return arr;
  }

  // static from(array: [], callback : () => any, thisArg?: any) {
  static from(array, callback, thisArg?: any) {
    const arr = new MyArray<T>();

    if (array === undefined) {
      throw new TypeError('items is undefined');
    } else if (array === null) {
      throw new TypeError('items is null');
    }

    if (callback) {
      for (let i = 0; i < array.length; i++) {
        arr[i] = callback.call(thisArg, array[i], i, array);
        arr.length += 1;
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        arr[i] = array[i];
        arr.length += 1;
      }
    }
    return arr;
  }

  // Method reduce arr
  public reduce = (callback: (previousValue: T, currentValue: T, index: number, array: MyArray<T>) => any, initialValue: T) => {
    const len = this.length;
    let accumulator = initialValue === undefined ? this[0] : callback(initialValue, this[0], 0, this);

    if (len === 0 && !initialValue) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    if (len === 1 && !initialValue) {
      return this[0];
    }

    if (len === 0 && initialValue) {
      return initialValue;
    }

    for (let i = 1; i < len; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  }
  // Method convert to string
  public toString = () => {
    let str = String();

    if (this.length === 0) {
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
  public sort = (callback?: (a: T, b: T) => boolean) => {
    let cbDefault = (a: T, b: T) => `${a}` > `${b}`;
    cbDefault = callback ? callback : cbDefault;

    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        if (!(cbDefault(this[j], this[j + 1]) <= false)) {
          const max = this[j];
          this[j] = this[j + 1];
          this[j + 1] = max;
        }
      }
    }

    return this;
  }

  // find
  public find = (callback: (value: T, index: number, obj: IMyArray<T>) => boolean, thisArg?: any) => {
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  // slice
  public slice = (begin = 0, end: number) => {
    let arr = null;
    let arrSize = this.length;
    let start = begin;
    let finish = end ? end : arrSize;

    start = (start >= 0) ? start : arrSize + start;

    if (end < 0) {
      finish = arrSize + end;
    }

    arrSize = finish - start;

    if (arrSize > 0) {
      arr = new MyArray<T>(arrSize);
    }

    for (let i = 0; i < arrSize; i++) {
      arr[i] = this[start + i];
    }

    return arr;
  }

  // spread
  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}


export default MyArray;

let arr = new Array();
arr.find();