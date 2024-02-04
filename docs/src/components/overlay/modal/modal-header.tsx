import { ComponentProps, forwardRef } from "react";
import tw, { css } from "twin.macro";

type ModalHeaderProps = ComponentProps<"div"> & {
  title: string;
};

const modalHeaderCSS = tw`flex justify-between`;

const Modal_Header = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, css, children, ...props }, ref) => {
    return (
      <div ref={ref} css={[modalHeaderCSS, css]} {...props}>
        <h1>{title}</h1>
        <div>{children}</div>
      </div>
    );
  },
);

export default Modal_Header;