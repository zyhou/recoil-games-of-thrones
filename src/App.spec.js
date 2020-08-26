import React from "react";
import { RecoilRoot } from "recoil";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { CharacterDetail, loopArrayIndex } from "./App";

// Warning https://github.com/facebookexperimental/Recoil/issues/12
// Error https://github.com/testing-library/dom-testing-library/issues/477

describe("App", () => {
  describe("loopArrayIndex", () => {
    it.each`
      length | current | expected
      ${0}   | ${0}    | ${0}
      ${3}   | ${0}    | ${1}
      ${3}   | ${1}    | ${2}
      ${3}   | ${2}    | ${0}
      ${3}   | ${3}    | ${0}
    `(
      "should return return the right value loopArrayIndex($length, $current) = $expected",
      ({ length, current, expected }) => {
        expect(loopArrayIndex(length, current)).toBe(expected);
      }
    );
  });

  describe("<App />", () => {
    const AppProvider = ({ children }) => {
      return (
        <RecoilRoot>
          <React.Suspense fallback={<div>Loading...</div>}>
            {children}
          </React.Suspense>
        </RecoilRoot>
      );
    };

    it("should initialise with loading text", async () => {
      render(<CharacterDetail />, {
        wrapper: AppProvider,
      });

      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it("should display the first character when API return data", async () => {
      render(<CharacterDetail />, {
        wrapper: AppProvider,
      });

      await waitFor(() => {
        screen.getByRole("heading");
      });

      expect(screen.getByRole("heading")).toHaveTextContent("Eddard Star");
      expect(screen.getByText("Sean Bean")).toBeInTheDocument();
      expect(screen.getByText("House Stark")).toBeInTheDocument();
      expect(screen.getByText("Dead")).toBeInTheDocument();
      expect(
        screen.getByRole("img", {
          name: /eddard stark/i,
        })
      ).toHaveAttribute("alt", "Eddard Stark");
      expect(
        screen.getByRole("img", {
          name: /eddard stark/i,
        })
      ).toHaveAttribute("src", "/tests/Eddard_Stark.jpg");
    });

    it("should display next character when user click on next button", async () => {
      render(<CharacterDetail />, {
        wrapper: AppProvider,
      });

      await waitFor(() => {
        screen.getByRole("heading");
      });

      const input = screen.getByRole("button");
      fireEvent.click(input);

      expect(screen.getByRole("heading")).toHaveTextContent("Sansa Stark");
      expect(screen.getByText("Sophie Turner")).toBeInTheDocument();
      expect(screen.getByText("House Stark")).toBeInTheDocument();
      expect(screen.getByText("Alive")).toBeInTheDocument();
      expect(
        screen.getByRole("img", {
          name: /sansa stark/i,
        })
      ).toHaveAttribute("alt", "Sansa Stark");
      expect(
        screen.getByRole("img", {
          name: /sansa stark/i,
        })
      ).toHaveAttribute("src", "/tests/Catelyn.jpg");
    });

    it("should display first character when user click twice on next button", async () => {
      render(<CharacterDetail />, {
        wrapper: AppProvider,
      });

      await waitFor(() => {
        screen.getByRole("heading", {
          name: /eddard stark/i,
        });
      });

      const input = screen.getByRole("button");
      fireEvent.click(input);

      await waitFor(() => {
        screen.getByRole("heading", {
          name: /sansa stark/i,
        });
      });

      const inputTwice = screen.getByRole("button");
      fireEvent.click(inputTwice);

      await waitFor(() => {
        screen.getByRole("heading", {
          name: /eddard stark/i,
        });
      });

      expect(screen.getByRole("heading")).toHaveTextContent("Eddard Star");
    });
  });
});
