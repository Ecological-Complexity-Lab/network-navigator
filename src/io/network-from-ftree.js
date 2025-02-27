/**
 * @file This file deals with creating a Network from FTree data.
 * The FTree data is typically generated from the function parseFTree.
 *
 * @see parseFTree
 * @see Network
 *
 * @author Anton Eriksson
 */

import { byFlow } from "../lib/filter";
import * as Network from "../lib/network";
import TreePath from "../lib/treepath";


/**
 * Construct a network from ftree data
 *
 * @param {Object} ftree
 * @return {Network} the constructed network
 */
export default function networkFromFTree(ftree) {
  const root = Network.createNetwork("root");
  root.directed = ftree.meta.directed;
  const { tree, links, attributes, interLinks } = ftree.data;

  root.interLinks = interLinks;
  // Create the tree structure
  links.forEach((node) => {
    if (node.path === "root") {
      root.links = node.links;
    } else {
      const childNode = TreePath.toArray(node.path)
        .reduce((pathNode, childId) => {
          let child = pathNode.getNode(childId);
          if (!child) {
            child = Network.createNetwork(childId);
            child.parent = pathNode;
            child.path = TreePath.join(pathNode.path, child.id);
            pathNode.addNode(child);
          }
          return child;
        }, root);

      if (node.name) {
        childNode.name = node.name;
      }
      childNode.enterFlow = node.enterFlow;
      childNode.exitFlow = node.exitFlow;
      childNode.links = node.links;

      if(node){

      }
    }
  });

  // Add the actual nodes
  tree.forEach((node) => {
    const path = TreePath.toArray(node.path);
    const childNode = Network.createNode(path.pop(), node.name, node.flow, node.node);

    const parent = path
      .reduce((pathNode, childId) => {
        pathNode.flow += node.flow;
        pathNode.largest.push(childNode);
        pathNode.largest.sort(byFlow);
        if (pathNode.largest.length > 4) {
          pathNode.largest.pop();
        }
        return pathNode.getNode(childId);
      }, root);

    parent.flow += node.flow;
    parent.largest.push(childNode);
    parent.largest.sort(byFlow);
    if (parent.largest.length > 4) {
      parent.largest.pop();
    }
    childNode.parent = parent;
    childNode.path = TreePath.join(parent.path, childNode.id);
    parent.addNode(childNode);
  });


  var i,j;
   if (Object.keys(attributes).length > 0) {
    for (i = 0; i < root.nodes.length; ++i) {
      for (j = 0; j < root.nodes[i].nodes.length; ++j) {
        const attribute = attributes[root.nodes[i].nodes[j].id]
        root.nodes[i].nodes[j].attributes = attribute;

        for (const [key, value] of Object.entries(attribute)) {
          if (!isNaN(value) && key !== 'id') {
            if (key in root.maxAttributes) {
              if (value > root.maxAttributes[key]) {
                root.maxAttributes[key] = value;
              }
            } else {
              root.maxAttributes[key] = value;
            }
          }
        }
      }
    }
   }

  Network.connectLinks(root);

  return root;
}
