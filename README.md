# now-server-secrets-express

This project includes an express server that uses now secrets. It has some simple routes and gets enviroment values using now secrets. The app uses the `@now/node-server` builder to contain all the routes in one single Lambda (λ).

**add now [secrets](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/):**

```
now secret add test-one "ONE"
now secret add test-two "TWO"
now secret add test-three "THREE"

```

**upload your app to now:**

```
# make sure you have now installed
npm install -g now

# upload app
now
```

**now.json:**

```
{
  "version": 2,
  "env": {
    "ENV_ONE": "@test-one",
    "ENV_TWO": "@test-two",
    "ENV_THREE": "@test-three"
  },
  "build": {
    "env": {
      "ENV_ONE":"@test-one",
      "ENV_TWO":"@test-two",
      "ENV_THREE":"@test-three"
    }
  },
  "builds":[{
    "src": "index.js",
    "use": "@now/node-server",
    "config": { "maxLambdaSize": "15mb" }
  }],
  "routes": [{
    "src": "/(.*)",
    "dest": "index.js"
  }]
}

```

**index.js**

```
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/one', (req, res) => res.send(process.env.ENV_ONE));
app.get('/two', (req, res) => res.send(process.env.ENV_TWO));
app.get('/three', (req, res) => res.send(process.env.ENV_THREE));
app.get('/env', (req, res) => {
  res.json({
    TEST: 'test',
    ENV_ONE: process.env.ENV_ONE,
    ENV_TWO: process.env.ENV_TWO,
    ENV_THREE: process.env.ENV_THREE,
  });
});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
```

**public/index.html**

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>now express secrets</title>
</head>
<body>
	<h1>now express secrets</h1>
	<ul>
		<li><a href="/one">one</a></li>
		<li><a href="/two">two</a></li>
		<li><a href="/three">three</a></li>
		<li><a href="/env">env</a></li>
	</ul>
</body>
</html>
```