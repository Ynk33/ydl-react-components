
# ydl-react-components

A React components library to boost your React app creation.

## Features

- General layouts components to rapidly design the skeletton of your app.
- Partials components designed as bricks to easily build your pages.
- Special features, such as Alerts and NextFont sharing.

## Installation

Install ydl-react-components with npm from Github.

```bash
  npm install git@github.com:Ynk33/ydl-react-components
```

## Usage/Examples

### Alerts

At the root of your app, declare the Provider.

```typescript
import { AlertProvider } from 'ydl-react-components'

function App() {
  return (
      <AlertProvider position={AlertPositions.TOP_LEFT}>
        <main>
            ...
        </main>
      </AlertProvider>
  );
}
```

In your components, you can then display alerts to your users.

```typescript
import { useAlert } from 'ydl-react-components'

export default function MyComponent() {
    const alert = useAlert();

    function info() {
        alert.info("Info");
    }

    function success() {
        alert.success("Success");
    }

    function warning() {
        alert.warning("Warning");
    }

    function danger() {
        alert.danger("Danger");
    }

    return (
        <button onClick={info}>Info</button>
        <button onClick={success}>Success</button>
        <button onClick={warning}>Warning</button>
        <button onClick={danger}>Danger</button>
    )
}
```

### Fonts

You can easily share your NextFont accross the components of your application using the FontsProvider.

> [!NOTE]
> For now, it supports 2 fonts. As this library is designed on my own needs, it may evolve later on if I need to support more than 2 fonts.

At the root of your app, declare the FontsProvider with the fonts you'd like to use.

```typescript
import { FontsProvider } from 'ydl-react-components'
import {
  Caveat,
  Didact_Gothic,
} from "next/font/google";

export const caveat = Caveat({
  weight: "400",
  subsets: ["latin"]
});

export const didactGothic = Didact_Gothic({
  weight: "400",
  subsets: ["latin"],
});

function App() {
  return (
      <FontsProvider primaryFont={caveat} secondaryFont={didactGothic}>
        <main>
            ...
        </main>
      </FontsProvider>
  );
}
```

In your components, you can then use these fonts with the custom hook useFonts().

```typescript
import { useFonts } from 'ydl-react-components'

export default function MyComponent() {
    const fonts = useFonts();

    return (
        <>
            <p className={fonts.primaryFont.className}>
                This is written with the primary font.
            </p>
            <p className={fonts.secondaryFont.className}>
                This is written with the secondary font.
            </p>
        </>
    )
}
```

### Components

#### Carousel

A customizable carousel to display your pictures.

```typescript
import { useState } from 'react'
import { Carousel, Fill } from 'ydl-react-components'

export default function MyComponent() {
  const [activeIndex, setActiveIndex] = useState(0);

    const pictures = [pictures to display in the carousel];

    return (
        <Carousel
          pictures={pictures}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          fill={Fill.Contain}
          autoPlay /* If set, the carousel will automatically loop through the pictures  */
          showArrows /* If set, will show navigation arrows to let the user navigate */
          showCaption /* If set, the title and description of each picture will be displayed */
        />
    )
}
```

#### Modal

A simple full-screen modal.

```typescript
import { useState } from 'react'
import { Modal } from 'ydl-react-components'

export default function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <button onClick={() => setIsModalOpen(true)}>Open modal</button>
        <Modal show={isModalOpen} hide={() => setIsModalOpen(false)}>
            <h1>My modal</h1>
            <p>
                The modal content
            </p>
        </Modal>
    )
}
```

### Layouts

#### Wide2Columns

A full-width layout with a picture on one half of the screen and a custom content on the other half.

```typescript
import { Wide2Columns, Layout } from 'ydl-react-components'

export default function MyComponent() {
    return (
        <Wide2Columns picture={picture} layout={Layout.PictureFirst}>
            {the content}
        </Wide2Columns>
    )
}
```

## Authors

- [Yannick Tirand](https://www.github.com/Ynk33)
