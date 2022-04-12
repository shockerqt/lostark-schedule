import { useState } from 'react';
import './Card.scss';
import CharacterIcons from './ClassIcons';
import { SettingsIcon } from './icons';
import { Character } from './Main';

const AttemptsBar = ({ done, handleClick }: { done: number, handleClick: (value: number) => void }) => {
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
        className={`${done === 2 ? 'card-attempt-done' : 'card-attempt'}${hover === 2 ? ' card-attempt-hover' : ''}`}
        onMouseEnter={() => handleHover(2)}
        onClick={() => handleClick(2)}
      />
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

const Card = ({ char, setChar }: { char: Character, setChar: (value: Character) => void }) => {
  const classInfo = ClassesInfo[char.class];

  const handleAttemptClick = (key: string, value: number) => {
    setChar({
      ...char,
      [key]: value,
    });
    console.log(key, value);
  };

  return (
    <div className="card">
      <div className="card-settings-button">
        <SettingsIcon fill="white" height={24} />
      </div>
      <div className="card-header">
        {classInfo.icon}
        <div>
          <small className="card-classname">{`${classInfo.name} - ${char.ilvl}`}</small>
          <h4 className="card-nick">{char.nick}</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="card-task">
          <div className="card-task-header">
            <h5 className="card-task-title">Chaos Dungeon</h5>
            <small
              className="card-task-reset"
              onClick={() => handleAttemptClick('chaos', 0)}>
                Reset
            </small>
          </div>
          <AttemptsBar
            done={char.chaos}
            handleClick={(value: number) => handleAttemptClick('chaos', value)}
          />
          <RestBar done={char.chaosRest} />
        </div>

        <div className="card-task">
          <div className="card-task-header">
            <h5 className="card-task-title">Guardian Raid</h5>
            <small
              className="card-task-reset"
              onClick={() => handleAttemptClick('guardian', 0)}>
                Reset
            </small>
          </div>
          <AttemptsBar
            done={char.guardian}
            handleClick={(value: number) => handleAttemptClick('guardian', value)}
          />
          <RestBar done={char.guardianRest} />
        </div>

        <div className="card-task">
          <div className="card-task-header">
            <h5 className="card-task-title">Una's Tasks</h5>
            <small
              className="card-task-reset"
              onClick={() => handleAttemptClick('unas', 0)}>
                Reset
            </small>
          </div>
          <AttemptsBar
            done={char.unas}
            handleClick={(value: number) => handleAttemptClick('unas', value)}
          />
          <RestBar done={char.unasRest} />
        </div>
      </div>
    </div>
  );
};

export default Card;
