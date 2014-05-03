[Back to Table of Contents](/#client)

# devs

[Developers](https://developers.goinstant.com/v1/rest-client/devs) (Devs) are user accounts that can manage applications and settings for your account.

## Parameters

A developer must be identified by their ID.

## Methods

### get

Retrieve a developer.

```js
client.devs(:id).get(callback(err, body, response))
```

Retrieve all developers.

```js
client.devs().get([options,] callback(err, body, response))
```

Options: sort, direction, pageSize, pageNumber

### update

Update a single developer.

```js
client.devs(:id).update(options, callback(err, body, response))
```

Options: email, display_name, first_name, last_name

### create

Create a new developer.

```js
client.devs().create(params, callback(err, body, response))
```

Params: email, display_name, first_name, last_name

### remove

Remove a single developer.

```js
client.devs(:id).remove(callback(err, body, response))
```