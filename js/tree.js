$(document).ready(function(){
  $("#json_render").width($("#mainTree").width())
  var obj = getData();
  $('#modalForNote').modal({ show: false});
  $('#modalForSuccess').modal({ show: false});
  $('#modalForDownload').modal({ show: false});

  $('#tree').jstree({
    'core' : {
      'check_callback' : true,
      'data' : obj,
    },
    "search" : {
      "case_insensitive" : true
    },
    "plugins": ["contextmenu", "dnd", "search", "wholerow"],
    "contextmenu" : {
      "items": customMenu
    }
  });

  $("#search-input").keyup(function() {
      var searchString = $(this).val();
      $('#tree').jstree('search', searchString);
  });

});

function customMenu(node) {
    // The default set of all items
    //RYANTODO make leafs different icon, same with def's and formulas -> call it a type category - in create?
    var mark = "";
    if (getTree().selected.data.marked == false){
        mark = "Mark";
    }
    else {
        mark = "Unmark";
    }
    var items = {
        addItem: {
          label: "Add Item",
          action: function () {
            var newNode = getTree().tree.create_node(getTree().selected.id, "new node");
            var today = new Date();
            getTree().tree.get_node(newNode).data = { "create_date": convertDate(today), "marked": false, "success": 0, "failure": 0, "audio_path": null, "note": null, "other": null };
            getTree().tree.set_icon(getTree().tree.get_node(newNode), '../img/folder.png');
          }
        },
        renameItem: { // The "rename" menu item
            label: "Rename",
            action: function () {
              getTree().tree.edit(node);
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Delete",
            action: function () {
              getTree().tree.delete_node([node]);
            }
        },
        markItem: { // mark all children RYANTODO
            label: mark,
            action: function () {
                if(getTree().selected.data.marked == true){
                    getTree().selected.data.marked = false;
                    getTree().tree.set_icon(node, '../img/folder.png');
                }
                else {
                    getTree().selected.data.marked = true;
                    getTree().tree.set_icon(node, '../img/red-x.png');
                }
            }
        },
        iterateItem: {
          label: "Iterate",
          action: function (){
            // RYANTODO takes you to iteration page and iterates on specific node's children - wont work on leaf
            alert("Iterate");
          }
        },
        noteItem: {
          label: "Note",
          action: function (){
            $('#modalNote').val("");
            $('#modalNoteTitle').text(getTree().selected.text + " ~Note");
            if(getTree().selected.data.note != null){
              $('#modalNote').val(getTree().selected.data.note);
            }
            else if(getTree().selected.data.note == null){
              $('#modalNote').val("");
            }
            $('#modalForNote').modal('show');
          }
        },
        downloadItem: {
          label: "Download", //RYANTODO: make data useful for user
          action: function() {
            $('#modalDownloadTitle').text(getTree().selected.text + " Download");
            $('#downloadName').text(getTree().selected.text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') + ".txt");
            $('#modalForDownload').modal('show');
          }
        }
    };

    if ($(node).hasClass("folder")) {
        // Delete the "delete" menu item
        delete items.deleteItem;
    }

    return items;
};

function save(){
  var tree = $('#tree').jstree(true);
  if(tree != null){
    v = getTree().tree.get_json('#', { 'flat': true });
    $("#json_render").text(JSON.stringify(v, null, 4));
  }
};

function convertDate(d){
    return Math.round(d.getTime()/86400000);
};
