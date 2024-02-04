import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./SideBar";
import { MDXProvider } from "@mdx-js/react";
import { refineProps } from "../../utils";
import Header from "./header";
import { GlobalStyles } from "twin.macro";
import OverlayProvider from "../../domains/@ui/overlay/overlay.provider";

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
      <GlobalStyles />
      <OverlayProvider>
        <SideBar />
        <div className="flex flex-col flex-grow overflow-y-auto">
          <Header />
          <MDXProvider>{children}</MDXProvider>
        </div>
      </OverlayProvider>
    </div>
  );
};

export default MDXLayout;
