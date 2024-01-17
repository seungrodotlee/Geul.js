import { find, isNil, pipe, prop, throwIf } from "@fxts/core";
import classNames from "classnames";
import { refineProps } from "../../utils";
import { navigate } from "gatsby";
import {
  ReactElement,
  ComponentProps,
  ReactNode,
  useMemo,
  useRef,
  useState,
  cloneElement,
  useEffect,
} from "react";
import { P, match } from "ts-pattern";
import { FaAngleDown } from "react-icons/fa6";
import Chevron from "../ingredients/Chevron";

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

  const head = useMemo(() => {
    return pipe(
      match(children)
        .with(P.array({ type: P._ }), () =>
          pipe(
            children as Iterable<ReactElement<CollapsibleHeadProps>>,
            find((child) => child.type === Collapsible.Head),
            prop("props"),
          ),
        )
        .with(
          { type: Collapsible.Head },
          (child) => (child as ReactElement<CollapsibleHeadProps>).props,
        )
        .otherwise(() => null),
      throwIf(isNil, () => Error("Collapsible.Head is required!")),
    );
  }, [children]);

  const details = useMemo(() => {
    return match(children)
      .with(P.array({ type: P._ }), () =>
        pipe(
          children as Iterable<ReactElement>,
          find((child) => child.type === Collapsible.Details),
          (child) =>
            child && cloneElement(child, { ...child?.props, isCollapsed }),
        ),
      )
      .with({ type: Collapsible.Details }, (child) => child as ReactElement)
      .otherwise(() => null);
  }, [children, isCollapsed]);

  return (
    <div {...refineProps(props)}>
      <button
        className="flex items-center justify-between w-full"
        onClick={() => {
          setCollapsed((prev) => !prev);
          // head.to && navigate(head.to);
        }}
      >
        <p className="mr-4">{head.children}</p>
        <Chevron direction={isCollapsed ? "bottom" : "top"} />
      </button>
      <div className="flex relative border-l-2 border-neutral-300">
        {details}
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
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default Collapsible;
