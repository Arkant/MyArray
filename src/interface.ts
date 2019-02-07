interface IMyArray<T> {
    length : number| T;
    [i:number] : T;
    push(...args:T[]): number;
    pop(): T;
    forEach(callback: (value: any, index: number, array:IMyArray<T>) => void, thisArg? : any): void;
    // map(callback: callback, thisArg?: any): IMyArray<T>;
    // filter()
    // static from()
    // reduce()    
    // toString()
    // sort()
    // find()
    slice(a:number, b: number): IMyArray<T>;
} 

// interface Map<K, V> {
//     clear(): void;
//     delete(key: K): boolean;
//     forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
//     get(key: K): V | undefined;
//     has(key: K): boolean;
//     set(key: K, value: V): this;
//     readonly size: number;
// }