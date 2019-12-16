import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { bindActionCreators, Dispatch } from 'redux';
import { updateParticipants } from '../../reducers';
import { CricketProgress, IParticipant } from '../../types/Participant';
import { resetParticipantsScore } from '../create/generateParticipants';
import CricketFooter from './components/CricketFooter';
import CricketHeader from './components/CricketHeader';
import CricketRow from './components/CricketRow';
import { navigate } from '@reach/router';
// import { listGames } from '../../graphql/queries';
import { createGame } from '../../graphql/mutations';
// import { createGame } from '../graphql/mutations';

// import API, { graphqlOperation } from '@aws-amplify/api';
// import { listGames } from '../graphql/queries';
// import { withOAuth } from 'aws-amplify-react';

// App ID: 532812897575477
// App secret: 95aa95052dc01f486aa33201840d771e

const { Content } = Layout;

interface ICricket {
  participants: IParticipant[];
  updateParticipants: Function;
}

export interface INumberSelection {
  [key: string]: number;
}

const Cricket = ({ participants, updateParticipants }: ICricket) => {
  const [turn, setTurn] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [winner, setWinner] = useState<IParticipant>();
  const [numberSelection, setNumberSelection] = useState<INumberSelection>({});

  const restart = () => {
    updateParticipants(resetParticipantsScore({ participants }));
    setTurn(0);
    setWinner(undefined);
    setNumberSelection({});
    setRounds(0);
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

    let totalSelection = 0;
    Object.keys(numberSelection).forEach(number => {
      const count = numberSelection[number];
      if (!isActionNumberDisabled(number)) {
        const progressIndex = participantToUpdate.progress.indexOf(
          participantToUpdate.progress.find(p => p.number === number) as CricketProgress
        );
        participantToUpdate.progress[progressIndex].count += count;
        totalSelection += count;
      }
    });

    if (totalSelection === 0) participantToUpdate.missCount += 1;
    const participantsCopy = [...participants];
    participantsCopy[turn] = participantToUpdate;
    updateParticipants(participantsCopy);

    const bullScore = participantToUpdate.progress.find(
      p => p.number === 'Bull'
    ) as CricketProgress;

    if (bullScore.count >= 3) {
      setWinner(participantToUpdate);
    } else {
      const lastTurn = turn === participants.length - 1;
      setTurn(lastTurn ? 0 : turn + 1);
      if (lastTurn) setRounds(rounds + 1);
      setNumberSelection({});
    }
  };

  const numbers =
    participants &&
    participants.length > 0 &&
    participants[0].progress.map(p => p.number);
  const progressColumnIndex = participants ? Math.ceil(participants.length / 2) : 0;
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

  const isActionNumberDisabled = (number: string): boolean => {
    if (!number || number === '20') {
      return false;
    }

    const actionableNumbers = getActionableNumbers();

    const actionAbove = actionableNumbers[actionableNumbers.indexOf(number) - 1];
    const currentNumberSelectionAbove =
      actionAbove === undefined ? 3 : numberSelection[actionAbove];
    const currentParticipantProgressAbove = participants[turn].progress.find(
      p => p.number === actionAbove
    ) as CricketProgress;
    let currentParticipantProgressAboveNumber = 0;
    if (currentParticipantProgressAbove) {
      currentParticipantProgressAboveNumber = currentParticipantProgressAbove.count;
    }

    return (
      isActionNumberDisabled(actionAbove) ||
      (currentNumberSelectionAbove === undefined ? 0 : currentNumberSelectionAbove) +
        currentParticipantProgressAboveNumber <
        3
    );
  };

  const getActionableNumbers = () =>
    participants && participants.length
      ? participants[turn].progress
          .filter(p => p.count < 3)
          .slice(0, 3)
          .map(p => p.number)
      : [];

  useEffect(() => {
    // Auth.currentSession()
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
    // const getGames = async () => {
    //   try {
    //     const resp = await API.graphql(graphqlOperation(listGames));
    //     console.log('Games fetching.', resp);
    //   } catch (e) {
    //     console.log('Error fetching games', e);
    //   }
    // };
    // getGames();
    const createGameMutation = async () => {
      try {
        await API.graphql(
          graphqlOperation(createGame, {
            input: {
              participants
            }
          })
        );
      } catch (e) {}
    };
    if (winner) {
      createGameMutation();
    }
  }, []);

  if (!participants || participants.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <Layout>
      <Content style={{ marginTop: 20 }}>
        {rows.map((row: any[], nRow: number) => {
          return (
            <div key={`${nRow} container`}>
              {nRow === 0 && (
                <CricketHeader
                  participants={participants}
                  progressColumnIndex={progressColumnIndex}
                  span={Math.floor(24 / rows[0].length)}
                  turn={turn}
                />
              )}
              <CricketRow
                containerStyle={{
                  marginTop: !nRow || 8,
                  border: '1px solid #ccc',
                  paddingBottom: 8,
                  paddingTop: 8
                }}
                row={row}
                span={Math.floor(24 / Math.floor(row.length))}
              />
            </div>
          );
        })}
      </Content>
      <CricketFooter
        actionableNumbers={getActionableNumbers()}
        isActionNumberDisabled={isActionNumberDisabled}
        onClickRestart={restart}
        onCountSelected={onCountSelected}
        onEndTurn={onEndTurn}
        participants={participants}
        turn={turn}
        winner={winner}
        numberSelection={numberSelection}
        rounds={rounds}
      />
    </Layout>
  );
};

function transpose(a: any) {
  if (!a || a.length === 0) return a;
  return Object.keys(a[0]).map(function(c) {
    return a.map(function(r: any) {
      return r[c];
    });
  });
}

function mapStateToProps(state: any) {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateParticipants }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cricket);
