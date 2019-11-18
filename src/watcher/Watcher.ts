import { IWatcher } from "./IWatcher.interface";
import { IRouterService } from "../router/IRouterService.interface";
import { IDatabaseService } from "../database/IDatabaseService.interface";

import { ITelegramService } from "../telegram/ITelegramService.interface";
import { IWatcherConfiguration } from "../common/model/IWatcherConfiguration.interface";

export class Watcher implements IWatcher {
  constructor(
    private configuration: IWatcherConfiguration,
    private routerService: IRouterService,
    private databaseService: IDatabaseService,
    private telegramService: ITelegramService
  ) {}

  async start(): Promise<void> {
    setInterval(async () => {
      const newDevices = await this.routerService.getDevices();
      const oldDevices = await this.databaseService.getDevices();

      const connectedDevices = this.getConnectedDevices(oldDevices, newDevices);
      const disconnectedDevices = this.getDisconnectedDevices(
        oldDevices,
        newDevices
      );

      connectedDevices.forEach(async connectedDevice => {
        const deviceName = await this.databaseService.getDeviceName(
          connectedDevice
        );

        this.telegramService.sendMessage({
          text: `${deviceName || connectedDevice} connected`,
          chatId: this.configuration.chatId
        });
      });

      disconnectedDevices.forEach(async disconnectedDevice => {
        const deviceName = await this.databaseService.getDeviceName(
          disconnectedDevice
        );

        this.telegramService.sendMessage({
          text: `${deviceName || disconnectedDevice} disconnected`,
          chatId: this.configuration.chatId
        });
      });

      await this.databaseService.setDevices(newDevices);
    }, 60 * 1000);
  }

  private getConnectedDevices(
    oldDevices: string[],
    newDevices: string[]
  ): string[] {
    const connectedDevices: string[] = [];

    newDevices.forEach(newDevice => {
      if (!oldDevices.includes(newDevice)) {
        connectedDevices.push(newDevice);
      }
    });

    return connectedDevices;
  }

  private getDisconnectedDevices(
    oldDevices: string[],
    newDevices: string[]
  ): string[] {
    const disconnectedDevices: string[] = [];

    oldDevices.forEach(oldDevice => {
      if (!newDevices.includes(oldDevice)) {
        disconnectedDevices.push(oldDevice);
      }
    });

    return disconnectedDevices;
  }
}
