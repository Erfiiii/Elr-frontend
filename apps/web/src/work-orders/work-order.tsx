import React, { useCallback, useState } from "react";
import { IWorkOrder } from "./interfaces";

type WorkOrderProps = {
  workOrder: IWorkOrder;
  onCheck: (id: string, done: boolean) => void;
};

const WorkOrder = (props: WorkOrderProps) => {
  const { workOrder, onCheck } = props;
  const [checked, setChecked] = useState<boolean>(workOrder.done);
  const changeStatus = useCallback(() => {
    setChecked((prevState) => !prevState);
    onCheck(workOrder.id, !checked);
  }, [workOrder, setChecked, checked, onCheck]);
  return (
    <tr>
      <td>
        <input type="checkbox" onChange={changeStatus} checked={checked} />
      </td>
      <td>{workOrder.id}</td>
      <td>{workOrder.date}</td>
      <td>{workOrder.name}</td>
    </tr>
  );
};

export default WorkOrder;
