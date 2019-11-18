import axios from 'axios';

import { ITelegramService } from './ITelegramService.interface';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

export class TelegramService implements ITelegramService {
  constructor(private readonly token: string) {
    this.token = token;
  }

  async sendMessage({ text, chatId }: { text: string; chatId: number }): Promise<void> {
    const message = {
      text,
      // eslint-disable-next-line @typescript-eslint/camelcase
      chat_id: chatId,
    };

    console.log(`Sending telegram message: ${JSON.stringify(message)}...`);

    const { data } = await axios.post(`${TELEGRAM_API_URL}${this.token}/sendMessage`, message);

    console.log(`Telegram message was successfully sent: ${JSON.stringify(data)}`);
  }
}
