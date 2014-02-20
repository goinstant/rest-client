[Back to Table of Contents](/#client)

# apps

[Apps](https://developers.goinstant.com/v1/rest-api/apps.html) are your GoInstant Applications.

### #all

Get all apps

**Accepted options:** sort, direction, pageSize, pageNumber

```js
/**
 * @param {object} opts
 * @param {function} callback
 */

// Options object is optional
client.apps.all(function(err, apps, res) { });

// Sort options
client.apps.all({
  sort: 'name',
  direction: 'desc'
}, function(err, apps, res) { });
```

```json
[
  {
    "id": 1,
    "account_id": 1,
    "name": "My First Application"
    "created": "1979-01-01 00:00:01-00"
  }
]
```

### #get

Get a single app by its ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.apps.get(1, function(err, app, res) { });
```

```json
{
  "id": 1,
  "account_id": 1,
  "name": "My First Application",
  "created": "1979-01-01 00:00:01-00"
}
```

### #create

Create a new app

```js
/**
 * @param {object} app
 * @param {function} callback
 */

client.apps.create({
  name: "My First Application"
}, function(err, app, res) { });
```

```json
{
  "id": 1,
  "account_id": 1,
  "name": "My First Application",
  "created": "1979-01-01 00:00:01-00"
}
```

### #update

Update a single app by their ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.apps.update(id, {
  name: 'Hello World',
}, function(err, app, res) { });
```

```json
{
  "id": 1,
  "account_id": 1,
  "name": "Hello World",
  "created": "1979-01-01 00:00:01-00"
}
```

### #remove

Remove a single app by its ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.apps.remove(id, function(err, res) { });

```
