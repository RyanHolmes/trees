"use strict";
class Node {
  // literally nothing
};
Node.prototype.create = function (id, text, children) {
  this.id = id;
  this.text = text;
  this.children = children;
};

Node.prototype.setDate = function (date) {
  this.date = date;
};

Node.prototype.children = [];
