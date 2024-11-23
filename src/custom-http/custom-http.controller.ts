import { Controller } from '@nestjs/common';
import { CustomHttpService } from './custom-http.service';

@Controller('custom-http')
export class CustomHttpController {
  constructor(private readonly customHttpService: CustomHttpService) {}
}
