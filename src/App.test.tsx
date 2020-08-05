import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import App from "./App";
import {
  captionPlaceholder,
  ImageData,
  submitText,
  urlPlaceholder,
} from "./components/Gallery";
import { dumpsterFire, notListening, shades, tinyScales } from "./testImages";
const testImages: ImageData[] = [
  {
    id: 0,
    src: dumpsterFire,
    alt: "dumpster fire",
  },
  {
    id: 1,
    src: shades,
    alt: "dem da shades",
  },
  {
    id: 2,
    src: notListening,
    alt: "blah blah blah",
  },
];

const Subject = () => <App initialImages={testImages} />;

beforeEach(cleanup);

it("renders the given images", () => {
  const { getByAltText } = render(<Subject />);
  testImages.forEach((img) => {
    expect(getByAltText(img.alt)).toBeInTheDocument();
  });
});

it("allows you to enter a new image", () => {
  const { getByAltText, getByPlaceholderText, getByText } = render(<Subject />);
  const urlInput = getByPlaceholderText(urlPlaceholder);
  fireEvent.change(urlInput, { target: { value: tinyScales } });
  const captionInput = getByPlaceholderText(captionPlaceholder);
  const altText = "some tiny scales";
  fireEvent.change(captionInput, { target: { value: altText } });
  const submit = getByText(submitText);
  fireEvent.click(submit);
  expect(getByAltText(altText)).toBeInTheDocument();
});

it("requires a url", () => {
  const { getByAltText, getByPlaceholderText, getByText } = render(<Subject />);
  const captionInput = getByPlaceholderText(captionPlaceholder);
  fireEvent.change(captionInput, { target: { value: "some nothing" } });
  const submit = getByText(submitText);
  expect(submit).toBeDisabled();
  fireEvent.click(submit);
  expect(() => getByAltText("sone nothing")).toThrow();
});

it("requires a caption", () => {
  const { getByPlaceholderText, getByText } = render(<Subject />);
  const urlInput = getByPlaceholderText(urlPlaceholder);
  fireEvent.change(urlInput, { target: { value: tinyScales } });
  const submit = getByText(submitText);
  expect(submit).toBeDisabled();
});

test("clicking an image displays it below the thumbnails", async () => {
  const { getAllByAltText } = render(<Subject />);
  const altText = testImages[0].alt;
  const imgs = getAllByAltText(altText);
  expect(imgs).toHaveLength(1);
  fireEvent.click(imgs[0]);
  expect(getAllByAltText(altText)).toHaveLength(2);
});

test("next button", () => {
  const { getByTestId, getByAltText, getAllByAltText } = render(<Subject />);
  const img = getByAltText(testImages[0].alt);
  fireEvent.click(img);
  const next = getByTestId("next-button");
  fireEvent.click(next);
  expect(getAllByAltText(testImages[1].alt)).toHaveLength(2);
  fireEvent.click(next);
  expect(getAllByAltText(testImages[2].alt)).toHaveLength(2);
  // test that it cycles correctly
  fireEvent.click(next);
  expect(getAllByAltText(testImages[0].alt)).toHaveLength(2);
});

test("prev button", () => {
  const { getByTestId, getByAltText, getAllByAltText } = render(<Subject />);
  const img = getByAltText(testImages[0].alt);
  fireEvent.click(img);
  const prev = getByTestId("prev-button");
  fireEvent.click(prev);
  expect(getAllByAltText(testImages[2].alt)).toHaveLength(2); // test that it cycles correctly
  fireEvent.click(prev);
  expect(getAllByAltText(testImages[1].alt)).toHaveLength(2);
  fireEvent.click(prev);
  expect(getAllByAltText(testImages[0].alt)).toHaveLength(2);
});
