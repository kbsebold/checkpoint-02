import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Components/Navbar/index";

describe("<Navbar/>", () => {
  test("Verificar se o tema é alterado ao clicar no botão", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const button = screen.getByTestId("btn-theme");
    fireEvent.click(button);

    const theme = screen.getByTestId("nav");        
    expect(theme).toHaveClass("navbar-dark");
  });
});