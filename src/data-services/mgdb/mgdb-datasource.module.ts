import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { UserEntity } from './entities/user.entity';
import { TripEntity } from './entities/trip.entity';
import { CarPoolRequestEntity } from './entities/carpool-request.entity';
import { TripRatingEntity } from './entities/trip-rating.entity';
import { UserOperatorRequestEntity } from './entities/user-operator-request.entity';
import { FileEntity } from './entities/file.entity';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity,
      UserEntity,
      TripEntity,
      CarPoolRequestEntity,
      TripRatingEntity,
      UserOperatorRequestEntity,
      FileEntity,
    ]), // Register repositories
  ],
  providers: [
    {
      provide: DataSource, // add the datasource as a provider
      inject: [],
      useFactory: async () => {
        // using the factory function to create the datasource instance
        try {
          const dataSource = new DataSource({
            type: 'mongodb',
            url: process.env.DB_URL,
            // url: process.env.DOCKER_MONGO_EXPRESS,
            database: process.env.DB_NAME,
            synchronize: true,
            // Enable logging for database operations
            logging: true,
            // The authentication source
            authSource: 'admin',
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
          });
          await dataSource.initialize(); // initialize the data source
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [
    DataSource,
    TypeOrmModule.forFeature([
      AdminEntity,
      UserEntity,
      TripEntity,
      CarPoolRequestEntity,
      TripRatingEntity,
      UserOperatorRequestEntity,
      FileEntity,
    ]), // Export repositories here
  ],
})
export class AppDataSourceModule {}
