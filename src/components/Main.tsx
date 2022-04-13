import { useEffect, useState } from 'react';
import Card from './Card';

import './Main.scss';

export type CharacterClass = 'berserker' | 'paladin' | 'gunlancer' | 'gunslinger';

export interface Character {
  nick: string;
  ilvl: number;
  class: CharacterClass;
  chaosDone: number;
  chaosRest: number;
  initialChaosRest: number;
  guardianDone: number;
  guardianRest: number;
  initialGuardianRest: number;
  unasDone: number;
  unasRest: number;
  initialUnasRest: number;
}

interface MainProps {
  setModal: (title: string, Content: (props: { closeModal: () => void }) => JSX.Element) => void;
}

interface Countdown {
  hours: number,
  minutes: number,
  seconds: number,
}

const UPDATE_TIME = 10;
const RESET_INTERVAL = 24*60*60*1000;
// const RESET_INTERVAL = 10*1000;

const Main = ({ setModal }: MainProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [resetCountdown, setResetCountdown] = useState<Countdown>();

  const getResetTimer = () => {
    const now = new Date();
    let reset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), UPDATE_TIME));
    while (reset <= now) {
      reset = new Date(reset.getTime() + RESET_INTERVAL);
    }
    return reset.getTime() - now.getTime();
  };

  const getNextDailyReset = () => {
    const now = new Date();
    let reset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), UPDATE_TIME));
    while (reset <= now) {
      reset = new Date(reset.getTime() + RESET_INTERVAL);
    }
    return reset;
  };


  useEffect(() => {
    const savedCharacters = localStorage.getItem('characters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
    setLoaded(true);

    setTimeout(() => {
      window.location.reload();
    }, getResetTimer());
  }, []);

  useEffect(() => {
    const timer = getResetTimer();

    setTimeout(() => {
      setResetCountdown({
        hours: Math.floor(timer / 1000 / 60 / 60),
        minutes: Math.floor(timer / 1000 / 60) % 60,
        seconds: Math.floor(timer / 1000) % 60,
      });
    }, 1000);

  }, [resetCountdown]);

  useEffect(() => {
    if (loaded) {
      const nextDailyReset = localStorage.getItem('nextDailyReset');

      // If last update is before than next daily reset,
      // update data and update next daily reset to tomorrow
      if (nextDailyReset) {
        const now = new Date();
        let nextResetDate = new Date(parseInt(nextDailyReset));
        let days = 0;
        while (now > nextResetDate) {
          days += 1;
          nextResetDate = new Date(nextResetDate.getTime() + RESET_INTERVAL);
        }
        if (days >= 1) {
          localStorage.setItem('nextDailyReset', JSON.stringify(getNextDailyReset().getTime()));
          updateData(days);
        } else {
          localStorage.setItem('characters', JSON.stringify(characters));
          localStorage.setItem('nextDailyReset', JSON.stringify(getNextDailyReset().getTime()));
        }
      } else { // It there is no info about resets on storage, save new data
        localStorage.setItem('characters', JSON.stringify(characters));
        localStorage.setItem('nextDailyReset', JSON.stringify(getNextDailyReset().getTime()));
      }

      console.log(`
        ==================
        === SAVED DATA ===
        ==================
      `);
    }
  }, [characters]);

  const updateData = (days: number) => {
    let updatedCharacters = characters;
    for (let i = 0; i < days; i++) {
      updatedCharacters = updatedCharacters.map((character: Character) => {
        return ({
          ...character,
          chaosDone: 0,
          guardianDone: 0,
          unasDone: 0,

          chaosRest: Math.min(character.chaosRest + 2 - character.chaosDone, 10),
          guardianRest: Math.min(character.guardianRest + 2 - character.guardianDone, 10),
          unasRest: Math.min(character.unasRest + 3 - character.unasDone, 10),

          initialChaosRest: Math.min(character.chaosRest + 2 - character.chaosDone, 10),
          initialGuardianRest: Math.min(character.guardianRest + 2 - character.guardianDone, 10),
          initialUnasRest: Math.min(character.unasRest + 3 - character.unasDone, 10),
        });
      });
    }
    setCharacters(updatedCharacters);
  };

  // Testing purpose
  const resetRest = () => {
    const updatedCharacters = characters.map((character: Character) => {
      return ({
        ...character,
        chaosRest: 0,
        guardianRest: 0,
        unasRest: 0,
      });
    });

    setCharacters(updatedCharacters);
  };

  const setCharacter = (index: number, value: Character) => {
    setCharacters((oldValue) => {
      const newValue = [...oldValue];
      newValue[index] = value;
      return newValue;
    });
  };

  const addCharacter = (newChar: Character) => {
    setCharacters((oldValue) => [...oldValue, newChar]);
  };

  const formatCountdown = () => {
    if (resetCountdown) {
      const hours = resetCountdown.hours.toString().padStart(2, '0');
      const minutes = resetCountdown.minutes.toString().padStart(2, '0');
      const seconds = resetCountdown.seconds.toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return '';
    }
  };

  const AddCharacterModal = ({ closeModal }: { closeModal: () => void }) => {
    const [formData, setFormData] = useState<Character>({
      nick: '',
      ilvl: 0,
      class: 'berserker',
      chaosDone: 0,
      chaosRest: 0,
      initialChaosRest: 0,
      guardianDone: 0,
      guardianRest: 0,
      initialGuardianRest: 0,
      unasDone: 0,
      unasRest: 0,
      initialUnasRest: 0,
    });

    const handleSave = () => {
      addCharacter(formData);
      closeModal();
    };

    return (
      <div>
        <button onClick={handleSave}>Save</button>
        <form onSubmit={handleSave}>
          <label htmlFor="new-char-nick">Nickname</label>
          <input
            value={formData.nick}
            onChange={(event) => setFormData((oldValue) => ({ ...oldValue, nick: event.target.value }))}
            id="new-char-nick"
            type="text"
          />

          <label htmlFor="new-char-class">Class</label>
          <select
            value={formData.class}
            onChange={(event) => setFormData((oldValue) => ({ ...oldValue, class: event.target.value as CharacterClass }))}
            id="new-char-class">
            <option value="berserker">Berserker</option>
            <option value="gunslinger">Gunslinger</option>
          </select>
        </form>
      </div>
    );
  };

  return (
    <>
      <header>
        <h1>Lost Ark daily logger</h1>
        <button onClick={() => setModal('Add Character', AddCharacterModal)}>Add character</button>
        <button onClick={() => updateData(1)}>+1</button>
        <button onClick={() => updateData(2)}>+2</button>
        <button onClick={() => updateData(3)}>+3</button>
        <button onClick={resetRest}>reset</button>

        <p>{`Daily reset in ${formatCountdown()}`}</p>
      </header>
      <main>
        <div className="cards">
          {characters.map((character, index) => <Card key={index} character={character} setCharacter={(value: Character) => setCharacter(index, value)} />)}
        </div>
      </main>
    </>
  );
};

export default Main;
