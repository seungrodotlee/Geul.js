import { ComponentProps, forwardRef } from "react";
import { css } from "twin.macro";

type ModalBodyProps = ComponentProps<"div">;

const Modal_Body = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ title, css, ...props }, ref) => {
    return (
      <div ref={ref} css={[css]} {...props} />
    );
  },
);

export default Modal_Body;