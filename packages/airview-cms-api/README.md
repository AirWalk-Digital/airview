# Airview CMS API

Airview CMS API provides a reusable library for the backend components of the Airview CMS.

## Overview

Airview CMS is backed by an api which communicates using json via http. The api is responsible for proxying request to a git backend, mapping/transforming data, and caching assets to 'local' storage to avoid repeated requests to the git backend for the same data or repeated
computation for data which has been previously prepared. 'local' here means local to the stack, you may wish to use something like AWS S3 if wiring this up in lambda.

The scope of this package it to allow a consumer to wrap their api around reusable backend logic. The package does not implement any generation of api responses/response codes or marshalling of request/responses to json, etc. It is business logic, interaction with git and caching of data.

The consumer must implement the http side themselves but need to ensure it maps to what the cms is expecting. The reason for this is that the package may need to be hosted on a variety of cloud and local environments, each with their own way of doing things. Because of this we provide a reference example using express.js of what methods be implemented, and the consumer should wire this up to api framework of thier own choosing. You may also wish to just use the example directly and host using express.js

[Example Implementation](/apps/airview-api-demo/src/index.ts)

# Documentation

Code is documented inline using tsdoc and auto generated into markdown format using typdoc.

The generated documentation is in [docs](docs)
