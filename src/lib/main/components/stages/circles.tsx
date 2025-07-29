import { useEffect, useRef, useState } from "react";
import cls from "./Circles.module.scss";
import cn from 'classnames'

export const Circles = ({ className }: { className?: string }) => {
  const [_, setWhatActive] = useState<number>(0);
  const benefitsActive = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      benefitsActive.current = (benefitsActive.current + 1) % 3;
      setWhatActive(benefitsActive.current);
    }, 3500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn(cls.circles, className)}>
      <p
        className={`${cls.firstText} ${
          benefitsActive.current === 0 ? cls.active : ""
        }`}
      >
        <span>€2 trillion </span>in suspicious transactions
      </p>
      <p
        className={`${cls.secondText} ${
          benefitsActive.current === 1 ? cls.active : ""
        }`}
      >
        <span>€25 billion </span>payment card fraud
      </p>
      <p
        className={`${cls.thirdText} ${
          benefitsActive.current === 2 ? cls.active : ""
        }`}
      >
        <span>€180 billion </span>annual cost of compliance
      </p>

      <div
        className={`${cls.firstLevel} ${
          benefitsActive.current === 0 ? cls.active : ""
        }`}
      ></div>
      <div
        className={`${cls.secondLevel} ${
          benefitsActive.current === 1 ? cls.active : ""
        }`}
      ></div>
      <div
        className={`${cls.thirdLevel} ${
          benefitsActive.current === 2 ? cls.active : ""
        }`}
      ></div>
    </div>
  );
};
