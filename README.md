# Geul.js

![메인이미지](docs/static/head_motion.gif)

> `Geul.js` is a library designed to easily implement the typing effect of Korean characters, where characters are decomposed into initial, medial, and final consonants as they are typed and then combined.

# Features

- Geul it in **your favorite framework**!
  - We willing to supports all major FE frameworks
  - Currently available on `React`
- Geul it **just in time**!
  - Provides a `run` and `reset` functions to start and reset 'Geul'
- Geul it **as your flavor**!
  - Provides three methods that allow you to implement typing effect as your favorite flavor!

# Installation

> I'm working on this... Please wait a little while.

# Quick Start

```tsx
import { useGeul } from "@dot/geul-react";

const Things = () => {
  const { geul, run, reset } = useGeul("안녕하세요", {
    speed: 50,
  })

  /**
   * when you hit the 'run' button.
   * then typing of "안녕하세요" will be started in 'p' tag below.
   */
  return (
    <div>
      <div onClick={() => reset()}>reset</div>
      <div onClick={() => run()}>run</div>
      <p>{geul}</p>
    </div>
  )
};

export default Things;
```

# Packages
|name|version|
|-|-|
|[`@dot/react-geul`](./packages/react/README.md)|`0.0.1`|

# Demos

> I'm working on this... Please wait a little while.

# Documentation

> I'm working on this... Please wait a little while.

# Contributing

> I'm working on this... Please wait a little while.

# Feedback

Any feedbacks and bug reports are welcome in [issue tab](https://github.com/seungrodotlee/Geul.js/issues)!

# License

```
Copyright (c) 2023 seungrodotlee.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
