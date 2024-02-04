import { FC, ForwardRefExoticComponent } from "react";

const createGhostComponent = <
  Params,
>() => {
  return (_props: Params) => <></>;
};

export default createGhostComponent;