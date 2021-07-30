import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
  HasMany
} from "sequelize-typescript";

@Table
class Answer extends Model<Answer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  response: string;


  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

}

export default Answer;
