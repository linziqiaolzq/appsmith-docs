---
sidebar_position: 3
description: Guide on how to embed Appsmith into an existing application
---

# Embed Apps

<VideoEmbed host="youtube" videoId="l7508s-5VwU" title="Embed Appsmith in your Website" caption="Embed Appsmith in your Website"/>



Tools and Dashboards are great as an app and on a website, and now, you can have it both in one go by embedding apps to your website! In this guide, you'll learn how to embed Appsmith Apps into any website.

### Creating HTML page

Firstly, lets create an HTML page and call it \``dashboard.html`\`. Now, add the basic HTML structure to make it an HTML page:

```markup
<!DOCTYPE html>
<html>
<head>
    <title> Customer Dashboard </title>
</head>
<body>

</body>
</html>
```

You'll also have to ensure your app is public to embed into other applications. You can do this by clicking on the Share option on the top toolbar and toggle the viewing option to **Public**. Here's a video example:




<VideoEmbed host="youtube" videoId="gD0xV-Tt1_U" title="Follow these steps to make your application public" caption="Follow these steps to make your application public"/>

Next, create an `iframe` tag and add the shareable link from share options to the `src` attribute with height and width set to `500` and `100%` respectively.

Include the meta tag in the head to ensure that the embedded application renders responsively on different screen sizes:

```markup
<!DOCTYPE html>
<html> 
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1"
    <title></title>
</head>
<body>
    <iframe src="<LINK_OF_APP>" height="700" width="100%"></iframe>
</body>
</html>
```



### Opening the HTML Page

:::info
If you are opening the HTML page as a`file,`then the browser won't allow you to do that. The HTML file needs to come from a server.
:::

After creating the HTML page, save it as `dashboard.html` and have an HTTP server serve it. This can be done in several ways:

#### Serving an HTML file with Node.js

Once you have created your HTML file, create a new `app.js`` `**``** file. Paste the below-mentioned code and edit your HTML file name.

```markup
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    const html = fs.readFileSync('./dashboard.html');
    res.end(html);
}).listen(3000, () => {
    console.log('running on 3000');
});
```

Now, in the terminal, run `node app.js`

This will prompt a `running on 3000` message. Next, go to your browser and open [http://localhost:3000/](http://localhost:3000/)

This will open your HTML file.

![Sceenshot of Appsmith Embed](/img/Appsmith\_embed.png)

#### Running npx http-server

Let's look at another way to open an HTML file.

Now, if you have _Node JS_ installed, go to the command terminal and run:

```
npx http-server
```

Next, open [http://localhost:8080/dashboard.html](http://localhost:8080/dashboard.html) and it should open the HTML File.

### Modifying Layout

If you want to get your app to use the whole page in your browser, you can still change your height and width parameters like so:

```markup
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1"
    <title></title>
</head>
<body>
    <iframe src="<LINK_OF_APP>" scrolling="yes" seamless="seamless" style="display:block; width:100%; height:100vh;"></iframe>
</body>
</html>
```

#### Remove Appsmith Top Bar

Additionally, you can also see the Appsmith toolbar on the top, you can remove this by adding **`?embed=true`** to the share URL. Update the code to the following:

```markup
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1"
    <title></title>
</head>
<body>
    <iframe src="<LINK_OF_APP>" height="700" width="100%"></iframe>
</body>
</html>
```

Awesome! Now you can see the app without any toolbar! Below is a screenshot:

![Appsmith Embed with ?embed=true propert](/img/embed=true.png)