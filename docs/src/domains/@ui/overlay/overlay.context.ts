import { State, createContext } from "react";
import { Overlay } from "./overlay.type";

export const OverlayContext = createContext<State<Overlay> | null>(null);