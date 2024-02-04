import { FC, ForwardRefExoticComponent } from 'react';

declare module "react" {
  type State<S> = [S, Dispatch<SetStateAction<S>>];

  type Componentable<P = any> = FC<P> | ForwardRefExoticComponent<P> | ((props: P) => JSX.Element);
}