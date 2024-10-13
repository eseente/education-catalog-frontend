import React, { useEffect, useState } from 'react';
import { Form, Select, Input, Button, message, Table, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { educationStore } from '../../stores/EducationStore';
import { userStore } from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const { Option } = Select;

const DeveloperPage = observer(() => {
  const [secondOptions, setSecondOptions] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    educationStore.fetchUserRequests();
  }, []);

  const handleFirstChange = (value) => {
    if (value === 'java') {
      setSecondOptions(['Java Beginner', 'Java Advanced', 'Java for Professionals']);
    } else if (value === 'c++') {
      setSecondOptions(['C++ Beginner', 'C++ Basics', 'C++ for Mid Level', 'C++ for Experts']);
    } else if (value === 'js') {
      setSecondOptions(['JS Beginner', 'JS Advanced', 'JS for Mid Level']);
    } else if (value === 'python') {
      setSecondOptions(['Python Basics', 'Python Intermediate', 'Python for AI']);
    } else if (value === 'golang') {
      setSecondOptions(['Go for Beginners', 'Go Advanced', 'Go Performance Tuning']);
    }
  };

  const onFinish = async (values) => {
    await educationStore.submitRequest(values.firstChoice, values.secondChoice, values.explanation);
    message.success('Request submitted!');
    form.resetFields();
  };

  const logout = () => {
    userStore.logout();
    navigate('/login');
  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Pending':
        return 'gold';
      case 'Senior Approved':
        return 'blue';
      case 'Rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const columns = [
    {
      title: 'First Choice',
      dataIndex: 'firstChoice',
      key: 'firstChoice',
    },
    {
      title: 'Second Choice',
      dataIndex: 'secondChoice',
      key: 'secondChoice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag> 
      ),
    },
  ];

  return (
    <div className='developer-page'>
      <div className='header-container'> 
        <h2>Developer Page</h2>
        <div className='logout-button-container'>
          <Button className='logout-button' color="danger" variant="solid" onClick={() => logout()}>LOGOUT</Button>
        </div>
      </div>
      <h3 className='education-title' > Choose New Education </h3>
      <Form className='select-text' form={form} onFinish={onFinish}>
        <Form.Item name="firstChoice" label="Select Language" rules={[{ required: true, message: 'Please select a language!' }]}>
          <Select onChange={handleFirstChange} placeholder="Select a programming language">
            <Option value="java">Java</Option>
            <Option value="c++">C++</Option>
            <Option value="js">JavaScript</Option>
            <Option value="python">Python</Option>
            <Option value="golang">Go (Golang)</Option>
          </Select>
        </Form.Item>

        <Form.Item name="secondChoice" label="Select Course" rules={[{ required: true, message: 'Please select a course!' }]}>
          <Select placeholder="Select a course">
            {secondOptions.map((option, index) => (
              <Option key={index} value={option}>{option}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="explanation" label="Explanation" rules={[{ required: true, message: 'Please provide an explanation!' }]}>
          <Input.TextArea placeholder="Explain why you want to take this course" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={educationStore.isLoading}>
            Submit Request
          </Button>
        </Form.Item>
      </Form>

      <h3 className='request-list-title'>Your Education Requests</h3>
      <Table
        dataSource={educationStore.requests}
        columns={columns}
        rowKey="_id"
        loading={educationStore.isLoading}
      />
    </div>
  );
});

export default DeveloperPage;
