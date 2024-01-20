import {
  append,
  find,
  isNil,
  pipe,
  prop,
  split,
  throwIf,
  join,
  filter,
} from "@fxts/core";
import classNames from "classnames";
import { refineProps } from "../../utils";
import { navigate } from "gatsby";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Chevron from "../ingredients/Chevron";
import useChild from "../../hooks/use-child";
import useChildProps from "../../hooks/use-child-props";
import { P, match } from "ts-pattern";

const getModifiedOpenedMenus = (
  actor: (it: IterableIterator<string>) => IterableIterator<string>,
  search: URLSearchParams,
) => {
  return pipe(search.get("openedMenus") || "", split(","), actor, join(","));
};

const appendToOpenedMenus =
  (title: string) =>
  ({ search }: Record<"search", URLSearchParams>) => {
    search.set(
      "openedMenus",
      getModifiedOpenedMenus((menus) => append(title, menus), search),
    );
    return search;
  };

const deleteFromOpenedMenus =
  (title: string) =>
  ({ search }: Record<"search", URLSearchParams>) => {
    pipe(
      getModifiedOpenedMenus(
        (menus) => filter((menu) => menu !== title, menus),
        search,
      ),
      (updatedOpenedMenus) =>
        updatedOpenedMenus === ""
          ? search.delete("openedMenus")
          : search.set("openedMenus", updatedOpenedMenus),
    );
    return search;
  };

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

  const headClickHandler = useCallback(() => {
    setCollapsed((prev) => !prev);
    head.to && navigate(head.to);
  }, []);

  useEffect(() => {
    if (
      new URLSearchParams(location.search)
        .get("openedMenus")
        ?.includes(head.children)
    )
      setCollapsed(false);
  }, [head]);

  useEffect(() => {
    pipe(
      match({ isCollapsed, search: new URLSearchParams(location.search) })
        .with(
          {
            isCollapsed: false,
          },
          appendToOpenedMenus(head.children),
        )
        .otherwise(deleteFromOpenedMenus(head.children)),
      (search) =>
        location.search.replace("?", "") !== search.toString() &&
        window.history.pushState(null, "", `?${search.toString()}`),
    );
  }, [isCollapsed]);

  return (
    <div {...refineProps(props)}>
      <button className="flex items-center w-full" onClick={headClickHandler}>
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
  const [isAnimationInited, setAnimationInited] = useState<boolean>(false);
  const sizerRef = useRef<HTMLDivElement>(null);
  const height = useMemo(
    () => (isCollapsed ? 0 : sizerRef.current?.scrollHeight || 0),
    [isCollapsed],
  );

  useEffect(() => {
    setTimeout(() => setAnimationInited(true), 100);
  }, []);

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
        className={classNames({
          "transition-all duration-300 ease-in-out": isAnimationInited,
        })}
      >
        <ul className="flex flex-col">{children}</ul>
      </div>
    </div>
  );
};

export default Collapsible;
