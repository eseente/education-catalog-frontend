import React, { useEffect } from 'react';
import { Button, Table, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { educationStore } from '../../stores/EducationStore';
import { userStore } from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const SeniorPage = observer(() => {
    const navigate = useNavigate();
  useEffect(() => {
    educationStore.fetchPendingRequestsForSenior();
  }, []);

  const handleApprove = async (id) => {
    try {
      await educationStore.approveRequestBySenior(id);
      message.success('Request approved successfully');
    } catch (error) {
      message.error('Failed to approve request');
    }
  };

  const handleReject = async (id) => {
    try {
      await educationStore.rejectRequest(id);
      message.success('Request rejected successfully');
      educationStore.fetchPendingRequestsForSenior();
    } catch (error) {
      message.error('Failed to reject request');
    }
  };

  const logout = () => {
    userStore.logout();
    navigate('/login');
  }

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
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
      title: 'Explanation',
      dataIndex: 'explanation',
      key: 'explanation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleApprove(record._id)}
            style={{ marginRight: 8,backgroundColor: '#D1F3B5', borderColor: '#D1F3B5', color: 'green'  }}
          >
            Approve
          </Button>
          <Button
            onClick={() => handleReject(record._id)}
            style={{backgroundColor: '#FFA39E', borderColor: '#FFA39E', color: '#A0153E' }}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='senior-page'>
      <div className='header-container'> 
        <h2>Senior Page</h2>
        <div className='logout-button-container'>
          <Button className='logout-button' color="danger" variant="solid" onClick={() => logout()}>LOGOUT</Button>
        </div>
      </div>

      <h3 className='table-title'>Waiting Requests</h3>
      <Table
        dataSource={educationStore.requests}
        columns={columns}
        rowKey="_id"
        loading={educationStore.isLoading}
      />
    </div>
  );
});

export default SeniorPage;
