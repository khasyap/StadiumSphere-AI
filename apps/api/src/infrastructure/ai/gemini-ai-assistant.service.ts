import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { AiAssistantService } from '../../application';
import type { ApiEnvironment } from '../../config/environment.validation';

interface GeminiResponse {
  readonly candidates?: readonly {
    readonly content?: {
      readonly parts?: readonly {
        readonly text?: string;
      }[];
    };
  }[];
}

@Injectable()
export class GeminiAiAssistantService implements AiAssistantService {
  public constructor(private readonly configuration: ConfigService<ApiEnvironment, true>) {}

  public async answer(prompt: string): Promise<string> {
    const apiKey = this.configuration.get('GEMINI_API_KEY');

    if (apiKey === undefined) {
      throw new ServiceUnavailableException('AI Assistant is currently unavailable.');
    }

    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), 15_000);

    try {
      const model = this.configuration.getOrThrow('GEMINI_MODEL');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }], role: 'user' }] }),
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
          method: 'POST',
          signal: abortController.signal,
        },
      );

      if (!response.ok) {
        throw new ServiceUnavailableException('AI Assistant is currently unavailable.');
      }

      const payload = (await response.json()) as GeminiResponse;
      const answer = payload.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? '')
        .join('')
        .trim();

      if (answer === undefined || answer.length === 0) {
        throw new ServiceUnavailableException('AI Assistant is currently unavailable.');
      }

      return answer;
    } catch (error: unknown) {
      if (error instanceof ServiceUnavailableException) {
        throw error;
      }

      throw new ServiceUnavailableException('AI Assistant is currently unavailable.');
    } finally {
      clearTimeout(timeout);
    }
  }
}
