import { ReactNode } from "react";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";

interface IProps {
  children: ReactNode;
}
function Modal({ children }: IProps) {
  return createPortal(<Overlay>{children}</Overlay>, document.body);
}

export default Modal;
