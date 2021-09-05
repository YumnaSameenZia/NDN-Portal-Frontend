const customData = [{nodes: [{id: "UNIVH2C", x: 217, y: 412},
 {id: "MINHO", x: 142, y: 177},
 {id: "MSU", x: 223, y: 324},
 {id: "AVEIRO", x: 293, y: 246},
 {id: "BASEL", x: 150, y: 159},
 {id: "WU", x: 448, y: 191},
 {id: "NEU", x: 462, y: 350},
 {id: "UASLP", x: 159, y: 497},
 {id: "UIUC", x: 100, y: 317},
 {id: "COPELABS", x: 341, y: 145},
 {id: "PADUA", x: 187, y: 186},
 {id: "CNIC", x: 499, y: 434},
 {id: "LIP6", x: 311, y: 147},
 {id: "ANYANG", x: 258, y: 152},
 {id: "UFBA", x: 240, y: 439},
 {id: "MUMBAI_AWS", x: 223, y: 500},
 {id: "GIST", x: 471, y: 307},
 {id: "LACL", x: 364, y: 458},
 {id: "MICHIGAN", x: 134, y: 126},
 {id: "AFA", x: 247, y: 274},
 {id: "WASEDA", x: 290, y: 344},
 {id: "CORUNA", x: 271, y: 399},
 {id: "CSU", x: 392, y: 340},
 {id: "TNO", x: 106, y: 378},
 {id: "BERN", x: 154, y: 311},
 {id: "URJC", x: 364, y: 480},
 {id: "ARIZONA", x: 335, y: 483},
 {id: "SRRU", x: 255, y: 451},
 {id: "MEMPHIS", x: 455, y: 384},
 {id: "OSAKA", x: 349, y: 458},
 {id: "TONGJI", x: 469, y: 188},
 {id: "UCLA", x: 151, y: 452},
 {id: "UUM", x: 375, y: 300},
 {id: "QUB", x: 111, y: 337},
 {id: "SAVI", x: 479, y: 467},
 {id: "GOETTINGEN", x: 285, y: 122},
 {id: "UCLACS", x: 430, y: 450}
],links: [{source: "MICHIGAN", target: "NEU"},
 {source: "MICHIGAN", target: "MEMPHIS"},
 {source: "MICHIGAN", target: "UIUC"},
 {source: "MICHIGAN", target: "CSU"},
 {source: "WU", target: "ARIZONA"},
 {source: "ARIZONA", target: "CSU"},
 {source: "ARIZONA", target: "MEMPHIS"},
 {source: "UIUC", target: "CSU"},
 {source: "UIUC", target: "WU"},
 {source: "MEMPHIS", target: "WU"},
 {source: "MEMPHIS", target: "NEU"},
 {source: "CSU", target: "UCLACS"},
 {source: "LIP6", target: "MICHIGAN"},
 {source: "URJC", target: "LIP6"},
 {source: "URJC", target: "WU"},
 {source: "BASEL", target: "LIP6"},
 {source: "BASEL", target: "URJC"},
 {source: "WASEDA", target: "TONGJI"},
 {source: "ARIZONA", target: "WASEDA"},
 {source: "ANYANG", target: "WASEDA"},
 {source: "ANYANG", target: "TONGJI"},
 {source: "UIUC", target: "PADUA"},
 {source: "BASEL", target: "PADUA"},
 {source: "URJC", target: "PADUA"},
 {source: "COPELABS", target: "URJC"},
 {source: "COPELABS", target: "PADUA"},
 {source: "COPELABS", target: "LIP6"},
 {source: "BASEL", target: "GOETTINGEN"},
 {source: "PADUA", target: "GOETTINGEN"},
 {source: "WASEDA", target: "OSAKA"},
 {source: "GOETTINGEN", target: "OSAKA"},
 {source: "ANYANG", target: "OSAKA"},
 {source: "TONGJI", target: "OSAKA"},
 {source: "COPELABS", target: "MINHO"},
 {source: "BASEL", target: "MINHO"},
 {source: "PADUA", target: "MINHO"},
 {source: "URJC", target: "MINHO"},
 {source: "UFBA", target: "COPELABS"},
 {source: "UFBA", target: "MEMPHIS"},
 {source: "SRRU", target: "OSAKA"},
 {source: "SRRU", target: "ANYANG"},
 {source: "TNO", target: "GOETTINGEN"},
 {source: "TNO", target: "LIP6"},
 {source: "TNO", target: "BASEL"},
 {source: "SRRU", target: "MSU"},
 {source: "UCLACS", target: "MSU"},
 {source: "TNO", target: "MSU"},
 {source: "ANYANG", target: "MSU"},
 {source: "CNIC", target: "OSAKA"},
 {source: "BERN", target: "BASEL"},
 {source: "BERN", target: "AFA"},
 {source: "COPELABS", target: "AFA"},
 {source: "PADUA", target: "AFA"},
 {source: "MSU", target: "UUM"},
 {source: "SRRU", target: "UUM"},
 {source: "AFA", target: "MUMBAI_AWS"},
 {source: "OSAKA", target: "UUM"},
 {source: "UUM", target: "MUMBAI_AWS"},
 {source: "UASLP", target: "MEMPHIS"},
 {source: "UASLP", target: "ARIZONA"},
 {source: "UASLP", target: "UFBA"},
 {source: "MINHO", target: "CORUNA"},
 {source: "URJC", target: "CORUNA"},
 {source: "ANYANG", target: "GIST"},
 {source: "MINHO", target: "AVEIRO"},
 {source: "COPELABS", target: "AVEIRO"},
 {source: "AFA", target: "AVEIRO"},
 {source: "PADUA", target: "UNIVH2C"},
 {source: "COPELABS", target: "UNIVH2C"},
 {source: "URJC", target: "UNIVH2C"},
 {source: "WU", target: "MUMBAI_AWS"},
 {source: "UCLACS", target: "ARIZONA"},
 {source: "WU", target: "AVEIRO"},
 {source: "WU", target: "UNIVH2C"},
 {source: "WU", target: "UFBA"},
 {source: "UNIVH2C", target: "UFBA"},
 {source: "AVEIRO", target: "URJC"},
 {source: "UCLACS", target: "WU"},
 {source: "NEU", target: "SAVI"},
 {source: "MICHIGAN", target: "SAVI"},
 {source: "LIP6", target: "LACL"},
 {source: "BERN", target: "LACL"},
 {source: "UNIVH2C", target: "LACL"},
 {source: "QUB", target: "WU"},
 {source: "QUB", target: "TNO"},
 {source: "QUB", target: "LIP6"},
 {source: "QUB", target: "NEU"},
 {source: "UCLA", target: "ARIZONA"},
 {source: "UCLA", target: "WU"},
 {source: "UCLA", target: "UCLACS"},
 {source: "TONGJI", target: "CNIC"},
 {source: "ANYANG", target: "CNIC"},
 {source: "CSU", target: "UCLA"},
 {source: "ANYANG", target: "UCLA"},
 {source: "OSAKA", target: "ARIZONA"}
]}];
export default customData;