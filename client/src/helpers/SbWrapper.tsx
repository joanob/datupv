import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

const SbWrapper = ({ children }: PropsWithChildren) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default SbWrapper;
