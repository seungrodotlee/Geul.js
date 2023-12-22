import { useDynamicGeul, useGeul } from "@geul/react";

const Header = () => {
  const { geul, run } = useDynamicGeul("", {
    speed: 100,
  });
  return (
    <div>
      <p className="absolute">글.제이에스</p>
      <p className="relative"></p>
    </div>
  );
};

export default Header;
