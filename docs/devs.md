[Back to Table of Contents](/#client)

# devs

[Developers](https://developers.goinstant.com/v1/rest-client/devs) (Devs) are user accounts that can manage applications and settings for your account.

### #all

Get all developers


**Accepted options:** sort, direction, pageSize, pageNumber

```js
/**
 * @param {object} opts
 * @param {function} callback
 */

// Options object is optional
client.devs.all(function(err, developers, res) { });

// Sort options
client.devs.all({
  sort: 'display_name',
  direction: 'desc'
}, function(err, developers, res) { });
```

```json
[
  {
    "id": 1,
    "account_id": 1,
    "email": "johnsmith@email.com",
    "first_name": "John",
    "last_name": "Smith",
    "display_name": "John Smith",
    "created": "1979-01-01 00:00:01-00"
  }
]
```


### #get

Get a single developer by their ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.devs.get(1, function(err, developer, res) { });
```

```json
{
  "id": 1,
  "account_id": 1,
  "email": "johnsmith@email.com",
  "first_name": "John",
  "last_name": "Smith",
  "display_name": "John Smith",
  "created": "1979-01-01 00:00:01-00"
}
```

### #create

Create a new developer

```js
/**
 * @param {object} developer
 * @param {function} callback
 */

client.devs.create({
  email: 'johnsmith@email.com',
  password: 'TheirP@55wordHere',
  first_name: 'John',
  last_name: 'Smith'
}, function(err, developer, res) { });
```

```json
{
  "id": 1,
  "account_id": 1,
  "email": "johnsmith@email.com",
  "first_name": "John",
  "last_name": "Smith",
  "display_name": "John Smith",
  "created": "1979-01-01 00:00:01-00"
}
```

### #update

Update a single developer by their ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.devs.update(id, {
  display_name: 'Jack Frost',
}, function(err, developer, res) { });
```

```json
{
  "id": 1,
  "account_id": 1,
  "email": "johnsmith@email.com",
  "first_name": "John",
  "last_name": "Smith",
  "display_name": "Jack Frost",
  "created": "1979-01-01 00:00:01-00"
}
```

### #remove

Remove a single developer by their ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.devs.remove(id, function(err, res) { });
```
