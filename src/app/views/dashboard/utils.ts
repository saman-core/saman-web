// DeepPartial implementation taken from the utility-types NPM package, which is
// Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
// and used under the terms of the MIT license

export type DeepPartial<T> = { [P in keyof T]?: _DeepPartial<T[P]> };

/** @private */
export type _DeepPartial<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends Array<infer U>
    ? Array<_DeepPartial<U>>
    : T extends object
      ? DeepPartial<T>
      : T | undefined;
//
