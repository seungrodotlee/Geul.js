import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./SideBar";

const Layout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={classNames("flex w-full h-full", className)} {...props}>
      <SideBar />
      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
