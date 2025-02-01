import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { AuthorFieldDescription } from "../constant";

export class AuthorRdo {
  @Expose()
  @ApiProperty(AuthorFieldDescription.id)
  public id: string;

  @Expose()
  @ApiProperty(AuthorFieldDescription.name)
  public name: string;

  @Expose()
  @ApiProperty(AuthorFieldDescription.email)
  public email: string;
}