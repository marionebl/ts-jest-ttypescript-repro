# ts-jest-ttypescript-repro

Reproduction of differences between using `ttypescript` via `ttsc`
vs executing it with `ts-jest` and its compiler option.

**Hypothesis**: `ts-jest` prevents `TTypeScript` from applying transforms
passed via `.plugins`

## Getting started

```
npm install
npm run build
npm test
```

## Explanation

Using `TTypeScript` a custom transform from [transform.js](./transform.js) is used to
transform

```ts
const greeting = "Hello";
```

to

```ts
const greeting = "Hello, World";
```

The relevant config for this in `tsconfig.json`

```js
// tsconfig.json (with omissions)
{
    "compilerOptions": {
        plugins: [
        {
          "transform": "./transform.js",
          "type": "program"
        }
      ]
    }
}
```

`TTypeScript` is used as `ts-jest` compiler via

```js
// jest.config.js (with omissions)
module.exports = {
  globals: {
    "ts-jest": {
      compiler: 'ttypescript'
    }
  }
};

```

Executing `npm run build` yields the expected result in [lib/index.js](./lib/index.js),
while executing `npm test` reveals that the transformation has not been applied.

Also the `console.log('transforming!')` statement in [transform.js](./transform.js) is printed when
executing `npm run build`, while no log output is produced for `npm test`