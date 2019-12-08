import { Typography, Col, Row, Button, Layout, Radio } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { updateParticipants } from '../../store';
import { IParticipant, CricketProgress } from '../../types/Participant';
import Text from 'antd/lib/typography/Text';
import { resetParticipantsScore } from '../index/generateParticipants';

const { Title } = Typography;
const { Footer, Content } = Layout;

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
  const [numberSelection, setNumberSelection] = useState<{ [key: string]: number }>({});

  const restart = () => {
    updateParticipants(resetParticipantsScore({ participants }));
    setTurn(0);
    setWinner(undefined);
    setNumberSelection({});
  };

  const onCountSelected = (count: any, action: string) => {
    const newActionValue = parseInt(count);

    setNumberSelection({
      ...numberSelection,
      [action]: newActionValue
    });
  };

  const onEndTurn = () => {
    const participantToUpdate = participants[turn];

    // const currentTarget = participantToUpdate.progress.find(p => p.count < 3) as CricketProgress;
    Object.keys(numberSelection).forEach(number => {
      const count = numberSelection[number];
      participantToUpdate.progress[
        participantToUpdate.progress.indexOf(participantToUpdate.progress.find(p => p.number === number) as CricketProgress)
      ].count = count;
    });

    // participantToUpdate.progress[participantToUpdate.progress.indexOf(currentTarget)].count += score;

    const participantsCopy = [...participants];
    participantsCopy[turn] = participantToUpdate;
    updateParticipants(participantsCopy);

    const bullScore = participantToUpdate.progress.find(p => p.number === 'Bull') as CricketProgress;

    if (bullScore.count >= 3) {
      setWinner(participantToUpdate);
    } else {
      setTurn(turn === participants.length - 1 ? 0 : turn + 1);
      setNumberSelection({});
    }
  };

  const numbers = participants[0].progress.map(p => p.number);
  const progressColumnIndex = Math.ceil(participants.length / 2);
  let columns = [];

  for (let i = 0; i < participants.length; i++) {
    const participantValue = participants[i].progress.map(p => p.count);
    if (i === progressColumnIndex) {
      // Numbers
      columns.push(numbers);
      columns.push(participantValue);
      i++;
    } else {
      // Progress
      columns.push(participantValue);
    }
  }

  if (participants.length > 3) {
    columns.push(participants.slice(-1)[0].progress.map(p => p.count));
  }

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

  const isActionNumberDisabled = (number: string): boolean => {
    if (!number || number === '20') {
      return false;
    }

    const actionableNumbers = getActionableNumbers();

    const actionAbove = actionableNumbers[actionableNumbers.indexOf(number) - 1];
    const currentNumberSelectionAbove = actionAbove === undefined ? 3 : numberSelection[actionAbove];
    const currentParticipantProgressAbove = participants[turn].progress.find(p => p.number === actionAbove) as CricketProgress;
    let currentParticipantProgressAboveNumber = 0;
    if (currentParticipantProgressAbove) {
      currentParticipantProgressAboveNumber = currentParticipantProgressAbove.count;
    }

    return (
      isActionNumberDisabled(actionAbove) ||
      (currentNumberSelectionAbove === undefined ? 0 : currentNumberSelectionAbove) + currentParticipantProgressAboveNumber < 3
    );
  };

  const getActionableNumbers = () =>
    participants[turn].progress
      .filter(p => p.count < 3)
      .slice(0, 3)
      .map(p => p.number);

  return (
    <Layout>
      <Content style={{ marginTop: 100 }}>
        <Title style={{ width: '100%', textAlign: 'center' }}>Cricket</Title>
        {rows.map((row: any[], nRow) => {
          return (
            <div style={{}} key={`${nRow} container`}>
              {nRow === 0 && (
                <Row type='flex' justify='center'>
                  {participantNamesHeader}
                </Row>
              )}
              <Row key={nRow} type='flex' justify='center'>
                {row.map((colValue, nCol) => (
                  <Col span={Math.floor(24 / row.length)} key={nCol}>
                    <div
                      style={{
                        display: 'flex'
                      }}
                    >
                      <Text
                        style={{
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
            </div>
          );
        })}
      </Content>
      <Footer>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          {winner ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text>Winner: {winner.name}</Text>
              <Button style={{ marginTop: 16 }} type='primary' onClick={restart}>
                Restart
              </Button>
            </div>
          ) : (
            <Row>
              <Row type='flex' justify='center'>
                <Text>{participants[turn].name}</Text>
              </Row>
              {getActionableNumbers().map(action => {
                return (
                  <Row key={action} style={{ marginTop: 8 }} type='flex' justify='center' gutter={8}>
                    <Col>
                      <Text>{action}</Text>
                    </Col>
                    <Col>
                      <Radio.Group
                        disabled={isActionNumberDisabled(action)}
                        value={numberSelection[action]}
                        onChange={e => onCountSelected(e.target.value, action)}
                      >
                        <Radio.Button value={0}>0</Radio.Button>
                        <Radio.Button value={1}>1</Radio.Button>
                        <Radio.Button value={2}>2</Radio.Button>
                        <Radio.Button value={3}>3</Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Row>
                );
              })}
              <Row type='flex' justify='center' style={{ marginTop: 8 }}>
                <Button onClick={onEndTurn}>End turn</Button>
              </Row>
            </Row>
          )}
        </div>
      </Footer>
    </Layout>
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
