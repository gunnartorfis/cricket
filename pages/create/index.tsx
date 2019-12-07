import { Col, Row, Steps } from 'antd';
import React, { useRef, useState } from 'react';
import Participants from './components/Participants';
import Settings from './components/Settings';

const { Step } = Steps;

enum Progress {
  Settings = 1,
  ParticipantsName
}

const Create = () => {
  const [progress, setProgress] = useState<Progress>(Progress.Settings);
  const numberOfParticipants = useRef<number>(0);
  const lowestBeforeBull = useRef<number>(0);

  return (
    <div style={{ marginTop: 100, paddingRight: '10%', paddingLeft: '10%' }}>
      <Steps current={progress - 1} size='small' style={{ marginBottom: 40 }}>
        <Step title='Settings' description='Number of participants and lowest before bull' />
        <Step title='Participants' description='Information about participants' />
      </Steps>
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
              onClickPrevious={() => setProgress(Progress.Settings)}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Create;
