// https://observablehq.com/@emfielduva/dvlib_layout@276
import define1 from "./cd4e11b4fb179a94@89.js";

function _1(md){return(
md`# dvlib_layout
functions implementing d3 layout`
)}

function _2(md){return(
md`**linegraph** : a pretty basic line graph`
)}

function _lineGraph(d3,toNum){return(
(elem, data, xField, yField, xScale, yScale, options) => {	
	// options transitionMS, curveType, className
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.className) === "undefined") {options.className = "line"}
  
  let line = d3.line()
		.x(d => xScale(toNum(d[xField])))
		.y(d => yScale(toNum(d[yField])));
	
	if (options.curveType) {line.curve(options.curveType)};		//.curve(d3.curveStep)	// d3.curveNatural, d3.curveLinear, d3.curveStep
	
	let graph = elem.selectAll("." + options.className)
		.data([data])
		.join("path")
			.classed(options.className, true)
			.transition().duration(options.transitionMS)
			.attr("d", line);
	return graph;
}
)}

function _4(md){return(
md`**multiLineGraph** : same as line graph, but provide a list/array ["f1","f2","f3"] of field names to the yFieldSet input.
this routine presumes a single data set and multiple fields from that dataset, on the same scale.`
)}

function _multiLineGraph(d3,toNum){return(
(elem, data, xField, yFieldSet, xScale, yScale, options) => {	
	// options colorSet, transitionMS, curveType, className
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.colorSet) === "undefined") {options.colorSet = d3.schemeCategory10}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.className) === "undefined") {options.className = "line"}
  
  let linesData = [];
	yFieldSet.forEach(yField => {
		let fieldData = data.map(d => ({xField: d[xField], yField: d[yField]}));
		linesData.push(fieldData);
	})
	
	if (options.curveType) {line.curve(options.curveType)};	

	let line = d3.line()
		.x(d => xScale(toNum(d["xField"])))
		.y(d => yScale(toNum(d["yField"])));
	
	let graph = elem.selectAll("." + options.className)
		.data(linesData)
		.join("path")
			.classed(options.className,true)
			.transition().duration(options.transitionMS)
			.attr("d", line)
			.style("stroke",(d,i) => options.colorSet[i]);
	return graph;
}
)}

function _6(md){return(
md`**areaGraph** : filled in area between two lines.  
Reference William Playfair's very first line graph.`
)}

function _areaGraph(d3,toNum){return(
(elem, data, xField, yField1, yField2, xScale, yScale, options) => {
	// options transitionMS, curveType, className
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.className) === "undefined") {options.className = "area"}

  let area = d3.area()
		.x(d => xScale(toNum(d[xField])))
		.y0(d => yScale(isNaN(yField1) ? toNum(d[yField1]) : yField1))
		.y1(d => yScale(isNaN(yField2) ? toNum(d[yField2]) : yField2))
	
	if (options.curveType) {area.curve(options.curveType)};
	
	let graph = elem.selectAll("." + options.className)
		.data([data])
		.join("path")
			.classed(options.className,true)
			.transition().duration(options.transitionMS)
			.attr("d", area);
	return graph;
}
)}

function _8(md){return(
md`**dvSparkLine** : basic sparkline.  Like a bar graph, but more spare, cleaner, often visually smaller and more dense.`
)}

function _dvSparkline(d3,toNum){return(
(elem, data, xField, yField, xScale, yScale, options) => {
	// options yCenterValue, transitionMS, className
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.className) === "undefined") {options.className = "sparkline"}
	if (typeof(options.yCenterValue) === "undefined") {options.yCenterValue = 0}
  
  let sl;
	if (typeof(elem) == "object") {sl = elem}
	else if (typeof(elem) == "string") {sl = d3.select("#"+elem);}
	else {console.log("Problem withe element passed to sparkline.")}
	
	let thissparkline = elem.selectAll("." + options.className)
		.data(data)
		.join("line")
			.classed(options.className, true)
			.transition().duration(options.transitionMS)
			.attr("x1", d => xScale(toNum(d[xField])))
			.attr("y1", d => yScale(toNum(options.yCenterValue)))
			.attr("x2", d => xScale(toNum(d[xField])))
			.attr("y2", d => yScale(toNum(d[yField])));
	return thissparkline;
}
)}

function _10(md){return(
md`**dvDonut** : Pie or Donut chart`
)}

function _dvDonut(d3){return(
function dvDonut(elem,dataSet,outerRadius,innerRadius,options) {
  // options: colorSet, sort, sortValues, startAngleRadians, endAngleRadians, padAngleRadians
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.colorSet) === "undefined") {options.colorSet = d3.schemeCategory10}  // give it something to show
  if (typeof(options.sort) === "undefined") {options.sort = null}   // default to order of the data
  if (typeof(options.sortValues) === "undefined") {options.sortValues = null}
  if (typeof(options.startAngleRadians) === "undefined") {options.startAngleRadians = 0}
  if (typeof(options.padAngleRadians) === "undefined") {options.padAngleRadians = 0}

  var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  // setup pie calculation
  var pie = d3.pie()
    .sort(options.sort)
    .sortValues(options.sortValues)
    .startAngle(options.startAngleRadians)
    .padAngle(options.padAngleRadians)
    .value(function(d) {return d[1];});

  if (typeof(options.endAngleRadians) !== "undefined") {
    pie.endAngle(options.endAngleRadians)
  }

  //Set up groups
  var arcs = elem.selectAll("g.piearc")
    .data(pie(dataSet))
    .enter().append("g")
      .classed("piearc", true)
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

  //Draw arc paths
  arcs.append("path")
    .attr("class", function(d) {return d.data[0]})    // the key from the rollup
    .attr("d", arc);
  
  // Apply a fill from colors if requested.  Otherwise Classes will be used if have style properties.
  // Classes will override this anyway.
  if (typeof(options.colorSet) !== "undefined") {
    if (typeof(options.colorSet) === "object" && !Array.isArray(options.colorSet)) {
      // its an object, presumedly in key:value format
      arcs.style("fill", function(d,i) {return options.colorSet[d.data[0]]})
    } else if ((Array.isArray(options.colorSet)) && (options.colorSet.filter(Array.isArray).length == 0)) {
      // simple array of colors in order
      arcs.style("fill", function(d,i) {return options.colorSet[i]})
    }
  }

  //Labels
  arcs.append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ") rotate(" + angle(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.data[0]; });

  // a function to calculate angles
  function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI;
    return a > 180 ? a + 90 : a - 90;
  }
	
	return arcs;
}
)}

function _12(md){return(
md`**Pixel Matrix (rectangles)** like FiveThirtyEight Gun Deaths.
maybe add an alternative here to make dots instead of rects.  Option for rx attribute in options.`
)}

function _dvPixelMatrix(d3){return(
function dvPixelMatrix(elem, data, totalRows, boxSize, colorSet, colorByField, options) {
  // data can be unsorted or already sorted
	// colors needs to be in a key:value pair right now.  Later style changes on returned object can modify this.

	// options transitionMS, className, startX, startY, padding, roundRadius
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.className) === "undefined") {options.className = "pixel"}
  if (typeof(options.startX) === "undefined") {options.startX = 0;}
  if (typeof(options.startY) === "undefined") {options.startY = 0;}
  if (typeof(options.padding) === "undefined") {options.padding = 1;}
  if (typeof(options.roundRadius) === "undefined") {options.roundRadius = 0;}
  
  let curCol=0, curRow=0;

  let pixels = elem.selectAll("." + options.className)
    .data(data)
    .join("rect")
      .each((d,i,nodes) => {
        let posX = options.startX + curCol * (boxSize + options.padding);
        let posY = options.startY + curRow * (boxSize + options.padding);
  
        d3.select(nodes[i])
        .classed(options.className,true)
        .transition().duration(() => options.transitionMS ? options.transitionMS : 0)
          .attr("x", posX)
          .attr("y", posY)
          .attr("width",boxSize)
          .attr("height",boxSize)
          .style("fill", function(d) {return colorSet[d[colorByField]]});
    
        if (curRow < totalRows) {
            curRow++;
        } else {
            curRow = 0;
            curCol++;
        }
      });

  if (options.roundRadius > 0) {
    pixels.attr("rx", options.roundRadius);
  }
  
	return pixels;
}
)}

function _14(md){return(
md`## D3 Layout Engine`
)}

function _15(md){return(
md`**layoutChildren** : Construct layout data hierarchy
transforming data into the proper arrangement for typical d3 layouts.  
turns flat JSON data into hierarchical format with root node, "children", and if necessary grandchildren and great-grandchildren...  
nearly all of the d3 layout functions need data in this format.`
)}

function _layoutChildren(){return(
function layoutChildren(name, data) {
	let setChildren = (d) => {
		d.name=d[0];
		d.children=d[1];
		d.children.forEach(d => {if (typeof d[1] == "object") {setChildren(d)}})		//recurse
	}
	data.forEach(d => {if (typeof d[1] == "object") {setChildren(d)}});		// set deeper layers
	let dataHierarchy = {"name":name, "children": data};	// set top level.
	return dataHierarchy;
}
)}

function _17(md){return(
md`**Treemap**`
)}

function _dvTreemap(d3,toNum){return(
function dvTreemap(elem,data,sizeX,sizeY,sizeField,options) {
  // options: classField, textLabelField, transitionMS, colorSet, tilingMethod
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.paddingInner) === "undefined") {options.paddingInner = 1}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.colorSet) === "undefined") {options.colorSet = d3.schemeCategory10}
  if (typeof(options.tilingMethod) === "undefined") {options.tilingMethod = d3.treemapSquarify}

  var root, nodes;

	// setup the treemap layout
	var treemap = d3.treemap()
		.tile(options.tilingMethod)   // see the API docs
		.size([sizeX, sizeY])
		.paddingInner(options.paddingInner);

	// setup the data hierarchy
	root = d3.hierarchy(data)
		.sum(function(d){return d[sizeField] ? toNum(d[sizeField]) : toNum(d[1])});    // defines the field used for sizing

	nodes = root.leaves();
	treemap(root);     // calculate the layout from the data using the treemap definition (above)

	// now draw it, each as a grouped rect and text (text are hidden to start)
	var node = elem.selectAll(".node")
		.data(nodes);
	
	node.enter().append("g")
		.each(function(n){
				d3.select(this).attr("class", "node").attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
				d3.select(this).append("rect");
				d3.select(this).append("text").attr("x", 2).attr("y", 15);
			})
		.merge(node)
			.each(function(n){
				d3.select(this)
					.transition().duration(options.transitionMS)
					.attr("transform", function(n) {return "translate(" + n.x0 + "," + n.y0 + ")"})
					.select("rect")
						.attr("width",function(n) {return n.x1 - n.x0;})
						.attr("height",function(n) {return n.y1 - n.y0;})
						.attr("class", function(n) {if (typeof(options.classField) !== "undefined") {return n.data[options.classField]} else {return n.data[0]}})
						.attr("fill", function(n,i) {return options.colorSet[i]});
				
				if (typeof(options.textLabelField) !== "undefined") {
          d3.select(this).select("text")
  						.text(function(n) { return n.data[options.textLabelField] ? n.data[options.textLabelField] : n.data[0]; });
        }
			});
	node.exit().remove();
	return node;
}
)}

function _19(md){return(
md`#### Pack Circles`
)}

function _dvPackCircles(d3,toNum){return(
function dvPackCircles(elem,data,sizeX,sizeY,sizeField,options) {		
  // options: padding, transitionMS, classField, textLabelField
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.padding) === "undefined") {options.padding = 0}
  
  
  var root, nodes;

	// setup the pack layout
	let pack = d3.pack()
		.size([sizeX, sizeY])
		.padding(options.padding);

	// setup the data hierarchy
	root = d3.hierarchy(data)
		.sum(function(d){return d[sizeField] ? toNum(d[sizeField]) : toNum(d[1])});

	nodes = root.descendants();
	pack(root);     // calculate the packing layout from the data based on the pack definition (above)

	// now draw it, each as a grouped circle and text (text are hidden to start)
	let node = elem.selectAll(".node")
		.data(nodes);

	node.enter().append("g")
			.each(function(n){
				d3.select(this).attr("class", "node").attr("transform","translate("+sizeX/2+","+sizeY/2+")");	// starts them in the center
				d3.select(this).append("circle");
				d3.select(this).append("text");
			})
		.merge(node)
			.each(function(n) {
				d3.select(this)
					.transition().duration(options.transitionMS)
					.attr("transform", function(n) {return "translate(" + n.x + "," + n.y + ")";})
					.select("circle")
						.attr("r",function(n) {return n.r})
						.attr("class", function(n) {return n.data[options.classField] ? n.data[options.classField] : n.data[0]});

				d3.select(this).select("text")
					.text(function(n) {return n.data[options.textLabelField] ? n.data[options.textLabelField] : n.data[0];})
					.style("visibility", function(n) {
							let word = n.data[options.textLabelField] ? n.data[options.textLabelField] : n.data[0];
							if (word && n.r > (word.length * 2.5)) {
								return "visible";
							} else {
								return "hidden";
							}
						});
		});

	node.exit().remove();
	
	return node;
}
)}

function _21(md){return(
md`#### Cluster Dendogram`
)}

function _dvClusterDendogram(d3,toNum,rFromArea){return(
function dvClusterDendogram(elem,data,sizeX,sizeY,scaleR) {
	// setup the layout - this one is a cluster dendogram
	var pack = d3.cluster()
		.size([sizeX, sizeY]);

	// setup the data hierarchy
	let root = d3.hierarchy(data)
		.sum(function(d){return toNum(d[1])});

	let nodes = root.descendants();
	pack(root);     // calculate the packing layout from the data based on the pack definition (above)

	// now draw it
	var link = elem.selectAll(".link")
		.data(nodes.slice(1))
		.enter().append("path")
			.attr("class", "link")
			.attr("d", function(d) {
			return "M" + d.y + "," + d.x
				+ "C" + (d.parent.y + 100) + "," + d.x
				+ " " + (d.parent.y + 100) + "," + d.parent.x
				+ " " + d.parent.y + "," + d.parent.x;
			});

	var node = elem.selectAll(".node")
		.data(nodes)
		.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
	
	node.append("circle")
		.attr("r",function(d) { return rFromArea(d.value) * scaleR; })
		.attr("class", function(d) {return d.data[0]});

	node.append("text")
		.text(function(d) {return d.data[0]});
	
	return node;
}
)}

function _23(md){return(
md`#### Sunburst`
)}

function _dvSunburst(d3,toNum){return(
function dvSunburst(elem,dataSet,width,options) {
  // options: textAngleTresholdRadians
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.textAngleTresholdRadians) === "undefined") {options.textAngleTresholdRadians = 0.1}

  // setup the layout
  var partition = d3.partition();
  var radius = width / 2 - 10;
  var formatNumber = d3.format(",d");
  var x = d3.scaleLinear().range([0, 2 * Math.PI]);
  var y = d3.scaleSqrt().range([0, radius]);

  // definition for structuring the sunburst arc geometry
  let arc = d3.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

  // setup the data hierarchy
  let root = d3.hierarchy(dataSet)
      .sum(function(d){return toNum(d[1])});    // the field for sizing

  let nodes = root.descendants();
  partition(root);     // calculate partition layout from data and definition (above)

  let node = elem.selectAll("g.node")
      .data(nodes)
      .join("g")
          .attr("class","node");

  node.append("path")
    .attr("class", function(d) {return d.data[0] + " burstpath";})
    .transition().duration(1000)
    .attr("d", arc);

  node.append("title")
          .text(function(d) { return d.data[0] + "\n" + formatNumber(d.data[1]); });

  //Labels
  node.append("text")
      .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ") rotate(" + angle(d) + ")";
      })
      .attr("text-anchor", "middle")
      .style("visibility", function(d){ 
          // hide text elements for slices that are to small.  Angle value in radians.
          if(arc.endAngle()(d)-arc.startAngle()(d) < options.textAngleTresholdRadians){return "hidden";}
      })
      .text(function(d) { return d.data[0]; });

  // a function to calculate angles
  function angle(d) {
      var a = (arc.startAngle()(d) + arc.endAngle()(d)) * 90 / Math.PI;
      return a > 180 ? a + 90 : a - 90;
  }
	
	return node;
}
)}

function _25(md){return(
md`**Clusters**`
)}

function _force(d3,nodes){return(
d3.forceSimulation(nodes)
)}

function _nodes(){return(
[]
)}

function _foci(){return(
""
)}

function _dvCluster(nodes,$0,force,d3,rFromArea){return(
function dvCluster(elem,data,width,height,sizeField,options) {	
  nodes.length = 0;   // clear any existing node data (not node, the svg elements.)   // do I want this??
  
  // options: startFoci, fociField, strength, kFactor, collisionFactor, alphaTarget, alphaMin, maxRadius, dotScaleFactor, colorSet
	if (typeof(options) === "undefined") {var options = {}}
	if (typeof(options.strength) === "undefined") {options.strength = -1}
	if (typeof(options.kFactor) === "undefined") {options.kFactor = 0.1}
	if (typeof(options.collisionFactor) === "undefined") {options.collisionFactor = 1.1}
	if (typeof(options.alphaTarget) === "undefined") {options.alphaTarget = 0.1}
	if (typeof(options.alphaMin) === "undefined") {options.alphaMin = 0.1}
	if (typeof(options.maxRadius) === "undefined" || options.maxRadius == '') {options.maxRadius = 20}
	if (typeof(options.dotScaleFactor) === "undefined" || options.dotScaleFactor == '') {options.dotScaleFactor = 0.005}
	if (typeof(options.startFoci) === "undefined" || options.startFoci == '') {
		let xStart = !isNaN(width) ? width/2 : 100;
		let yStart = !isNaN(height) ? height/2 : 100;
		let defaultFoci = [{x:xStart,y:yStart}];
		$0.value = defaultFoci;
	} else {
    $0.value = options.startFoci;
  }
	if (options.alphaTarget > options.alphaMin) {console.log("Warning: alphaTarget > alphaMin.  Simulation will run forever.")}

	// Setup the Force Simulation (the algorithm that does this)
	force
		.force('nbody', d3.forceManyBody().strength(options.strength))
		.force('foci', alpha => {
			for (var i = 0, n = nodes.length, o, k = alpha * options.kFactor; i < n; ++i) {
				o = nodes[i];
				if (o.id in $0.value) {
          o.vx += ($0.value[o.id].x - o.x) * k;
  				o.vy += ($0.value[o.id].y - o.y) * k;
        } else {
          console.log(o.id + " is not found in foci set");
        }
			}
		})
		.force('collision', d3.forceCollide(function (d) {return options.collisionFactor*d.r;}))
		.alphaTarget(options.alphaTarget)
		.alphaMin(options.alphaMin)
		.on("tick", tick);

	// the tick is what updates their position.
	function tick(e) {
		node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	}
	
	// this creates the dots
	function addDots(dot) {            
		let fociID;
    var radius = rFromArea(dot[sizeField]) * options.dotScaleFactor;
		if (isFinite(sizeField)) {radius = sizeField};
		if (radius < 0 || isNaN(radius)) {radius = 1;}
		if (typeof(options.fociField) !== "undefined") {fociID = dot[options.fociField]} else {fociID = 0;}
		nodes.push({
			id: fociID,
			x: 0,
			y: 0, 
			r: radius,
			data: dot
		});     
	}

  function drawNodes() {
    node = svgElem.selectAll("circle").data(nodes);
		node = node.join("circle")		// was .enter().append("circle")
			.attr("class", function(d) { return "node" + options.classField ? d.data[options.classField] : ""})
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r", function(d) {return d.r})
			.style("fill", function(d) {return options.colorSet ? options.colorSet[d.id] : ""});
  }
  
	// draw it.
	let svgElem = elem;
	let node = svgElem.selectAll(".node");
	data.forEach(function(d){addDots(d)});
  force.nodes(nodes);
  drawNodes();
  
	return node;
}
)}

function _dvClusterMoveNodes($0,nodes,force){return(
function dvClusterMoveNodes(newFoci,fociField) {
	// This makes the dots move.  
	// The id setting being changed here maps to a new foci point.
	// and by changing the id, the force simulation knows to move it.
	if (newFoci) {
		$0.value = newFoci;
    if (fociField) {
      nodes.forEach(function(n){n.id = n.data[fociField]});
    } else if (Array.isArray(newFoci) && newFoci.length == 1) {
      nodes.forEach(function(n){n.id = 0});
    }
		force.alpha(1);
		force.restart();
	} else {
		console.log("No foci or foci field name provided.");
	}
}
)}

function _dvClusterFociLabels(){return(
function dvClusterFociLabels(elem,fociSet,options) {
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.offsetX) === "undefined") {options.offsetX = 0}
  if (typeof(options.offsetY) === "undefined") {options.offsetY = 0}
  
  // branch on type of foci object coming in.
  let fociData, fociType;
  if (!Array.isArray(fociSet)) {fociData = Object.entries(fociSet); fociType = "object";} // convert Object into Array.
  else {fociData = fociSet; fociType = "array";}
  
  let labels = elem.selectAll(".fociLabel")
    .data(fociData)
    .join("text")
      .classed("fociLabel",true)
      .text(d => fociType == "object" ? d[0] : d.name)
      .attr("x", d => {let x = fociType=="object" ? d[1].x : d.x; return x + options.offsetX})
      .attr("y", d => {let y = fociType=="object" ? d[1].y : d.y; return y + options.offsetY})
  return labels;
}
)}

function _32(md){return(
md`### Beeswarm`
)}

function _dvBeeswarmForce(nodes,d3,$0,force,rFromArea,toNum){return(
function dvBeeswarmForce(elem,data,width,height,sizeField,options) {	
  nodes.length = 0;   // clear any existing node data (not node, the svg elements.)   // do I want this??
  
  // options: fociField, strength, kFactor, collisionFactor, alphaTarget, alphaMin, maxRadius, dotScaleFactor, colorSet
	if (typeof(options) === "undefined") {var options = {}}
	if (typeof(options.strength) === "undefined") {options.strength = -1}
	if (typeof(options.kFactor) === "undefined") {options.kFactor = 0.1}
	if (typeof(options.collisionFactor) === "undefined") {options.collisionFactor = 1.1}
	if (typeof(options.alphaTarget) === "undefined") {options.alphaTarget = 0.1}
	if (typeof(options.alphaMin) === "undefined") {options.alphaMin = 0.1}
	if (options.alphaTarget > options.alphaMin) {console.log("Warning: alphaTarget > alphaMin.  Simulation will run forever.")}
  if (typeof(options.maxRadius) === "undefined" || options.maxRadius == '') {options.maxRadius = 20}
	if (typeof(options.dotScaleFactor) === "undefined" || options.dotScaleFactor == '') {options.dotScaleFactor = 0.005}

  // options.axisField
  // options.axisScaleFunction
  // create axisScaleFunction if it is not passed in through options.
  if (typeof(options.axisScaleFunction) === "undefined") {
    let scaleField;
    if (typeof(options.axisField) === "undefined") {
      options.axisScaleFunction = d3.scaleLinear().domain([0,1000]).range([0,width]);
    } else {
      if (typeof(options.axisField) === "string") {scaleField = options.axisField}
      options.axisScaleFunction = d3.scaleLinear().domain(d3.extent(data, d => d[scaleField])).range([0,width]);
    }
  }

  // set positions for swarm lines.  could be either horizontal or vertical.  default is horizontal at middle.
  if (typeof(options.direction) === "undefined") {options.direction = "horizontal"}
  if (typeof(options.fociPositions) === "undefined") {
    if (options.direction == "horizontal" || options.direction == "h") {options.fociPositions = {default: height/2}}
    else if (options.direction == "vertical" || options.direction == "v") {options.fociPositions = {default: width/2}}
  }
  $0.value = options.fociPositions;            // default or passed in
  
	// Setup the Force Simulation (the algorithm that does this)
	force
		.force('nbody', d3.forceManyBody().strength(options.strength))
		.force('foci', alpha => {
			for (var i = 0, n = nodes.length, o, k = alpha * options.kFactor; i < n; ++i) {
				o = nodes[i];
        if (typeof(options.axisField) !== "undefined" && options.axisField != "") {
          if (options.direction == "horizontal" || options.direction == "h") {
            o.vx += (o.axisPos - o.x) * k;
            o.vy += ($0.value[o.id] - o.y) * k;
          } else if (options.direction == "vertical" || options.direction == "v") {
            o.vx += ($0.value[o.id] - o.x) * k;
            o.vy += (o.axisPos - o.y) * k;
          }
        } else {
          o.vx += (width/2 - o.x) * k;
          o.vy += (height/2 - o.y) * k;
        }
			}
		})
		.force('collision', d3.forceCollide(function (d) {return options.collisionFactor*d.r;}))
		.alphaTarget(options.alphaTarget)
		.alphaMin(options.alphaMin)
		.on("tick", tick);

	// the tick is what updates their position.
	function tick(e) {
		node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	}
	
	// this creates the dots
	function addDots(dot) {            
		let fociID;
    let axisPosition;
    var radius = rFromArea(dot[sizeField]) * options.dotScaleFactor;
		if (isFinite(sizeField)) {radius = sizeField};
		if (radius < 0 || isNaN(radius)) {radius = 1;}
		if (typeof(options.fociField) !== "undefined") {fociID = dot[options.fociField]} else {fociID = "default";}
    if (typeof(options.axisField) !== "undefined") {axisPosition = options.axisScaleFunction(toNum(dot[options.axisField]))} else {axisPosition = options.axisScaleFunction(0);}
		nodes.push({
			id: fociID,
      axisPos: axisPosition,
			x: 0,   // could also set starting position to center or other input?   
			y: 0, 
			r: radius,
			data: dot
		});     
	}

  function drawNodes() {
    node = svgElem.selectAll("circle").data(nodes);
		node = node.join("circle")
			.attr("class", function(d) { return "node" + options.classField ? d.data[options.classField] : ""})
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r", function(d) {return d.r})
			.style("fill", function(d) {return options.colorSet ? options.colorSet[d.id] : ""});
  }
  
	// draw it.
	let svgElem = elem;
	let node = svgElem.selectAll(".node");
	data.forEach(function(d){addDots(d)});    // adds each time we run.  would rather join.
  force.nodes(nodes);
  drawNodes();
  
	return node;
}
)}

function _dvBeeswarmMoveNodes(d3,$0,nodes,toNum,force){return(
function dvBeeswarmMoveNodes(fociPositions,fociField,axisField,axisScaleFunction,direction) {
	// This makes the dots move.  
	// The id setting being changed here maps to a new foci point.
	// and by changing the id, the force simulation knows to move it.

  if (typeof(direction) === "undefined") {direction = "horizontal"}
  if (typeof(axisScaleFunction) === "undefined") {axisScaleFunction = d3.scaleLinear().domain([0,1000]).range([0,1000])}    //default it
  
  if (typeof(fociPositions) !== "undefined" && fociPositions != "") {
		$0.value = fociPositions;
    if (typeof(fociField) !== "undefined" && fociField != "") {
      nodes.forEach(function(n) {
        n.id = n.data[fociField];
        n.axisPos = axisScaleFunction(toNum(n.data[axisField]));
      });
    } else {
      nodes.forEach(function(n) {
        n.id = "default";
        n.axisPos = axisScaleFunction(toNum(n.data[axisField]));
      });
    }
		force.alpha(1);
		force.restart();
	} else {
		console.log("No foci provided.");
	}
}
)}

function _35(md){return(
md`#### Network Graph - nodes and edges`
)}

function _nodesFromLinks(){return(
function nodesFromLinks (links) {
  let nodes = []
  links.forEach(function(link) {
    if (!nodes.find(d=>d.id == link.source)) {nodes.push({id: link.source})}
    if (!nodes.find(d=>d.id == link.target)) {nodes.push({id: link.target})}
  });
  return nodes;
}
)}

function _dvNetworkGraph(d3,force,nodes,drag){return(
function dvNetworkGraph(elem, links, width, height, options) {
  //options: linkDistance, forceCharge, nodeRadius, textOffset, linkClassField, nodeClassField
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.linkDistance) === "undefined") {options.linkDistance = 100}
  if (typeof(options.forceCharge) === "undefined") {options.forceCharge = d3.forceManyBody()}
  if (typeof(options.nodeRadius) === "undefined") {options.nodeRadius = 3}
  if (typeof(options.textOffset) === "undefined") {options.textOffset = {x:8,y:4}}
  if (typeof(options.linkClassField) === "undefined") {options.linkClassField = ""}
  if (typeof(options.nodeClassField) === "undefined") {options.nodeClassField = ""}
  
  force
    .force("link", d3.forceLink(links).id(d => d.id).distance(options.linkDistance))
    .force("charge", options.forceCharge)
    .force("center", d3.forceCenter(width/2,height/2))
    .on("tick", tick);
  
  let path = elem.append("g").selectAll("path")
    .data(links)
    .join("path")
      .attr("class", function(d) {
        let myclass = "link";
        if (options.linkClassField != "") {myclass += " " + d[options.linkClassField]}
        return myclass;
      })
      .attr("marker-end", "url(#arrow)");

  let circle = elem.append("g").selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", options.nodeRadius)
      .attr("class", function(d) {
        let myclass = "node";
        if (options.nodeClassField != "") {myclass += " " + d[options.nodeClassField]}
        return myclass;
      })
      .call(drag(force));

  let text = elem.append("g").selectAll("text")
    .data(nodes)
    .join("text")
      .attr("x", options.textOffset.x)
      .attr("y", options.textOffset.y)
      .text(function(d) { return d.id; });

  // Use arc path to encode direction.
  function tick() {
    path.attr("d", linkArc);
    circle.attr("transform", transform);
    text.attr("transform", transform);
  }

  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }

  function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }
  return {links:path,nodes:circle,labels:text};
}
)}

function _drag(d3){return(
simulation => {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}
)}

function _39(md){return(
md`#### Word Cloud
requires \`d3Cloud = require("d3-cloud@1")\``
)}

function _d3Cloud(require){return(
require("d3-cloud@1")
)}

function _dvWordCloud(d3,d3Cloud){return(
function dvWordCloud (elem,data,width,height,options) {
	var words, countedWords, wordcloud;
	if (typeof(options) === "undefined") {var options = {}}
	if (typeof(options.maxWords) === "undefined") {options.maxWords = 1000;}
	if (typeof(options.rotate) === "undefined") {options.rotate = 0;}
	if (typeof(options.padding) === "undefined") {options.padding = 0;}
	if (typeof(options.fontScale) === "undefined") {options.fontScale = 15;}
	if (typeof(width) === "undefined" || width == '') {width = 300;}
	if (typeof(height) === "undefined" || height == '') {height = 200;}
	if (typeof(options.transitionMS) === "undefined" || options.transitionMS == '') {options.transitionMS = 0;}
	
	function splitWords (text) {
		let stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","));
		
    let words = text.split(/[\s.]+/g)
		  .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
		  .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
		  .map(w => w.replace(/['’]s$/g, ""))
		  .map(w => w.substring(0, 30))
		  .map(w => w.toLowerCase())
		  .filter(w => w && !stopwords.has(w));
    
		return words;
	}

	if (typeof(data) == "object") {
		// the data is already an array of words.
		countedWords = data;
	} else if (typeof(data) == "string") {
		// need to break the text into words
		words = splitWords(data);
		countedWords = d3.rollups(words, group => group.length, w => w)
			.sort(([, a],[, b]) => d3.descending(a,b))
			.slice(0,options.maxWords)
			.map(([text, value]) => ({text, value}));
	}
	//console.log(countedWords);
		
	const cloud = d3Cloud()
		.size([width,height])
		.words(countedWords)
		.padding(options.padding)
		.rotate(options.rotate)
		.fontSize(d => Math.sqrt(d.value) * options.fontScale)
		.on("end", drawCloud)
		.start();
	
	function drawCloud() {
		wordcloud = elem.selectAll("text")
			.data(countedWords)
			.join("text")
				.transition().duration(options.transitionMS)
				.style("font-size", d => d.size + "px")
				.attr("transform", d => "translate(" + [d.x, d.y] + ") rotate(" +d.rotate + ")")
				.text(d => d.text);
	}
	return wordcloud;
}
)}

function _42(md){return(
md`### Radar`
)}

function _dvRadar(d3,radiansFromDeg,toNum){return(
(elem,data,fields,width,options) => {
  // options include idField, classField
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.innerRadius) === "undefined") {options.innerRadius = 0}
  if (typeof(options.outerRadius) === "undefined") {options.outerRadius = width/2}
  if (typeof(options.minValue) === "undefined") {options.minValue = 0}
  if (typeof(options.maxValue) === "undefined") {options.maxValue = options.outerRadius}
  if (typeof(options.radiusScale) === "undefined") {options.radiusScale = d3.scaleLinear().domain([options.minValue,options.maxValue]).range([options.innerRadius,options.outerRadius])}
  if (typeof(options.arcLength) === "undefined") {options.arcLength = 360}
  if (typeof(options.arcStartDeg) === "undefined") {options.arcStartDeg = 0}
  if (typeof(options.centerPosition) === "undefined") {options.centerPosition = {x: width/2, y: width/2}}
  if (typeof(options.opacity) === "undefined") {options.opacity = 0.5}
  if (typeof(options.colorSet) === "undefined") {options.colorSet = "steelblue"}
  if (typeof(options.colorStroke) === "undefined") {options.colorStroke = "black"}
  if (typeof(options.spokelineStroke) === "undefined") {options.spokelineStroke = "gray"}
  if (typeof(options.transitionMS) === "undefined") {options.transitionMS = 0}
  if (typeof(options.tickFormat) === "undefined") {options.tickFormat = ""}
  if (typeof(options.tickSize) === "undefined") {options.tickSize = width/100}
  if (typeof(options.axisColor) === "undefined") {options.axisColor = "#ddd"}
  if (typeof(options.axisLabelTextSize) === "undefined") {options.axisLabelTextSize = width/20}
  if (typeof(options.axisLabelTextColor) === "undefined") {options.axisLabelTextColor = "#777"}
  if (typeof(options.axisLabelShow) === "undefined") {options.axisLabelShow = false}
  
  let spokeDeg = options.arcLength / fields.length;
  //let scaleAngle = d3.scaleLinear().domain([]).range([options.arcStartDeg,options.arcStartDeg+options.arcLength])
 
  const polygon = d3.lineRadial()
    .angle((d,i) => radiansFromDeg(i * spokeDeg))
    .radius(d => options.radiusScale(d))
    .curve(d3.curveLinearClosed);
  
  let recorddata = (record) => {
    let recorddata = [];
    fields.forEach(f => {
      recorddata.push(toNum(record[f]));
    });
    return recorddata;
  }

  let color = (d,i) => {
    let color;
    if (typeof(options.colorSet) === "string") {
      color = options.colorSet;
    } else if (typeof(options.colorSet) === "object") {
      color = options.colorSet[i];
    }
    return color;
  }

  // transform translate.  Radar charts center around 0,0 so shift the whole thing to see it.
  let radar = elem.select("g[id=radar]").node() ? elem.select("g[id=radar]") : elem.append("g").attr("id","radar");
  radar.attr("transform", "translate(" + options.centerPosition.x + " " + options.centerPosition.y + ")");
  
  // check for and create sublayers (groups) for parts of the radar
  let spokelinesLayer = radar.select("g[id=spokelines]").node() ? radar.select("g[id=spokelines]") : radar.append("g").attr("id","spokelines");
  let shapesLayer = radar.select("g[id=shapes]").node() ? radar.select("g[id=shapes]") : radar.append("g").attr("id","shapes");
  let labelsLayer = radar.select("g[id=labels]").node() ? radar.select("g[id=labels]") : radar.append("g").attr("id","labels");

  // draw the shapes
  let shapes = shapesLayer.selectAll("path")
    .data(data)
    .join("path")
      .transition().duration(options.transitionMS)
      .attr("d", d=> polygon(recorddata(d)))
      .style("stroke", options.colorStroke)
      .style("fill", (d,i) => color(d,i))
      .style("opacity", options.opacity);

  if (typeof(options.idField) !== "undefined" && options.idField != "") {shapes.attr("id", d => d[options.idField])}
  if (typeof(options.classField) !== "undefined" && options.classField != "") {shapes.attr("class", d => d[options.classField])}

  // draw spokelines
  let spokelines = spokelinesLayer.selectAll(".spokeline")
    .data(fields)
    .join("g")
      .classed("spokeline", true)
      .call(d3.axisBottom(options.radiusScale)
            .tickFormat(options.tickFormat)
            .tickSize(options.tickSize)
           )
      .style("color", options.axisColor)
      .attr("transform", (d,i) => {
        let angle = -90 + (i * spokeDeg);   // in deg. // adjust for partial angle versions when develop this.
        return "rotate(" + angle + ")";
      });
  
  // draw labels if requested
  if (options.axisLabelShow) {
    let labels = labelsLayer.selectAll(".spokelabel")
      .data(fields)
      .join("text")
        .classed("spokelabel", true)
        .style("text-anchor", (d,i) => (-90 + (i * spokeDeg)) > 90 ? "start" : "end")
        .style("font-size", options.axisLabelTextSize)
        .style("fill", options.axisLabelTextColor)
        .attr("x", options.outerRadius)
        .attr("dy", -options.axisLabelTextSize/5)
        .attr("transform", (d,i) => {
          let angle = -90 + (i * spokeDeg);   // in deg. // adjust for partial angle versions when develop this.
          let transform = "rotate(" + angle + ")";
          if (angle > 90 && angle < 270) {transform += " translate(" + 2*options.outerRadius + ",0) scale(-1,-1)"}
          return transform;
        })
        .text(d => d);
  }
  
  return radar;
}
)}

function _44(md){return(
md`### Rings - circle with hole mask`
)}

function _dvRing(){return(
(elem,outerRad,innerRad,options) => {
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.fillColor) === "undefined") {options.fillColor = "steelblue"}
  if (typeof(options.id) === "undefined") {options.id = "id" + Math.random()*100000}
  
  let mask = elem.select("defs").node() ? elem.select("defs") : elem.append("defs").append("mask").attr("id","h_"+options.id);
  mask.append("rect").attr("width", outerRad*2).attr("height", outerRad*2).attr("x", -outerRad).attr("y", -outerRad).attr("fill","white");
  mask.append("circle").attr("r",innerRad).attr("fill","black");

  let ring = elem.selectAll(".ring").node() ? elem.select(".ring") : elem.append("circle").classed("ring", true);
  ring.attr("id", options.id)
    .attr("r", outerRad)
    .attr("mask", "url(#h_" + options.id + ")")
    .attr("fill", options.fillColor)
    .classed("ring",true);
  
  return ring;
}
)}

function _46(md){return(
md`### Heatmap`
)}

function _dvHeatmap(d3,toNum){return(
(elem,data,xField,yField,valueField,options) => {
  // options
  if (typeof(options) === "undefined") {options = {}}
  if (typeof(options.boxSize) === "undefined") {options.boxSize = 5}
  if (typeof(options.boxSizeX) === "undefined") {options.boxSizeX = options.boxSize}
  if (typeof(options.boxSizeY) === "undefined") {options.boxSizeY = options.boxSize}
  if (typeof(options.startPos) === "undefined") {options.startPos = {x:0,y:0}}
  if (typeof(options.padding) === "undefined") {options.padding = 1}
  if (typeof(options.paddingX) === "undefined") {options.paddingX = options.padding}
  if (typeof(options.paddingY) === "undefined") {options.paddingY = options.padding}
  if (typeof(options.colorScale) === "undefined") {options.colorScale = d3.scaleLinear().domain(d3.extent(data,d=>toNum(d[valueField]))).range(["white","black"])}
  if (typeof(options.rotateColumnTextDeg) === "undefined") {options.rotateColumnTextDeg = -90}
  
  // build a list of the x and y entries, each entry shows up only once.
  let listOfYField = [];
  data.forEach(d => {if (!listOfYField.includes(d[yField])) {listOfYField.push(d[yField]);}});

  let listOfXField = [];
  data.forEach(d => {if (!listOfXField.includes(d[xField])) {listOfXField.push(d[xField]);}});
  
  let hm = elem.selectAll(".heatBox")
    .data(data)
    .join("rect")
      .classed("heatBox",true)
      .attr("title", d => d["Country Name"] + ": " + d.year)
      .attr("width", options.boxSizeX)
      .attr("height", options.boxSizeY)
      .attr("x", d => options.startPos.x + listOfXField.indexOf(d[xField]) * (options.boxSizeX + options.paddingX))
      .attr("y", d => options.startPos.y + listOfYField.indexOf(d[yField]) * (options.boxSizeY + options.paddingY))
      .attr("fill", d => options.colorScale(toNum(d[valueField])))

  let hm_labelY = elem.selectAll(".heatBoxLabelY")
    .data(listOfYField)
    .join("text")
      .style("text-anchor","end")
      .style("font-size", options.boxSizeY)
      .classed("heatBoxLabelY", true)
      .text(d => d)
      .attr("x", options.startPos.x - 5)
      .attr("y", (d,i) => options.startPos.y + i * (options.boxSizeY + options.paddingY) + options.boxSizeY)

  let hm_labelX = elem.selectAll(".heatBoxLabelX")
    .data(listOfXField)
    .join("text")
      .style("font-size", options.boxSizeX)
      .classed("heatBoxLabelX", true)
      .text(d => d)
      .attr("x", (d,i) => options.startPos.x + i * (options.boxSizeX + options.paddingX) + options.boxSizeX)
      .attr("y", options.startPos.y - 5)
      .attr("transform", (d,i,nodes) => {return "rotate(" + options.rotateColumnTextDeg + " " + nodes[i].getAttribute("x") + "," + nodes[i].getAttribute("y") + ")"});
  
  return hm;
}
)}

function _48(md){return(
md`-------`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("lineGraph")).define("lineGraph", ["d3","toNum"], _lineGraph);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("multiLineGraph")).define("multiLineGraph", ["d3","toNum"], _multiLineGraph);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("areaGraph")).define("areaGraph", ["d3","toNum"], _areaGraph);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("dvSparkline")).define("dvSparkline", ["d3","toNum"], _dvSparkline);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("dvDonut")).define("dvDonut", ["d3"], _dvDonut);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("dvPixelMatrix")).define("dvPixelMatrix", ["d3"], _dvPixelMatrix);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("layoutChildren")).define("layoutChildren", _layoutChildren);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("dvTreemap")).define("dvTreemap", ["d3","toNum"], _dvTreemap);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("dvPackCircles")).define("dvPackCircles", ["d3","toNum"], _dvPackCircles);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("dvClusterDendogram")).define("dvClusterDendogram", ["d3","toNum","rFromArea"], _dvClusterDendogram);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("dvSunburst")).define("dvSunburst", ["d3","toNum"], _dvSunburst);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("force")).define("force", ["d3","nodes"], _force);
  main.variable(observer("nodes")).define("nodes", _nodes);
  main.define("initial foci", _foci);
  main.variable(observer("mutable foci")).define("mutable foci", ["Mutable", "initial foci"], (M, _) => new M(_));
  main.variable(observer("foci")).define("foci", ["mutable foci"], _ => _.generator);
  main.variable(observer("dvCluster")).define("dvCluster", ["nodes","mutable foci","force","d3","rFromArea"], _dvCluster);
  main.variable(observer("dvClusterMoveNodes")).define("dvClusterMoveNodes", ["mutable foci","nodes","force"], _dvClusterMoveNodes);
  main.variable(observer("dvClusterFociLabels")).define("dvClusterFociLabels", _dvClusterFociLabels);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("dvBeeswarmForce")).define("dvBeeswarmForce", ["nodes","d3","mutable foci","force","rFromArea","toNum"], _dvBeeswarmForce);
  main.variable(observer("dvBeeswarmMoveNodes")).define("dvBeeswarmMoveNodes", ["d3","mutable foci","nodes","toNum","force"], _dvBeeswarmMoveNodes);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("nodesFromLinks")).define("nodesFromLinks", _nodesFromLinks);
  main.variable(observer("dvNetworkGraph")).define("dvNetworkGraph", ["d3","force","nodes","drag"], _dvNetworkGraph);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("d3Cloud")).define("d3Cloud", ["require"], _d3Cloud);
  main.variable(observer("dvWordCloud")).define("dvWordCloud", ["d3","d3Cloud"], _dvWordCloud);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("dvRadar")).define("dvRadar", ["d3","radiansFromDeg","toNum"], _dvRadar);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("dvRing")).define("dvRing", _dvRing);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("dvHeatmap")).define("dvHeatmap", ["d3","toNum"], _dvHeatmap);
  main.variable(observer()).define(["md"], _48);
  const child1 = runtime.module(define1);
  main.import("toNum", child1);
  main.import("rFromArea", child1);
  main.import("radiansFromDeg", child1);
  return main;
}
