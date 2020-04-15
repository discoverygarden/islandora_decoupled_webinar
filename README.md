# Islandora Decoupled App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and was made to demonstrate a simple use case integrating Islandora data within Drupal with a front-end JS framework.

## Requirements
* Drupal 8.8+ (JSON:API went into core at this point, was a contrib module before)
* [JSON:API Cross Bundles](https://www.drupal.org/project/jsonapi_cross_bundles)

## Prerequisites
The Drupal install directory will be referred to as `$DRUPAL_INSTALL` from here on (example: `/opt/www/drupal`). Similarly, `$DRUPAL_HOST` will refer to the URL of your Drupal site.

* Enable the JSON:API module:
```
cd $DRUPAL_INSTALL
drush en jsonapi
```
Can verify the module is successfully enabled by navigating to `$DRUPAL_HOST/jsonapi` and should see a nice listing of all the available resources.

* Install JSON:API Cross Bundles via composer:
```
cd $DRUPAL_INSTALL
composer require drupal/jsonapi_cross_bundles
drush en jsonapi_cross_bundles
```
* Enable CORS for your local Drupal:
```
cd $DRUPAL_INSTALL/sites/defalt
cp default.services.yml services.yml
```
By default the `services.yml` file is not used for a Drupal site unless [explicitly specified](https://pantheon.io/docs/services-yml). 

In your favorite text editor enable CORS (will be at the bottom of the `services.yml`):
```
cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders: ['*']
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: ['*']
    # Configure requests allowed from specific origins.
    allowedOrigins: ['*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: false
    # Sets the Access-Control-Max-Age header.
    maxAge: false
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: false
```
The above CORS settings are mainly intended for development purposes only and should *NOT* be used in that state on production. Drupal is specifically allowing all HTTP methods, headers and origins in this configuration. Drupal.org has a section on [CORS config](https://www.drupal.org/node/2715637) and how you may want to tune it.

* Modify the environment variables for the app:
Open the [.env](https://github.com/discoverygarden/islandora_decoupled_webinar/blob/master/.env) file in your favorite text editor and change the below variables to point at your local Drupal.
```
REACT_APP_DRUPAL_URL=http://pathtoyourdrupal.host
REACT_APP_DRUPAL_JSON_API_URL=$REACT_APP_DRUPAL_URL/jsonapi
```
`REACT_APP_DRUPAL_URL` should be equal to what this README is referring to as `$DRUPAL_HOST`.

## Using Postman to test requests

The [Webinar collection](https://github.com/discoverygarden/islandora_decoupled_webinar/blob/master/postman/Islandora%20Webinar.postman_collection.json) examplifies some general read-only requests that can made to JSON:API. This [guide](https://learning.postman.com/docs/postman/collection-runs/working-with-data-files/) explains how to import the collection.

Once imported change the variable for `{{JSON_ENDPOINT}}` to be the the `$DRUPAL_HOST` value specified above.

Right click the `Islandora Webinar` collection and select `Edit`. Navigate to the `Variables` tab and change the `CURRENT VALUE` to be `$DRUPAL_HOST`.

![Postman variable](https://user-images.githubusercontent.com/1337738/79327680-40ee6100-7eeb-11ea-8c09-9e7a2c0719ad.png)

More details on variables can be found [here](https://learning.postman.com/docs/postman/variables-and-environments/variables/).

An example request to Postman:
![Get all collections](https://user-images.githubusercontent.com/1337738/79326993-1bad2300-7eea-11ea-9b70-420236021fba.png)

In the above the base query represents retrieving all Islandora objects. The filters denote  to return only collections and to include the user object (`uid`), the content model (`field_model`) and the parent object `(field_member_of`).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
