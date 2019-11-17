export interface IDatabaseService {
  getDevices(): Promise<string[]>;
  setDevices(devices: string[]): Promise<void>;
  getDeviceName(device: string): Promise<string>;
}
