import { useState } from 'react';
import './Card.scss';
import CharacterIcons from './ClassIcons';
import { SettingsIcon } from './icons';
import { Character } from './Main';

const AttemptsBar = ({ done, handleClick, max }: { done: number, max: number, handleClick: (value: number) => void }) => {
  const [hover, setHover] = useState(0);

  const handleHover = (bar: number) => {
    setHover(bar);
  };

  return (
    <div
      className="card-attempts"
      title="Attempts"
      onMouseLeave={() => handleHover(0)}
    >
      <div
        className={`${done >= 1 ? 'card-attempt-done' : 'card-attempt'}${hover >= 1 ? ' card-attempt-hover' : ''}`}
        onMouseEnter={() => handleHover(1)}
        onClick={() => handleClick(1)}
      />
      <div
        className={`${done >= 2 ? 'card-attempt-done' : 'card-attempt'}${hover >= 2 ? ' card-attempt-hover' : ''}`}
        onMouseEnter={() => handleHover(2)}
        onClick={() => handleClick(2)}
      />
      {max > 2 &&
        <div
          className={`${done >= 3 ? 'card-attempt-done' : 'card-attempt'}${hover >= 3 ? ' card-attempt-hover' : ''}`}
          onMouseEnter={() => handleHover(3)}
          onClick={() => handleClick(3)}
        />}
    </div>
  );
};

const RestBar = ({ done }: { done: number }) => (
  <div className="card-rest">
    {new Array(5).fill(0).map((_, index) => {
      let n = 0;
      if ((index + 1) * 2 <= done) n = 2;
      else if (done % 2 === 1 && index * 2 < done) n = 1;
      return (
        <div key={index} title="Rest">
          <div className={n === 0 ? 'card-rest': 'card-rest-done'}></div>
          <div className={n === 2 ? 'card-rest-done': 'card-rest'}></div>
        </div>
      );
    })}
  </div>
);


const props = {
  fill: 'white',
  height: 60,
};

const ClassesInfo = {
  'berserker': {
    name: 'Berserker',
    icon: <CharacterIcons.BerserkerIcon {...props} />,
  },
  'paladin': {
    name: 'Paladin',
    icon: <CharacterIcons.PaladinIcon {...props} />,
  },
  'gunlancer': {
    name: 'Gunlancer',
    icon: <CharacterIcons.GunslingerIcon {...props} />,
  },
  'gunslinger': {
    name: 'Gunslinger',
    icon: <CharacterIcons.GunslingerIcon {...props} />,
  },
};

const Card = ({ character, setCharacter }: { character: Character, setCharacter: (value: Character) => void }) => {
  const classInfo = ClassesInfo[character.class];

  const handleAttemptClick = (key: string, value: number) => {
    let restKey = 'unasRest';
    let restValue = Math.max(character.initialUnasRest - 2 * value, character.initialUnasRest % 2);
    if (key === 'chaosDone') {
      restKey = 'chaosRest';
      restValue = Math.max(character.initialChaosRest - 2 * value, character.initialChaosRest % 2);
    }
    if (key === 'guardianDone') {
      restKey = 'guardianRest';
      restValue = Math.max(character.initialGuardianRest - 2 * value, character.initialGuardianRest % 2);
    }
    setCharacter({
      ...character,
      [key]: value,
      [restKey]: restValue,
    });
  };

  return (
    <div className="card">
      {/* <div className="card-settings-button">
        <SettingsIcon fill="white" height={24} />
      </div> */}
      <div className="card-header">
        <div className="card-header-header">
          {classInfo.icon}
          <div>
            <small className="card-classname">{`${classInfo.name} - ${character.ilvl}`}</small>
            <h4 className="card-nick">{character.nick}</h4>
          </div>
        </div>
      </div>
      <div className="card-quick-notes">
        {/* <label htmlFor="card-quick-notes">Quick Notes</label> */}
        <textarea id="card-quick-notes" aria-label="Quick notes" placeholder="Quick notes" />
      </div>
      <div className="card-center">
        <h3 className="card-center-header">
          Dailies
        </h3>
        <div className="card-task">
          <div className="card-task-header">
            <h5 className="card-task-title">Chaos Dungeon</h5>
            <small
              className="card-task-reset"
              onClick={() => handleAttemptClick('chaosDone', 0)}>
                Reset
            </small>
          </div>
          <AttemptsBar
            done={character.chaosDone}
            max={2}
            handleClick={(value: number) => handleAttemptClick('chaosDone', value)}
          />
          <RestBar done={character.chaosRest} />
        </div>

        <div className="card-task">
          <div className="card-task-header">
            <h5 className="card-task-title">Guardian Raid</h5>
            <small
              className="card-task-reset"
              onClick={() => handleAttemptClick('guardianDone', 0)}>
                Reset
            </small>
          </div>
          <AttemptsBar
            done={character.guardianDone}
            max={2}
            handleClick={(value: number) => handleAttemptClick('guardianDone', value)}
          />
          <RestBar done={character.guardianRest} />
        </div>

        <div className="card-task">
          <div className="card-task-header">
            <h5 className="card-task-title">Una's Tasks</h5>
            <small
              className="card-task-reset"
              onClick={() => handleAttemptClick('unasDone', 0)}>
                Reset
            </small>
          </div>
          <AttemptsBar
            done={character.unasDone}
            max={3}
            handleClick={(value: number) => handleAttemptClick('unasDone', value)}
          />
          <RestBar done={character.unasRest} />
        </div>
      </div>
      <div className="card-right">
        <h3 className="card-right-header">
          Weeklies
        </h3>
      </div>
    </div>
  );
};

export default Card;
