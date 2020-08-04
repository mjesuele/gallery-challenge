import { render } from "@testing-library/react";
import React from "react";
import Gallery from ".";

test("renders hello world", () => {
  const { getByText } = render(<Gallery />);
  const text = getByText(/hello world/i);
  expect(text).toBeInTheDocument();
});
