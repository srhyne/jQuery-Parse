# What is it? 

It's a super light-weight AJAX wrapper for Parse.com's wonderful database service. 

# Why did you build it? 

I wanted a stupid-easy data store that I could use strictly from the client. No server needed! 
Write a thick front end application or app prototype. 

# New!

__Serve your app from http, cross domain calls FTW!__
Parse launched support for __cross-origin__ resource sharing using CORS.
This means you no longer have to generate a base64 encoded Basic Auth key using the provided parse.sh
You can now just pass your application id and rest key right to `$.parse.init` and 

	$.parse.init({
		app_id : undefined, // <-- enter your Application Id here 
		rest_key : undefined // <--enter your REST API Key here	
	});

# Prototyping love. 

* No Schema! Just fire a $.parse.post & forget it. If the collection hasn't been created already it will be 
instantiated. 

* Super simple... just $.parse.get/post/put/delete

# More to come....

* Backbone / Spine sync extension
