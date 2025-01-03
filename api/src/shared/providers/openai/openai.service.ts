import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../app.const';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI = new OpenAI({ apiKey: OPENAI_API_KEY })

  async generateCompletion(prompt: string): Promise<any> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: `JSON response should be top level, not nested within any field.  See prompt: ${prompt}` }],
        model: 'gpt-3.5-turbo',
      });

      const rawContent = completion.choices[0].message.content;
      const sanitizedContent = rawContent.replace(/\n/g, ' ').trim();

      try {
        return JSON.parse(sanitizedContent)
      } catch (parseError) {
        throw new Error(`Failed to parse response as JSON: ${sanitizedContent}`);
      }
    } catch (error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }

}
