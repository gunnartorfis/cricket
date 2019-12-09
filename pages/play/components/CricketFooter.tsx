import React from 'react';
import Text from 'antd/lib/typography/Text';
import { Col, Row, Button, Layout, Radio } from 'antd';
import { IParticipant } from '../../../types/Participant';
import { INumberSelection } from '..';

const { Footer } = Layout;

interface ICricketFooter {
  winner?: IParticipant;
  onClickRestart: () => void;
  participants: IParticipant[];
  turn: number;
  actionableNumbers: string[];
  isActionNumberDisabled: (action: string) => boolean;
  onCountSelected: (value: number, action: string) => void;
  onEndTurn: () => void;
  numberSelection: INumberSelection;
  rounds: number;
}

const CricketFooter = ({
  winner,
  onClickRestart,
  participants,
  turn,
  actionableNumbers,
  isActionNumberDisabled,
  numberSelection,
  onCountSelected,
  onEndTurn,
  rounds
}: ICricketFooter) => {
  return (
    <Footer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {winner ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text>Winner: {winner.name}</Text>
            <Button style={{ marginTop: 16 }} type='primary' onClick={onClickRestart}>
              Restart
            </Button>
          </div>
        ) : (
          <Row>
            <Row type='flex' justify='center'>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{participants[turn].name}</Text>
            </Row>
            <Row type='flex' justify='center'>
              <Text>Rounds: {rounds}</Text>
            </Row>

            {actionableNumbers.map(action => (
              <Row key={action} style={{ marginTop: 8 }} type='flex' justify='center' align='middle' gutter={8}>
                <Col>
                  <Text>{action}</Text>
                </Col>
                <Col>
                  <Radio.Group
                    disabled={isActionNumberDisabled(action)}
                    value={numberSelection[action]}
                    onChange={e => onCountSelected(e.target.value, action)}
                    size='large'
                  >
                    <Radio.Button value={0}>0</Radio.Button>
                    <Radio.Button value={1}>1</Radio.Button>
                    <Radio.Button value={2}>2</Radio.Button>
                    <Radio.Button value={3}>3</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            ))}
            <Row type='flex' justify='center' style={{ marginTop: 8 }}>
              <Button onClick={onEndTurn}>End turn</Button>
            </Row>
          </Row>
        )}
      </div>
    </Footer>
  );
};

export default CricketFooter;
