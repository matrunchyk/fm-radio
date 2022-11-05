import { Injectable, Logger } from '@nestjs/common';
import { ChildProcessByStdio, spawn } from 'child_process';
import { Readable, Writable } from 'stream';
import { setTimeout } from 'timers/promises';

const FM_FREQ_TITLE = {
  88.3: 'Українське радіо Волинь',
  88.7: 'Lux FM & Radio Maximum',
  89.8: 'FM Galychyna',
  90.2: 'Авторадіо',
  90.6: 'Радіо українських доріг',
  91.5: 'Радіо НВ',
  100.1: 'Радіо 1',
  100.9: 'Радіо Аверс',
  101.9: 'Культура',
  102.4: 'СіД ФМ',
  103.4: 'Шансон',
  104.8: 'Наше Радіо',
  105.5: 'Релакс',
  106.2: 'Hit FM',
  106.9: 'Ритм',
  107.3: 'Промінь',
} as Record<number, string>;

export interface StationInfo {
  title: string;
}

@Injectable()
export class AppService {
  private rtlFmProcess?: ChildProcessByStdio<null, Readable, Readable>;

  private ffmpegProcess?: ChildProcessByStdio<Writable, Readable, Readable>;

  private readonly logger = new Logger(AppService.name);
  private readonly rtlFmLogger = new Logger('rtl_fm');
  private readonly ffmpegLogger = new Logger('ffmpeg');

  constructor() {
    this.switchFreq(88.3);
  }

  private killFfmpeg() {
    this.ffmpegLogger.debug(`Aborting (pid: ${this.ffmpegProcess?.pid})...`);

    if (!this.ffmpegProcess?.killed) {
      this.ffmpegProcess?.kill(9);
    }
  }

  public stop() {
    // this.killFfmpeg();

    this.rtlFmLogger.debug(`Aborting (pid: ${this.rtlFmProcess?.pid})...`);

    if (!this.rtlFmProcess?.killed) {
      this.rtlFmProcess?.kill(9);
    }

    return true;
  }

  public async switchFreq(frequency: number): Promise<StationInfo> {
    this.logger.log(`Switching to frequency: ${frequency}`);
    // rtl_fm -f 88.3M -M fm -s 170k -A std -l 0 -E deepm -r 44.1k | ffmpeg -f s16le -ac 1 -i pipe:0 -acodec libmp3lame -ab 128k -f rtp rtp://127.0.0.1:1234`;

    const title =
      frequency in FM_FREQ_TITLE
        ? FM_FREQ_TITLE[frequency]
        : `Radio ${frequency}`;
    const RTL_FM_ARGS = [
      '-f',
      `${frequency}M`,
      '-M',
      'fm',
      '-s',
      '170k',
      '-A',
      'std',
      '-l',
      '0',
      '-E',
      'deepm',
      '-r',
      '44.1k',
    ];
    const FFMPEG_ARGS = [
      '-f',
      's16le',
      '-ac',
      '1',
      '-i',
      'pipe:0',
      '-acodec',
      'libmp3lame',
      '-ab',
      '128k',
      '-timestamp',
      'now',
      '-metadata',
      `title="${title}`,
      '-f',
      'rtp',
      'rtp://127.0.0.1:1234',
    ];

    this.stop();

    await setTimeout(1000);

    this.rtlFmLogger.debug(`Spawning...`);
    this.rtlFmProcess = spawn('rtl_fm', RTL_FM_ARGS, {
      stdio: ['ignore', 'pipe', 'pipe'],
      uid: 501,
      gid: 20,
      cwd: process.cwd(),
    });

    this.ffmpegLogger.debug(`Spawning...`);
    this.ffmpegProcess = spawn('ffmpeg', FFMPEG_ARGS, {
      stdio: ['pipe', 'pipe', 'pipe'],
      uid: 501,
      gid: 20,
      cwd: process.cwd(),
    });

    if (this.ffmpegProcess && this.rtlFmProcess) {
      this.logger.debug(`Piping processes...`);

      this.rtlFmProcess.stdout.pipe(this.ffmpegProcess.stdin, { end: false });
      this.rtlFmProcess.stderr.on('data', (data: string) => {
        this.rtlFmLogger.debug(data);
      });

      this.ffmpegProcess.stderr.on('data', (data: string) => {
        if (data.toString().startsWith('size=')) {
          // Write encoding progress to stdout
          // process.stdout.write(data);
          return;
        }
        this.ffmpegLogger.verbose(data);
      });

      this.ffmpegProcess.stdout.on('data', (data: string) => {
        this.ffmpegLogger.debug(data);
      });
    }

    this.rtlFmProcess.stdout.on('end', this.killFfmpeg.bind(this));
    this.rtlFmProcess.on('end', this.killFfmpeg.bind(this));
    this.rtlFmProcess.on('error', this.killFfmpeg.bind(this));

    return {
      title,
    };
  }
}
