import { Col, Row } from 'antd';
import React, { useRef, useState } from 'react';
import Participants from './components/Participants';
import Settings from './components/Settings';

enum Progress {
  Settings = 1,
  ParticipantsName
}

const Create = () => {
  const [progress, setProgress] = useState<Progress>(Progress.ParticipantsName);
  const numberOfParticipants = useRef<number>(0);
  const lowestBeforeBull = useRef<number>(0);

  return (
    <div style={{ marginTop: 20, paddingRight: '10%', paddingLeft: '10%' }}>
      <Row>
        <Col span={12} offset={6}>
          {progress === Progress.Settings && (
            <Settings
              disabled={progress !== Progress.Settings}
              onClickForward={({ lowestBeforeBull: lowest, participants }) => {
                numberOfParticipants.current = participants;
                lowestBeforeBull.current = lowest;
                setProgress(Progress.ParticipantsName);
              }}
            />
          )}
          {progress === Progress.ParticipantsName && (
            <Participants
              numberOfParticipants={numberOfParticipants.current}
              lowestBeforeBull={lowestBeforeBull.current}
              // onClickPrevious={() => setProgress(Progress.Settings)}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Create;
