export interface ITplinkService {
  getDevices(): Promise<string[]>;
}
