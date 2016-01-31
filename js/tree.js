var tree_data;

$(document).ready(function(){
  $("#json_render").width($("#main").width())
  var obj = getData();
  tree_data = obj;

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

  $(".search-input").keyup(function() {
      var searchString = $(this).val();
      console.log(searchString);
      $('#tree').jstree('search', searchString);
    });

});

function customMenu(node) {
    // The default set of all items
    var tree = $('#tree').jstree(true);
    var items = {
        addItem: {
          label: "Add Item",
          action: function () {
            tree.create_node(tree.get_selected(), "new node");
          }
        },
        renameItem: { // The "rename" menu item
            label: "Rename",
            action: function () {
              tree.edit(node);
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Delete",
            action: function () {
              tree.delete_node([node]);
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
    v = $("#tree").jstree(true).get_json('#', { 'flat': true });
    tree_data = v;
    $("#json_render").val(JSON.stringify(v))
  }
};
