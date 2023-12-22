import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./SideBar";

const Layout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={classNames("flex w-full min-h-full", className)} {...props}>
      <SideBar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
