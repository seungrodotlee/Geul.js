import "twin.macro";
import { ModalProps } from "./modal.types";
import { forwardRef } from "react";
import ModalContext from "./modal.context";
import useChild from "../../../domains/@shared/use-child/use-child.hook";
import Modal_Header from "./modal-header";
import Modal_Body from "./modal-body";
import Modal_Footer from "./modal-footer";

const _Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ onClose, onSubmit, children, css, ...props }, ref) => {
    const { getChild } = useChild(children);

    const head = getChild(Modal.Header);
    const body = getChild(Modal.Body);
    const footer = getChild(Modal.Footer);

    return (
      <ModalContext.Provider
        value={{
          onClose,
          onSubmit,
        }}
      >
        <div ref={ref} {...props}>
          {head}
          {body}
          {footer}
        </div>
      </ModalContext.Provider>
    );
  },
);

const Modal = Object.assign(_Modal, {
  Header: Modal_Header,
  Body: Modal_Body,
  Footer: Modal_Footer,
});

export default Modal;
