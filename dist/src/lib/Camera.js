"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const child_process_1 = require("child_process");
// require our environment variables
dotenv_1.config();
const streamConfig = {
    width: process.env.STREAM_WIDTH || '640',
    height: process.env.STREAM_HEIGHT || '480',
    fps: process.env.STREAM_FPS || '10',
    bitrate: process.env.STREAM_BITRATE || '638000',
};
class Camera {
    constructor() {
        this.config = streamConfig;
    }
    start(rtmpUrl) {
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
        }
        catch (error) {
            console.log('  ', 'Error starting camera:', error.message);
            this.killProcesses();
        }
    }
    stop() {
        console.log('Stopping camera...');
        this.killProcesses();
        console.log('Camera stopped...');
    }
    isActive() {
        return !!this.process;
    }
    killProcesses() {
        if (this.process) {
            this.process.kill();
            this.process = undefined;
        }
        this.processCleanup();
    }
    processCleanup() {
        // making sure no zombie process is still running
        [
            'raspivid',
            'ffmpeg',
        ].map((process) => {
            try {
                child_process_1.exec(`ps -ef | grep ${process} | grep -v grep | awk '{print $2}' | xargs kill`);
            }
            catch (error) {
                // console.error('Error killing process [ffmpegProcess]');
            }
        });
    }
    executeProcesses(rtmpUrl) {
        // prepare cam
        child_process_1.exec(`v4l2-ctl -p ${this.config.fps}`);
        child_process_1.exec(`v4l2-ctl --set-ctrl video_bitrate=${this.config.bitrate}`);
        child_process_1.exec(`v4l2-ctl --set-fmt-video=width=${this.config.width},height=${this.config.height},pixelformat=H264`);
        // const command = `raspivid -o - -t 0 -w ${this.config.width} -h ${this.config.height} -fps ${this.config.fps} -b ${15000000} -g 50 | ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -thread_queue_size 1024 -ac 2 -i /dev/zero -f h264 -thread_queue_size 1024 -i - -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv ${rtmpUrl}`;
        const command = `ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -thread_queue_size 1024 -ac 2 -i /dev/zero -f h264 -thread_queue_size 1024 -i /dev/video0 -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv ${rtmpUrl}`;
        console.log('> ', command);
        this.process = child_process_1.exec(command);
        this.process.on('close', () => {
            console.log('  ', 'Camera process closed...');
            this.stop();
        });
        this.process.on('error', (error) => {
            console.error(error);
            this.stop();
        });
        this.process.stdout.on('data', (data) => console.log('  ', data.toString()));
        this.process.stderr.on('data', (data) => console.error('  ', data.toString()));
    }
}
exports.default = Camera;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FtZXJhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9DYW1lcmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUU7QUFDakUsaURBQW1EO0FBRW5ELG9DQUFvQztBQUNwQyxlQUE2QixFQUFFLENBQUM7QUFTaEMsTUFBTSxZQUFZLEdBQWtCO0lBQ2xDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxLQUFLO0lBQ3hDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxLQUFLO0lBQzFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJO0lBQ25DLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxRQUFRO0NBQ2hELENBQUM7QUFFRixNQUFxQixNQUFNO0lBSXpCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlO1FBQ25CLElBQUk7WUFDRix5REFBeUQ7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJ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LE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztDQUNGO0FBbEZELHlCQWtGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZyBhcyBjb25maWd1cmVFbnZpcm9ubWVudFZhcmlhYmxlcyB9IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBleGVjLCBDaGlsZFByb2Nlc3MgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuLy8gcmVxdWlyZSBvdXIgZW52aXJvbm1lbnQgdmFyaWFibGVzXG5jb25maWd1cmVFbnZpcm9ubWVudFZhcmlhYmxlcygpO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdHJlYW1Db25maWcge1xuICB3aWR0aDogc3RyaW5nO1xuICBoZWlnaHQ6IHN0cmluZztcbiAgZnBzOiBzdHJpbmc7XG4gIGJpdHJhdGU6IHN0cmluZztcbn1cblxuY29uc3Qgc3RyZWFtQ29uZmlnOiBJU3RyZWFtQ29uZmlnID0ge1xuICB3aWR0aDogcHJvY2Vzcy5lbnYuU1RSRUFNX1dJRFRIIHx8ICc2NDAnLFxuICBoZWlnaHQ6IHByb2Nlc3MuZW52LlNUUkVBTV9IRUlHSFQgfHwgJzQ4MCcsXG4gIGZwczogcHJvY2Vzcy5lbnYuU1RSRUFNX0ZQUyB8fCAnMTAnLFxuICBiaXRyYXRlOiBwcm9jZXNzLmVudi5TVFJFQU1fQklUUkFURSB8fCAnNjM4MDAwJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XG4gIHByaXZhdGUgcHJvY2VzczogQ2hpbGRQcm9jZXNzO1xuICBwcml2YXRlIGNvbmZpZzogSVN0cmVhbUNvbmZpZztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHN0cmVhbUNvbmZpZztcbiAgfVxuXG4gIHN0YXJ0KHJ0bXBVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCBydG1wVXJsOiBzdHJpbmcgPSB1cmwgPyB1cmwgOiB0aGlzLmdldFJUTVBVcmwoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyBjYW1lcmEuLi4nKTtcbiAgICAgIGNvbnNvbGUubG9nKCcgICcsIHJ0bXBVcmwpO1xuICAgICAgY29uc29sZS5sb2coJyAgJywgJ3dpZHRoIDonLCB0aGlzLmNvbmZpZy53aWR0aCk7XG4gICAgICBjb25zb2xlLmxvZygnICAnLCAnaGVpZ2h0OicsIHRoaXMuY29uZmlnLmhlaWdodCk7XG4gICAgICBjb25zb2xlLmxvZygnICAnLCAnZnBzICAgOicsIHRoaXMuY29uZmlnLmZwcyk7XG5cbiAgICAgIHRoaXMua2lsbFByb2Nlc3NlcygpO1xuICAgICAgdGhpcy5leGVjdXRlUHJvY2Vzc2VzKHJ0bXBVcmwpO1xuXG4gICAgICBjb25zb2xlLmxvZygnICAnLCAnQ2FtZXJhIHN0YXJ0ZWQgYXQgUElEOicsIHRoaXMucHJvY2Vzcy5waWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnICAnLCAnRXJyb3Igc3RhcnRpbmcgY2FtZXJhOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5raWxsUHJvY2Vzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnU3RvcHBpbmcgY2FtZXJhLi4uJyk7XG4gICAgdGhpcy5raWxsUHJvY2Vzc2VzKCk7XG4gICAgY29uc29sZS5sb2coJ0NhbWVyYSBzdG9wcGVkLi4uJyk7XG4gIH1cblxuICBpc0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnByb2Nlc3M7XG4gIH1cblxuICBwcml2YXRlIGtpbGxQcm9jZXNzZXMoKSB7XG4gICAgaWYgKHRoaXMucHJvY2Vzcykge1xuICAgICAgdGhpcy5wcm9jZXNzLmtpbGwoKTtcbiAgICAgIHRoaXMucHJvY2VzcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5wcm9jZXNzQ2xlYW51cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzQ2xlYW51cCgpIHtcbiAgICAvLyBtYWtpbmcgc3VyZSBubyB6b21iaWUgcHJvY2VzcyBpcyBzdGlsbCBydW5uaW5nXG4gICAgW1xuICAgICAgJ3Jhc3BpdmlkJyxcbiAgICAgICdmZm1wZWcnLFxuICAgIF0ubWFwKChwcm9jZXNzOiBzdHJpbmcpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4ZWMoYHBzIC1lZiB8IGdyZXAgJHtwcm9jZXNzfSB8IGdyZXAgLXYgZ3JlcCB8IGF3ayAne3ByaW50ICQyfScgfCB4YXJncyBraWxsYCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdFcnJvciBraWxsaW5nIHByb2Nlc3MgW2ZmbXBlZ1Byb2Nlc3NdJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGV4ZWN1dGVQcm9jZXNzZXMocnRtcFVybDogc3RyaW5nKSB7XG4gICAgLy8gcHJlcGFyZSBjYW1cbiAgICBleGVjKGB2NGwyLWN0bCAtcCAke3RoaXMuY29uZmlnLmZwc31gKTtcbiAgICBleGVjKGB2NGwyLWN0bCAtLXNldC1jdHJsIHZpZGVvX2JpdHJhdGU9JHt0aGlzLmNvbmZpZy5iaXRyYXRlfWApO1xuICAgIGV4ZWMoYHY0bDItY3RsIC0tc2V0LWZtdC12aWRlbz13aWR0aD0ke3RoaXMuY29uZmlnLndpZHRofSxoZWlnaHQ9JHt0aGlzLmNvbmZpZy5oZWlnaHR9LHBpeGVsZm9ybWF0PUgyNjRgKTtcblxuICAgIC8vIGNvbnN0IGNvbW1hbmQgPSBgcmFzcGl2aWQgLW8gLSAtdCAwIC13ICR7dGhpcy5jb25maWcud2lkdGh9IC1oICR7dGhpcy5jb25maWcuaGVpZ2h0fSAtZnBzICR7dGhpcy5jb25maWcuZnBzfSAtYiAkezE1MDAwMDAwfSAtZyA1MCB8IGZmbXBlZyAtcmUgLWFyIDQ0MTAwIC1hYyAyIC1hY29kZWMgcGNtX3MxNmxlIC1mIHMxNmxlIC10aHJlYWRfcXVldWVfc2l6ZSAxMDI0IC1hYyAyIC1pIC9kZXYvemVybyAtZiBoMjY0IC10aHJlYWRfcXVldWVfc2l6ZSAxMDI0IC1pIC0gLXZjb2RlYyBjb3B5IC1hY29kZWMgYWFjIC1hYiAxMjhrIC1nIDUwIC1zdHJpY3QgZXhwZXJpbWVudGFsIC1mIGZsdiAke3J0bXBVcmx9YDtcbiAgICBjb25zdCBjb21tYW5kID0gYGZmbXBlZyAtcmUgLWFyIDQ0MTAwIC1hYyAyIC1hY29kZWMgcGNtX3MxNmxlIC1mIHMxNmxlIC10aHJlYWRfcXVldWVfc2l6ZSAxMDI0IC1hYyAyIC1pIC9kZXYvemVybyAtZiBoMjY0IC10aHJlYWRfcXVldWVfc2l6ZSAxMDI0IC1pIC9kZXYvdmlkZW8wIC12Y29kZWMgY29weSAtYWNvZGVjIGFhYyAtYWIgMTI4ayAtZyA1MCAtc3RyaWN0IGV4cGVyaW1lbnRhbCAtZiBmbHYgJHtydG1wVXJsfWA7XG4gICAgY29uc29sZS5sb2coJz4gJywgY29tbWFuZCk7XG4gICAgdGhpcy5wcm9jZXNzID0gZXhlYyhjb21tYW5kKTtcblxuICAgIHRoaXMucHJvY2Vzcy5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnICAnLCAnQ2FtZXJhIHByb2Nlc3MgY2xvc2VkLi4uJyk7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICB9KTtcbiAgICB0aGlzLnByb2Nlc3Mub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9jZXNzLnN0ZG91dC5vbignZGF0YScsIChkYXRhOiBhbnkpID0+IGNvbnNvbGUubG9nKCcgICcsIGRhdGEudG9TdHJpbmcoKSkpO1xuICAgIHRoaXMucHJvY2Vzcy5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YTogYW55KSA9PiBjb25zb2xlLmVycm9yKCcgICcsIGRhdGEudG9TdHJpbmcoKSkpO1xuICB9XG59Il19