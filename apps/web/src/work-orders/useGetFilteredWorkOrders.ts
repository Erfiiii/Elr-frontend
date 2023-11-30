import { useEffect, useState } from "react";
import { FilterType, IWorkOrder } from "./interfaces";

export const useGetFilteredWorkOrders = (
  workOrders: IWorkOrder[],
  filterValue: string,
  filterType: FilterType
) => {
  const [filteredResult, setFilteredResult] = useState(workOrders);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredWorkerOrders = workOrders.filter((item) =>
        item[filterType].includes(filterValue)
      );
      setFilteredResult(filteredWorkerOrders);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filterValue, workOrders]);

  return filteredResult;
};
