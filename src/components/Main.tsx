import { useEffect, useState } from 'react';
import Card from './Card';

import './Main.scss';

export type CharacterClass = 'berserker' | 'paladin' | 'gunlancer' | 'gunslinger';

export interface Character {
  // sequence: number;
  nick: string;
  ilvl: number;
  class: CharacterClass;
  chaos: number;
  chaosRest: number;
  guardian: number;
  guardianRest: number;
  unas: number;
  unasRest: number;
}

interface MainProps {
  setModal: (title: string, content: JSX.Element) => void;
}

const Main = ({ setModal }: MainProps) => {
  const [chars, setChars] = useState<Character[]>([]);

  useEffect(() => {
    setChars([
      {
        // sequence: 1,
        nick: 'Shockerqt',
        ilvl: 1390,
        class: 'gunslinger',
        chaos: 0,
        chaosRest: 4,
        guardian: 1,
        guardianRest: 6,
        unas: 2,
        unasRest: 7,
      },
    ]);
  }, []);

  useEffect(() => {
    console.log(chars);
  }, [chars]);

  const setChar = (index: number, value: Character) => {
    setChars((oldValue) => {
      const newValue = [...oldValue];
      newValue[index] = value;
      return newValue;
    });
  };


  return (
    <main>
      <button onClick={() => setModal('Add Character', <div></div>)}>Add character</button>
      <div className="cards">
        {chars.map((char, index) => <Card key={index} char={char} setChar={(value: Character) => setChar(index, value)} />)}
      </div>
    </main>
  );
};

export default Main;
