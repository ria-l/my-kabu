import React from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import '../css/index.css';
import * as portfolioUtils from '../utils/portfolioUtils';

class AddLot extends React.Component {
  state = {};

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  onFinish = (values) => {
    console.log('Success:', values);
    this.props.submitted(true);
    portfolioUtils.addLotToPortfolio(
      values.ticker,
      values.boughtShares,
      values.boughtPrice,
      values.date.toDate(),
      values.broker
    );
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <Form
        name="Add a lot"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
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
          label="Buy date"
          name="date"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <DatePicker onChange={this.onChange} />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddLot;
