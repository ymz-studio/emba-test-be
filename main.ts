
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import session from 'express-session';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(session({
		secret: Math.random().toString(36).slice(-8),
		resave: true,
		saveUninitialized: true
	}))
	app.setGlobalPrefix('api')
	await app.listen(1234);
	console.log('Server is running on http://localhost:1234');
}

bootstrap();
