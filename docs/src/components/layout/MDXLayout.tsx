import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./SideBar";
import { MDXProvider } from "@mdx-js/react";
import { refineProps } from "../../utils";

const MDXLayout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={classNames("flex w-full h-full", className)} {...refineProps(props)}>
      <SideBar />
      <div className="flex-grow overflow-y-auto">
        <MDXProvider>{children}</MDXProvider>
      </div>
    </div>
  );
};

export default MDXLayout;
