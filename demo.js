(function(GLOBAL, $, tmpl) {
  
  //dom cache
  var task_list, new_task, parse_log;


  function _initParse(creds){
    $.parse.init(creds);
    _credentials(creds);
    return true;
  }

  function _removeTask() {
    var tr, id;

    tr = $(this).closest('tr');
    id = tr.data("id");

    tr.remove();
    $.parse.delete("tasks/" + id,function(){
        console.log('removed object ' + id);
    });
    
  }

  function _onTaskEditStart() {
    var _this, oldValue, _input;

    _this = $(this);
    oldValue = _this.text();
    _input = $("<input/>", {
        "class": "xlarge",
        value: oldValue,
        data: {
            old_value: oldValue
        },
        autofocus: true
    });

    _this.html(_input);
  }

  function _onTaskEditEnd(e) {
    var _this, val, oldVal, id;

    if (e.type === 'keydown' && e.which !== 13) {
        return true;
    }

    _this = $(this);
    val = _this.val();
    oldVal = _this.data('old_value');

    if (oldVal === val) {
        _this.parent().text(val);
        return false;
    }

    id = _this.closest('tr').data('id');
    if (!id) {
        _this.parent().text(val);
        return false;
    }

    $.parse.put("tasks/" + id, { body: val}, function(json) {
        console.log('updated ' + id, json)
    });

    return _this.parent().text(val);

  }

  function _newNote(e) {
    var val, task;

    if (e.which !== 13) {
        return true;
    }
    val = this.value;

    if (!val) {
        return false;
    }

    //clear value
    this.value = "";

    task = $(tmpl("task_tmpl", { objectId: false, body: val }));
    task_list.append(task);

    $.parse.post('tasks', { body: val }, function(json) { 
      task.data('id', json.objectId);
    });

  }

  function _addEvents() {

    task_table
    .delegate("a.remove", 'click', _removeTask)
    .delegate("td.body", "click", _onTaskEditStart)
    .delegate("td input.xlarge", {
        focusout: _onTaskEditEnd,
        keydown: _onTaskEditEnd
    })

    new_task.bind("keydown", _newNote);
    $("#add-credentials").on('click', _startDemo);
    $.subscribe && $.subscribe('parse.log', _updateParseLog );
    
  }

  function _updateParseLog(e, str){
    $("<li/>",{ text : str }).appendTo(parse_log);
  }
  
  function _startDemo(e){
    var creds = {};
    
    e.preventDefault();
    $("#credentials").children('input').each(function(){
      creds[this.name] = this.value;
    });
    
    _initParse(creds) && get();
  }
  
  function _credentials(creds){
    var key = "parse.creds";
    if(!window.localStorage || !window.JSON){
      return false;
    }
    
    if(!creds){
      return JSON.parse(localStorage[key] || "{}");
    }
    
    localStorage[key] = JSON.stringify(creds);
    return creds;
  }

  function _checkForCredentials(){
    var creds;
    
    creds = _credentials();
    if(!creds.app_id || !creds.rest_key){
      return false;
    }
    
    $("#credentials").children('input').each(function(){
      this.value = creds[this.name];
    });
    
    _initParse(creds) && get();
    
  }
  
  function get(){
    
    $.parse.get("tasks", function(json) {
        var results,
        html;

        results = json.results;
        html = "";

        
        //update demo status label
        $("#demo-status")
          .removeClass('label-important')
          .addClass('label-success')
          .text('Demo Ready!');
          
        if (results.length === 0) {
            return false;
        }
        
        results.forEach(function(task) {
            html += tmpl("task_tmpl", task);
        });
        task_list.html(html);
        
    });
    
    
  }
  
  function init(){
     //cache vars in module
     task_list = $("#task_list");
     new_task = $("#new_task");
     task_table = $("#task_table");
     parse_log = $("#parse_log");
     //add events
     _addEvents();
     _checkForCredentials();
     return GLOBAL.tasks;
   }
  
  
  GLOBAL.tasks = {
      init: init,
      get: get
  };

  //doc ready init
  $(init);
  
})(window, jQuery, tmpl);





