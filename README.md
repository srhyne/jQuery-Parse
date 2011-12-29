# What is it? 

It's a super light-weight AJAX wrapper for Parse.com's wonderful database service. 

# Why did you build it? 

I wanted a stupid-easy data store that I could use strictly from the client. No server needed! 
One can simply write a thick front end application or app prototype and serve it from the file protocol
or through a Chrome extension.

# Prototyping love. 

Of course having your Parse.com authentication key sitting in your JS code is sort of a no-no. 
However, for writing applications where you are focusing your effort first on the front end this is a great tool.

* No Schema! Just fire a $.parse.post & forget it. If the collection hasn't been created already it will be 
instantiated. 

* Super simple... just $.parse.get/post/put/delete

# More to come....

* Backbone / Spine sync extension
* Working on one for MongoHQ
