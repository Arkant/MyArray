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
    find(callback: (value: T, index: number, obj: IMyArray<T>) => boolean, thisArg?: any): T | undefined;
    sort(callback?: (a: T, b: T) => number | boolean): this;
    // static from()
}