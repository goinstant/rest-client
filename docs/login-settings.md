[Back to Table of Contents](/#client)

# loginSettings

[Login Settings](https://developers.goinstant.com/v1/rest-api/login-settings.html)
control how your applications integrate with
[GoInstant Login](https://developers.goinstant.com/v1/security_and_auth/guides/login.md).

- [get](#get) retrieves settings
- [update](#update) patches a sub-set of your settings
- [set](#set) changes all settings at once

### #get

Get the Login settings for a particular App.

```js
/**
 * @param {int} appId
 * @param {function} callback
 */

client.apps.loginSettings.get(myAppId, function(err, settings, res) {
});
```

Then `settings` will be:

```js
{
  "global": { /* global settings */ },
  "github": { /* GitHub settings */ },
  /* ... other providers here ... */
}
```

### #update

Patch and return the updated Login settings for a particular App.

Passing `null` for any value will remove the present value (if any) from the
stored settings.  Note that no settings have `null` as a valid value.

```js
/**
 * @param {int} appId
 * @param {object} changes
 * @param {function} callback
 */

var changes = {
  github: {
    enabled: true,
    client_id: "MY_CLIENT_ID",
    client_secret: "MY_CLIENT_SECRET"
  },
  twitter: null // remove Twitter settings
};

client.apps.loginSettings.update(myAppId, changes, function(err, settings, res) {
});
```

Assuming your changes applied to the currently stored settings result in a
valid settings object, `settings` will be:

```js
{
  "global": { /* UNCHANGED global settings */ },
  "github": {
    /* UPDATED GitHub settings */
    "enabled": true,
    client_id: "MY_CLIENT_ID",
    client_secret: "MY_CLIENT_SECRET"
  },
  /* ... other UNCHANGED providers here ... */
}
```

### #set

Replace the existing Login settings for a particular App.

```js
/**
 * @param {int} appId
 * @param {object} changes
 * @param {function} callback
 */

var newSettings = {
  global: { /* ... */ },
  github: {
    enabled: true,
    client_id: "MY_CLIENT_ID",
    client_secret: "MY_CLIENT_SECRET"
  }
};

client.apps.loginSettings.set(myAppId, newSettings, function(err, settings, res) {
});
```

The `settings` parameter will then look like exactly your `newSettings`
(assuming it was a valid settings object):

```json
{
  "global": { /* ... */ },
  "github": {
    "enabled": true,
    "client_id": "MY_CLIENT_ID",
    "client_secret": "MY_CLIENT_SECRET"
  }
}
```
