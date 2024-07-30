import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('quotes', () => {
    it('should return quotes with author john', () => {
      const response: any = appController.getQuotes('john');
      expect(response).toHaveProperty('data');
      expect(response.data).toHaveLength(2);
      expect(response.data[0]).toEqual({ "author": "John Johnson", "quote": "First, solve the problem. Then, write the code." });
      expect(response.data[1]).toEqual({ "author": "John Woods", "quote": "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live." });
    });

    it('should throw not found exception if no quotes found for given author', () => {
      expect(() => appController.getQuotes('xyz')).toThrow('No quotes found for the given author');
    });
  });
});
