import { config as configureEnvironmentVariables } from 'dotenv';
import { exec, ChildProcess } from 'child_process';

// require our environment variables
configureEnvironmentVariables();

export interface IStreamConfig {
  width: string;
  height: string;
  fps: string;
  bitrate: string;
}

const streamConfig: IStreamConfig = {
  width: process.env.STREAM_WIDTH || '640',
  height: process.env.STREAM_HEIGHT || '480',
  fps: process.env.STREAM_FPS || '10',
  bitrate: process.env.STREAM_BITRATE || '638000',
};

export default class Camera {
  private process: ChildProcess;
  private config: IStreamConfig;

  constructor() {
    this.config = streamConfig;
  }

  start(rtmpUrl: string): void {
    try {
      // const rtmpUrl: string = url ? url : this.getRTMPUrl();
      console.log('Starting camera...');
      console.log('  ', rtmpUrl);
      console.log('  ', 'width :', this.config.width);
      console.log('  ', 'height:', this.config.height);
      console.log('  ', 'fps   :', this.config.fps);

      this.killProcesses();
      this.executeProcesses(rtmpUrl);

      console.log('  ', 'Camera started at PID:', this.process.pid);
    } catch (error) {
      console.log('  ', 'Error starting camera:', error.message);
      this.killProcesses();
    }
  }

  stop(): void {
    console.log('Stopping camera...');
    this.killProcesses();
    console.log('Camera stopped...');
  }

  isActive(): boolean {
    return !!this.process;
  }

  private killProcesses() {
    if (this.process) {
      this.process.kill();
      this.process = undefined;
    }
    this.processCleanup();
  }

  private processCleanup() {
    // making sure no zombie process is still running
    [
      'raspivid',
      'ffmpeg',
    ].map((process: string) => {
      try {
        exec(`ps -ef | grep ${process} | grep -v grep | awk '{print $2}' | xargs kill`);
      } catch (error) {
        // console.error('Error killing process [ffmpegProcess]');
      }
    });
  }

  private executeProcesses(rtmpUrl: string) {
    // prepare cam
    exec(`v4l2-ctl -p ${this.config.fps}`);
    exec(`v4l2-ctl --set-ctrl video_bitrate=${this.config.bitrate}`);
    exec(`v4l2-ctl --set-fmt-video=width=${this.config.width},height=${this.config.height},pixelformat=H264`);

    // const command = `raspivid -o - -t 0 -w ${this.config.width} -h ${this.config.height} -fps ${this.config.fps} -b ${15000000} -g 50 | ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -thread_queue_size 1024 -ac 2 -i /dev/zero -f h264 -thread_queue_size 1024 -i - -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv ${rtmpUrl}`;
    const command = `ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -thread_queue_size 1024 -ac 2 -i /dev/zero -f h264 -thread_queue_size 1024 -i /dev/video0 -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv ${rtmpUrl}`;
    console.log('> ', command);
    this.process = exec(command);

    this.process.on('close', () => {
      console.log('  ', 'Camera process closed...');
      this.stop();
    });
    this.process.on('error', (error) => {
      console.error(error);
      this.stop();
    });

    this.process.stdout.on('data', (data: any) => console.log('  ', data.toString()));
    this.process.stderr.on('data', (data: any) => console.error('  ', data.toString()));
  }
}