import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// xplorer
import { XplorerService } from '../users/xplorer/xplorer.service';
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';

// trip-planner
import { TripPlannerService } from '../users/trip-planner/trip-planner.service';
import { TripPlannerEntity } from 'src/data-services/mgdb/entities/trip-planner.entity';

import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';
import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(XplorerEntity)
    private xplorerRepository: Repository<XplorerEntity>,
    private xplorerService: XplorerService,
    private tripPlannerService: TripPlannerService,
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async signIn(dto: SignInDto) {
    let user = null;

    if (dto.userType === UserTypeEnum.XPLORER)
      user = await this.xplorerService.findXplorerByUsername(dto.username);
    else if (dto.userType === UserTypeEnum.TRIP_PLANNER)
      user = await this.tripPlannerService.findTripPlannerByUsername(
        dto.username,
      );

    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      user.password,
    );

    if (!user || !isPasswordMatched) {
      throw new UnauthorizedException('incorrect username or password');
    }

    const payload = { _id: user._id, user_type: user.user_type };
    const accessToken = await this.jwtTokenService.createToken(payload);

    return {
      accessToken,
      user,
    };
  }
}
