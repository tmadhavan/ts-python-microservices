import { Test, TestingModule } from '@nestjs/testing';
import { PdfController } from './pdf.controller';
import { AppService } from './app.service';

describe('PdfController', () => {
  let appController: PdfController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PdfController],
      providers: [AppService],
    }).compile();

    appController = app.get<PdfController>(PdfController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});