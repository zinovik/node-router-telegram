export interface ITelegramService {
  sendMessage({ text, chatId }: { text: string; chatId: number }): Promise<void>;
}
