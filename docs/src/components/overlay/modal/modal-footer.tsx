import { ComponentProps, forwardRef } from "react";

type ModalFooterProps = ComponentProps<"div">;

const Modal_Footer = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ title, css, ...props }, ref) => {
    return (
      <div ref={ref} css={[css]} {...props} />
    );
  },
);

export default Modal_Footer;