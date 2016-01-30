"use strict";
class Node {
  // literally nothing
};
Node.prototype.create = function (id, text, children) {
  this.id = id;
  this.text = text;
  this.children = children;
  console.log(this);
};
Node.prototype.children = [];
