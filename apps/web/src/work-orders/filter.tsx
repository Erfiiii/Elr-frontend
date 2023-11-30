import { PropsWithChildren, memo } from "react";
import { FilterType } from "./interfaces";

interface OwnProps {
  filterType: FilterType;
  filterValue: string;
  onChangeFilterType: (type: FilterType) => void;
  onChangeFilterValue: (value: string) => void;
}

type Props = PropsWithChildren<OwnProps>;

function Filter(props: Props) {
  const { filterValue, filterType, onChangeFilterType, onChangeFilterValue } =
    props;

  return (
    <div className="filter">
      <label htmlFor="name">
        <select
          className="filter__select"
          value={filterType}
          onChange={(e) => onChangeFilterType(e.target.value as FilterType)}
        >
          <option value="name">Name</option>
          <option value="id">ID</option>
        </select>
      </label>
      <input
        className="filter__input"
        value={filterValue}
        onChange={(e) => onChangeFilterValue(e.target.value)}
        type="text"
        placeholder="Search"
        name="filter"
      />
    </div>
  );
}

export default memo(Filter);
