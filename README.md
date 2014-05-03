REST API Client
===========

A Node.JS module which provides an interface to all routes supported by the v1 GoInstant REST API

### API Documentation

Documentation for the GoInstant REST API is available at [https://developers.goinstant.com/v1/rest-api](https://developers.goinstant.com/v1/rest-api)

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
- [Applications](docs/apps.md#apps)
    - [Auth Settings](docs/auth-settings.md#authsettings)
- [Teams](docs/teams.md#teams)
  - [Developers](docs/teams.md#devs)
- [Rooms](docs/rooms.md#rooms)
  - [Users](docs/rooms.md#users)
- [Keys](docs/keys.md#keys)
- [Channels](docs/channels.md#channels)
