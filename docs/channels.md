[Back to Table of Contents](/#client)

# channels

[Channels](https://developers.goinstant.com/v1/rest-api/channels.html) are a full-duplex messaging interface for your application within GoInstant.

## Parameters

An application may be identified by its ID or its name (app_id, app_name).

A room must be identified with the same identifier type as the application specified (room_id, room_name).

## Methods

### #message

Sends a message across the channel.

```js
client.channels(:channel, params).message(value, callback(err, body, response))
```

Params: app (app_id, app_name), room (room_id, room_name)