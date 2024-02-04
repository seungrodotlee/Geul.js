import { createContext } from "react";
import { ModalProps } from "./modal.types";

const ModalContext = createContext<Pick<ModalProps, "onClose" | "onSubmit"> | null>(null);

export default ModalContext;