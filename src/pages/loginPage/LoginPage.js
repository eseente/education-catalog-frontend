import React, { useState } from 'react';
import { Form, Input, Button, message, Tabs, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../stores/UserStore';
import { Option } from 'antd/es/mentions';
import './styles.css';


const { TabPane } = Tabs;

const LoginPage = observer(() => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLoginFinish = async (values) => {
    setLoading(true);
    const loginResponse = await userStore.login(values.username, values.password);
    setLoading(false);
  
    if (!loginResponse.success) {
      message.error(loginResponse.message);
    } else {
      message.success('Login successful!');
      navigate('/dashboard');
    }
  };  

  const onRegisterFinish = async (values) => {
    setLoading(true);
    await userStore.register(values.username, values.password, values.role);
    setLoading(false);
    if (userStore.user) {
      message.success('Registration successful!');
      navigate('/dashboard');
    } else {
      message.error('Registration failed!');
    }
  };

  return (
    <div className='page-container'>
       <div className='card-container'>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Login" key="1">
              <Form onFinish={onLoginFinish}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button className='login-button' type="primary" htmlType="submit" loading={loading || userStore.isLoading}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Register" key="2">
              <Form onFinish={onRegisterFinish}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="role"
                  rules={[{ required: true, message: 'Please select your role!' }]}
                >
                  <Select placeholder="Select a role">
                    <Option value="developer">Developer</Option>
                    <Option value="senior">Senior</Option>
                    <Option value="manager">Manager</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button className='login-button' type="primary" htmlType="submit" loading={loading || userStore.isLoading}>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
    </div>
  );
});

export default LoginPage;
