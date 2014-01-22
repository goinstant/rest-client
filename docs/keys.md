[Back to Table of Contents](/#client)

# keys

### #get

Get the value of a single key

```js
/**
 * @param {options} object
 * @param {options.app_id} id of the app
 * @param {options.room_id} id of the room
 * @param {options.key} string the key name
 */

var opts = {
  app_id: 1,
  room_id: 3,
  key: 'mykey'
};

client.keys.get(opts, function(err, value) { });
```

### #update

Update the value of a key

```js
/**
 * @param {options} object
 * @param {options.app_id} id of the app
 * @param {options.room_id} id of the room
 * @param {options.key} string the key name
 * @param {options.value} value of the key
 * @param {options.create_room} if true creates specified room if it doesn't exist (Optional)
 * @param {options.options} https://developers.goinstant.com/v1/javascript_api/key/set.html
 */

var opts = {
  app_id: 1,
  room_id: 3,
  key: 'mykey',
  value: 'myval',
  create_room: true,
  options: {
    cascade: 'otherkey', expire: 10000
  }
};

client.keys.update(opts, function(err, value) { });
```

### #remove

Remove the value of a key

```js
/**
 * @param {options} object
 * @param {options.app_id} id of the app
 * @param {options.room_id} id of the room
 * @param {options.key} string the key name
 */

var opts = {
  app_id: 1,
  room_id: 3,
  key: 'mykey',
};

client.keys.remove(opts, function(err, value) { });
```
