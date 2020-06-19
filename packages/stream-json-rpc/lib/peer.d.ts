import Peer, { JsonRpcParamsSchema } from '@magne4000/json-rpc-peer';
import { RPCChannelOptions, RPCChannelPeer } from './types';
declare type RequestHandler = {
    timeout: number;
    handler: (params: any) => any;
};
declare type NotificationHandler = (params: any) => void;
export default class RPCPeer extends Peer implements RPCChannelPeer {
    closed: boolean;
    id: string;
    protected requestHandlers: Map<string, RequestHandler>;
    protected notificationHandlers: Map<string, NotificationHandler>;
    protected defaultTimeout: number;
    constructor(options?: RPCChannelOptions);
    setRequestHandler(method: string, handler: (params: any) => any, timeout?: number): () => void;
    setNotificationHandler(method: string, handler: (params: any) => void): () => void;
    request(method: string, params?: JsonRpcParamsSchema): Promise<any>;
    destroy(error?: Error): void;
}
export {};
