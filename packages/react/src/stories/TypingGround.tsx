import { setButtonStyles } from "./styles/set-styles";

type TypingGroundProps = {
  type: "useGeul" | "useDynamicGeul" | "useGeulPipe";
  geul: string;
  onReset: () => void;
  onRun: () => void;
};

export const TypingGround = ({
  type,
  geul,
  onReset,
  onRun,
}: TypingGroundProps) => {
  return (
    <div>
      <div>
        <button style={setButtonStyles("grey")} onClick={() => onReset()}>
          reset
        </button>
        <button
          style={setButtonStyles("primary", "0 0.5rem")}
          onClick={() => onRun()}
        >
          {type === "useGeulPipe" ? "next" : "run"}
        </button>
      </div>
      <p>{geul}</p>
    </div>
  );
};
