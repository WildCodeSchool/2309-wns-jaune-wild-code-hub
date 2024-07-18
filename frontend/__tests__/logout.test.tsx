import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import AppearLogout from "../src/components/AppearLogout";

describe.only("AppearLogout", () => {
  it.only("renders a buttton", () => {
    render(<AppearLogout />);
    expect(screen.getAllByRole("button")).toBeInTheDocument();

    it.only("the button disappears", () => {
      render(<AppearLogout />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(button).not.toBeVisible;
    });
  });
});
