import { Button, Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { navigate } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IParticipant } from '../../../types/Participant';
import generateParticipants from '../generateParticipants';
import { updateParticipants } from '../../../reducers';

interface IParticipants {
  numberOfParticipants: number;
  lowestBeforeBull: number;
  onClickPrevious: () => void;
  updateParticipants: Function;
}

const Participants = ({
  numberOfParticipants,
  lowestBeforeBull,
  onClickPrevious,
  updateParticipants
}: IParticipants) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  useEffect(() => {
    setParticipants(
      generateParticipants({
        numberOfParticipants,
        lowestBeforeBull
      })
    );
  }, [numberOfParticipants]);

  return (
    <Form layout='horizontal'>
      {participants.map((p, i) => (
        <FormItem
          key={i}
          label={`Participant #${i}`}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input
            size='large'
            style={{ width: 200 }}
            value={p.name}
            onChange={e => {
              const currentParticipants = Array.from(participants);
              currentParticipants[i] = {
                ...currentParticipants[i],
                name: e.target.value
              };
              setParticipants(currentParticipants);
            }}
          />
        </FormItem>
      ))}
      <FormItem>
        <Button
          type='primary'
          onClick={() => {
            updateParticipants(participants);
            navigate('/play');
          }}
          block
        >
          Create Game
        </Button>
        <Button type='default' onClick={onClickPrevious} block>
          Previous
        </Button>
      </FormItem>
    </Form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateParticipants }, dispatch);

export default connect(null, mapDispatchToProps)(Participants);
