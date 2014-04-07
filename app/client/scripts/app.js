var app = exports;

/* Core */
app.config = require('./config.json');
app.environment = require('./environment');
app.helpers = require('./helpers');
app.module = null;
app.modules = require('./modules');
app.routes = require('./routes');
app.scope = null;

/* Classes */
app.class = {};
app.class.base = require('./classes/base.class');
app.class.moldy = require('./classes/moldy.class');
app.class.service = require('./classes/service.class');

/* Services */
app.service = {};
app.service.main = require('./services/main.service');
app.service.event = require('./services/event.service');

/* Models */
app.model = {};
app.model.event = require('./models/event.model');
app.model.eventcount = require('./models/eventcount.model');
app.model.guest = require('./models/guest.model');

/* Middleware */
app.modules.moldy.use(require('moldy-ajax-adapter'));