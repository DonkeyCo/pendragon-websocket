# pendragon - Server

## Introduction

This is the server application for **pendragon** to enable online-usage of the D&D-Management application **pendragon**.

**pendragon** uses a WebSocket server to enable communication between different clients. This document will describe how to setup and use the server to be able to use online-functionalities of **pendragon**.

## Prerequisites

The following prerequisites have to be met:
* most recent [NodeJS](https://nodejs.org/en/) version
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


## Setup

Follow the following steps to setup the WebSocket server for running:

1. Install modules via NPM.
```
npm install .
```
2. Run the application.
```
npm run start
```

Following these simple two steps will start the WebSocket server. Now the WebSocket server is ready to use for **pendragon** Clients.