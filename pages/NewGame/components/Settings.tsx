import { Button, Form, InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';

interface ISettings {
  disabled: boolean;
  onClickForward: ({ participants, lowestBeforeBull }: { participants: number; lowestBeforeBull: number }) => void;
}

const Settings = ({ disabled, onClickForward }: ISettings) => {
  const [participants, setParticipants] = useState(2);
  const [lowestBeforeBull, setLowestBeforeBull] = useState(15);

  return (
    <Form layout='horizontal'>
      <FormItem label='Participants' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <InputNumber
          disabled={disabled}
          size='large'
          min={2}
          max={10}
          style={{ width: 100 }}
          value={participants}
          onChange={(newValue = 2) => {
            setParticipants(newValue);
          }}
          name='inputNumber'
        />
      </FormItem>
      <FormItem label='Lowest number before bull' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <InputNumber
          disabled={disabled}
          size='large'
          min={1}
          max={20}
          style={{ width: 100 }}
          value={lowestBeforeBull}
          onChange={(newValue = 15) => {
            setLowestBeforeBull(newValue);
          }}
          name='inputNumber'
        />
      </FormItem>
      <FormItem>
        <Button
          type='primary'
          onClick={() => {
            onClickForward({
              participants,
              lowestBeforeBull
            });
          }}
        >
          Next
        </Button>
      </FormItem>
    </Form>
  );
};

export default Settings;
