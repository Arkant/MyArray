interface IMyArray<T> {
    length : number | T;
    [i:number] : T;
    push(...args: T[]): number;
    pop(): T | undefined;
    slice(a?:number, b?: number): IMyArray<T>;
    toString(): string;
    forEach(callback: (value: T, index: number, array: IMyArray<T>) => void, thisArg? : any): void;
    map(callback: (value: T, index: number, array: IMyArray<T>) => void, thisArg? : any): IMyArray<T>;
    filter(callback: (value: T, index: number, array: IMyArray<T>) => void, thisArg? : any): IMyArray<T>;
    reduce(callback: (previousValue: T, currentValue: T, index: number, array: IMyArray<T>) => T, initialValue: T): T;
    // static from()
    // sort(callback?: (a: T, b: T) => number): this;
    // find()
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