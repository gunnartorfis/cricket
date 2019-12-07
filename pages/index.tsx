import { Button } from 'antd';
import Router from 'next/router';

export default () => (
  <div style={{ marginTop: 100 }}>
    <Button
      type='primary'
      onClick={() => {
        Router.push('/newGame');
      }}
      block
    >
      Create Game
    </Button>
  </div>
);
