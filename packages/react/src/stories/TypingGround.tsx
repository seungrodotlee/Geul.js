import { setButtonStyles, setGeulStyle } from "./styles/set-styles";

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
        <button
          style={setButtonStyles(["white", "black"])}
          onClick={() => onReset()}
        >
          reset
        </button>
        <button
          style={setButtonStyles(["accent", "black"], "0 0.5rem")}
          onClick={() => onRun()}
        >
          {type === "useGeulPipe" ? "next" : "run"}
        </button>
      </div>
      <p style={setGeulStyle()}>{geul}</p>
    </div>
  );
};
