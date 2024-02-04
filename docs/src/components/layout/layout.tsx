import { ComponentProps } from "react";
import classNames from "classnames";
import SideBar from "./side-bar";
import { refineProps } from "../../utils";
import Header from "./header";
import { GlobalStyles } from "twin.macro";
import OverlayProvider from "../../domains/@ui/overlay/overlay.provider";

const Layout = ({ children, className, ...props }: ComponentProps<"div">) => {
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
          <div>{children}</div>
        </div>
      </OverlayProvider>
    </div>
  );
};

export default Layout;
