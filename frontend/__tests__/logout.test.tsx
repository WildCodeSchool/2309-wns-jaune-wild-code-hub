import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AppearLogout from "../src/components/AppearLogout";

describe.only("AppearLogout", () => {
  it.only("renders a buttton", () => {
    render(<AppearLogout />);
    expect(screen.getAllByRole("button")).toBeInTheDocument();

    describe("When user clicks logout button", () => {
      it("render disparear", () => {
        render(<AppearLogout />);
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByDisplayValue).toBeInTheDocument;
      });
    });
  });
});
