!function(Backbone, parse){
  
  var getValue, getUrl, parseMethods, _sync;
  
  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };
  
  getUrl = function(model){
    return getValue(model, 'url') || $.error('A "url" property or function must be specified');
  };
  
  parseMethods = {
    create : 'post', 
    read : 'get', 
    update : 'put', 
    'delete' : 'delete'
  };
  
  //memory issue w/ closure?
  _sync = function(method, model, options){
    var url, attr;
    
    method = parseMethods[method];
    
    if(typeof parse[method] !== 'function'){
      return false;
    }
    
    attr = model.attributes;
    url = getUrl(model);
    
    _.each(['updatedAt', 'createdAt', 'objectId'],function(reserved){
      delete attr[reserved];
    });

    parse[method](url, attr, options.success, options.error);
    
    return model;
    
  };
  
  Backbone.ParseModel = Backbone.Model.extend({
    idAttribute : 'objectId', 
    sync : _sync
  });
  
  Backbone.ParseCollection = Backbone.Collection.extend({
    
    parse : function(response){
      return response.results;
    },
  
    sync : function(method, col, opts){
      parse.get(this.url, opts.data, opts.success, opts.error );
    }
    
  });
  
 
  
  
}(Backbone, $.parse);