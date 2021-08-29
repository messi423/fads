import React, { Component } from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {signup} from '../store/actions/auth';
import {Redirect} from 'react-router-dom';
//import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Form, Input, Button, Space, Divider } from 'antd';

const SignupPage = (props) => {
  const [form] = Form.useForm();

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatch(signup(values));
  };

  if(auth.user){
    return (<Redirect to = {`/`}/>);
  }

  return (

  <Space direction="vertical" style={{marginTop:"100px"}}>
    <h2>Welcome To AdPlatform</h2>
    <Divider orientation="left" dashed></Divider>
    <br/>
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

      <Form.Item
        name="name"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    <Divider/>
    <Space direction="horizontal">
      Already Have An Account? <a href="/login">Login</a>
    </Space>
    </Space>
  );
};

export default SignupPage;