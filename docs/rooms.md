[Back to Table of Contents](/#client)

# rooms

[rooms](https://teams.goinstant.com/v1/rest-client/rooms) is the route to access statistics about your applications.

### #all

Get all rooms

```js
/**
 * @param {object} opts
 * @param {function} callback
 */

client.apps.rooms.all({
  app_id: 2
}, function(err, rooms, res) { });
```

```json
[
  {
    "id": 1,
    "app_id": 2,
    "name": "Sample Room",
    "created_at": "1979-01-01 00:00:01-00",
    "destroyed_at": "1979-01-01 00:10:01-00",
    "users": 4
  }
]
```


### #get

Get a single room by its ID.

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.apps.rooms.get(1, {
  app_id: 2
}, function(err, rooms, res) { });
```

```json
{
  "id": 1,
  "app_id": 2,
  "name": "Sample Room",
  "created_at": "1979-01-01 00:00:01-00",
  "destroyed_at": "1979-01-01 00:10:01-00",
  "users": 4
}
```

### #users

Retrieve all users logged for a particular room.

```js
/**
 * @param {object} team
 * @param {function} callback
 */

client.apps.rooms.users(1, {
  app_id: 2
}, function(err, users, res) { });
```

```json
[
  {
    "id": 53,
    "room_id": 1,
    "session_id": "JF5xKPfK0ImFAKEBAAAl",
    "display_name": "Guest",
    "referer": "https://example.com/my-app",
    "joined_at": "1979-01-01 00:00:01-00",
    "left_at": "1979-01-01 00:10:01-00"
  }
]
```
