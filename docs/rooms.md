[Back to Table of Contents](/#client)

# rooms

[Rooms](https://teams.goinstant.com/v1/rest-client/rooms) allows you to access statistics about, and create new rooms for your applications.

## Parameters

An application may be identified by its ID or its name (app_id, app_name).

A room must be identified with the same identifier type as the application specified (room_id, room_name).

## Methods

### create

```js
client.apps(:app).rooms().create(params, callback(err, body, callback))
```

### get

Retrieve a specific room's statistics.

```js
client.apps(:app).rooms(:room).get(callback(err, body, response))
```

Retrieve all rooms.

```js
client.apps(:app).rooms().get(options, callback(err, body, response))
```

Params: name

Options: sort, direction, pageSize, pageNumber

### users

```js
client.apps(:app).rooms(:room).users().get(options, callback(err, body, response))
```

Options: sort, direction, pageSize, pageNumber