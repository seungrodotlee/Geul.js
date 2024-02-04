import { ComponentProps } from "react";

export type ModalProps = ComponentProps<"div"> & {
  onClose: () => void;
  onSubmit: () => void;
}