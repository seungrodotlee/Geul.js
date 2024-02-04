import {
  ComponentProps,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import tw, { css } from "twin.macro";
import { refineProps } from "../../utils";
import { CollapsibleContext } from "./collapsible";

type CollapsibleDetailsProps = ComponentProps<"div"> & {
  padding?: number;
  isCollapsed?: boolean;
};

const collapsibleDetailsCSS = tw`pl-2 overflow-hidden`;
const collapsibleSizerCSS = tw`transition-all duration-300 ease-in-out`;
const collapsibleListCSS = tw`flex flex-col`;

const Collapsible_Details = forwardRef<HTMLDivElement, CollapsibleDetailsProps>(
  ({ padding = 2, children, css: _css, ...props }, ref) => {
    const isCollapsed = useContext(CollapsibleContext);
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
        ref={ref}
        {...refineProps(props)}
        css={[collapsibleDetailsCSS, _css]}
      >
        <div
          ref={sizerRef}
          css={[
            css`
              max-height: ${height}px;
              ${isAnimationInited && collapsibleSizerCSS}
            `,
          ]}
        >
          <ul css={collapsibleListCSS}>{children}</ul>
        </div>
      </div>
    );
  },
);

export default Collapsible_Details;
