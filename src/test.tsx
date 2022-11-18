import React, { useEffect, useCallback, useState, FC } from "react";
import { useInit } from "./hook/useInit";

const test: FC<any> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);

  const { closeMount, openMount, mount } = useInit();

  const test = useCallback(() => {
    console.log(page, size);
  }, [page, size]);

  useEffect(() => {
    if (!mount) {
      test();
      closeMount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);

  const tap = () => {
    openMount();
    const next = page + 1;
    setSize(size + next);
    setPage(next);
  };

  return (
    <>
      <h1>{props.value}</h1>
      <button onClick={tap}>page</button>
    </>
  );
};

export default test;
