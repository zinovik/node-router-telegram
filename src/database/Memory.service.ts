import { IDatabaseService } from './IDatabaseService.interface';

const DEVICES_ALIASES: { [key: string]: string } = {
  '04-D3-B0-62-44-1D': 'Max (PC)',
  'A8-34-6A-73-8B-26': 'Max (mobile)',
  'B8-EE-65-C3-06-75': 'Lena (PC)',
  '50-8F-4C-72-9F-EF': 'Lena (mobile)',
  'BC-8C-CD-8A-EC-6B': 'TV',
};

export class MemoryService implements IDatabaseService {
  private devices: string[] = [];

  async getDevices(): Promise<string[]> {
    return Promise.resolve([...this.devices]);
  }

  async setDevices(devices: string[]): Promise<void> {
    this.devices = [...devices];
    return Promise.resolve();
  }

  async getDeviceAlias(device: string): Promise<string> {
    return Promise.resolve(DEVICES_ALIASES[device] || '');
  }
}
