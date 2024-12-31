import {
  ObjectIdColumn,
  Column,
  BaseEntity as TypeOrmBaseEntity,
} from 'typeorm';
import { ObjectId } from 'mongodb';

export class BaseEntity extends TypeOrmBaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'date', default: () => new Date() }) // Use native JavaScript Date for MongoDB
  public createdAt: Date = new Date();

  @Column({ type: 'date', default: () => new Date() })
  public updatedAt: Date = new Date();

  @Column({ type: 'date', nullable: true, select: false })
  public deletedAt?: Date;

  /**
   * Hook to update `updatedAt` automatically before save.
   */
  preSave() {
    this.updatedAt = new Date();
  }

  /**
   * Excludes specified fields from the response object.
   * @param exclude - Array of field names to exclude.
   */
  toResponse(exclude: string[] = ['updatedAt', 'deletedAt']) {
    const response = { ...this }; // Create a shallow copy
    exclude.forEach((field) => delete response[field]);
    return response;
  }

  /**
   * Generates a standardized repository name for the entity.
   */
  static get REPOSITORY(): string {
    const name = this.name
      .replace(/([A-Z])/g, ' $1')
      .replace(/entity/gi, '')
      .trim()
      .split(' ')
      .join('_')
      .toUpperCase();
    return `${name}_REPOSITORY`;
  }
}

export class RefreshTokenBaseEntity extends BaseEntity {
  @Column()
  token: string;

  @Column()
  expiry_data: Date;
}

export class BaseUserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
