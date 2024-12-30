import { useNavigate } from "@remix-run/react";
import { createContext, useRef, useState } from "react";

export interface CardType {
  id: number;
  image: string;
  isAnswer: boolean;
}

export interface StepType {
  label: string;
  value: string;
}

export interface UserAnswerType {
  [key: string]: boolean;
}

interface ContextProps {
  generateGame: () => void;
  checkAnswer: (card: CardType) => void;
  timeover: () => void;
  cards: CardType[];
  step: number;
  resetStep: () => void;
  nextStep: () => void;
  target: StepType;
}

interface Props {
  children: React.ReactNode;
}

export const GameContext = createContext<ContextProps | undefined>({
  timeover: () => {},
  generateGame: () => {},
  checkAnswer: ({}) => {},
  cards: [],
  step: 0,
  resetStep: () => {},
  nextStep: () => {},
  target: { label: "", value: "" },
});

const INITIAL_STEPS: StepType[] = [
  { label: "당근을", value: "carrot" },
  { label: "귀를", value: "ear" },
  { label: "달을", value: "moon" },
  { label: "절구를", value: "mortar" },
];

export const GameProvider = ({ children }: Props) => {
  const [step, setStep] = useState<number>(1);
  const [userAnswer, setUserAnswer] = useState<UserAnswerType>({});

  const [cards, setCards] = useState<CardType[]>([]);
  const [target, setTarget] = useState({ label: "", value: "" }); // e.g. {label: "귀", value: "ear"}

  const restStep = useRef(INITIAL_STEPS);

  const navigate = useNavigate();

  const generateGame = () => {
    const indexes = (step + 1) * (step + 1); // Lv1 - 2*2, Lv2 - 3*3, ...
    const obj = restStep.current[Math.floor(Math.random() * restStep.current.length)]; // target object
    const answerPos = Math.floor(Math.random() * indexes); // wrong image position

    const cards: CardType[] = Array(indexes)
      .fill({ image: `/illusts/${obj.value}_right.PNG`, isAnswer: false })
      .map((card, idx) => ({ ...card, id: indexes * (idx + 1) }));
    cards[answerPos].isAnswer = true;
    cards[answerPos].image = `/illusts/${obj.value}_wrong.PNG`;

    setCards(cards);
    setTarget(obj);
  };

  const checkAnswer = (card: CardType) => {
    setUserAnswer((prev: UserAnswerType) => ({ ...prev, [target.value]: card.isAnswer }));
    restStep.current = restStep.current.filter((item: StepType) => item.value !== target.value);
  };

  const timeover = () => {
    setUserAnswer((prev: UserAnswerType) => ({ ...prev, [target.value]: false }));
    restStep.current = restStep.current.filter((item: StepType) => item.value !== target.value);
  };

  const resetStep = () => setStep(1);

  const nextStep = () => {
    if (restStep.current.length) setStep((prev: number) => prev + 1);
    else {
      // TODO: 결과에 따른 일러스트 인덱스를 naviagate state으로 전달
      navigate(`/result`);
    }
  };

  return (
    <GameContext.Provider value={{ generateGame, checkAnswer, timeover, cards, step, resetStep, nextStep, target }}>{children}</GameContext.Provider>
  );
};
