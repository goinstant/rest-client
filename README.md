REST API Client
===========

A Node.JS module which provides an interface to all routes supported by the v1 GoInstant REST API

### API Documentation

Documentation for the GoInstant REST API is available at [https://developers.goinstant.com/v1/rest-client](https://developers.goinstant.com/v1/rest-client)

### Client Example

Simply pass your credentials to the constructor and the module handles the REST (Pun intended).

```js
var GoInstant = require('goinstant-rest').v1;

var client = new GoInstant({
  client_id: 'YOUR CLIENT ID HERE',
  client_secret: 'YOUR CLIENT SECRET HERE'
});
```

### Authentication

Your set of credentials, the ``client_id`` and ``client_secret``, allow the client to generate access tokens for use with authenticated requests. Currently every route on the GoInstant REST API requires authentication.

##### Obtaining Credentials

Credentials can be generated through your GoInstant dashboard via [https://goinstant.com/dashboard/credentials](https://goinstant.com/dashboard/credentials)

-------------------------------------------------------

# Client

- [Developers](docs/devs.md#devs)
  - [all](docs/devs.md#all)
  - [get](docs/devs.md#get)
  - [create](docs/devs.md#create)
  - [update](docs/devs.md#update)
  - [remove](docs/devs.md#remove)
- [Applications](docs/apps.md#apps)
  - [all](docs/apps.md#all)
  - [get](docs/apps.md#get)
  - [create](docs/apps.md#create)
  - [update](docs/apps.md#update)
  - [remove](docs/apps.md#remove)
- [Teams](docs/teams.md#teams)
  - [all](docs/teams.md#all)
  - [get](docs/teams.md#get)
  - [create](docs/teams.md#create)
  - [update](docs/teams.md#update)
  - [remove](docs/teams.md#remove)
  - [Developers](docs/teams.md#devs)
    - [all](docs/teams.md#all-1)
    - [add](docs/teams.md#add)
    - [remove](docs/teams.md#remove-1)
- [Rooms](docs/rooms.md#rooms)
  - [all](docs/rooms.md#all)
  - [get](docs/rooms.md#get)
  - [users](docs/rooms.md#users)
- [Keys](docs/keys.md#keys)
  - [get](docs/keys.md#get)
  - [update](docs/keys.md#update)
  - [remove](docs/keys.md#remove)
