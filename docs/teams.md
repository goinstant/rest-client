[Back to Table of Contents](/#client)

# teams

[Teams](https://teams.goinstant.com/v1/rest-client/teams) are groups for developers with a specific set of permissions.

## Parameters

A team must be identified by its ID.

## Methods

### get

Retrieve a single team.

```js
client.teams().get(callback(err, body, response))
```

Retrieve all teams.

```js
client.teams(:id).get(options, callback(err, body, response))
```

Options: sort, direction, pageSize, pageNumber

### create

Create a new team.

```js
client.teams().create(params, callback(err, body, response))
```

Params: name, description, permissions

### update

Update a team.

```js
client.teams(:id).create(options, callback(err, body, response))
```

Options: name, description, permissions

### remove

Remove a team.

```js
client.teams(:id).remove(callback(err, body, response))
```

# developers

Developers are members of teams.

## Parameters

A team must be identified by its ID.

A developer must be identified by its ID.

## Methods

### get

Retrieve a list of team members.

```js
client.teams(:id).devs().get(callback(err, body, response))
```

### add

Add a developer to a team.

```js
client.teams(:id).devs().add(params, callback(err, body, response))
```

Params: developer

### remove

Remove a developer from a team.

```js
client.teams(:id).devs(:id).remove(callback(err, body, response))
```