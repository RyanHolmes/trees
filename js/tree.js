var tree_data;

$(document).ready(function(){
  $("#json_render").width($("#mainTree").width())
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
            var newNode = tree.create_node(tree.get_selected(), "new node");
            tree.get_node(newNode).data = { "create_date": new Date() };
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
