import { PropsWithChildren, memo } from "react";
import WorkOrder from "./work-order";
import { FilterType, IWorkOrder } from "./interfaces";
import { useGetFilteredWorkOrders } from "./useGetFilteredWorkOrders";

interface OwnProps {
  workOrders: IWorkOrder[];
  filterValue: string;
  filterType: FilterType;
  onCheckRow: (id: string, done: boolean) => void;
}

type Props = PropsWithChildren<OwnProps>;

function WorkOrdersTable(props: Props) {
  const { workOrders, filterType, filterValue, onCheckRow } = props;
  const filteredResult = useGetFilteredWorkOrders(
    workOrders,
    filterValue,
    filterType
  );
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Done</th>
          <th>ID</th>
          <th>Date</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {filteredResult.map((workOrder) => (
          <WorkOrder
            key={workOrder.id}
            workOrder={workOrder}
            onCheck={onCheckRow}
          />
        ))}
      </tbody>
    </table>
  );
}

export default memo(WorkOrdersTable);
