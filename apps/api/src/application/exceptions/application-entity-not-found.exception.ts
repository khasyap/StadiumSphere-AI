import { ApplicationException } from './application.exception';

export class ApplicationEntityNotFoundException extends ApplicationException {
  public constructor(id: string) {
    super(`Entity with identifier "${id}" was not found.`, 'APPLICATION_ENTITY_NOT_FOUND');
  }
}
