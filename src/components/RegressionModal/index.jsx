import { Modal } from 'antd';
import React from 'react';
import Regression from '../Regression';

const RegressionModal = ({ isModalVisible, data, handleCancel, handleOk }) => {
  return (
    <Modal title="Regresyon Analizi" width={900} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {data && <Regression data={data.map((x) => [x.AAPLClose, x.date.getMonth()])} regression={true} />}
    </Modal>
  );
};

export default RegressionModal;
