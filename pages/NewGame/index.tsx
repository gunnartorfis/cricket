import React, { useState, useRef } from 'react';
import Settings from './components/Settings';
import Participants from './components/Participants';

enum Progress {
  Settings = 1,
  ParticipantsName
}

const NewGame = () => {
  const [progress, setProgress] = useState<Progress>(Progress.Settings);
  const numberOfParticipants = useRef<number>(0);
  const lowestBeforeBull = useRef<number>(0);

  return (
    <div style={{ marginTop: 100 }}>
      <Settings
        disabled={progress !== Progress.Settings}
        onClickForward={({ lowestBeforeBull: lowest, participants }) => {
          numberOfParticipants.current = participants;
          lowestBeforeBull.current = lowest;
          setProgress(Progress.ParticipantsName);
        }}
      />
      {progress === Progress.ParticipantsName && (
        <Participants
          numberOfParticipants={numberOfParticipants.current}
          lowestBeforeBull={lowestBeforeBull.current}
          onClickForward={participants => {
            console.log({
              participants
            });
          }}
        />
      )}
    </div>
  );
};

export default NewGame;
