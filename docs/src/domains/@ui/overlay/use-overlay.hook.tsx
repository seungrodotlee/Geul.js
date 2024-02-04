import {
  DependencyList,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { OverlayContext } from "./overlay.context";
import { entries, filter, fromEntries, pipe } from "@fxts/core";
import { P, match } from "ts-pattern";

export const useOverlay = <
  Comp extends FC,
  Params extends Omit<Parameters<Comp>[0], "visible">,
>(
  key: string,
  Component?: Comp,
  props?: (open: () => void, close: () => void) => Params,
  deps?: DependencyList,
) => {
  const overlayState = useContext(OverlayContext);

  if (!overlayState) {
    throw Error("OverlayProvider에 overlayState를 전달해주세요");
  }

  const [_, setOverlay] = overlayState;
  const [visible, setVisible] = useState<boolean>(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!Component || !props) return;

    setOverlay((prev) => ({
      ...prev,
      [key]: {
        visible,
        element: <Component {...(props(open, close) as any)} />,
      },
    }));
  }, [open, close, visible, ...(deps ?? [])]);

  return {
    open,
    close,
  };
};
