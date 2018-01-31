# sonophage/configuration
### [`sonophage.config.json`](../sonophage.config.json)

```
{
  "pixy": {
    "address": "/dev/cu.usbmodem1421", # serial port to connect to
    "width": 320,                      # width of the pixy image
    "height": 200                      # height of the pixy image
  },

  "sound_udp": {
    "local": "0.0.0.0",                # local IP for the UDP server. This should be "0.0.0.0"
    "remote": "127.0.0.1",             # remote IP to connect to
    "port": 2222,                      # remote port to connect to
    "reconnection": {
      "delay": 10000,                  # delay between to reconnection attempts when connection lost
      "attempts": 30                   # number of max reconnection attempts
    },
    "floatDecimals": 3                 # number of float decimals for `OSC float` message
  }
}
```

<sup>Note: `sound_udp.local` [should always be `0.0.0.0`](https://github.com/colinbdclark/osc.js/issues/83#issuecomment-290567155).</sup>
