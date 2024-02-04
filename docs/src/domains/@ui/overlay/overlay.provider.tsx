import { FC, Fragment, ReactNode, useMemo, useState } from "react";
import { OverlayContext } from "./overlay.context";
import { Overlay } from "./overlay.type";
import tw, { css } from "twin.macro";
import { every, not } from "@fxts/core";

const overlayCSS = css`
  ${tw`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-50`}

  & > * {
    ${tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
  }
`;

const OverlayProvider = ({ children }: Record<"children", ReactNode>) => {
  const overlayState = useState<Overlay>({});
  const [overlay] = overlayState;
  const overlayVisible = useMemo(
    () => not(every(({ visible }) => !visible, Object.values(overlay))),
    [overlay],
  );

  return (
    <OverlayContext.Provider value={overlayState}>
      {children}
      {overlayVisible && (
        <div css={overlayCSS}>
          {Object.entries(overlay)
            .filter(([_, { visible }]) => visible)
            .map(([key, { element }]) => (
              <Fragment key={key}>{element}</Fragment>
            ))}
        </div>
      )}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
