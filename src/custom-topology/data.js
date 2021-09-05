const customData = [{nodes: [{id: "node1", x: 240, y: 486},
 {id: "node2", x: 343, y: 392},
 {id: "node3", x: 418, y: 106},
 {id: "node4", x: 242, y: 218}
],links: [{source: "node1", target: "node4"},
 {source: "node1", target: "node2"},
 {source: "node2", target: "node1"},
 {source: "node2", target: "node3"},
 {source: "node3", target: "node4"},
 {source: "node3", target: "node2"},
 {source: "node4", target: "node1"},
 {source: "node4", target: "node3"}
]}];
export default customData;