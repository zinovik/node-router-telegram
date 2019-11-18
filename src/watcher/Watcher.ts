import { IWatcher } from './IWatcher.interface';
import { IRouterService } from '../router/IRouterService.interface';
import { IDatabaseService } from '../database/IDatabaseService.interface';

import { ITelegramService } from '../telegram/ITelegramService.interface';
import { IWatcherConfiguration } from '../common/model/IWatcherConfiguration.interface';

export class Watcher implements IWatcher {
  constructor(
    private configuration: IWatcherConfiguration,
    private routerService: IRouterService,
    private databaseService: IDatabaseService,
    private telegramService: ITelegramService,
  ) {}

  async start(): Promise<void> {
    setInterval(async () => {
      await this.checkDevicesAndSendMessage();
    }, this.configuration.interval);
  }

  private async checkDevicesAndSendMessage(): Promise<void> {
    const oldDevices = await this.databaseService.getDevices();
    const newDevices = await this.routerService.getDevices();

    const connectedDevices = this.getConnectedDevices(oldDevices, newDevices);
    const disconnectedDevices = this.getDisconnectedDevices(oldDevices, newDevices);

    connectedDevices.forEach(async connectedDevice => {
      const deviceAlias = await this.databaseService.getDeviceAlias(connectedDevice);

      this.telegramService.sendMessage({
        text: `${deviceAlias || connectedDevice} connected`,
        chatId: this.configuration.chatId,
      });
    });

    disconnectedDevices.forEach(async disconnectedDevice => {
      const deviceAlias = await this.databaseService.getDeviceAlias(disconnectedDevice);

      this.telegramService.sendMessage({
        text: `${deviceAlias || disconnectedDevice} disconnected`,
        chatId: this.configuration.chatId,
      });
    });

    await this.databaseService.setDevices(newDevices);
  }

  private getConnectedDevices(oldDevices: string[], newDevices: string[]): string[] {
    const connectedDevices: string[] = [];

    newDevices.forEach(newDevice => {
      if (!oldDevices.includes(newDevice)) {
        connectedDevices.push(newDevice);
      }
    });

    return connectedDevices;
  }

  private getDisconnectedDevices(oldDevices: string[], newDevices: string[]): string[] {
    const disconnectedDevices: string[] = [];

    oldDevices.forEach(oldDevice => {
      if (!newDevices.includes(oldDevice)) {
        disconnectedDevices.push(oldDevice);
      }
    });

    return disconnectedDevices;
  }
}
