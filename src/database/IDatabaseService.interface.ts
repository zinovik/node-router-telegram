export interface IDatabaseService {
  getDevices(): Promise<string[]>;
  setDevices(devices: string[]): Promise<void>;
  getDeviceAlias(device: string): Promise<string>;
}
