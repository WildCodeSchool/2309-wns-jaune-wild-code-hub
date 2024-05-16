import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "../src/components/Navbar";
// Mock useRouter, useParams and usePathname use by Navbar:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: () => null,
    };
  },
  useParams() {
    return {};
  },
  usePathname() {
    return {};
  },
}));
describe("Navbar", () => {
  beforeEach(() => {
    render(<Navbar />);
  });
  it("renders the all fixed elements of Navbar", () => {
    const projectName = screen.getByText(/Wild Code Hub/i);
    const searchbar = screen.getByPlaceholderText(/search for projects/i);
    expect(projectName).toBeInTheDocument();
    expect(searchbar).toBeInTheDocument();
  });
  it("renders Log in and Sign in buttons when pathname is different from /auth/login and /auth/signin", () => {
    const login = screen.getByText(/log in/i);
    const signin = screen.getByText(/sign in/i);
    expect(login).toBeInTheDocument();
    expect(signin).toBeInTheDocument();
  });
});
