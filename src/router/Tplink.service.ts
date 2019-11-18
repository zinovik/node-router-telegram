import axios from 'axios';

import { IRouterService } from './IRouterService.interface';

const ROUTER_ADDRESS = '192.168.0.1';
const ROUTER_PAGE = '/userRpm/WlanStationRpm.htm';

export class TplinkService implements IRouterService {
  constructor(private readonly login: string, private readonly password: string) {
    this.login = login;
    this.password = password;
  }

  async getDevices(): Promise<string[]> {
    const page = await this.getDevicesPage();
    const devices = this.getDevicesFromPage(page);

    return devices;
  }

  private async getDevicesPage(): Promise<string> {
    const { data } = await axios.get(`http://${this.login}:${this.password}@${ROUTER_ADDRESS}${ROUTER_PAGE}`, {
      headers: {
        Referer: `http://${ROUTER_ADDRESS}`,
      },
    });

    return data;
  }

  private getDevicesFromPage(page: string): string[] {
    // TODO: RegExp?

    const ARRAY_START = 'var hostList = new Array(';
    const ARRAY_END = ');';
    const arrayStartIndex: number = page.indexOf(ARRAY_START);
    const arrayEndIndex: number = page.indexOf(ARRAY_END, arrayStartIndex);
    const arrayString: string = page.substring(arrayStartIndex + ARRAY_START.length, arrayEndIndex);
    const array: string[] = arrayString.split('"');

    const devices: string[] = [];

    array.forEach((item, index) => {
      if (index % 2) {
        devices.push(item);
      }
    });

    return devices;
  }
}
