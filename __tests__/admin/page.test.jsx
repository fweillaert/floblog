import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/admin/page";

describe("Page", () => {
  it("renders a text", () => {
    render(<Page />);

    const text = screen.getByText("Admin");

    expect(text).toBeInTheDocument();
  });
});
