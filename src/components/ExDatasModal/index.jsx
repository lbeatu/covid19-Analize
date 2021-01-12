import { Modal } from 'antd';
import React, { useContext, useEffect } from 'react';
import CovidContext from '../../context/covid19API/covidContext';

const RegressionModal = ({ isModalVisible, handleOk, handleCancel }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const covidContext = useContext(CovidContext);
  const { allDataByCountry, getAllDataByCountry, country } = covidContext;

  useEffect(() => {
    getAllDataByCountry(country.Slug);
  }, [country]);

  return (
    <Modal title="Eski Veriler" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {/* <Table columns={columns} dataSource={[]} />  */}
      {console.log('allDataByCountry', allDataByCountry)}
    </Modal>
  );
};

export default RegressionModal;
