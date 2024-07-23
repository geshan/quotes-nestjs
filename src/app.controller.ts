import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/quotes')
  getQuotes(
    @Query('author') author: string,
  ): Object {
    const quotes = [
      {
        quote: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
        author: 'Bjarne Stroustrup'
    },
    {
        quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        author: 'Martin Fowler'
    },
    {
        quote: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson'
    },
    {
        quote: 'Java is to JavaScript what car is to Carpet.',
        author: 'Chris Heilmann'
    },
    {
        quote: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
        author: 'John Woods'
    },
    ];

    const filteredQuotes = author ? 
      quotes.filter(quote => quote.author.toLocaleLowerCase().includes(author.toLocaleLowerCase())) :
      quotes;
    return {"data": filteredQuotes};
  }
}
