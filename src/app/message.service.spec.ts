import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

// describe('MessageService', () => {
//   let service: MessageService;
//   beforeEach(() => { service = new MessageService(); });

//   it('should be created', inject([MessageService], (service: MessageService) => {
//     expect(service).toBeTruthy();
//   }))
// })

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
