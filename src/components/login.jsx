import React, { Component } from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {login, checkAuthState} from "../store/actions/auth";
//import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Form, Input, Button, Checkbox, Space, Divider } from 'antd';




const LoginPage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);

  const onFinish = (values) => {
    const form = values;
    console.log('Success:', values);
    dispatch(login(form));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if(auth.user){
    console.log(auth.user);
    return (<Redirect to = {`/`}/>);
  }

  return (
    <Space direction="vertical" style={{marginTop:"100px"}}>
      <Divider dashed><h2>Welcome To AD Platform</h2></Divider>
      <br/>
    <Form
      name="basic"
      onFinish={onFinish}
    >
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
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <Divider/>
      <Space direction="horizontal">
        <h4>New To Platform ?  </h4>
          <a href="\signup">Signup</a>
        </Space>
      <Divider/>
    </Space>
  );
};

export default LoginPage;