import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

// Helper to render with route context
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <Routes>
      <Route path="*" element={ui} />
    </Routes>
  );
};

describe("Navbar", () => {
  test("renders all navigation links", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Job Tracker/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Dashboard/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Add Job/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Statistics/i)[0]).toBeInTheDocument();
  });

  test("toggles mobile menu", () => {
    renderWithRouter(<Navbar />);

    const toggleButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(toggleButton); // Open menu

    expect(screen.getAllByText(/Dashboard/i)[1]).toBeVisible();

    fireEvent.click(toggleButton); // Close menu
    expect(screen.queryAllByText(/Dashboard/i)[1]).not.toBeVisible();
  });

  test("applies active link styling", () => {
    renderWithRouter(<Navbar />, { route: "/add-job" });

    const activeLink = screen.getAllByText(/Add Job/i)[0];
    expect(activeLink.className).toMatch(/text-primary/);
  });
});
