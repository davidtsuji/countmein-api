var cmi = exports;

/* Core */
cmi.config = require('./config.json');
cmi.environment = require('./environment');
cmi.helpers = require('./helpers');
cmi.module = null;
cmi.modules = require('./modules');
cmi.routes = require('./routes');
cmi.scope = null;

/* Classes */
cmi.class = {};
cmi.class.base = require('./classes/base.class');
cmi.class.model = require('./classes/model.class');
cmi.class.service = require('./classes/service.class');

/* Services */
cmi.service = {};
cmi.service.main = require('./services/main.service');
cmi.service.event = require('./services/event.service');

/* Models */
cmi.model = {};
cmi.model.event = require('./models/event.model');
cmi.model.eventcount = require('./models/eventcount.model');
cmi.model.guest = require('./models/guest.model');

/* Middleware */
cmi.modules.model.use('adapter', require('./middleware/model.adapter.schema'));
cmi.modules.model.use('adapter', require('moldy-adapter-ajax'));