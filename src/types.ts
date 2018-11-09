import { Subscription } from 'rxjs';

export interface IPCChannelPublic {
  remoteCall: <T>(remoteId: string, eventName: string, args: any[], t?: number) => Promise<T | undefined>,
  initializeHandler: <T, R>(handler: IPCRequestHandler<T, R>) => Subscription,
}

export interface IPCChannelListener {
  on: (eventName: string, callback: (...args: any[]) => void) => void,
  removeListener: (eventName: string, callback: (...args: any[]) => void) => void,
}

export interface IPCChannelEmitter {
  send: (eventName: string, ...args: any[]) => void,
}

export interface IPCChannel extends IPCChannelListener {
  send(id: string): IPCChannelEmitter['send'],
}

export interface IPCRequest<R> {
  id: string,
  senderId: string,
  channel: string,
  args: R,
}

export interface IPCResponse<T> {
  id: string,
  senderId: string,
  result?: T,
  error?: {
    message: string,
    stack: string,
  },
}

export interface IPCRequestHandler<T, R> {
  (request: IPCRequest<T>): Promise<R>,
}
