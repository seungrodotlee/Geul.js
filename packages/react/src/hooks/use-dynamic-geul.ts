import { useCallback, useEffect, useRef, useState } from "react";

import { UseGeulOptions, useGeul } from "./use-geul";

export type UseDynamicGeulOptions = Omit<UseGeulOptions, "initial">;
export const useDynamicGeul = (
  initial: string,
  { speed = 50, decomposeOnBackspace }: UseDynamicGeulOptions,
) => {
  const [currentValue, setCurrentValue] = useState<string>();
  const currentRef = useRef<string>();
  const [nextValue, setNextValue] = useState<string>("");
  const nextValueRef = useRef("");

  const {
    geul,
    isRunning,
    run: _run,
    reset: _reset,
  } = useGeul(nextValue, {
    speed,
    initial: currentValue || initial,
    decomposeOnBackspace,
  });

  const run = useCallback((value: string) => {
    setNextValue(value);
  }, []);

  const reset = useCallback(() => {
    setCurrentValue(undefined);
  }, []);

  useEffect(() => {
    if (currentRef.current === currentValue) return;
    currentRef.current = currentValue;

    _reset();
  }, [currentValue, _reset]);

  useEffect(() => {
    if (nextValueRef.current === nextValue) return;
    nextValueRef.current = nextValue;

    _run(() => setCurrentValue(nextValue));
  }, [nextValue, _run]);

  return {
    geul,
    isRunning,
    reset,
    run,
  };
};
