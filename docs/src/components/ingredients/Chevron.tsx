import classNames from "classnames";

type ChevronProps = {
  direction: "top" | "bottom";
};
const Chevron = ({ direction }: ChevronProps) => (
  <div
    className={classNames(
      "flex transition-all duration-300",
      direction === "bottom" ? "pt-0.5 pb-0" : "pt-0 pb-0.5",
    )}
  >
    <div
      className={classNames(
        "w-2 h-0.5 bg-black transition-all duration-300",
        direction === "bottom" ? "skew-y-[18deg]" : "-skew-y-[18deg]",
      )}
    ></div>
    <div
      className={classNames(
        "w-2 h-0.5 bg-black transition-all duration-300",
        direction === "bottom" ? "-skew-y-[18deg]" : "skew-y-[18deg]",
      )}
    ></div>
  </div>
);

export default Chevron;
