## FM Radio

Provides an ability to play any AM/FM radio station in your browser or any RTMP-supported player, like VLC.

### Prerequisites 

- An SDR dongle on RTL2832 chip, like [rtl-sdr.com](https://www.rtl-sdr.com/) (tested), or HackRF, BladeRF, or any other, compatible with [rtl_fm](https://manpages.org/rtl_fm). 
- Node 16+ installed on your system

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
