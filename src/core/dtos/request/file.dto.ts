import { IsNotEmpty } from 'class-validator';

export class FileDto {
  @IsNotEmpty()
  file_id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  path: string;
  @IsNotEmpty()
  url: string;
}
