[Back to Table of Contents](/#client)

# apps

[Apps](https://developers.goinstant.com/v1/rest-api/apps.html) are your GoInstant Applications.

## Parameters

An application must be identified by its ID.

## Methods

### get

Retrieve an application.

```js
client.apps(:id).get(callback(err, body, response))
```

Retrieve all applications.

```js
client.apps().get([options,] callback(err, body, response))
```

Options: sort, direction, pageSize, pageNumber

### create

Create an application.

```js
client.apps().create(options, callback(err, body, response))
```

Options: name, acl

### update

Update an application.

```js
client.apps(:id).update(options, callback(err, body, response))
```

Options: name, acl

### remove

Remove an application.

```js
client.apps(:id).remove(callback(err, body, response))
```