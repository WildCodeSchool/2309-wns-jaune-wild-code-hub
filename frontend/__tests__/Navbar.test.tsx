import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../src/components/Navbar";

// Mock useRouter, useParams and usePathname use by Navbar:
const mockUsePathname = jest.fn();
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
      replace: jest.fn(),
    };
  },
  useParams() {
    return {};
  },
  usePathname() {
    return mockUsePathname();
  },
}));
describe("Navbar", () => {
  it("renders the all fixed elements of Navbar", () => {
    render(<Navbar />);
    const projectName = screen.getByText(/Wild Code Hub/i);
    const searchbar = screen.getByPlaceholderText(/search for projects/i);
    expect(projectName).toBeInTheDocument();
    expect(searchbar).toBeInTheDocument();
  });
  it("renders Log in and Sign in buttons when pathname is different from /auth/login and /auth/register", () => {
    render(<Navbar />);
    const login = screen.getByText(/log in/i);
    const signin = screen.getByText(/sign in/i);
    expect(login).toBeInTheDocument();
    expect(signin).toBeInTheDocument();
  });

  it("renders only login when in auth/register route", () => {
    mockUsePathname.mockReturnValue("/auth/register");

    render(<Navbar />);
    const login = screen.queryByText(/log in/i);
    const signin = screen.queryByText(/sign in/i);
    expect(login).toBeInTheDocument();
    expect(signin).toBeNull();
  });

  it("renders only signin when in auth/login route", () => {
    mockUsePathname.mockReturnValue("/auth/login");
    render(<Navbar />);
    const login = screen.queryByText(/log in/i);
    const signin = screen.queryByText(/sign in/i);
    expect(login).toBeNull();
    expect(signin).toBeInTheDocument();
  });
  it("should redirect to login page whan login button is clicked", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Navbar />);
    const login = screen.queryByText(/log in/i);
    const signin = screen.queryByText(/sign in/i);
    expect(login).toBeInTheDocument();
    expect(signin).toBeInTheDocument();
    if (login) fireEvent.click(login);
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });
  it("should redirect to register page when sign in button is clicked", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Navbar />);
    const login = screen.queryByText(/log in/i);
    const signin = screen.queryByText(/sign in/i);
    expect(login).toBeInTheDocument();
    expect(signin).toBeInTheDocument();
    if (signin) fireEvent.click(signin);
    expect(mockPush).toHaveBeenCalledWith("/auth/register");
  });
  it("should redirect to home page when logo is clicked", () => {
    mockUsePathname.mockReturnValue("/auth/register");
    render(<Navbar />);
    const project = screen.getByText(/Wild Code Hub/i);
    if (project) fireEvent.click(project);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});

// To mock useRouter or usePathname, also possible to use :
/* 
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
then in test const router = { push: jest.fn() }
useRouter.mockReturnValue(router)
expect(router.push).toHaveBeenCalledWith('/path')
*/
