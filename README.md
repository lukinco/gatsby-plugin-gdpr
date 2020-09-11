# gatsby-plugin-gdpr

Gatsby plugin to add google tag manager GDPR form to your site using idb-keyval.

Inspiration:

[gatsby-plugin-gdpr-cookies](https://github.com/andrezimpel/gatsby-plugin-gdpr-cookies)

[gatsby-plugin-gdpr-tracking](https://github.com/andreas-straub/gatsby-plugin-gdpr-tracking)

## Install

With npm:

`npm install --save gatsby-plugin-gdpr`

With yarn:

`yarn add gatsby-plugin-gdpr`

## How to use

```javascript
// in your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-gdpr`,
      options: {
        googleTagManager: {
          trackingId: 'YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID',
          auth: 'YOUR_GOOGLE_TAG_MANAGER_AUTH_TOKEN',
          keyName: 'KEY_OF_IDB_KEYVAL',
          routeChangeEventName: 'gatsby-route-change', // Tag Manager event to track gatsby route change (read below)
          triggerEventName: 'acceptCookies' //Global event name to initilize GTM
        },
        // defines the environments where the tracking should be available
        environments: ['production', 'development']
      },
    },
  ],
}
```

#### Tracking routes

This plugin will fire a new event that you need to give a name in `routeChangeEventName` option on Gatsby's `onRouteUpdate` (only if the consent was given by a visitor). To record this in Google Tag Manager, we will need to add a trigger to the desired tag to listen for the event:

In order to do that, go to _Tags_. Under _Triggering_ click the pencil icon, then the ”+” button to add a new trigger. In the _Choose a trigger_ window, click on the ”+” button again. Choose the trigger type by clicking the pencil button and clicking _Custom event_. For event name, enter the name you've created. This tag will now catch every route change in Gatsby, and you can add Google tag services as you wish to it.