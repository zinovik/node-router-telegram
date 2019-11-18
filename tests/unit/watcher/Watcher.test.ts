import { IMock, Mock, It, Times } from "typemoq";

import { Watcher } from "../../../src/watcher/Watcher";
import { IRouterService } from "../../../src/router/IRouterService.interface";
import { IDatabaseService } from "../../../src/database/IDatabaseService.interface";
import { ITelegramService } from "../../../src/telegram/ITelegramService.interface";

describe("Watcher", () => {
  let routerServiceMock: IMock<IRouterService>;
  let databaseService: IMock<IDatabaseService>;
  let telegramServiceMock: IMock<ITelegramService>;

  let watcher: Watcher;

  beforeEach(() => {
    routerServiceMock = Mock.ofType<IRouterService>();
    databaseService = Mock.ofType<IDatabaseService>();
    telegramServiceMock = Mock.ofType<ITelegramService>();

    const configuration = {
      login: "test-login",
      password: "test-password",
      token: "test-token",
      chatId: 0
    };

    watcher = new Watcher(
      configuration,
      routerServiceMock.object,
      databaseService.object,
      telegramServiceMock.object
    );
  });

  afterEach(() => {
    routerServiceMock.verifyAll();
    databaseService.verifyAll();
    telegramServiceMock.verifyAll();
  });

  it("Should work", async () => {
    // Arrange

    // Act
    await watcher.start();

    // Assert
    expect(true).toBeTruthy();
  });
});
