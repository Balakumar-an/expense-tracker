import { useEffect, useState } from "react";

type Tsize = [width: number, height: number];

const useWindowSize = () => {
  const [size, setSize] = useState<Tsize>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const updateScreenSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateScreenSize);

    updateScreenSize();

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return {
    width: size[0],
    height: size[1],
  };
};

export default useWindowSize;
