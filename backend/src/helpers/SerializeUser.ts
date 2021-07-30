import Queue from "../models/Queue";
import User from "../models/User";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  peso: string;
  profile: string;
  queues: Queue[];
}

export const SerializeUser = (user: User): SerializedUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    peso: user.peso,
    profile: user.profile,
    queues: user.queues
  };
};
