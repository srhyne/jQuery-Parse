(function($) {

    var ns, _opts, methods, uriRgx;

    //Plugin namespace you can change this if you want..
    //i.e, ns = "db" = $.db.get/post/put/delete
    ns = "parse";

    //default opts
    _opts = {
        base: "https://api.parse.com/1/"
    };

    //public methods
    methods = {};

    //uriRgx
    uriRgx = /(files|installations|login|push|roles|requestPasswordReset|users)/;

    function _creds() {
        var error;

        if (_opts.app_id && _opts.rest_key) {
            return true;
        }

        error = "Missing app_id, or rest_key authentication parameters.\n" +
        "Pass these credentials to $." + ns + ".init\n" +
        "app_id = Application Id\n" +
        "rest_key = REST API Key";
        alert(error);
        $.error(error);

        return false;
    }

    function _error(jqXHR, textStatus, errorThrown) {
        $.error("$." + ns + " :" + textStatus + " " + errorThrown);
    }
    
    //TODO JSON.stringify dependency?
    function _http(method, uri, data) {
        var req;

        if (!_creds()) {
            return false;
        }


        req = {
            //data
            contentType: "application/json",
            processData: false,
            dataType: 'json',

            //action
            url: _opts.base + (uriRgx.test(uri) ? uri: "classes/" + uri),
            type: method,

            //Credentials
            //NEW! Parse.com now supports CORS...https://parse.com/docs/rest
            headers: {
                "X-Parse-Application-Id": _opts.app_id,
                "X-Parse-REST-API-Key": _opts.rest_key
            }
        };

        //If a session token is present in $.parse.init, adds it to the header
        if( _opts.session_token ) {
            req.headers["X-Parse-Session-Token"] = _opts.session_token;
        }

        //if no data passed just return ajax
        if (typeof data !== 'object') {
            return $.ajax(req);
        }

        //makes for easier reuse of query objects passed in as reference
        data = $.extend({}, data);
        
        //if get request process data as application/x-www-form-urlencoded
        if (method === 'GET') {
            req.processData = true;
            //if there is a where object it needs to be stringified first.
            //no need to encodeURIComponent on data.where as $.ajax does that natively
            if (data.where && typeof data.where === 'object') {
                data.where = JSON.stringify(data.where);
            }
        }
        //otherwise stringify all data.
        else {
          data = JSON.stringify(data);
        }

        //set request data
        req.data = data;

        return $.ajax(req);
    }


    function _response(req, cb, error) {
        typeof cb === "function" && req.done(cb);
        error = typeof error === 'function' ? error : _error;
        req.fail(error); 
        return $[ns];
    }
    
    function _logger(method, uri, data){
      var str = [ "$.", ns, ".", method, "(", "\"",uri,"\""];
      data && str.push(", " + (JSON ? JSON.stringify(data) : "data") ); 
      str = str.join('')+");";
      $.publish && $.publish("parse.log", [str]);
      return str;
    }
    //exports
    methods.init = function(customOpts) {
        $.extend(_opts, typeof customOpts === 'object' ? customOpts: {}, true);
        return $[ns];
    };


    /*
    Creates $.parse.get/post/put/delete methods 
    Examples....

    $.parse.post('tasks',{ body : "Build all the things!" },function(json){
      console.log(json);
    });

  */
    $.each(['GET', 'POST', 'PUT', 'DELETE'], function(i, action) {
        var m = action.toLowerCase();

        methods[m] = function() {
            var args, uri, data, cb, req;

            args = arguments;
            
            uri = args[0];
            data = args[1];
            cb = args[2];
            error = args[3]
            
            if (typeof args[1] === 'function') {
                data = false;
                cb = args[1];
                error = args[2];
            }
            
            _logger(m, uri, data);
            
            req = _http(action, uri, data);
            
            return _response(req, cb, error);
        };

    });

    //alias methods
    $.extend(methods, {

        //@param Object data  eg.. '{"username": "cooldude6", "password": "p_n7!-e8", "phone": "415-392-0202"}'
        //@param Function optional callback
        //@param Function optional error callback
        //@return $[ns] aka $.parse
        signup: function(data, cb, error) {
            return this.post('users', data, cb, error);
        },

        //@param String username
        //@param String password
        //@param Function optional callback
        //@param Function optional error callback
        //@return $[ns] aka $.parse
        login: function(username, password, cb, error) {
            return this.get('login', { username: username, password: password }, cb, error);
        },

        //@param String email address of user
        //@param Function optional callback
        //@param Function optional error callback
        //@return $[ns] aka $.parse
        requestPasswordReset: function(email, cb, error) {
            return this.post('requestPasswordReset', { email: email }, cb, error);
        }
        
    });
    
    

    
   
    //attach methods to jQuery object using ns var aka 'parse'	
    $[ns] = methods;

})(jQuery);
