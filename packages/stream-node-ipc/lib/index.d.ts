/// <reference types="node" />
import { Socket } from 'net';
import { Duplex } from 'stream';
import { Client, Server } from './types';
export declare class NodeIpcServerDuplex extends Duplex {
    ipcClient: Server;
    socket: Socket;
    constructor(ipcClient: Server, socket: Socket);
    _write(chunk: any, _encoding: any, callback: any): void;
    _read(_size: any): void;
}
export declare class NodeIpcClientDuplex extends Duplex {
    ipcClient: Client;
    constructor(ipcClient: Client);
    _write(chunk: any, _encoding: any, callback: any): void;
    _read(_size: any): void;
}
export declare const getClient: (appspace: string, id?: string, options?: object) => Client;
export declare const getServer: (appspace: string, options?: object) => Server;
export declare const firstConnectionHandler: (ipcServer: Server, callback: (socket: NodeIpcServerDuplex) => void) => Server;
