import React, { ReactNode, useState } from "react";
import css from "./index.module.css";

type Props = {
  children: ReactNode;
  title?: string;
};

const Gallery = ({ children, title }: Props) => {
  return (
    <div className={css.gallery}>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};

export const urlPlaceholder = "Enter the URL of an image";
export const captionPlaceholder = "Enter a caption";
export const submitText = "Add Image";

type FormProps = {
  onSubmit: (img: ImageData) => void;
  getNextId: () => number;
};
const Form = ({ onSubmit, getNextId }: FormProps) => {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const id = getNextId();
    onSubmit({ id, src: url, alt: caption });
    setUrl("");
    setCaption("");
  };
  const isDisabled = !url || !caption;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2>Add an image</h2>
      <label htmlFor="url">URL</label>
      <input
        id="url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.currentTarget.value)}
        placeholder={urlPlaceholder}
        required
      />
      <br />
      <label htmlFor="caption">Caption</label>
      <input
        id="caption"
        value={caption}
        onChange={(e) => setCaption(e.currentTarget.value)}
        placeholder={captionPlaceholder}
        required
      />
      <br />
      <input type="submit" value={submitText} disabled={isDisabled} />
    </form>
  );
};

export type ImageData = {
  id: number;
  src: string;
  alt: string;
};

const Thumbnails = ({
  images,
  onSelectImage,
}: {
  images: ImageData[];
  onSelectImage: (img: ImageData) => void;
}) => {
  return (
    <div className={css.thumbnails}>
      {images.map((img) => (
        <img
          alt={img.alt}
          id={String(img.id)}
          key={img.id}
          src={img.src}
          title={img.alt}
          onClick={() => onSelectImage(img)}
        />
      ))}
    </div>
  );
};

type ImageProps = {
  data?: ImageData;
  onClickPrev: () => void;
  onClickNext: () => void;
};

const Image = ({ data, onClickPrev, onClickNext }: ImageProps) => {
  return data ? (
    <figure className={css.image}>
      <nav className={css.prev}>
        <button onClick={onClickPrev} data-testid="prev-button">
          &lt;
        </button>
      </nav>
      <img src={data.src} alt={data.alt} title={data.alt} />
      <figcaption>{data.alt}</figcaption>
      <nav className={css.next}>
        <button onClick={onClickNext} data-testid="next-button">
          &gt;
        </button>
      </nav>
    </figure>
  ) : null;
};

Gallery.Form = Form;
Gallery.Thumbnails = Thumbnails;
Gallery.Image = Image;

export default Gallery;
