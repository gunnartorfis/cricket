import { Typography, Row, Col } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { updateParticipants } from '../../store';
import { IParticipant } from '../../types/Participant';
import Text from 'antd/lib/typography/Text';
// import Column from 'antd/lib/table/Column';

const { Title } = Typography;

interface ICricket {
  participants: IParticipant[];
}

const Cricket = ({ participants }: ICricket) => {
  if (!participants || participants.length === 0) {
    return null;
  }

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

  columns = transpose(columns);

  return (
    <div style={{ marginTop: 100 }}>
      <Title style={{ width: '100%', textAlign: 'center' }}>Cricket</Title>
      <Row justify='center' align='middle'>
        {columns.map((column: any[]) => {
          return column.map((value, index2) => (
            <Col span={24 / column.length} key={index2}>
              <div style={{ display: 'flex' }}>
                <Text style={{ textAlign: 'center', width: '100%' }}>{value}</Text>
              </div>
            </Col>
          ));
        })}
      </Row>
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
