import { useEffect, useMemo, useRef, useState } from "react";

import { delay } from "@fxts/core";

import { UseGeulOptions, useGeul } from "./use-geul";

export type UseGeulPipeOptions = UseGeulOptions;

export const useGeulPipe = (
  values: string[],
  { speed, initial = "", decomposeOnBackspace }: UseGeulPipeOptions,
) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const currentStepRef = useRef(-1);
  const currentValue = useMemo<string>(
    () => (currentStep <= 0 ? initial : values[currentStep - 1]),
    [initial, values, currentStep],
  );
  const nextValue = useMemo<string>(
    () => values[currentStep] || "",
    [values, currentStep],
  );

  const {
    geul,
    run,
    reset: _reset,
  } = useGeul(nextValue, {
    speed,
    initial: currentValue,
    decomposeOnBackspace,
  });

  const next = async (delayDuration = 0) => {
    if (currentStep + 1 === values.length) {
      console.warn("Every geul steps already executed!");
      return;
    }

    await delay(delayDuration);

    setCurrentStep((prev) => prev + 1);
  };

  const [isResetCalled, setResetCalled] = useState(false);
  const reset = () => {
    setCurrentStep(-1);
    setResetCalled(true);
  };

  useEffect(() => {
    if (currentStepRef.current === currentStep) return;

    if (isResetCalled) {
      _reset();
      setResetCalled(false);
    }

    run(() => _reset());
    currentStepRef.current = currentStep;
  }, [currentStep, currentValue, run, _reset, isResetCalled]);

  return {
    next,
    reset,
    geul,
  };
};
