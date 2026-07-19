import { ApplicationException } from './application.exception';
export declare class ApplicationEntityNotFoundException extends ApplicationException {
    constructor(id: string);
}
