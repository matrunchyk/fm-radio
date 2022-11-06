## FM Radio

Provides an ability to play any AM/FM radio station in your browser or any RTMP-supported player, like VLC.

When using browser client, it allows to switch to a station from a predefined list (configured on server side), as well as seeking to any other FM/AM frequency. 

### Prerequisites 

- An SDR dongle on RTL2832 chip, like [rtl-sdr.com](https://www.rtl-sdr.com/) (tested), or HackRF, BladeRF, or any other, compatible with [rtl_fm](https://manpages.org/rtl_fm). 
- Node 16+ installed on your system
- Linux or macOS system
- Installed `ffmpeg` (`brew install ffmpeg` on OSX and `apt install ffmpeg` on Ubuntu/Debian)
- Installed `rtl_fm` binary (`brew install librtlsdr` on OSX and `apt install rtl-sdr` on Ubuntu/Debian)

### Usage

1. Clone the repo:
```shell
git clone https://github.com/matrunchyk/fm-radio
```

2. Install dependencies:
```shell
npm install
```

3. Run server:
```shell
npm run server
```
After this step you can already test the server using RTMP-supported player, like [VLC](https://www.videolan.org/vlc/) by opening a network stream at the following address: `rtp://127.0.0.1:1234`

5. Run client:
```shell
npm run server
```
Now, open your client application in a browser at the http://127.0.0.1:8080/ URL.

Enjoy!


### Predefined stations

To define station names and their frequencies, simply edit `packages/fm-radio-server/src/config/configuration.ts` file and update `stations` property in the following format:

```typescript
stations: {
  88.7: 'Lux FM & Radio Maximum',
  89.8: 'FM Galychyna',
  106.2: 'Hit FM',
},
```
