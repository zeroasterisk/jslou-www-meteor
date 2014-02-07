Template.filepicker.rendered = function () {
  var widget = $('#filepicker-dnd-widget');
  if (widget.data('loaded') == true) {
    return;
  }
  if (typeof loadPicker == "undefined") {
    console.error('loadPicker not loaded :(');
    return;
  }
  if (!_.isObject(loadPicker)) {
    console.error('loadPicker not object :(');
    return;
  }
  // setup filepicker (async, only loaded when needed, thus this callback)
  var setupFP = function () {
    var widget = document.getElementById('filepicker-dnd-widget');
    widget.type = "filepicker-dragdrop";
    // does our .ME-textarea exist?
    var MEtextarea = $('.ME-textarea:visible');
    if (MEtextarea.length > 0) {
      widget.onchange = function(e) {
        _.each(e.fpfiles, function(fpfile, index, list) {
          MEtextarea.val(MEtextarea.val() + "\n![" + fpfile.filename + "](" + fpfile.url + ")").trigger("keyup");
        });
      };
      // also setup the MEtextarea to act as a drag-n-drop uploader (sweet!)
      filepicker.makeDropPane(MEtextarea.parent()[0], {
        multiple: true,
        mimetypes: 'image/*',
        maxSize: 1024*1024,
        dragEnter: function() {
          MEtextarea.attr('disabled', true).after(
            $('<div class="alert alert-info" id="filepicker-help-text">Drop Image to Upload</div>')
              .css({ position: "absolute", top: 10, left: 30, opacity: 0.4 })
          );
        },
        dragLeave: function() {
          MEtextarea.removeAttr('disabled');
          $("#filepicker-help-text").remove();
        },
        onStart: function() {
          MEtextarea.removeAttr('disabled');
          $("#filepicker-help-text").html('Uploading...');
        },
        onProgress: function(percent) {
          MEtextarea.removeAttr('disabled');
          $("#filepicker-help-text").html('Uploading (' + percent + ')');
        },
        onSuccess: function(fpfiles) {
          MEtextarea.removeAttr('disabled');
          $("#filepicker-help-text").remove();
          _.each(fpfiles, function(fpfile, index, list) {
            MEtextarea.val(MEtextarea.val() + "\n![" + fpfile.filename + "](" + fpfile.url + ")");
            MEtextarea.trigger("keyup");
          });
        },
        onError: function(type, message) {
          MEtextarea.removeAttr('disabled');
          $("#filepicker-help-text").remove();
          alert(message + " [" + type + "]");
        }
      });
    }
    //
    filepicker.constructWidget(widget);

  };
  loadPicker(cfg.filepickerkey, setupFP);
  console.log('filepicker setup :)');
  widget.data('loaded', true);
};
