import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";
import { IWorkOrderCreate } from "./interfaces";

type NewWorkOrderProps = {
  open: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onSubmit?: (workOrder: IWorkOrderCreate) => Promise<void>;
};
const NewWorkOrder = (props: NewWorkOrderProps) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const submit = useCallback(() => {
    props.onSubmit?.({ name, date });
    props.setOpenModal(false);
  }, [props, date, name]);

  if (!props.open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-content__header">New Work Order</h2>
        <form onSubmit={submit} className="new-workorder-container">
          <div>
            <label htmlFor="name">
              <span className="form-label">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Was ist zu tun"
                name="name"
              />
            </label>
          </div>
          <div>
            <label htmlFor="name">
              <span className="form-label">Date</span>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                name="date"
              />
            </label>
          </div>
          <div className="modal-content__footer">
            <button role="submit">Submit</button>
            <button onClick={() => props.setOpenModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(NewWorkOrder);
