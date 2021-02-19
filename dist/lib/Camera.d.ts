export interface IStreamConfig {
    width: string;
    height: string;
    fps: string;
    bitrate: string;
}
export default class Camera {
    private process;
    private config;
    constructor();
    start(rtmpUrl: string): void;
    stop(): void;
    isActive(): boolean;
    private killProcesses;
    private processCleanup;
    private executeProcesses;
}
