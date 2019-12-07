import { Button, Form, Radio } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';

interface ISettings {
  disabled: boolean;
  onClickForward: ({ participants, lowestBeforeBull }: { participants: number; lowestBeforeBull: number }) => void;
}

const Settings = ({ disabled, onClickForward }: ISettings) => {
  const [participants, setParticipants] = useState(2);
  const [lowestBeforeBull, setLowestBeforeBull] = useState(15);

  const participantsOptions = [];
  for (let i = 2; i <= 4; i++) {
    participantsOptions.push(i);
  }

  const lowestBeforeBullOptions = [];
  for (let i = 10; i <= 15; i++) {
    lowestBeforeBullOptions.push(i);
  }

  return (
    <Form layout='horizontal'>
      <FormItem label='Participants' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Radio.Group
          disabled={disabled}
          onChange={e => {
            setParticipants(e.target.value);
          }}
          value={participants}
        >
          {participantsOptions.map(o => (
            <Radio.Button value={o} key={o}>
              {o}
            </Radio.Button>
          ))}
        </Radio.Group>
      </FormItem>
      <FormItem label='Lowest number before bull' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Radio.Group
          disabled={disabled}
          onChange={e => {
            setLowestBeforeBull(e.target.value);
          }}
          value={lowestBeforeBull}
        >
          {lowestBeforeBullOptions.map(o => (
            <Radio.Button value={o} key={o}>
              {o}
            </Radio.Button>
          ))}
        </Radio.Group>
      </FormItem>
      <FormItem>
        <Button
          disabled={disabled}
          type='primary'
          onClick={() => {
            onClickForward({
              participants,
              lowestBeforeBull
            });
          }}
          block
        >
          Next
        </Button>
      </FormItem>
    </Form>
  );
};

export default Settings;
