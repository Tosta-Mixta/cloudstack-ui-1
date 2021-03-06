import { TestBed, async } from '@angular/core/testing';
import { Injector } from '@angular/core';

import { ErrorService } from './error.service';

describe('Error service', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService,
        Injector
      ],
    });
  }));

  it('should get error translation', () => {
    const error = {
      errorcode: 430,
      errortext: 'Going from existing size of 434 to size of 23 would shrink the volume.'
    };

    const parsedError = ErrorService.parseError(error);
    expect(parsedError.message).toBeDefined();
    expect(parsedError.message).toBe('VOLUME_NEWSIZE_LOWER');
  });

  it('should get error params', () => {
    const error = {
      errorcode: 430,
      errortext: 'The vm with hostName test already exists in the network domain'
    };

    const parsedError = ErrorService.parseError(error);
    expect(parsedError.params).toBeDefined();
    const keys = Object.keys(parsedError.params);
    expect(keys.length).toBe(1);
    expect(parsedError.params[keys[0]]).toBe('test');
  });

  it('should fallback to the errortext if no translation is set', () => {
    const error = {
      errorcode: 430,
      errortext: 'Unknown error text'
    };

    const parsedError = ErrorService.parseError(error);
    expect(parsedError.message).toBe(parsedError.errortext);
  });
});
