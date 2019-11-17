import { IMock, Mock, It, Times } from 'typemoq';

import { Watcher } from '../../../src/watcher/Watcher';
import { IServerService } from '../../../src/server/IServerService.interface';
import { ITplinkService } from '../../../src/tplink/ITplinkService.interface';
import { ITelegramService } from '../../../src/telegram/ITelegramService.interface';
import { IFileSystemService } from '../../../src/file-system/IFileSystemService.interface';

describe('Spy', () => {
  let serverServiceMock: IMock<IServerService>;
  let tplinkService: IMock<ITplinkService>;
  let telegramServiceMock: IMock<ITelegramService>;
  let fileSystemServiceMock: IMock<IFileSystemService>;

  let watcher: Watcher;

  beforeEach(() => {
    serverServiceMock = Mock.ofType<IServerService>();
    tplinkService = Mock.ofType<ITplinkService>();
    telegramServiceMock = Mock.ofType<ITelegramService>();
    fileSystemServiceMock = Mock.ofType<IFileSystemService>();

    const configuration = {
      currentPath: 'test-path',
      password: 'test-pass',
    };

    watcher = new Watcher(configuration, serverServiceMock.object, tplinkService.object, telegramServiceMock.object, fileSystemServiceMock.object);
  });

  afterEach(() => {
    serverServiceMock.verifyAll();
    tplinkService.verifyAll();
    telegramServiceMock.verifyAll();
    fileSystemServiceMock.verifyAll();
  });

  it('Should work', async () => {
    // Arrange

    // Act
    await watcher.start();

    // Assert
    expect(true).toBeTruthy();
  });
});
