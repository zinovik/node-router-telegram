import { IDatabaseService } from "./IDatabaseService.interface";

export class MemoryService implements IDatabaseService {
  private devices: string[] = [];
  private devicesName: { [key: string]: string } = {
    "50-8F-4C-72-9F-EF": "Lena (mobile)",
    "A8-34-6A-73-8B-26": "Max (mobile)",
    "04-D3-B0-62-44-1D": "Max (PC)"
  };

  async getDevices(): Promise<string[]> {
    return Promise.resolve([...this.devices]);
  }

  async setDevices(devices: string[]): Promise<void> {
    this.devices = [...devices];
    return Promise.resolve();
  }

  async getDeviceName(device: string): Promise<string> {
    return Promise.resolve(this.devicesName[device] || "");
  }
}
