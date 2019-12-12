import React from 'react';
import { Row, Col } from 'antd';
import Text from 'antd/lib/typography/Text';

interface ICricketRow {
  span: number;
  row: any;
  containerStyle: any;
}

const CricketRow = ({ row, span, containerStyle }: ICricketRow) => (
  <Row type='flex' justify='center' style={containerStyle}>
    {row.map((colValue: any, nCol: number) => (
      <Col span={span} key={nCol}>
        <Text
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          {colValue}
        </Text>
      </Col>
    ))}
  </Row>
);

export default CricketRow;
