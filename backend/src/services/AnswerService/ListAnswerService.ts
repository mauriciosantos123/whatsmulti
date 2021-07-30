import { Sequelize, Op } from "sequelize";
import Answer from "../../models/Answer";

interface Request {
  searchParam?: string;
  pageNumber?: string;
}

interface Response {
  answers: Answer[];
  count: number;
  hasMore: boolean;
}

const ListAnswerService = async ({
  searchParam = "",
  pageNumber = "1"
}: Request): Promise<Response> => {
  const whereCondition = {
        name: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("name")),
          "LIKE",
          `%${searchParam.toLowerCase().trim()}%`
        )
  };
  const limit = 20;
  const offset = limit * (+pageNumber - 1);

  const { count, rows: answers } = await Answer.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    order: [["name", "ASC"]]
  });

  const hasMore = count > offset + answers.length;

  return {
    answers,
    count,
    hasMore
  };
};

export default ListAnswerService;
