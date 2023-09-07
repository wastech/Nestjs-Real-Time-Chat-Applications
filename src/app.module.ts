import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AnyExceptionFilter } from './http-exception.filter';
import { CastErrorFilter } from './cast-error.filter';
import { mongooseConfig } from './database/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //  Make the configuration module available globally
    }),
    mongooseConfig(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },

    {
      provide: APP_FILTER,
      useClass: CastErrorFilter,
    },
    AppService,
  ],
})
export class AppModule {}
