import { css } from "@emotion/react";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "public/icons/Arrow";
import { useState } from "react";
import { FloatingBottomArea } from "~/components/floating-bottom-area";
import { Textarea } from "~/components/text-area";

type FeedbackValues = {
  discomfort: string;
  enjoyableParts: string;
  difficulty: string;
  additionalComments: string;
  email?: string;
};
const initialFeedbackValues = {
  discomfort: "", // 1. 서비스를 이용하면서 불편하거나 어색했던 지점들이 있나요?
  enjoyableParts: "", // 2. 서비스를 이용하면서 재미를 느꼈던 부분은 어디인가요?
  difficulty: "", // 3. 틀린그림 찾기 난이도는 어땠나요?
  additionalComments: "", // 4. 추가적으로 남기고싶은 의견을 작성해주세요:)
  email: "", // 5. 서비스가 진짜로 출시되면 알려드릴게요! 이메일을 적어주세요.
};
export default function Page() {
  const navigate = useNavigate();
  const [feedbackValues, setFeedbackValues] = useState<FeedbackValues>(initialFeedbackValues);

  const handleChangeFormValues = (type: keyof FeedbackValues, value: string) => {
    setFeedbackValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <>
      <nav css={navigationCss}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
      </nav>

      <div css={containerCss}>
        <h1>베타테스트 후기</h1>

        <div css={feedbacks.wrapperCss}>
          <h2 css={feedbacks.headlineCss}>
            서비스를 이용하면서 불편하거나
            <br />
            어색했던 지점들이 있나요?
          </h2>
          <Textarea
            limit={1000}
            currentLength={feedbackValues.discomfort.length}
            onChange={(e) => handleChangeFormValues("discomfort", e.currentTarget.value)}
          />
        </div>

        <div css={feedbacks.wrapperCss}>
          <h2 css={feedbacks.headlineCss}>
            서비스를 이용하면서 재미를 느꼈던 부분은
            <br />
            어디인가요?
          </h2>
          <Textarea
            limit={1000}
            currentLength={feedbackValues.enjoyableParts.length}
            onChange={(e) => handleChangeFormValues("enjoyableParts", e.currentTarget.value)}
          />
        </div>

        <div css={feedbacks.wrapperCss}>
          <h2 css={feedbacks.headlineCss}>틀린그림 찾기 난이도는 어땠나요?</h2>
          <Textarea
            limit={1000}
            currentLength={feedbackValues.difficulty.length}
            onChange={(e) => handleChangeFormValues("difficulty", e.currentTarget.value)}
          />
        </div>

        <div css={feedbacks.wrapperCss}>
          <h2 css={feedbacks.headlineCss}>추가적으로 남기고싶은 의견을 작성해주세요:)</h2>
          <Textarea
            limit={1000}
            currentLength={feedbackValues.additionalComments.length}
            onChange={(e) => handleChangeFormValues("additionalComments", e.currentTarget.value)}
          />
        </div>

        <div css={feedbacks.wrapperCss}>
          <h2 css={feedbacks.headlineCss}>
            서비스가 진짜로 출시되면 알려드릴게요!
            <br />
            이메일을 적어주세요.
          </h2>
          <Textarea
            limit={1000}
            currentLength={(feedbackValues?.email ?? "").length}
            onChange={(e) => handleChangeFormValues("email", e.currentTarget.value)}
            placeholder="의사가 없다면 ‘아니오'라고 적어주세요!"
          />
        </div>
      </div>

      <FloatingBottomArea>
        <div css={buttons.wrapperCss}>
          <button css={buttons.submitButtonCss}>제출하기</button>
        </div>
      </FloatingBottomArea>
    </>
  );
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 64px 24px 32px 24px;

  > h1 {
    font-size: 20px;
    text-align: center;
    margin-top: 12px;
  }
`;

const navigationCss = css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  max-width: 600px;
  width: 100%;
  height: 64px;

  margin: 0 auto;
  padding: 0 20px;

  > button {
    padding: 10px 20px 10px 0;
  }
`;

const feedbacks = {
  wrapperCss: css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,

  headlineCss: css`
    font-size: 16px;
  `,
};

const buttons = {
  wrapperCss: css`
    width: 100%;

    display: flex;
    gap: 10px;
    justify-content: center;

    > button {
      width: 100%;
      text-align: center;
      border-radius: 8px;
      padding: 16px 0;
      font-size: 14px;
    }
  `,

  submitButtonCss: css`
    color: white;
    background-color: #151528;
  `,
};
