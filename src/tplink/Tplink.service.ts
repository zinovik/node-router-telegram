import axios from "axios";

import { ITplinkService } from "./ITplinkService.interface";

export class TplinkService implements ITplinkService {
  constructor(
    private readonly login: string,
    private readonly password: string
  ) {
    this.login = login;
    this.password = password;
  }

  async getDevices(): Promise<string[]> {
    const { data } = await axios.get(
      `http://${this.login}:${this.password}@192.168.0.1/userRpm/WlanStationRpm.htm`,
      {
        headers: {
          Referer: "http://192.168.0.1/userRpm/MenuRpm.htm"
        }
      }
    );

    const ARRAY_START = "var hostList = new Array(";
    const ARRAY_END = ");";
    const arrayStartIndex: number = data.indexOf(ARRAY_START);
    const arrayEndIndex: number = data.indexOf(ARRAY_END, arrayStartIndex);
    const arrayString: string = data.substring(
      arrayStartIndex + ARRAY_START.length,
      arrayEndIndex
    );
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
