import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../Routes";

describe("<Routes/>", () => {
  test("Verifica se o tema inicial é o light", () => {
    render(
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );

    const theme = screen.getByTestId("routes");

    expect(theme).toHaveClass("light");
  });
});