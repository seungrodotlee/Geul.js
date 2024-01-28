import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./SideBar";
import { MDXProvider } from "@mdx-js/react";
import { refineProps } from "../../utils";
import Header from "./Header";
import { GlobalStyles } from "twin.macro";

const Layout = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={classNames("flex w-full h-full", className)}
      {...refineProps(props)}
    >
      <GlobalStyles />
      <SideBar />
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
