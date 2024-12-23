import {
  CreateDateColumn,
  DeleteDateColumn,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export class BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  public updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: null,
    nullable: true,
    select: false,
    name: 'deleted_at',
  })
  public deletedAt?: Date;

  toResponse(exclude: string[] = ['updatedAt', 'deletedAt']) {
    // loop through the excluded properties and remove them from the response object
    Object.keys(this).forEach((key) => {
      if (exclude.includes(key)) delete this[key];
    });
    return this;
  }

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
  @Column({
    name: 'token',
  })
  token: string;

  @Column({
    name: 'expiry_data',
  })
  expiry_data: Date;
}

export class BaseUserEntity extends BaseEntity {
  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
