import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./SideBar";
import { MDXProvider } from "@mdx-js/react";
import { refineProps } from "../../utils";
import Header from "./Header";

const MDXLayout = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={classNames("flex w-full h-full", className)}
      {...refineProps(props)}
    >
      <SideBar />
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Header />
        <MDXProvider>{children}</MDXProvider>
      </div>
    </div>
  );
};

export default MDXLayout;
