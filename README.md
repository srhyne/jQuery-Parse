# What is it? 

It's a super light-weight AJAX wrapper for Parse.com's wonderful database service. 

# Why did you build it? 

* I wanted a stupid-easy data store that I could use strictly from the client. No server needed! 
Write a thick front end application or app prototype. 

* No Schema! Just fire a $.parse.post & forget it. If the class hasn't been created already it will be 
instantiated. 

* Super simple... just $.parse.get/post/put/delete/

# New!

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

### parse#init(Object options)
    
    $.parse.init({
  		app_id : "mJDSHSMJbdXm1GtLsTsGhXDvqn63RER6HL23JXTCG", // <-- enter your Application Id here 
  		rest_key : "ubpbA8Q1gplTRybw6pTkDAoZsT8KZTI9cy2tKJ82" // <--enter your REST API Key here	
  	});
  	
### parse#get
  
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
    	
### parse#post(String class, Object new_record, [Function callback])

    $.parse.post('tasks',{ body : 'my message body' }, function(json){
      console.log(json);
    });

### parse#put(String class/id, Object updated_record, [Function callback])

    $.parse.put('tasks/od9867Vwd4',{ body : 'my updated text' }, function(json){
      console.log(json);
    });
  
### parse#delete(String class/id, [Function callback])
  
    $.parse.delete('tasks/od9867Vwd4');
    
### parse#signup(String class, Object user_record, [Function callback])
  
    //Same as $.parse.post('users',{...});
  
    $.parse.signup({ 
      username : 'srhyne', 
      password : 'password', 
      email : 'testy@test.com' 
    },optionalCallback);

### parse#login(String username, String password, [Function callback])
  
    $.parse.login('srhyne', 'password', optionalCallback)
  
### parse#requestPasswordReset(String email, [Function callback]);
  
    $.parse.requstPasswordReset('testy@test.com', optionalCallback);

# TODO 

* Tests!
* Backbone / Spine sync extensions



