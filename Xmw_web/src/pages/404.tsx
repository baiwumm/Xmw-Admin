import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="您貌似走丢了.."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        回到主页
      </Button>
    }
  />
);

export default NoFoundPage;
