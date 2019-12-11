import { Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { CSSProperties } from 'react';
import { IParticipant } from '../../../types/Participant';

interface ICricketHeader {
  participants: IParticipant[];
  progressColumnIndex: number;
  turn: number;
  span: number;
}

const CricketHeader = ({
  participants,
  progressColumnIndex,
  turn,
  span
}: ICricketHeader) => {
  const participantNamesHeader: any = [];
  for (let i = 0, j = 0; i < participants.length; j++) {
    if (i === progressColumnIndex) {
      participantNamesHeader.push(<Col span={span} key={i}></Col>);
    }
    const blockStyle = {
      width: '100%',
      display: 'inline-block',
      textAlign: 'center'
    } as CSSProperties;
    const participant = participants[i];
    participantNamesHeader.push(
      <Col span={span} key={`${i} ${participant.name}`}>
        <Text
          style={{
            color: turn === i ? 'green' : 'black',
            fontWeight: 'bold',
            fontSize: 24,
            ...blockStyle
          }}
        >
          {participant.name}
        </Text>
        <Text style={blockStyle}>Misses: {participant.missCount}</Text>
      </Col>
    );
    i++;
  }

  return (
    <Row type='flex' justify='center'>
      {participantNamesHeader}
    </Row>
  );
};

export default CricketHeader;
