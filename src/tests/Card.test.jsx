import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Card from "../Components/Card/index";

describe("<Card/>", () => {
  const dentista = {
    nome: "Admin",
    sobrenome: "Admin",
    matricula: "c3e6cf30-dccc-4e21-935a-8efe9344677e",
    usuario: {
      username: "dentistaAdmin",
    },
  };

  test("Verifica se o tema dark esta sendo aplicado corretamente", () => {
    render(
      <BrowserRouter>
        <Card dentista={dentista} key={dentista.matricula} />
      </BrowserRouter>
    );

    const theme = screen.getByTestId("card");

    expect(theme).toHaveClass("dark");
    expect(theme).toHaveStyle({ backgroundColor: 31313196 });
  });

});