import Queue from "../models/Queue";
import User from "../models/User";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  transfer_level: string;
  profile: string;
  queues: Queue[];
}

export const SerializeUser = (user: User): SerializedUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    transfer_level: user.transfer_level,
    profile: user.profile,
    queues: user.queues
  };
};
