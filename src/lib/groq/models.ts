import { getGroqApiUrl } from '../../config/services';
import type { GroqModel } from './types';

export const GROQ_MODELS: GroqModel[] = [
  {
    id: 'llama3-8b-8192',
    name: 'LLaMA 3 8B',

    description: 'Balanced performance for business analysis',
    maxTokens: 32768,
  },
];

export async function fetchAvailableModels(token: string): Promise<GroqModel[]> {
  try {
    const url = getGroqApiUrl()
    const response = await fetch(`${url}/models`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Failed to fetch GROQ models: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data.map((model: any) => ({
      id: model.id,
      name: model.id
        .split('-')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      description: model.description || 'AI model for analysis',
      maxTokens: model.context_window || 8192,
    }));
  } catch (error) {
    return GROQ_MODELS;
  }
}
