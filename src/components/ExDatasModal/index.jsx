import { Button, Col, Modal, Row, Table } from 'antd';
import React, { useContext, useEffect } from 'react';
import { DateRangePicker } from '../../components';
import CovidContext from '../../context/covid19API/covidContext';
import './style.scss';

const ExDatasModal = ({ isExModalVisible, handleOk, handleCancel }) => {
  const columns = [
    {
      title: 'Tarih',
      dataIndex: 'Date',
      key: 'Date',
      render: (value, row, index) => {
        return <span>{value.slice(0, value.lastIndexOf('T'))}</span>;
      },
    },
    {
      title: 'Ülke',
      dataIndex: 'Country',
      key: 'Country',
      render: (value) => {
        return <p>{value}</p>;
      },
    },
    {
      title: 'Ülke Kodu',
      dataIndex: 'CountryCode',
      key: 'CountryCode',
    },
    {
      title: 'Yeni Vaka Sayısı',
      dataIndex: 'Confirmed',
      key: 'Confirmed',
    },
    {
      title: 'İyileşen Hasta Sayısı',
      dataIndex: 'Recovered',
      key: 'Recovered',
    },
    {
      title: 'Vefat Sayısı',
      dataIndex: 'Deaths',
      key: 'Deaths',
    },
  ];
  const covidContext = useContext(CovidContext);
  const { allDataByCountryForTable, getAllDataByCountry, country, countries } = covidContext;

  useEffect(() => {
    getAllDataByCountry(country.Slug);
  }, [country]);

  return (
    <Modal width={900} title="Eski Veriler" visible={isExModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Row gutter={[10, 10]}>
        <Col>
          <DateRangePicker />
        </Col>
        <Col>
          <Button color size="middle" onClick={() => getAllDataByCountry(country.Slug)}>
            Verileri getir
          </Button>
        </Col>
        <Col>
          <Table columns={columns} dataSource={allDataByCountryForTable} pagination={{ pageSize: 50 }} scroll={{ y: 440 }} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ExDatasModal;
