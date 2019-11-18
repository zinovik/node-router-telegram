#!/usr/bin/env node

import { Watcher } from "./watcher/Watcher";
import { TplinkService } from "./router/Tplink.service";
import { MemoryService } from "./database/Memory.service";
import { TelegramService } from "./telegram/Telegram.service";

import { ConfigParameterNotDefinedError } from "./error/ConfigParameterNotDefinedError";

if (process.argv[2] === undefined) {
  throw new ConfigParameterNotDefinedError("LOGIN");
}
if (process.argv[3] === undefined) {
  throw new ConfigParameterNotDefinedError("PASSWORD");
}
if (process.argv[4] === undefined) {
  throw new ConfigParameterNotDefinedError("TOKEN");
}
if (process.argv[5] === undefined) {
  throw new ConfigParameterNotDefinedError("CHAT_ID");
}

const configuration = {
  login: process.argv[2],
  password: process.argv[3],
  token: process.argv[4],
  chatId: Number(process.argv[5])
};

const tplinkService = new TplinkService(
  configuration.login,
  configuration.password
);
const memoryService = new MemoryService();
const telegramService = new TelegramService(configuration.token);

const watcher = new Watcher(
  configuration,
  tplinkService,
  memoryService,
  telegramService
);

(async () => {
  await watcher.start();
})();
