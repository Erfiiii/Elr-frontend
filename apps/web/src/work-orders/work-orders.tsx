import React, { useCallback, useEffect, useState } from "react";
import { FilterType, IWorkOrder, IWorkOrderCreate } from "./interfaces";
import NewWorkOrder from "./new-work-order";

// Make use of fetchWorkOrders and SubmitWorkOrder from './api'
import { checkWorkOrder, fetchWorkOrders, submitWorkOrder } from "./api";
import Filter from "./filter";
import WorkOrdersTable from "./work-orders-table";

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState<IWorkOrder[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<FilterType>("id");
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    fetchWorkOrders().then((res) => setWorkOrders(res));
  }, []);

  const onChangeFilterType = useCallback((type: FilterType) => {
    setFilterType(type);
    setFilterValue("");
  }, []);

  const onChangeFilterValue = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  const onSubmit = useCallback(async (data: IWorkOrderCreate) => {
    const res = await submitWorkOrder(data);
    setWorkOrders(res);
  }, []);

  const onChangeRowDone = useCallback(async (id: string, done: boolean) => {
    await checkWorkOrder(id, done);
    const data = await fetchWorkOrders();
    setWorkOrders(data);
  }, []);

  return (
    <div>
      <div className="header">
        <Filter
          filterType={filterType}
          filterValue={filterValue}
          onChangeFilterType={onChangeFilterType}
          onChangeFilterValue={onChangeFilterValue}
        />
        <button onClick={() => setOpenModal(true)}>
          Neuen Auftrag anlegen
        </button>
      </div>
      <h2>Work Orders</h2>
      <WorkOrdersTable
        workOrders={workOrders}
        filterType={filterType}
        filterValue={filterValue}
        onCheckRow={onChangeRowDone}
      />
      <NewWorkOrder
        onSubmit={onSubmit}
        open={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default WorkOrders;
