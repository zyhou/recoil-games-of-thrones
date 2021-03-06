import React from "react";
import { atom, selector, useSetRecoilState, useRecoilValue } from "recoil";
import "./tailwind.output.css";

import logo from "./images/logo.svg";
import arrowBottom from "./images/arrow-bottom.svg";

const apiUrl = `https://api.got.show/api/show/characters`;

const currentCharacterIndexState = atom({
  key: "CurrentCharactersIndex",
  default: 0,
});

const characterListQuery = selector({
  key: "CharacterListQuery",
  get: async () => {
    try {
      const response = await fetch(apiUrl);
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
});

const currentCharacterInfoSate = selector({
  key: "CurrentCharacterInfoSate",
  get: ({ get }) => get(characterListQuery)[get(currentCharacterIndexState)],
});

export const loopArrayIndex = (length, current) => {
  const currentIndex = current + 1;
  return currentIndex < length ? currentIndex : 0;
};

// Return to start at the end
const characterIndexState = selector({
  key: "CharacterIndexState",
  get: ({ get }) => get(currentCharacterIndexState),
  set: ({ get, set }) => {
    return set(
      currentCharacterIndexState,
      loopArrayIndex(
        get(characterListQuery).length,
        get(currentCharacterIndexState)
      )
    );
  },
});

export const CharacterDetail = () => {
  const currentCharacter = useRecoilValue(currentCharacterInfoSate);
  const setCurrentCharactersIndex = useSetRecoilState(characterIndexState);

  const onNextCharacter = () => {
    setCurrentCharactersIndex();
  };

  return (
    <React.Fragment>
      <div className="text-white flex items-center justify-center flex-col lg:flex-row py-8">
        <section className="px-4 py-2 m-2">
          <h1 className="font-bold text-4xl">{currentCharacter.name}</h1>
          <div>
            <ul>
              <li>
                <strong>Actor:</strong> {currentCharacter.actor}
              </li>
              <li>
                <strong>House:</strong> {currentCharacter.house}
              </li>
              <li>
                <strong>Status:</strong>
                {currentCharacter.alive ? "Alive" : "Dead"}
              </li>
            </ul>
          </div>
        </section>
        <section>
          <img src={currentCharacter.image} alt={currentCharacter.name} />
        </section>
      </div>
      <section className="flex items-center justify-center">
        <button onClick={onNextCharacter}>
          <img src={arrowBottom} alt="Next Character" className="h-20" />
        </button>
      </section>
    </React.Fragment>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <header className="flex items-center justify-center py-8">
        <img src={logo} alt="Logo" />
      </header>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CharacterDetail />
      </React.Suspense>
    </React.Fragment>
  );
};

export default App;
