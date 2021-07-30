import Answer from "../../models/Answer";
import AppError from "../../errors/AppError";

const DeleteAnswerService = async (id: string): Promise<void> => {
  const contact = await Answer.findOne({
    where: { id }
  });

  if (!contact) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }

  await contact.destroy();
};

export default DeleteAnswerService;
