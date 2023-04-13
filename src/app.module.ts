import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [RoleModule, UserModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
