const customData = [{nodes: [{id: "CS", x: 154, y: 299},
 {id: "SE", x: 215, y: 395},
 {id: "POW", x: 333, y: 351},
 {id: "EE", x: 171, y: 493}
],links: [{source: "CS", target: "SE"},
 {source: "CS", target: "POW"},
 {source: "CS", target: "EE"},
 {source: "SE", target: "CS"},
 {source: "SE", target: "POW"},
 {source: "SE", target: "EE"},
 {source: "POW", target: "CS"},
 {source: "POW", target: "SE"},
 {source: "POW", target: "EE"},
 {source: "EE", target: "CS"},
 {source: "EE", target: "SE"},
 {source: "EE", target: "POW"}
]}];
export default customData;