import { Request, Response } from 'express';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  constructor(private listSpecficationUseCase: ListSpecificationsUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listSpecficationUseCase.execute();

    return response.json(all);
  }
}

export { ListSpecificationsController };
