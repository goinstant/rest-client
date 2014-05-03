[Back to Table of Contents](/#client)

# keys

[Keys](https://developers.goinstant.com/v1/rest-api/keys.html) are the data stored in your application within GoInstant.

## Parameters

An application may be identified by its ID or its name (app_id, app_name).

A room must be identified with the same identifier type as the application specified (room_id, room_name).

## Methods

### get

Get a key's value.

```js
client.keys(:key, params).get(callback(err, body, response))
```

### update

Update a key's value.

```js
client.keys(:key, params).update(value, callback(err, body, response))
```

Params: app (app_id, app_name), room (room_id, room_name)

### remove

Remove a key.

```js
client.keys(:key, params).remove(callback(err, body, response))
```