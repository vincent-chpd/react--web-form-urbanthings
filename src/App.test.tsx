import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders product form", () => {
    render(<App />);
    const productForm = screen.getByText(/Product Form/i);
    expect(productForm).toBeInTheDocument();
});
