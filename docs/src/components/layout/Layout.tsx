import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./SideBar";
import { MDXProvider } from "@mdx-js/react";
import { refineProps } from "../../utils";

const Layout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={classNames("flex w-full h-full", className)}
      {...refineProps(props)}
    >
      <SideBar />
      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
