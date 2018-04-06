import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from "./message.service";

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService, MessageService]
    });
  });

  it('should be created', inject([HttpClientTestingModule, MessageService, HeroService],
    (httpMock: HttpClientTestingModule, messageService: MessageService, heroService: HeroService) => {
    expect(heroService).toBeTruthy();
  }));
});
