import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import question from './question.config.json';
import { AppService } from './app.service';
import { TokenGuard } from './token.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }
	@Get()
	hello() {
		return 'hello!!';
	}

	@Get('question')
	@UseGuards(TokenGuard)
	getQuestion() {
		return question
	}

	@Post('complete')
	@UseGuards(TokenGuard)
	testComplete(@Body() question) {
		this.appService.data.push(question)
		this.appService.dataSubject.next()
	}
}
