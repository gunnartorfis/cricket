import { Button, Checkbox, Form, Radio } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { navigate } from '@reach/router';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { updateParticipants } from '../../../reducers';
import { IParticipant } from '../../../types/Participant';
import generateParticipants from '../generateParticipants';

interface IParticipants {
  numberOfParticipants: number;
  lowestBeforeBull: number;
  updateParticipants: Function;
}

const fixedParticipants: Partial<IParticipant>[] = [
  { name: 'Gunnar' },
  { name: 'Jón' },
  { name: 'Kjartan' },
  { name: 'Óskar' }
];

const Participants = ({ updateParticipants }: IParticipants) => {
  const [checkedValues, setCheckedValues] = useState<boolean[]>(
    fixedParticipants.map(() => false)
  );
  const [lowestBeforeBull, setLowestBeforeBull] = useState(15);

  const lowestBeforeBullOptions = [];
  for (let i = 10; i <= 15; i++) {
    lowestBeforeBullOptions.push(i);
  }

  const updateCheckedValuesForIndex = (index: number) => {
    setCheckedValues(checkedValues.map((c, i) => (i === index ? !c : c)));
  };

  return (
    <Form layout='horizontal'>
      <FormItem
        label='Lowest number before bull'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Radio.Group
          buttonStyle='solid'
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
      {fixedParticipants.map(({ name }, i) => (
        <Checkbox
          key={i}
          onChange={() => {
            updateCheckedValuesForIndex(i);
          }}
        >
          {name}
        </Checkbox>
      ))}
      <FormItem>
        <Button
          disabled={checkedValues.find(c => !c)}
          type='primary'
          onClick={() => {
            const participanting = fixedParticipants.filter(
              (_, index) => checkedValues[index]
            );
            const participants = generateParticipants({
              numberOfParticipants: participanting.length,
              lowestBeforeBull,
              names: participanting.map(p => p.name || '')
            });
            updateParticipants(participants);
            navigate('/play');
          }}
          block
        >
          Create Game
        </Button>
      </FormItem>
    </Form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateParticipants }, dispatch);

export default connect(null, mapDispatchToProps)(Participants);
