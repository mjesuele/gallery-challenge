import React, { useState } from "react";
import Gallery, { ImageData } from "./components/Gallery";

const App = (props: { initialImages?: ImageData[] }) => {
  const [images, setImages] = useState(props.initialImages || []);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [nextId, setNextId] = useState(props.initialImages?.length || 0);
  const onPrev = () =>
    setSelectedIndex(prevIndex(selectedIndex, images.length));
  const onNext = () =>
    setSelectedIndex(nextIndex(selectedIndex, images.length));
  return (
    <Gallery title="Image Gallery">
      <Gallery.Form
        getNextId={() => {
          setNextId((id) => id + 1);
          return nextId;
        }}
        onSubmit={(img) => {
          setImages((images) => [...images, img]);
        }}
      />
      <Gallery.Thumbnails
        images={images}
        onSelectImage={(img) => setSelectedIndex(img.id)}
      />
      <Gallery.Image
        data={images[selectedIndex]}
        onClickNext={onNext}
        onClickPrev={onPrev}
      />
    </Gallery>
  );
};

export default App;

export function nextIndex(i: number, length: number) {
  return (i + 1) % length;
}

export function prevIndex(i: number, length: number) {
  return i === 0 ? length - 1 : i - 1;
}
