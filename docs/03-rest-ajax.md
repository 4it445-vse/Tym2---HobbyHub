# 3rd Practical Class: Getting Started with LoopBack on Local Machine

## Install on Local Machine

```bash
npm install -g strongloop
```

## Generate New Project

```bash
slc loopback
```

Answers:
  - What's the name of your application? `backend`
  - Enter name of the directory to contain the project: `backend`
  - Which version of LoopBack would you like to use? `3.x`
  - What kind of application do you have in mind? `api-server`

```
cd backend
npm install --save loopback@3.0.0
```

Open `backend/server/config.json` and change `port` value to `3001`.

## Run

Run `npm run watch` or `npm start`.
Open [localhost:3001/explorer/](http://localhost:3001/explorer/).

# Create LoopBack Model

```bash
slc loopback:model
```

Answers:
- Enter the model name: `EshopProduct`
- Select the data-source to attach EshopProduct to: `db (memory)`
- Select model's base class `PersistedModel`
- Expose EshopProduct via the REST API? `Y`
- Custom plural form (used to build REST URL): `products`
- Common model or server only? `common`
- **add fileds:**
  - Property name: `title`
  - Property type: `string`
  - Required? `Y`
  - Property name: `price`
  - Property type: `number`
  - Required? `N`
  - Property name: `shortInfo`
  - Property type: `string`
  - Required? `N`

# Express.js

```javascript
app.get('/hello', function(request, response) {
  const data = {
    hello: request.query.name || 'world',
    version: '0.4.2',
    time: new Date(),
    moreItems: [1, 2, { four: 4 }],
  };

  response.header({ 'Content-Type': 'application/json' });
  response.send(JSON.stringify(data));
});
```

# AJAX

## Install

```bash
cd frontend
npm install --save axios
```

## Run

```javascript
import axios from 'axios';

...

class ... extends Component {

  ...

  componentDidMount() {
    axios
      .get('http://dev.backend.USERNAME.vse.handson.pro/hello')
      .then(response => {
        console.log('response', response);
        this.setState({
          time: response.data.time,
        });
      });
  }
```

# Watch Backend Logs

```bash
tail -F log/app.log
# <^C> to end it

# OR

less +F --follow-name log/app.log
# <^C><Q> to end it
```

# Firefox Plugins
- [JSONView](https://addons.mozilla.org/en-us/firefox/addon/jsonview/)

# Used NPM Packages

- [express](http://expressjs.com/)
  - [Hello world example](http://expressjs.com/en/starter/hello-world.html)
- [loopback](http://loopback.io/)
  - [Getting started guide](https://docs.strongloop.com/display/public/LB/Getting+started+with+LoopBack)
  - [Docs](https://docs.strongloop.com/display/public/LB/LoopBack)
- [log4js](https://github.com/nomiddlename/log4js-node)
  - app logs to `log/app.log`
