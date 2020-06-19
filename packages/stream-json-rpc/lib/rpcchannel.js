"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pump = require("pump");
const peer_1 = require("./peer");
const multiplex = require('multiplex');
const eos = require('end-of-stream');
function rpcchannel(duplex, options = {}) {
    const plex = multiplex();
    pump(plex, duplex, plex);
    return {
        peer(linkId, peerOptions = {}) {
            const peer = new peer_1.default(Object.assign({}, options, peerOptions));
            const peerWrapper = plex.createSharedStream(linkId);
            pump(peer, peerWrapper, peer);
            eos(peerWrapper, () => {
                peer.destroy();
            });
            peerWrapper.on('warn', (e) => {
                peer.destroy();
                peer.emit('error', e);
            });
            return peer;
        },
    };
}
exports.default = rpcchannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ycGNjaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBRTdCLGlDQUE2QjtBQUc3QixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXJDLFNBQXdCLFVBQVUsQ0FBQyxNQUFjLEVBQUUsVUFBNkIsRUFBRTtJQUNoRixNQUFNLElBQUksR0FBRyxTQUFTLEVBQUUsQ0FBQztJQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV6QixPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQWMsRUFBRSxjQUFpQyxFQUFFO1lBQ3RELE1BQU0sSUFBSSxHQUFHLElBQUksY0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QixHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFwQkQsNkJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcHVtcCBmcm9tICdwdW1wJztcclxuaW1wb3J0IHsgRHVwbGV4IH0gZnJvbSAnc3RyZWFtJztcclxuaW1wb3J0IFJQQ1BlZXIgZnJvbSAnLi9wZWVyJztcclxuaW1wb3J0IHsgUlBDQ2hhbm5lbCwgUlBDQ2hhbm5lbE9wdGlvbnMsIFJQQ0NoYW5uZWxQZWVyIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5jb25zdCBtdWx0aXBsZXggPSByZXF1aXJlKCdtdWx0aXBsZXgnKTtcclxuY29uc3QgZW9zID0gcmVxdWlyZSgnZW5kLW9mLXN0cmVhbScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnBjY2hhbm5lbChkdXBsZXg6IER1cGxleCwgb3B0aW9uczogUlBDQ2hhbm5lbE9wdGlvbnMgPSB7fSk6IFJQQ0NoYW5uZWwge1xyXG4gIGNvbnN0IHBsZXggPSBtdWx0aXBsZXgoKTtcclxuICBwdW1wKHBsZXgsIGR1cGxleCwgcGxleCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwZWVyKGxpbmtJZDogc3RyaW5nLCBwZWVyT3B0aW9uczogUlBDQ2hhbm5lbE9wdGlvbnMgPSB7fSk6IFJQQ0NoYW5uZWxQZWVyIHtcclxuICAgICAgY29uc3QgcGVlciA9IG5ldyBSUENQZWVyKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHBlZXJPcHRpb25zKSk7XHJcbiAgICAgIGNvbnN0IHBlZXJXcmFwcGVyID0gcGxleC5jcmVhdGVTaGFyZWRTdHJlYW0obGlua0lkKTtcclxuICAgICAgcHVtcChwZWVyLCBwZWVyV3JhcHBlciwgcGVlcik7XHJcbiAgICAgIGVvcyhwZWVyV3JhcHBlciwgKCkgPT4ge1xyXG4gICAgICAgIHBlZXIuZGVzdHJveSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgcGVlcldyYXBwZXIub24oJ3dhcm4nLCAoZTogRXJyb3IpID0+IHtcclxuICAgICAgICBwZWVyLmRlc3Ryb3koKTtcclxuICAgICAgICBwZWVyLmVtaXQoJ2Vycm9yJywgZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHBlZXI7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIl19