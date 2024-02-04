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
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Chevron from "../ingredients/Chevron";
import useChild from "../../domains/@shared/use-child/use-child.hook";
import useChildProps from "../../domains/@shared/use-child/use-child-props.hook";
import { P, match } from "ts-pattern";
import createGhostComponent from "../../domains/@shared/create-component/create-ghost-component.creator";
import tw, { css } from "twin.macro";
import Collapsible_Details from "./collapsible-details";

export const CollapsibleContext = createContext<boolean>(false);

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

type CollapsibleProps = ComponentProps<"div"> & {
  initialCollapsed?: boolean;
};

const _Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ initialCollapsed, css, children, ...props }, ref) => {
    const [isCollapsed, setCollapsed] = useState<boolean>(
      initialCollapsed ?? true,
    );

    const { getChild } = useChild(children);
    const { getChildProps } = useChildProps(children);

    const head = getChildProps(Collapsible.Header);

    const details = getChild(Collapsible.Details);

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
      <div ref={ref} css={css} {...refineProps(props)}>
        <button className="flex items-center w-full" onClick={headClickHandler}>
          <Chevron
            className="mr-2"
            direction={isCollapsed ? "bottom" : "top"}
          />
          <p>{head.children}</p>
        </button>
        <div className="flex relative">
          <div className="ml-[5px] pl-[5px] border-l-2 border-neutral-300">
            <CollapsibleContext.Provider value={isCollapsed}>
              {details}
            </CollapsibleContext.Provider>
          </div>
        </div>
      </div>
    );
  },
);

type CollapsibleHeadProps = {
  children: string;
  to?: string;
};

const Collapsible = Object.assign(_Collapsible, {
  Header: createGhostComponent<CollapsibleHeadProps>(),
  Details: Collapsible_Details,
});

export default Collapsible;
