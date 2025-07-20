
import { Injectable } from '@angular/core';

@Injectable()
export class MockAlertController {
  create(): Promise<any> {
    return Promise.resolve({
      present: () => {}
    });
  }
}

@Injectable()
export class MockLoadingController {
  create(): Promise<any> {
    return Promise.resolve({
      present: () => {},
      dismiss: () => {}
    });
  }
}

@Injectable()
export class MockRouter {
  navigate(commands: any[], extras?: any): Promise<boolean> {
    return Promise.resolve(true);
  }
}

@Injectable()
export class MockAuthService {
  async signIn(user: any) {
    return Promise.resolve();
  }
}

@Injectable()
export class MockSessionService {
  getSession() {
    return Promise.resolve({ id: 1, direccion: 'Test', telefono: '123', correo: 'test@email.com' });
  }

  clearSession() {
    return Promise.resolve();
  }
}

