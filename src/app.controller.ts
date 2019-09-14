import { Controller, Get, Post, Body } from '@nestjs/common';
import question from './question.config.json';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }
	@Get()
	hello() {
		return 'hello!!';
	}

	@Get('question')
	getQuestion() {
		return question
	}

	@Post('complete')
	testComplete(@Body() question) {
		this.appService.data.push(question)
		this.appService.dataSubject.next()
	}
}
