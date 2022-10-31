import React, { useEffect, useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useInit } from "./hook/useInit";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [page, setPage] = useState(1);

  const { closeMount, openMount, mount } = useInit();

  const test = useCallback(() => {
    console.log(page);
  }, [page]);

  // setTimeout(() => {
  //   // openMount();
  //   setPage(2);
  // }, 200);

  // setTimeout(() => {
  //   // openMount();
  //   setPage(3);
  // }, 1000);

  useEffect(() => {
    if (!mount) {
      test();
      closeMount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, page]);

  const tap = () => {
    openMount();
    const next = page + 1;
    setPage(next);
  };

  return (
    <>
      <h1>{props.value}</h1>
      <button onClick={tap}>page</button>
    </>
  );
};
