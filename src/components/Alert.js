import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { myEventSelector } from "../store/selectors";

import config from "../config.json";
const Alert = () => {
  const network = useSelector((state) => state.provider.network);
  const alertRef = useRef(null);
  const account = useSelector((state) => state.provider.account);
  const isPending = useSelector(
    (state) => state.exchange.transaction.isPending
  );
  const isError = useSelector((state) => state.exchange.transaction.isError);
  const events = useSelector(myEventSelector);

  const removeHandler = async () => {
    alertRef.current.className = "alert-remove";
  };

  useEffect(() => {
    if ((events[0] || isPending || isError) && account) {
      alertRef.current.className = "alert";
    }
  }, [events, isPending, isError, account]);
  return (
    <div>
      {isPending ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transaction Pending...</h1>
        </div>
      ) : isError ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transaction Will Fail</h1>
        </div>
      ) : !isPending && events[0] ? (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        >
          <h1>Transaction Successful</h1>
          <a
            href={
              config[network]
                ? `${config[network].explorerUrl}/tx/${events[0].transactionHash}`
                : "#"
            }
            target="_blank"
            rel="noreferrer"
          >
            {events[0].transactionHash.slice(0, 6) +
              "..." +
              events[0].transactionHash.slice(60, 66)}
          </a>
        </div>
      ) : (
        <div
          className="alert alert--remove"
          onClick={removeHandler}
          ref={alertRef}
        ></div>
      )}

      {/* <div className="alert alert--remove">
        <h1>Transaction Will Fail</h1>
      </div>
      <div className="alert alert--remove">
        <h1>Transaction Successful</h1>
        <a href="" target="_blank" rel="noreferrer"></a>
      </div>
      <div className="alert alert--remove"></div> */}
    </div>
  );
};

export default Alert;
