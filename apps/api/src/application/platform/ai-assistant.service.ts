export interface AiAssistantService {
  answer(prompt: string): Promise<string>;
}

export const AI_ASSISTANT_SERVICE = Symbol('Application.AiAssistantService');

export interface PredictionService {
  predict(subject: string): Promise<string>;
}

export interface RecommendationService {
  recommend(subject: string): Promise<readonly string[]>;
}

export interface SummarizationService {
  summarize(content: string): Promise<string>;
}

export class InMemoryAiAssistantService
  implements AiAssistantService, PredictionService, RecommendationService, SummarizationService
{
  public async answer(_prompt: string): Promise<string> {
    return 'AI assistance is not configured for this environment.';
  }

  public async predict(_subject: string): Promise<string> {
    return 'No prediction is available without a configured AI provider.';
  }

  public async recommend(_subject: string): Promise<readonly string[]> {
    return [];
  }

  public async summarize(content: string): Promise<string> {
    return content.trim();
  }
}
