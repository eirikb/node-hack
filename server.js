var http = require('http'),
url = require('url'),
nodeStatic = require('node-static');

http.createServer(function(req, res) {
	var publicFiles = new nodeStatic.Server('public', {
		cache: false
	});
	var location = url.parse(req.url, true),
	params = (location.query || req.headers);

	switch (location.pathname) {
	case '/eval':
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		var q = url.parse(req.url, true).query;
		try {
			res.end('' + eval(q.query));
		} catch(e) {
			res.end('' + e);
		}
	default:
		publicFiles.serve(req, res);
		break;
	}
}).listen(8000);

