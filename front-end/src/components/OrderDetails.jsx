import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Table from './Table';
import api from '../service/request';

export default function OrderDetails() {
  const [saleInfo, setSaleInfo] = useState({});

  const { id } = useParams();

  const { pathname } = useLocation();

  let pageName;

  if (pathname.includes('customer')) {
    pageName = 'customer';
  } else {
    pageName = 'seller';
  }

  const DATA_TESTID_ID = (
    `${pageName}_order_details__element-order-details-label-order-id`);
  const DATA_TESTID_ORDER_DATE = (
    `${pageName}_order_details__element-order-details-label-order-date`);
  const DATA_TESTID_DELIVERY_STATUS = (
    `${pageName}_order_details__element-order-details-label-delivery-status`);

  const fetchData = useCallback(async () => {
    const { data } = await api.get(`/seller/sales/${id}`);

    setSaleInfo(data);
  }, [id]);

  useEffect(() => fetchData(), [fetchData, id]);

  const handleButton = async () => {
    await api.patch(`/sales/${id}`, { status: 'Entregue' });

    fetchData();
  };

  const handlePreparing = async () => {
    await api.patch(`/sales/${id}`, { status: 'Preparando' });

    fetchData();
  };

  const handleDispatch = async () => {
    await api.patch(`/sales/${id}`, { status: 'Em Trânsito' });

    fetchData();
  };

  const { status } = saleInfo;

  return (
    <div>
      <p data-testid={ DATA_TESTID_ID }>
        {saleInfo?.id}
      </p>

      {pathname.includes('customer') && (
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          {saleInfo?.seller?.name}
        </p>
      )}

      <p data-testid={ DATA_TESTID_ORDER_DATE }>
        {new Date(saleInfo?.saleDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
      </p>
      <p
        data-testid={ DATA_TESTID_DELIVERY_STATUS }
      >
        {saleInfo?.status}
      </p>

      {pathname.includes('seller') && (
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ status !== 'Pendente' || saleInfo === 'Entregue' }
          onClick={ handlePreparing }
        >
          PREPARAR PEDIDO
        </button>
      )}

      {pathname.includes('seller') && (
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ status !== 'Preparando' || status === 'Entregue' }
          onClick={ handleDispatch }
        >
          SAIU PARA ENTREGA
        </button>
      )}

      {pathname.includes('customer') && (
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ status !== 'Em Trânsito' || status === 'Entregue' }
          onClick={ handleButton }
        >
          MARCAR COMO ENTREGUE
        </button>
      )}

      <Table isHidden />
    </div>
  );
}
