# JSLou Website

This is a MeteorJS application to run the [jslou.org](http://jslou.org).

## Setup a New Machine

At home, on your laptop, or on a new server, you may need to do any of these steps.

*NOTE: if you are on Windows, sorry.  Fire up a [virtualbox](https://www.virtualbox.org/) running linux -- or get super-baller and setup a [Docker](https://www.docker.io/) (maybe via [passenger](https://github.com/phusion/passenger-docker) or [docker-meteor](https://github.com/waitingkuo/docker-meteor) or other?)*

1. Install [node.js](http://nodejs.org/): `apt-get install node npm`
2. Install [Meteor](https://github.com/meteor/meteor): `curl https://install.meteor.com | /bin/sh`
3. Install [Meteorite](https://github.com/oortcloud/meteorite/): `sudo -H npm install -g meteorite`
4. Clone this repo: `git clone https://github.com/zeroasterisk/jslou-www-meteor.git` _(or fork it to your own copy)_
5. Change dir into the newly cloned repo: `cd jslou-www-meteor`
6. Setup/update up Meteor: `mrt install && mrt update`
7. Start up Meteor: `mrt`
8. Load up in your browser: [http://localhost:3000](http://localhost:3000)

## Contribute

You are welcome to Contribute to this project...

1. Read through the [Developer Notes](https://github.com/zeroasterisk/jslou-www-meteor/wiki/Developer-Notes) _(and [roadmap](https://trello.com/b/SsjfgNXY/jslou-website-roadmap))_
2. Fork this project in github, then: `git clone <your-fork> && cd jslou-www-meteor && git checkout dev`
3. Contribute (work locally, and do something uber cool)
4. Submit a [pull request](https://help.github.com/articles/using-pull-requests)
   on the [dev branch](https://github.com/zeroasterisk/jslou-www-meteor/tree/dev)

