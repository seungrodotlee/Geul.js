import { ComponentProps } from "react";
import classNames from "classnames";
import Header from "./Header";

const SideBar = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={classNames("h-full p-2", className)} {...props}>
      <div className="h-full px-6 py-4 bg-neutral-100 rounded-sm">
        <Header />
      </div>
    </div>
  );
};

export default SideBar;
