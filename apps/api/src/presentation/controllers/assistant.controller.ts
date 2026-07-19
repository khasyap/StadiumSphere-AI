import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AI_ASSISTANT_SERVICE } from '../../application';
import type { AiAssistantService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { AssistantChatDto, AssistantChatResponseDto } from '../dto/assistant.dto';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';

@ApiTags('assistant')
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
@Controller('assistant')
export class AssistantController {
  public constructor(
    @Inject(AI_ASSISTANT_SERVICE) private readonly assistantService: AiAssistantService,
  ) {}

  @Post('chat')
  @ApiOperation({ summary: 'Ask the StadiumSphere AI Assistant an operational question' })
  @ApiOkResponse({ description: 'Assistant response generated.', type: AssistantChatResponseDto })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  @ApiServiceUnavailableResponse({ description: 'The AI Assistant is unavailable.' })
  public async chat(
    @Body() dto: AssistantChatDto,
  ): Promise<SuccessResponse<AssistantChatResponseDto>> {
    return new SuccessResponse('Assistant response generated.', {
      answer: await this.assistantService.answer(dto.prompt),
    });
  }
}
