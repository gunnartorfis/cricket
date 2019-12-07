import { Form, Input, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useEffect, useState } from 'react';
import { IParticipant } from '../../../types/Participant';
import generateParticipants from '../generateParticipants';

interface IParticipants {
  numberOfParticipants: number;
  lowestBeforeBull: number;
  onClickForward: (participants: IParticipant[]) => void;
}

const Participants = ({ numberOfParticipants, lowestBeforeBull, onClickForward }: IParticipants) => {
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
        <FormItem key={p._id} label={`Participant #${p._id}`} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Input
            size='large'
            style={{ width: 100 }}
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
            onClickForward(participants);
          }}
        >
          Create Game
        </Button>
      </FormItem>
    </Form>
  );
};

export default Participants;
