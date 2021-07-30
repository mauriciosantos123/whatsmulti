import AppError from "../../errors/AppError";
import Answer from "../../models/Answer";

interface ExtraInfo {
  name: string;
  value: string;
}

interface Request {
  name: string;
  response: string;
}

const CreateAnswerService = async ({
  name,
  response
}: Request): Promise<Answer> => {
  const nameExists = await Answer.findOne({
    where: { name }
  });

  if (nameExists) {
    throw new AppError("ERR_DUPLICATED_CONTACT");
  }

  const answer = await Answer.create(
    {
      name,
      response
    }
  );

  return answer;
};

export default CreateAnswerService;
