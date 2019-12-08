import { Typography, Col, Row, Button } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { updateParticipants } from '../../store';
import { IParticipant, CricketProgress } from '../../types/Participant';
import Text from 'antd/lib/typography/Text';
import { resetParticipantsScore } from '../index/generateParticipants';

const { Title } = Typography;
const ButtonGroup = Button.Group;

interface ICricket {
  participants: IParticipant[];
  updateParticipants: Function;
}

const Cricket = ({ participants, updateParticipants }: ICricket) => {
  if (!participants || participants.length === 0) {
    return null;
  }

  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState<IParticipant>();

  const restart = () => {
    updateParticipants(resetParticipantsScore({ participants }));
    setTurn(0);
    setWinner(undefined);
  };

  const onTurnEnd = (score: number) => {
    const participantToUpdate = participants[turn];

    const currentTarget = participantToUpdate.progress.find(p => p.count < 3) as CricketProgress;
    const progressCopy = [...participantToUpdate.progress];
    progressCopy[progressCopy.indexOf(currentTarget)] = {
      number: progressCopy[progressCopy.indexOf(currentTarget)].number,
      count: progressCopy[progressCopy.indexOf(currentTarget)].count + score
    };

    participantToUpdate.progress = progressCopy;

    const participantsCopy = [...participants];
    participantsCopy[turn] = participantToUpdate;
    updateParticipants(participantsCopy);

    const bullScore = participantToUpdate.progress.find(p => p.number === 'Bull') as CricketProgress;

    if (bullScore.count >= 3) {
      setWinner(participantToUpdate);
    } else {
      setTurn(turn === participants.length - 1 ? 0 : turn + 1);
    }
  };

  const numbers = participants[0].progress.map(p => p.number);
  const progressColumnIndex = Math.ceil(participants.length / 2);
  let columns = [];

  for (let i = 0; i < participants.length; i++) {
    if (i === progressColumnIndex) {
      // Numbers
      columns.push(numbers);
    } else {
      // Progress
      columns.push(participants[i].progress.map(p => p.count));
    }
  }
  columns.push(participants.slice(-1)[0].progress.map(p => p.count));
  const rows = transpose(columns);

  const participantNamesHeader: any = [];
  for (let i = 0, j = 0; i < participants.length; j++) {
    const span = Math.floor(24 / rows[0].length);
    if (i === progressColumnIndex) {
      participantNamesHeader.push(
        <Col span={span} key={i}>
          <Text> </Text>
        </Col>
      );
    }
    participantNamesHeader.push(
      <Col span={span} key={`${i} ${participants[i]._id}`}>
        <div style={{ display: 'flex' }}>
          <Text
            style={{
              textAlign: i === progressColumnIndex ? 'left' : i < progressColumnIndex ? 'right' : 'left',
              width: '100%',
              flex: 1,
              color: turn === i ? 'green' : 'black'
            }}
          >
            {participants[i].name}
          </Text>
        </div>
      </Col>
    );
    i++;
  }

  return (
    <div style={{ marginTop: 100 }}>
      <Title style={{ width: '100%', textAlign: 'center' }}>Cricket</Title>
      <div>
        <Row gutter={16}>{participantNamesHeader}</Row>
      </div>
      {rows.map((row: any[], nRow) => {
        return (
          <Row justify='center' align='middle' key={nRow}>
            {row.map((colValue, nCol) => (
              <Col span={Math.floor(24 / row.length)} key={nCol}>
                <div
                  style={{
                    display: 'flex'
                    // backgroundColor: 'blue'
                  }}
                >
                  <Text
                    style={{
                      // backgroundColor: 'green',
                      textAlign: nCol === progressColumnIndex ? 'center' : nCol < progressColumnIndex ? 'right' : 'left',
                      width: '100%',
                      flex: 1
                    }}
                  >
                    {colValue}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        );
      })}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        {winner ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text>Winner: {winner.name}</Text>
            <Button style={{ marginTop: 16 }} type='primary' onClick={restart}>
              Restart
            </Button>
          </div>
        ) : (
          <ButtonGroup>
            <Button onClick={() => onTurnEnd(0)}>0</Button>
            <Button onClick={() => onTurnEnd(1)}>1</Button>
            <Button onClick={() => onTurnEnd(2)}>2</Button>
            <Button onClick={() => onTurnEnd(3)}>3</Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  );
};

function transpose(a: any) {
  return Object.keys(a[0]).map(function(c) {
    return a.map(function(r: any) {
      return r[c];
    });
  });
}

function mapStateToProps(state: any) {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ updateParticipants }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cricket);
