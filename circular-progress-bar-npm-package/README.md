# @monade/react-circular-progress-bar

A fully typescript friendly react component for **circular progress bar** made with only `divs`, no `svgs` or `canvas`.

Read the full **[article](https://github.com/monade/circular-progress-bar#readme)** about this component.

## How to use it?

First we need to install the package with npm:
```
npm install @monade/react-circular-progress-bar
```
or with yarn:
```
yarn add @monade/react-circular-progress-bar
```

Then we just need to import and use it like this:

```js
import { CircularProgressBar } from '@monade/react-circular-progress-bar'
```
```html
<CircularProgressBar
  diameter={...}
  color={...}
  percentage={...}
  borderWidth={...}
  contentBackgroundColor={...}
  className={...}
  contentClassName={...}
>
  <span>{...}</span>
</CircularProgressBar>
```

## License

I wrote this in a night as part of an experiment for an article I was writing, so feel free to use it as you like.