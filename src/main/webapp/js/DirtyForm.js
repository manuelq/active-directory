if (typeof jQuery == 'undefined') throw("jQuery could not be found.");

(function($){
  
  $.extend({
    DirtyForm: {
      debug         : false, // print out debug info? works best with firebug.
      changedClass  : 'changed',
      addClassOn    : new Function,
      hasFirebug    : "console" in window && "firebug" in window.console,
      logger        : function(msg){
                        if(this.debug){
                          msg = "DirtyForm: " + msg;
                          this.hasFirebug ? console.log(msg) : alert(msg);
                        }
                      },
      input_value   : function(input){
                        if(input.is(':radio,:checkbox')){
                          return typeof(input.attr("checked")) == "undefined" ? false : input.attr("checked");
                        } else {
                          return input.val();
                        }
                      }, 
      input_reset   : function(input){
                        if(input.is(':radio,:checkbox')){
                          input.attr('checked', input.data('initial'));
                        } else {
                          input.val(input.data('initial'));
                        }
                        input.trigger('blur.dirty_form')
                      },
      input_checker : function(event){
                        var npt = $(event.target), form = npt.parents('.dirtyform'), initial = npt.data("initial"), current = $.DirtyForm.input_value(npt), inputs = event.data.inputs, settings = event.data.settings
                        
                        if(initial != current && !$(event.target).hasClass("ignoreDirtyChanges")) {
                          $.DirtyForm.logger("Form "+form.attr('class')+" is dirty. Changed from \""+initial+"\" to \""+current+"\"");
                          $.DirtyForm.logger("Class: "+settings.changedClass);
                          form
                            .data("dirty", true)                                      //TODO: check if we can use an expando property here
                            .trigger("dirty", {target: npt, from: initial, to: current, preventDefault: function(){return false}, stopPropagation: function(){return false}, bubbles: true, cancelable: true});
                          npt
                            .add(settings.addClassOn.apply(npt))
                            .addClass(settings.changedClass);                          // TODO: maybe we need to check if the class exists already?
                            
                        } else {
                          npt
                            .add(settings.addClassOn.apply(npt))
                            .removeClass(settings.changedClass)
                        }
                        
                        if(!inputs.filter('.' + settings.changedClass).size()){
                        	//added by RVangala to handle dirty check on sub tabs. 
                        	//When you switch from the default subtab, form fields get active but 
                        	//jQuery's event is not being updated with latest input field data. So, the form is considered NOT dirty.
                        	if(!npt.filter('.' + settings.changedClass).size()) {
                                form
                                .data("dirty",false)
                                .trigger("clean", {target: npt, preventDefault: function(){return false}, stopPropagation: function(){return false}, bubbles: true, cancelable: true});
                            }
                        }
                      }
    }
    
  });
    
  $.fn.clean_form = function(){
    return this.each(function(){
      var dirtyform = $(this)
      if(dirtyform.is('form')) {
        dirtyform.reset().find('.changed:input').each(function(){
          $(this).trigger('blur.dirty_form');
        });
      } else {
        $(':input:not(:hidden,:submit,:password,:button)', dirtyform).each(function(){
          $.DirtyForm.input_reset($(this));
        });
      }
    })
  }
  
  // will flag a form as dirty if something is changed on the form.
  $.fn.dirty_form = function(){
    var defaults = {
      changedClass  : $.DirtyForm.changedClass,
      addClassOn    : $.DirtyForm.addClassOn,
      dynamic       : $.isFunction($.livequery)
    }
    
    var settings = $.extend(defaults, arguments.length != 0 ? arguments[0] : {});

    return this.each(function(){
      var form = $(this);

      var inputs = $(':input:not(:hidden,:submit,:password,:button)', form)

      if( form.hasClass('dirtyform') ){
        // unbind all DirtyForms specific events, then proceed to re-add them
        form.unbind("dirty").unbind("clean");
        inputs.unbind("blur.dirty_form");
      }else{
        // mark it as a dirtyform
        $(this).addClass('dirtyform')
      }

      $.DirtyForm.logger('Storing initial data for form ' + form.get(0));
      
      if (settings.dynamic) {
        inputs.livequery(function(){ // use livequery to perform these functions on the new elements added to the form
          $(this)
            .bind("blur.dirty_form", {inputs: inputs, settings: settings}, $.DirtyForm.input_checker)
            .data('initial', $.DirtyForm.input_value($(this)))
        });
      }else {
        inputs.each(function(){
          $(this)
            .bind("blur.dirty_form", {inputs: inputs, settings: settings}, $.DirtyForm.input_checker)
            .data("initial", $.DirtyForm.input_value($(this)));
        });
      }
    });
  };
  
  
  // this is meant for selecting links that will warn about proceeding if there are any dirty forms on the page
  $.fn.dirty_stopper = function(){
    var defaults = {
      dialog : {
        title: "Warning: Unsaved Changes!",
        modal: true,
        resizeable: false,
        autoResize: true,
        overlay: {backgroundColor: "black", opacity: 0.5},
        open: function(event, ui) { 
            // Get the dialog 
            var dialog = $(event.target).parents(".ui-dialog.ui-widget");

            // Get the buttons 
            var buttons = dialog.find(".ui-dialog-buttonpane").find("button");
            var saveButton = buttons[2]; 

            $(saveButton).focus();
        } 
      },
      enableSave:true,
      message : '<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 59px 0;"></span></p><p>You have changed form data without saving. All of your changes will be lost.</p><p>Are you sure you want to proceed?</p>'
    	  
    }
    
    var settings = $.extend(true, defaults, arguments.length != 0 ? arguments[0] : {});
    
    $.DirtyForm.logger("Setting dirty stoppers")    
    
    return this.each(function(){
      var stopper = $(this);
      
      //needed to add extra condition to skip this if the parents parent is nested in the tabmenu
      if ($(this).parents('.ui-tabs-nav').length > 0 && $(this).parents("#tabmenu").length == 0){
        // FIXME: not sure what the comment below is actually saying. "Unchaining ... made it NOT work"?? (dvd, 03-02-2009)
        // Unchaining these tabs calls made the tab links not work
        var tabs = $(this).parents('.ui-tabs-nav')
        tabs.find('a').unbind('click.dirty_form')
        tabs.unbind('tabsselect.dirty_form')
        tabs.bind('tabsselect.dirty_form', function(event, ui){
          if($('.dirtyform').are_dirty()) {
            event.preventDefault();
            var div = $("<div id='dirty_stopper_dialog'/>").appendTo(document.body)
            var href = $(this).attr('href');
            var formName = $('.dirtyform')[0].id;
            div.dialog($.extend(settings.dialog, {
              buttons: {
            	Cancel: function(){$(this).dialog('destroy').remove()},
                "Discard & Proceed": function(){
                  var selected_id = $(ui.tab).parent().siblings('.ui-tabs-selected').find('a').attr('href');
                  // reset the form in the selected tab and make sure it cleans up after itself
                  $('.dirtyform', selected_id).clean_form();
                  // select the tab now that the old tab is clean
                  tabs.tabs('select', $(ui.tab).attr('href'));
                  
                  // close the dialog with fire
                  $(this).dialog('destroy').remove();
                }
              }
            })).dialog("moveToTop").append(settings.message);
            // new stuff
            if(settings.enableSave){
            	$.extend(settings.dialog, {
                    buttons: {"Save":function(){submitAction(formName,'save');}
                    }});
            }
            //new stuff
            // div.append(settings.message);
            return false
          }
        })
      } else {
        stopper.unbind('click.dirty_form')
        stopper.bind('click.dirty_form', function(event){
          if($('.dirtyform').are_dirty() && $(this).attr('href') != "#") {
            event.preventDefault();
            var formName = $('.dirtyform')[0].id;
            var div = $("<div id='dirty_stopper_dialog'/>").appendTo(document.body),
                href = $(this).attr('href');
            if(settings.enableSave){
	            div.dialog($.extend({buttons: {
	            	Cancel:function(){$(this).dialog('destroy').remove(); return false},
	            	"Discard & Proceed":function(){showLoading();window.location = href},
	            	"Save":function(){submitAction(formName,'save');}
	            }}, settings.dialog)).dialog("moveToTop");
            } else {
            	div.dialog($.extend({buttons: {
            	  Cancel:function(){$(this).dialog('destroy').remove(); return false},
            	  "Discard & Proceed":function(){showLoading();window.location = href}
                }}, settings.dialog)).dialog("moveToTop");
            }
            
            div.append(settings.message);
          }
        });
      }
    });
  }
  
  // not chainable
  // returns false if any of the forms on the page are dirty
  $.fn.are_dirty = function (){
    var dirty = false
    this.each(function(){
      if($(this).data('dirty')) {
        dirty = true;
      }
    })
    return dirty
  }
  
  // This is just for testing purposes...
  $.fn.dirty_checker = function(){    
    $.DirtyForm.logger("Setting dirty checkers!")
    
    return this.each(function(){
      checker = $(this);
      checker.click(function(){
        if($("form").are_dirty()) {
          alert("Dirty Form!!");
        } else {
          alert("Clean Form ...phew!");
        }
      });
    });
  }
  
  // Shortcut to bind a handler to the "ondirty" event
  $.fn.extend({
    dirty: function(fn) {
  		return this.bind('dirty', fn);
  	},
  	clean: function(fn) {
  		return this.bind('clean', fn);
  	}
  });
})(jQuery);