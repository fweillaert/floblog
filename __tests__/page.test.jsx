import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page", () => {
  it("renders a text", () => {
    render(<Page />);

    const text = screen.getByText("Save and see your changes instantly.");

    expect(text).toBeInTheDocument();
  });
});
