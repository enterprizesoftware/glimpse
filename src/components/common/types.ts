export type Position = [number, number];

export enum MouseButton {
  Primary = 0,
  Auxiliary = 1,
  Secondary = 2,
  Fourth = 3,
  Fifth = 4
}

export type Resolver<T> = (...params: any) => T;
export type TypeOrResolver<T> = T | Resolver<T>;
export type StringOrResolver = string | Resolver<string>;
export type BooleanOrResolver = boolean | Resolver<boolean>;
