import { useEffect, useRef, useState } from "react";

import { UseGeulOptions } from "./use-geul";
import { useDynamicGeul } from "./use-dynamic-geul";

export type UseGeulPipeOptions = UseGeulOptions;

export const useGeulPipe = (
  values: string[],
  { speed, initial = "", decomposeOnBackspace }: UseGeulPipeOptions,
) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const currentStepRef = useRef(-1);

  const {
    geul,
    isRunning,
    run,
    reset: _reset,
  } = useDynamicGeul(initial, {
    speed,
    decomposeOnBackspace,
  });

  const next = () => {
    if (currentStep + 1 === values.length) {
      console.warn("Every geul steps already executed!");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const [isResetCalled, setResetCalled] = useState(false);
  const reset = () => {
    setCurrentStep(-1);
    setResetCalled(true);
  };

  useEffect(() => {
    if (currentStepRef.current === currentStep) return;
    currentStepRef.current = currentStep;

    if (isResetCalled) {
      _reset();
      setResetCalled(false);
      return;
    }

    run(values[currentStep]);
  }, [values, currentStep, run, _reset, isResetCalled]);

  return {
    geul,
    isRunning,
    next,
    reset,
  };
};
