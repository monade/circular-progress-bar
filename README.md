**TLDR** If you are not interested in understanding the mechanincs of a circular progress bar built without using svg or canvas, and the only thing you want is to use this component in your React application, just checkout our **npm package** at **https://github.com/TODO**

# A Circular Progress Bar with only `<div/>`

Working with curved elements in HTML is not simple, developers usually find themselves having to use elements like `<canvas>` or `<svg>` to accomplish their goals.

## 1. The Problem: Hippopod Player

A while ago, my team and I were working on an open-source project called **[Hippopod](https://hippopod.xyz/)**, the purpose of which is to automatically create websites from an RSS feed of a podcast.

Within the generated sites there is an audio player, whose development was my responsibility. The play/pause button of the player had to show the progress of the track being player in a circular way.

<img src="./images//hippopod-player.png" alt="hippopod player" width="400"/>

An horizontal progress bar is very simple to make in HTML + CSS + JS, however, to make it round, the complexity is much greater.

So here it begins my journey throught the problem of circular progress bars.

## 2. Core Concepts: How Does It Work?

![](./images/step5/final.gif)

To build a circular progress bar we'll use two important CSS properties:
- **[Clip](https://developer.mozilla.org/en-US/docs/Web/CSS/clip)**: this property allows us to identify a visibility rectangle for an element whose position is absolute (es. `clip: rect(1px, 10em, 3rem, 2ch);`). Any children that is not inside the specified rectangle will not be rendered.
- **[Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)**: this property is very powerful and we will only use it to rotate some elements.

The technique I will show you breaks the circle into two halves, the one on the right (from 0% to 50%) and the one on the left (from 50% to 100%).
To understand more easily how it works, we initially analyze only the right half and then apply the same reasoning rotated by 180 degrees to complete the left half as well.

There are two main elements:
- A **container** as big as the whole circle.
- A child element of this container that is actually a **full colored circle**.

With the **clip** property **applied to the circle** we can hide his right half, obtaining only a left half circle.

With the **clip** property **applied to the container** we can hide anything that is in the left half and show anything that is in the right half.

So at this moment we are at the 0% progress and we do not see anything on the screen, because the half colored circle is positioned in the left half, and the left half of the circle is clipped by the container.

If we want to show some of the progress we just need to rotare the half colored circle so that it starts to show in the non-clipped right side.

So at this moment, rotating the child element, we can fill as we want the right side.

With the same reasoning, but mirrored, we can manage the left half of the circle. This means that we have to add a second pair of **container** and **circle**, both rotated by 180 degrees in order to take care of the left side.

## 3. Let's make it in plain HTML, CSS and JavaScript

Proviamo a mettere in pratica quello che ci siamo detti prima con una semplice pagina in puro HTML, CSS e JavaScript.

Sentiti libero di seguire passo passo, o se vuoi saltare alla soluzione definitiva, trovi tutto il codice che verrà usato **[qui](https://github.com/monade/TODO)**.

### Step 1: Basic Structure

The first step we'll take is to get all the elements we need in place:

![](./images/step1/screen1.png)

Iniziamo con un semplice file `index.html` che contiene due elementi, uno slider per controllare la percentuale di progresso e un insieme di `<div/>` che rappresentano la barra di progresso circolare su cui lavoreremo.

<h5 a><strong><code>index.html</code></strong></h5>
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Circular progress bar</title>
    <link rel="stylesheet" type="text/css" href="./index.css" />
  </head>
  <body>
    <div class="container">
      <div class="circular">
        <div class="circle">
          <div class="bar right">
            <div class="progress"></div>
          </div>
          <div class="bar left">
            <div class="progress"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <span>0</span>
      <input id="input-range" type="range" />
      <span>100</span>
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

Analiziamo meglio la struttura dei `<div />` che rappresentano la nostra barra di caricamento circolare:

```html
<div class="circle">
  <div class="bar right">
    <div class="progress"></div>
  </div>
  <div class="bar left">
    <div class="progress"></div>
  </div>
</div>
```
- `<div class="circle">` its the container of our circular progress bar.
- The two `<div class="progress"></div>` are the actual half-circle elements that correctly rotated will represent the right-half of the circle (from 0% to 50%) and the left-half of the circle (from 50% to 100%).
- `<div class="bar right">` and `<div class="bar left">` are two containers as big as the full circles, but that will have the css clip property set so that they'll let their children be visible only for half of the circle, leaving the other half transparent.

Now let's apply some basic css to get everything in place, our file index.css will look like this:

<h5 a><strong><code>index.css</code></strong></h5>
```css
/* this css rule is used only to help us with visual debug */
* {
  border: 1px solid red;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
}

.container input {
  width: 100%;
  margin: 0px 30px;
}

.circular {
  position: relative;
  margin: 0;
  padding: 0;

  /* diameter of the circle, we'll remove this later*/
  height: 500px;
  width: 500px;
}

.circular .bar {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.circle .bar .progress {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
```

All this css is pretty straight forward, the only things to note are:
- `* { border: 1px solid red; }` is used only for visual debug purpose
- in the `.circular { /*...*/ }` rule we hardcode the height and the width to match the diamater of the circle of the progress bar we are going to create, but this is only temporary, we'll remove it later.

And now some basic javascript
<h5 a><strong><code>index.js</code></strong></h5>
```js
/** 
 * Waits for the document to be ready before running our js
 */
function docReady(fn) {
  if (document.readyState === "complete" 
      || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
docReady(init);

/**
 * This is the first function that we'll be called.
 * It's purpose will be to set up anything we need
 */
function init() {
  // set up will happen here...

  makeProgressBarInteractive();
}

function makeProgressBarInteractive() {
  let inputRef = document.getElementsByTagName("input")[0];
  inputRef.addEventListener("input", updateCiruclarProgressBar);
}

/**
 * Here we'll make every necessary update to make the progress 
 * bar match the slider percentage value
 */
function updateCiruclarProgressBar(event) {
  console.log(event.target.value);

  // updating the progress will happen here...
}
```

### Step 2: Clip

Ora proviamo a rendere dinamica questa progress bar circolare.

Per prima cosa definiamo un diametro e un colore:

```js
const DIAMETER = 500;
const COLOR = "#ff0000";
```

Poi la nostra funzione `init` si occuperà di prendere i riferimenti ai vari componenti della progress bar circolare e di settare il colore del cerchio e le varie proprietà clip in modo che la barra di progresso si trovi nello stato di partenza di 0%:

```js
let inputRef = null;
let rightBar = null;
let leftBar = null;
let rightProgress = null;
let leftProgress = null;

function init() {
  rightBar = document.getElementsByClassName("bar")[0];
  leftBar = document.getElementsByClassName("bar")[1];
  rightProgress = document.getElementsByClassName("progress")[0];
  leftProgress = document.getElementsByClassName("progress")[1];

  // clip the right part of the circle
  rightBar.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;
  // clip the left part of the circle
  rightProgress.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;

  // clip the left part of the cicle
  leftBar.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;
  // clip the right part of the circle
  leftProgress.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;

  // set background color
  rightProgress.style.backgroundColor = `${COLOR}`;
  leftProgress.style.backgroundColor = `${COLOR}`;

  makeProgressBarInteractive();
}
```

![](./images/step2/screen2.png)

### Step 3: Rotate

Ora non ci rimane altro che ruotare i due componenti `progress` accordingly to the percentage we want

![](./images/step3/screen4.png)

```js
function makeProgressBarInteractive() {
  inputRef = document.getElementsByTagName("input")[0];

  inputRef.addEventListener("input", updateCiruclarProgressBar);
}

function updateCiruclarProgressBar(event) {
  // percentage value is get from the slider
  const percentage = event.target.value / 100;

  // the right side of the circle handles the progress from 0% up to 50%
  // if the progress is over 50% then the rotation will max at 180 degrees
  rightProgress.style.transform = `rotate(${percentage < 0.5 ? percentage * 2 * 180 : 180}deg)`;

  // the left side of the circle handles the progress from 50% up to 100%
  // if the progress is under 50% then the rotation will be of 0 degrees.
  leftProgress.style.transform = `rotate(${percentage > 0.5 ? percentage * 2 * 180 + 180 : 0}deg)`;
}
```

### Step 4: Polishing the details

![](./images/step4/screen5.png)

togliamo questa regola css, così da poter vedere il risulato finale

```css
* {
  border: 1px solid red;
}
```

Dobbiamo sistemare la questione dell'altezza e della larghezza di questo elemento che inizialmente era stato hardcodato:

```css
.circular {
  /*...*/

  /* diameter */
  height: 500px;
  width: 500px;
}
```

e nel index.js lo settiamo così:

```js
let circularRef = null;

function init() {
  circularRef = document.getElementsByClassName("circular")[0];
  circularRef.style.height = DIAMETER + "px";
  circularRef.style.width = DIAMETER + "px";

  //...
}
```

Infine, unendo tutto quello che abbiamo detto, il nostro file javascript sarà fatto così:

```js
const DIAMETER = 500;
const COLOR = "#ff0000";

let inputRef = null;
let rightBar = null;
let leftBar = null;
let rightProgress = null;
let leftProgress = null;
let circularRef = null;

function makeProgressBarInteractive() {
  inputRef = document.getElementsByTagName("input")[0];

  inputRef.addEventListener("input", updateCiruclarProgressBar);
  inputRef.value = 0;
}

function init() {
  circularRef = document.getElementsByClassName("circular")[0];
  circularRef.style.height = DIAMETER + "px";
  circularRef.style.width = DIAMETER + "px";

  rightBar = document.getElementsByClassName("bar")[0];
  leftBar = document.getElementsByClassName("bar")[1];
  rightProgress = document.getElementsByClassName("progress")[0];
  leftProgress = document.getElementsByClassName("progress")[1];

  rightBar.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;
  rightProgress.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;

  leftBar.style.clip = `rect(0px, ${DIAMETER / 2}px, ${DIAMETER}px, 0px)`;
  leftProgress.style.clip = `rect(0px, ${DIAMETER}px, ${DIAMETER}px, ${DIAMETER / 2}px)`;

  rightProgress.style.backgroundColor = `${COLOR}`;
  leftProgress.style.backgroundColor = `${COLOR}`;

  makeProgressBarInteractive();
}

function updateCiruclarProgressBar(event) {
  const percentage = event.target.value / 100;
  rightProgress.style.transform = `rotate(${percentage < 0.5 ? percentage * 2 * 180 : 180}deg)`;
  leftProgress.style.transform = `rotate(${percentage > 0.5 ? percentage * 2 * 180 + 180 : 0}deg)`;
}

function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
docReady(init);
```

### Step 5: Content inside the circle

![](./images/step5/screen7.png)

Ora abbiamo un cerchio che si riempie in base a una percentuale controllata da uno slider, per fare un passo ancora in più proviamo a inserire del contenuto al centro della nostra barra di caricamento, in particolare vorremmo vedere la percentuale di progresso al centro del cerchio. per farlo aggiungiamo l'elemento `<div class="content"><span>0%</span></div>` che manipoleremo con css e javascript.

The HTML:

```html
<div class="container">
  <div class="circular">
    <div class="circle">
      <div class="bar right">
        <div class="progress"></div>
      </div>
      <div class="bar left">
        <div class="progress"></div>
      </div>
    </div>
  </div>
  <div class="content">
    <span>0%</span>
  </div>
</div>
<div class="container">
  <span>0</span>
  <input id="input-range" type="range" />
  <span>100</span>
</div>
```

The CSS:

```css
.content {
  position: absolute;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
}
```

And the JS:
```js
const BORDER_WIDTH = 20;
const BACKGROUND_COLOR = '#ffffff';

let content = null;

// ...

function init() {
  // ...

  content = document.getElementsByClassName("content")[0];
  content.style.height = DIAMETER - BORDER_WIDTH + "px";
  content.style.width = DIAMETER - BORDER_WIDTH + "px";
  content.style.backgroundColor = BACKGROUND_COLOR;

  // ...
}

function updateCiruclarProgressBar(event) {
  // ...

  content.firstElementChild.innerHTML = `${event.target.value}%`;
}
```

The final result looks like this:

![](./images/step5/final.gif)

## 4. Let's make it in React

The next step is to wrap everything we have said so far in a React component.

We want the react component to be as customizable as possible throught the definition of props such as:
- percentage of progress
- diameter
- color
- border width
- content background color
- content as a child

![](./images/react/final220speed.gif)

If you have understand what we have done till now and now a little of react you'll notice that this component is very simple:

<h5 a><strong><code>circularProgressBar.tsx</code></strong></h5>
```ts
import { MutableRefObject, useEffect, useRef } from "react";
import "./circularProgressBar.css";

interface circularProgressBarPropsInterface {
  color: string;
  diameter: number;
  percentage: number;
  borderWidth?: number; 
  contentBackgroundColor?: string;
  className?: string;
  contentClassName?: string;
  children?: JSX.Element;
}

export default function CircularProgressBar({
  color,
  diameter,
  percentage,
  borderWidth,
  contentBackgroundColor,
  className,
  contentClassName,
  children,
}: circularProgressBarPropsInterface) {
  const rightBar = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const rightProgress = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const leftBar = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const leftProgress = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const content = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (borderWidth) {
      content.current.style.height = diameter - borderWidth + "px";
      content.current.style.width = diameter - borderWidth + "px";
    }

    if (contentBackgroundColor) {
      content.current.style.backgroundColor = contentBackgroundColor;
    }

    rightBar.current.style.clip = `rect(0px, ${diameter}px, ${diameter}px, ${diameter / 2}px)`;
    rightProgress.current.style.clip = `rect(0px, ${diameter / 2}px, ${diameter}px, 0px)`;

    leftBar.current.style.clip = `rect(0px, ${diameter / 2}px, ${diameter}px, 0px)`;
    leftProgress.current.style.clip = `rect(0px, ${diameter}px, ${diameter}px, ${diameter / 2}px)`;

    rightProgress.current.style.backgroundColor = `${color}`;
    leftProgress.current.style.backgroundColor = `${color}`;
  }, [color, diameter, borderWidth, contentBackgroundColor]);

  useEffect(() => {
    if (!percentage) {
      rightProgress.current.style.transform = `rotate(0deg)`;
      leftProgress.current.style.transform = `rotate(0deg)`;
      return;
    }

    let floatPercentage = percentage / 100;
    rightProgress.current.style.transform = `rotate(${floatPercentage < 0.5 ? floatPercentage * 2 * 180 : 180}deg)`;
    leftProgress.current.style.transform = `rotate(${floatPercentage > 0.5 ? floatPercentage * 2 * 180 + 180 : 0}deg)`;
  }, [percentage]);

  return (
    <div className={`container ${className ?? ""}`}>
      <div className='circular' style={{ height: diameter, width: diameter }}>
        <div className='circle'>
          <div className='bar right' ref={rightBar}>
            <div className='progress' ref={rightProgress} />
          </div>
          <div className='bar left' ref={leftBar}>
            <div className='progress' ref={leftProgress} />
          </div>
        </div>
      </div>
      <div className={`content ${contentClassName ?? ""}`} ref={content}>
        {children}
      </div>
    </div>
  );
}
```
<h5 a><strong><code>circularProgressBar.css</code></strong></h5>
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
}

.circular {
  position: relative;
  margin: 0;
  padding: 0;
}

.circular .bar {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.circle .bar .progress {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.content {
  position: absolute;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
}
```

## 4. npm package

If you want to use this circular progress bar in your react application we have a **[npm package](https://link.to.thingy)** for you.

To use it you can simply
```
npm install react-circular-progress-bar
```
or if you use `yarn`
```
yard add react-circular-progress-bar
```

Then you just need to import it and use it like this:

```js
import { CircularProgressBar } from 'react-circular-progress-bar'
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