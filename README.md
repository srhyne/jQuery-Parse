# What is it? 

It's a super light-weight AJAX wrapper for Parse.com's wonderful database service. 

# Why did you build it? 

* I wanted a stupid-easy data store that I could use strictly from the client. No server needed! 
Write a thick front end application or app prototype. 

* No Schema! Just fire a $.parse.post & forget it. If the class hasn't been created already it will be 
instantiated. 

* Super simple... just $.parse.get/post/put/delete/

# New!

### [4-19-12 Live Demo Added >>](http://srhyne.github.com/jQuery-Parse/) 

  * No code editing needed to try out the demo. 
  * Logger (far right) shows you what $.parse methods are being executed and how. 
  
### 3-28-12

  * WARNING! Big change made to $.parse.get regarding queries. (See parse#get).
  * `signup` method added
  * `login` method added and `$.get("login",{...})` supported as well
  * `requestPasswordReset` method added
  
### 1-27-12

__Serve your app from http, cross domain calls FTW!__

Parse launched support for __cross-origin__ resource sharing using CORS.
This means you no longer have to generate a base64 encoded Basic Auth key using the provided parse.sh
You can now just pass your application id and rest key right to `$.parse.init`.


# Examples.. 

### parse#init( Object options )
    
    $.parse.init({
  		app_id : "mJDSHSMJbdXm1GtLsTsGhXDvqn63RER6HL23JXTCG", // <-- enter your Application Id here 
  		rest_key : "ubpbA8Q1gplTRybw6pTkDAoZsT8KZTI9cy2tKJ82" // <--enter your REST API Key here	
  	});
  	
### parse#get( String class, [Object params], [Function callback], [Function error-callback] )
  
    $.parse.get("tasks");
  
#### Note the change in how you pass your query!
  
    //88ef3bf5c6 and earlier assumed anything you passed was a part of a query
  
    $.parse.get('tasks',{
      'objectId' : 'od9867Vwd4'
    });
  
    //NEW! way let's you pass order, limit, and skip params as well as the where query param
  
    $.parse.get('tasks',{
     where : { user_id : '2k34hufa8' },
     order : "-createdAt"
    });
    	
### parse#post( String class, Object new-record, [Function callback], [Function error-callback] )

    $.parse.post('tasks',{ body : 'my message body' }, function(json){
      console.log(json);
    });

### parse#put( String class/id, Object updated_record, [Function callback], [Function error-callback] )

    $.parse.put('tasks/od9867Vwd4',{ body : 'my updated text' }, function(json){
      console.log(json);
    }, optionalErrorCallback);
  
### parse#delete(String class/id, [Function callback], [Function error-callback])
  
    $.parse.delete('tasks/od9867Vwd4', optionalCallback, optionalErrorCallback);
    
### parse#signup(String class, Object user_record, [Function callback], [Function error-callback])
  
    //Same as $.parse.post('users',{...});
  
    $.parse.signup({ 
      username : 'srhyne', 
      password : 'password', 
      email : 'testy@test.com' 
    },optionalCallback, optionalErrorCallback);

### parse#login(String username, String password, [Function callback], [Function error-callback])
  
    $.parse.login('srhyne', 'password', optionalCallback, optionalErrorCallback)
  
### parse#requestPasswordReset(String email, [Function callback], [Function error-callback]);
  
    $.parse.requestPasswordReset('testy@test.com', optionalCallback, optionalErrorCallback);

# TODO 

* Tests!
* Backbone / Spine sync extensions





[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/srhyne/jquery-parse/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

