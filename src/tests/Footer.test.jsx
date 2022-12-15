import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Components/Footer/index";

describe("<Footer />", () => {
  test("Verificar se o tema é alterado ao clicar no botão", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const button = screen.getByTestId("btn-theme");
    fireEvent.click(button);

    const theme = screen.getByTestId("footer");        
    expect(theme).toHaveClass("dark");
  });
});