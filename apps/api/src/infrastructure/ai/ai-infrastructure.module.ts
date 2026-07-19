import { Module } from '@nestjs/common';

import { AI_ASSISTANT_SERVICE } from '../../application/platform/ai-assistant.service';
import { GeminiAiAssistantService } from './gemini-ai-assistant.service';

@Module({
  providers: [
    GeminiAiAssistantService,
    { provide: AI_ASSISTANT_SERVICE, useExisting: GeminiAiAssistantService },
  ],
  exports: [AI_ASSISTANT_SERVICE],
})
export class AiInfrastructureModule {}
