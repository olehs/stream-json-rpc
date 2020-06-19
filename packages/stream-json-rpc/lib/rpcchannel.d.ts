/// <reference types="node" />
import { Duplex } from 'stream';
import { RPCChannel, RPCChannelOptions } from './types';
export default function rpcchannel(duplex: Duplex, options?: RPCChannelOptions): RPCChannel;
