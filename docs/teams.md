[Back to Table of Contents](/#client)

# teams

[teams](https://teams.goinstant.com/v1/rest-client/teams) are groups for developers with a specific set of permissions.

### #all

Get all teams


**Accepted options:** sort, direction, pageSize, pageNumber

```js
/**
 * @param {object} opts
 * @param {function} callback
 */

// Options object is optional
client.teams.all(function(err, teams, res) { });

// Sort options
client.teams.all({
  sort: 'name',
  direction: 'desc'
}, function(err, teams, res) { });
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

client.teams.get(1, function(err, team, res) { });
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

Create a new team. Full permissions schema available in the [Teams documentation](https://developers.goinstant.com/v1/rest-client/teams).

```js
/**
 * @param {object} team
 * @param {function} callback
 */

client.teams.create({
  name: "Applications",
  description: "This team can only manage applications",
  permissions: {
    apps: {
      read: true,
      write: true,
      del: true
    }
  }
}, function(err, team, res) { });
```

```json
{
  "id": 1,
  "name": "Applications",
  "description": "This team can only manage applications",
  "permissions": {
    "apps": {
      "read": true,
      "write": true,
      "del": true
    },
    "devs": {
      "read": false,
      "write": false,
      "del": false
    },
    "rooms": {
      "read": false,
      "write": false,
      "del": false
    },
    "settings": {
      "read": false,
      "write": false,
      "del": false
    },
    "teams": {
      "read": false,
      "write": false,
      "del": false
    },
    "tokens": {
      "read": false,
      "write": false,
      "del": false
    }
  }
}
```

### #update

Update a single app by their ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.teams.update(id, {
  name: "Applications and Devs",
  description: "This team can manage both Apps and Devs"
  permissions: {
    apps: {
      read: true,
      write: true,
      del: true
    },
    devs: {
      read: true,
      write: true,
      del: true
    },
    rooms: {
      read: false,
      write: false,
      del: false
    },
    settings: {
      read: false,
      write: false,
      del: false
    },
    teams: {
      read: false,
      write: false,
      del: false
    },
    tokens: {
      read: false,
      write: false,
      del: false
    }
  }
}, function(err, team, res) { });
```

```json
{
  "id": 1,
  "name": "Applications and Devs",
  "description": "This team can manage both Apps and Devs",
  "permissions": {
    "apps": {
      "read": true,
      "write": true,
      "del": true
    },
    "devs": {
      "read": true,
      "write": true,
      "del": true
    },
    "rooms": {
      "read": false,
      "write": false,
      "del": false
    },
    "settings": {
      "read": false,
      "write": false,
      "del": false
    },
    "teams": {
      "read": false,
      "write": false,
      "del": false
    },
    "tokens": {
      "read": false,
      "write": false,
      "del": false
    }
  }
}
```

### #remove

Remove a single team by its ID

```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.teams.remove(id, function(err, res) { });
```

### Developers

Manage the developers who are a part of each team.

#### #all

List developers who are a member of a particular team


```js
/**
 * @param {integer} id
 * @param {function} callback
 */

client.teams.devs.all(1, function(err, devs, res) { });
```

#### #add

Add a developer to a specific team by their ID


```js
/**
 * @param {integer} id
 * @param {object} opts
 * @param {function} callback
 */

client.teams.devs.add(1, {
  developer_id: 2
}, function(err, team, res) { });
```

### #remove

Remove a developer from a specific team by their ID


```js
/**
 * @param {integer} id
 * @param {object} opts
 * @param {function} callback
 */

client.teams.devs.remove(1, {
  developer_id: 2
}, function(err, team, res) { });
```
