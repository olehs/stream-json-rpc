/// <reference types="node" />
import { Duplex } from 'stream';
export declare class ElectronIpcMainDuplex extends Duplex {
    webContents: Electron.WebContents;
    wcId: number;
    channel: string;
    constructor(webContents: Electron.WebContents, channel?: string);
    _write(chunk: Buffer, _encoding: any, callback: Function): void;
    _read(_size: any): void;
}
export declare class ElectronIpcRendererDuplex extends Duplex {
    wcId: number;
    sendTo: (channel: string, ...args: any[]) => void;
    channel: string;
    constructor(webContentsId?: number, channel?: string);
    _write(chunk: Buffer, _encoding: any, callback: Function): void;
    _read(_size: any): void;
}
export declare const firstConnectionHandler: (callback: (socket: Duplex) => void, channel?: string | undefined) => void;
