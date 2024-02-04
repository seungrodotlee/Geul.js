import classNames from "classnames";
import { ComponentProps } from "react";

type ChevronProps = Pick<ComponentProps<"div">, "className"> & {
  direction: "top" | "bottom";
};

const chevronPartCommonClassName =
  "w-1.5 h-0.5 bg-neutral-300 transition-all duration-300";
const skew = "skew-y-[36deg]";
const skewReverse = "-skew-y-[36deg]";

const Chevron = ({ className, direction }: ChevronProps) => (
  <div
    className={classNames(
      className,
      "flex transition-all duration-300",
      direction === "bottom" ? "pt-1 pb-0" : "pt-0 pb-1",
    )}
  >
    <div
      className={classNames(
        chevronPartCommonClassName,
        direction === "bottom" ? skew : skewReverse,
      )}
    ></div>
    <div
      className={classNames(
        chevronPartCommonClassName,
        direction === "bottom" ? skewReverse : skew,
      )}
    ></div>
  </div>
);

export default Chevron;
