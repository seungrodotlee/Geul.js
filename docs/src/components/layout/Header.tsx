import { useDynamicGeul } from "@geul/react";
import { ComponentProps, useEffect, useRef, useState } from "react";

const Header = (props: ComponentProps<"div">) => {
  const isWriting = useRef(true);
  const { geul, isRunning, run } = useDynamicGeul("", {
    speed: 50,
    decomposeOnBackspace: true,
  });

  useEffect(() => {
    if (isRunning) return;

    setTimeout(() => {
      run(isWriting.current ? "글.제이에스" : "");
      isWriting.current = !isWriting.current;
    }, 2000);
  }, [isRunning]);

  return (
    <div {...props}>
      <div className="relative">
        <p>&nbsp;</p>
        <p className="absolute top-0 left-0">{geul}</p>
      </div>
    </div>
  );
};

export default Header;
