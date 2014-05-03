[Back to Table of Contents](/#client)

# authSettings

[Auth Settings](https://developers.goinstant.com/v1/rest-api/apps/auth-settings.html) controls how your applications integrate with the [GoInstant Authentication API](https://developers.goinstant.com/v1/security_and_auth/guides/auth_api.md).

## Parameters

An application may be identified by its ID or its name.

## Methods

### get

Retrieve auth settings for an applications.

```js
client.apps(:app).authSettings().get(callback(err, body, response))
```

### update

Update auth settings for an application.

```js
client.apps(:app).authSettings().update(options, callback(err, body, response))
```

Options: See API documentation

### set

Replace auth settings for an application.

```js
client.apps(:app).authSettings().set(options, callback(err, body, response))
```

Options: See API documentation