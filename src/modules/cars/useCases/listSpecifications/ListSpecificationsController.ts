import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecficationUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const all = await listSpecficationUseCase.execute();
    return response.json(all);
  }
}

export { ListSpecificationsController };
