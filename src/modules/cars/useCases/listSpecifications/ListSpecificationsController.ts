import { Request, Response } from 'express';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  constructor(private listSpecficationUseCase: ListSpecificationsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const all = await this.listSpecficationUseCase.execute();

    return response.json(all);
  }
}

export { ListSpecificationsController };
