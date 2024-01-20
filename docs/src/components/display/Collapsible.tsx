import { find, isNil, pipe, prop, throwIf } from "@fxts/core";
import classNames from "classnames";
import { refineProps } from "../../utils";
import { navigate } from "gatsby";
import { ComponentProps, useMemo, useRef, useState } from "react";
import Chevron from "../ingredients/Chevron";
import useChild from "../../hooks/use-child";
import useChildProps from "../../hooks/use-child-props";

type CollapsibleProps = {
  initialCollapsed?: boolean;
};
const Collapsible = ({
  initialCollapsed,
  children,
  ...props
}: ComponentProps<"div"> & CollapsibleProps) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(
    initialCollapsed ?? true,
  );

  const head = useChildProps({
    children,
    type: Collapsible.Head,
  });

  const details = useChild(
    {
      children,
      type: Collapsible.Details,
      overwriteProps: {
        isCollapsed,
      },
    },
    [isCollapsed],
  );

  return (
    <div {...refineProps(props)}>
      <button
        className="flex items-center w-full"
        onClick={() => {
          setCollapsed((prev) => !prev);
          head.to && navigate(head.to);
        }}
      >
        <Chevron className="mr-2" direction={isCollapsed ? "bottom" : "top"} />
        <p>{head.children}</p>
      </button>
      <div className="flex relative">
        <div className="ml-[5px] pl-[5px] border-l-2 border-neutral-300">
          {details}
        </div>
      </div>
    </div>
  );
};

type CollapsibleHeadProps = {
  children: string;
  to?: string;
};
Collapsible.Head = (_: CollapsibleHeadProps) => <></>;

type CollapsibleDetailsProps = {
  padding?: number;
  isCollapsed?: boolean;
};

Collapsible.Details = ({
  padding = 2,
  isCollapsed,
  children,
  className,
  ...props
}: ComponentProps<"div"> & CollapsibleDetailsProps) => {
  const sizerRef = useRef<HTMLDivElement>(null);
  const height = useMemo(
    () => (isCollapsed ? 0 : sizerRef.current?.scrollHeight || 0),
    [isCollapsed],
  );

  return (
    <div
      {...refineProps(props)}
      style={{
        paddingLeft: `${padding * 0.25}rem`,
      }}
      className={classNames(className, "overflow-hidden")}
    >
      <div
        ref={sizerRef}
        style={{
          maxHeight: height,
        }}
        className={classNames("transition-all duration-300 ease-in-out")}
      >
        <ul className="flex flex-col">{children}</ul>
      </div>
    </div>
  );
};

export default Collapsible;
