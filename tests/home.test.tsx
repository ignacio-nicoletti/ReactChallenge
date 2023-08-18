import { render, act, waitFor } from "@testing-library/react";
import axios from "axios";
import Home from "../src/pages/Home";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("prueba", () => {
  test("good response", async () => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          cuentas: [
            {
              e: "1",
              n: "872378326701",
              t: "02",
              saldo: "1500",
              moneda: "u$s",
              tipo_letras: "CC",
            },
          ],
        },
      })
    );

    const { getByText } = render(<Home />);
    await waitFor(() => {
      const result = getByText("Selecciona la Cuenta a Consultar");//se comprueba el render
      expect(result).not.toBe(null);
      expect(mockedAxios.get).toBeCalledTimes(1);                  //comprueba que axios se llamo 
      
    });
  });
});
