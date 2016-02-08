var tree_data;

$(document).ready(function(){
  $("#json_render").width($("#mainTree").width())
  var obj = getData();

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

  tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });

});

function customMenu(node) {
    // The default set of all items
    //TODO make leafs different icon, same with def's and formulas -> call it a type category - in create?
    var tree = $('#tree').jstree(true);
    var node = tree.get_node(tree.get_selected());
    var mark = "";
    if (node.data.marked == false){
        mark = "Mark";
    }
    else {
        mark = "Unmark";
    }
    var items = {
        addItem: {
          label: "Add Item",
          action: function () {
            var newNode = tree.create_node(tree.get_selected(), "new node");
            var today = new Date();
            tree.get_node(newNode).data = { "create_date": convertDate(today), "marked": false, "success": 0, "failure": 0, "audio_path": null, "note": null, "other": null };
            tree.set_icon(tree.get_node(newNode), '../img/folder.png');
            tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true }); //update tree when node is created
          }
        },
        renameItem: { // The "rename" menu item
            label: "Rename",
            action: function () {
              tree.edit(node);
              tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Delete",
            action: function () {
              tree.delete_node([node]);
              tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });
            }
        },
        markItem: { // mark all children TODO
            label: mark,
            action: function () {
                if(node.data.marked == true){
                    node.data.marked = false;
                    tree.set_icon(node, '../img/folder.png');
                    tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });
                }
                else {
                    node.data.marked = true;
                    tree.set_icon(node, '../img/red-x.png');
                    tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });
                }
            }
        },
        iterateItem: {
          label: "Iterate",
          action: function (){
            // TODO takes you to iteration page and iterates on specific node's children - wont work on leaf
            alert("TODO");
          }
        },
        noteItem: {
          label: "Note",
          action: function (){
            alert("TODO");
            tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });
          }
        }
    };

    if ($(node).hasClass("folder")) {
        // Delete the "delete" menu item
        delete items.deleteItem;
        tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });
    }

    return items;
};

function save(){
  var tree = $('#tree').jstree(true);
  if(tree != null){
    v = $("#tree").jstree(true).get_json('#', { 'flat': true });
    tree_data = $("#tree").jstree(true).get_json('#', { 'flat': true });
    $("#json_render").text(JSON.stringify(v, null, 4));
  }
};

function convertDate(d){
    return Math.round(d.getTime()/86400000);
};
