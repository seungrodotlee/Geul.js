import { useDynamicGeul } from "@geul/react";
import { useEffect, useRef, useState } from "react";

const Header = () => {
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
    <div>
      {/* <p className="absolute">글.제이에스</p> */}
      <p className="relative">{geul}</p>
    </div>
  );
};

export default Header;
