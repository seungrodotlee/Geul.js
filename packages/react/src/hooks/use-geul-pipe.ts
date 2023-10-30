import { useEffect, useMemo, useRef, useState } from "react";

import { delay } from "@fxts/core";

import { UseGeulOptions, useGeul } from "./use-geul";

export type UseGeulPipeOptions = UseGeulOptions;
export const useGeulPipe = (
  values: string[],
  { speed, initial = "", decomposeOnBackspace }: UseGeulPipeOptions,
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(0);
  const currentValue = useMemo(
    () => (currentStep === 0 ? initial : values[currentStep - 1]),
    [initial, values, currentStep],
  );
  const nextValue = useMemo(() => values[currentStep], [values, currentStep]);

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
    setCurrentStep(0);
    setResetCalled(true);
  };

  useEffect(() => {
    console.log(currentStep, isResetCalled);
    if (currentStepRef.current === currentStep) return;

    if (isResetCalled) {
      _reset();
      setResetCalled(false);
    }

    if (currentStep === 0) return;

    run(() => _reset());
    currentStepRef.current = currentStep;
  }, [currentStep, run, _reset, isResetCalled]);

  return {
    next,
    reset,
    geul,
  };
};
