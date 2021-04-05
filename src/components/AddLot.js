import React, { useState } from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import '../css/index.css';
import * as portfolioUtils from '../utils/portfolioUtils';

const AddLot = (props) => {
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onFinish = (values) => {
    portfolioUtils.addLotToPortfolio(
      values.ticker,
      values.boughtShares,
      values.boughtPrice,
      values.date.toDate(),
      values.broker
    );
    props.rerender();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h3>Add a new lot</h3>
      <Form
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        labelAlign="left"
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        name="Add a lot"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Buy date"
          name="date"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Ticker"
          name="ticker"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Number of shares"
          name="boughtShares"
          rules={[
            {
              required: true,
              message: 'Must be a number',
              pattern: '^[0-9]*?.[0-9]*$',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Buy price"
          name="boughtPrice"
          rules={[
            {
              required: true,
              message: 'Must be a number',
              pattern: '^[0-9]*?.[0-9]*$',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Broker"
          name="broker"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddLot;
