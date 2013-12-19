[Back to Table of Contents](/#client)

# channels

### #message

Sends a message across the channel

```js
/**
 * @param {options} object
 * @param {options.app_id} id of the app
 * @param {options.room_id} id of the room
 * @param {options.channel} string the channel name
 * @param {options.value} value of the message
 * @param {options.options} https://developers.goinstant.com/v1/javascript_api/key/set.html
 */

var opts = {
  app_id: 1,
  room_id: 3,
  channel: 'mychannel',
  value: 'myval',
  options: {
    cascade: 'otherkey', expire: 10000
  }
};

client.channels.message(opts, function(err, value) { });
```
