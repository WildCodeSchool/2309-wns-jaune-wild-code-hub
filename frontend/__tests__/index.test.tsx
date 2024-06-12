import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";
describe("Home page", () => {
  it("renders the home page", () => {
    render(<Home />);
    const title = screen.getByText(/Create, collaborate, make an impact/i);
    expect(title).toBeInTheDocument();
  });
});
