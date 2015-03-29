// This module requires jQuery. In Node.JS, jsdom and xmlhttprequest are also required.

try {
	// Enable module to work with jQuery in Node.JS
	var jsdom = require('jsdom');
	var window = jsdom.jsdom().createWindow();
	var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

	var $ = require('jquery')(window);
	$.support.cors = true;
	$.ajaxSettings.xhr = function() {
		return new XMLHttpRequest;
	}
}
catch(e) {
	console.log(e);
}

var CandyCrush = {};


CandyCrush.GetGameModes = function (sessionID, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&";

	var data = "";

	var url = "https://candycrush.king.com/candycrushapi/getGameModes" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.GetGameModes = CandyCrush.GetGameModes; // For nodeJS

CandyCrush.GetGameModesPerLevel = function (sessionID, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&";

	var data = "";

	var url = "https://candycrush.king.com/candycrushapi/getGameModePerLevel" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.GetGameModesPerLevel = CandyCrush.GetGameModesPerLevel; // For nodeJS

CandyCrush.GetCandyProperties = function (sessionID, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&";

	var data = "";

	var url = "https://candycrush.king.com/candycrushapi/getCandyProperties" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.GetCandyProperties = CandyCrush.GetCandyProperties; // For nodeJS

CandyCrush.GetGameInitInfo = function (sessionID, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&";

	var data = "";

	var url = "https://candycrush.king.com/api/gameInitLight" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.GetGameInitInfo = CandyCrush.GetGameInitInfo; // For nodeJS

CandyCrush.StartGame = function (sessionID, levelNumber, seed, episodeNumber, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&" + "arg2" + "=" + encodeURIComponent(seed) + "&" + "arg1" + "=" + encodeURIComponent(levelNumber) + "&" + "arg0" + "=" + encodeURIComponent(episodeNumber) + "&";

	var data = "";

	var url = "https://candycrush.king.com/api/gameStart2" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.StartGame = CandyCrush.StartGame; // For nodeJS

CandyCrush.GetTrackGameSummary = function (sessionID, episodeNumberCommaLevelNumber, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "arg5" + "=" + encodeURIComponent("0") + "&" + "arg4" + "=" + encodeURIComponent("0") + "&" + "_session" + "=" + encodeURIComponent(sessionID) + "&" + "arg3" + "=" + encodeURIComponent("0") + "&" + "arg2" + "=" + encodeURIComponent(episodeNumberCommaLevelNumber) + "&" + "arg1" + "=" + encodeURIComponent("1426834654438") + "&" + "arg0" + "=" + encodeURIComponent("1426834295554") + "&" + "arg6" + "=" + encodeURIComponent("-180") + "&" + "arg7" + "=" + encodeURIComponent("1088126") + "&" + "arg8" + "=" + encodeURIComponent("-1") + "&";

	var data = "";

	var url = "https://candycrush.king.com/api/trackGameSummary2" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.GetTrackGameSummary = CandyCrush.GetTrackGameSummary; // For nodeJS

CandyCrush.EndGame = function (sessionID, data, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&" + "arg0" + "=" + encodeURIComponent(data) + "&";

	var data = "";

	var url = "https://candycrush.king.com/api/gameEnd3" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.EndGame = CandyCrush.EndGame; // For nodeJS

CandyCrush.GetLevelTopList = function (sessionID, levelNumber, episodeNumber, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&" + "arg1" + "=" + encodeURIComponent(levelNumber) + "&" + "arg0" + "=" + encodeURIComponent(episodeNumber) + "&";

	var data = "";

	var url = "https://candycrush.king.com/api/getLevelToplist" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.GetLevelTopList = CandyCrush.GetLevelTopList; // For nodeJS

CandyCrush.GetEpisodeChampions = function (sessionID, episodeInSquareBrackets, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&" + "arg0" + "=" + encodeURIComponent(episodeInSquareBrackets) + "&";

	var data = "";

	var url = "https://candycrush.king.com/api/getEpisodeChampions" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.GetEpisodeChampions = CandyCrush.GetEpisodeChampions; // For nodeJS

CandyCrush.PollUserInfo = function (sessionID, callback) {
	var type = 'GET';

	var headers = {
		"Accept-Language": "en-US,en;q=0.8",
		"X-Requested-With": "ShockwaveFlash/17.0.0.134",
		"Host": "candycrush.king.com",
		"Referer": "https://candycrush.king.com/FacebookServlet/",
		"Accept-Encoding": "gzip, deflate, sdch",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36",
		"Connection": "keep-alive",
		"Accept": "*/*",
	};

	var queryString = "?" + "_session" + "=" + encodeURIComponent(sessionID) + "&";

	var data = "";

	var url = "https://candycrush.king.com/api/poll" + queryString;

	$.ajax({
		type: type,
		url: url,
		headers: headers,
		data: data,
		beforeSend: function(xmlHttpRequest) {
			// Requires node-XMLHttpRequest version 1.5.1 or later to set some headers in Node.js
			if(xmlHttpRequest.setDisableHeaderCheck) xmlHttpRequest.setDisableHeaderCheck(true);
			return true;
		}
	})
	.always(
		function (response, error) {
			response = response || '';

			if (!response.responseText) {
				try {
					var $html = $(toStaticHTML(response));
				}
				catch(e) {
					var $html = $(response);
				}
			}
			else response = response.responseText;

			var fullResponse = {
				response: response,
			};

			callback(null, fullResponse);

		}
	);
};
if(typeof(exports) != "undefined") exports.PollUserInfo = CandyCrush.PollUserInfo; // For nodeJS

