import { getIO } from "../../libs/socket";
import Answer from "../../models/Answer";

interface ExtraInfo {
  name: string;
  value: string;
}
interface Request {
  name: string;
  number: string;
  isGroup: boolean;
  email?: string;
  profilePicUrl?: string;
 
}

const CreateOrUpdateAnswerService = async ({
  name,
  number: rawNumber,
  profilePicUrl,
  isGroup,
  email = "",

}: Request): Promise<Answer> => {
  const number = isGroup ? rawNumber : rawNumber.replace(/[^0-9]/g, "");

  const io = getIO();
  let contact: Answer | null;

  contact = await Answer.findOne({ where: { number } });

  if (contact) {
    contact.update({ profilePicUrl });

    io.emit("contact", {
      action: "update",
      contact
    });
  } else {
    contact = await Answer.create({
      name,
      number,
      profilePicUrl,
      email,
      isGroup,
  
    });

    io.emit("contact", {
      action: "create",
      contact
    });
  }

  return contact;
};

export default CreateOrUpdateAnswerService;
