(function(GLOBAL, $, tmpl) {
  
  var task_list, new_task;


  $.parse.init({
      app_id: undefined, // <-- enter your Application Id here
      rest_key: undefined // <--enter your REST API Key here	
  });

  function init() {
    task_list = $("#task_list");
    new_task = $("#new_task");
    task_table = $("#task_table");
    _addEvents();
    return GLOBAL.tasks;
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

  }


  function get() {
    
    $.parse.get("tasks", function(json) {
        var results,
        html;

        results = json.results;
        html = "";

        if (results.length === 0) {
            return false;
        }

        results.forEach(function(task) {
            html += tmpl("task_tmpl", task);
        });
        task_list.html(html);
    });
    
    
  }


  GLOBAL.tasks = {
      init: init,
      get: get
  };

})(window, jQuery, tmpl);

$(function() {
    tasks.init().get();
});



