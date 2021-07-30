import AppError from "../../errors/AppError";
import Answer from "../../models/Answer";

interface AnswerData {
  name?: string;
  response?: string;
}

interface Request {
  answerData: AnswerData;
  answerId: string;
}

const UpdateAnswerService = async ({
  answerData,
  answerId
}: Request): Promise<Answer> => {
  const { name, response } = answerData;

  const answer = await Answer.findOne({
    where: { id: answerId },
    attributes: ["id", "name", "response"]
  });

  if (!answer) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }


  await answer.update({
    name,
    response
  });

  await answer.reload({
    attributes: ["id", "name", "response"]
  });

  return answer;
};

export default UpdateAnswerService;
