// https://observablehq.com/@emfielduva/dvlib@89
function _1(md){return(
md`# dvlib`
)}

function _2(md){return(
md`A bunch of reusable code routines to quicken the pace.`
)}

function _toNum(){return(
(text) => {
  if (typeof(text) === "string") {return Number(text.replace(/,/g,''))}
  else {return text}
}
)}

function _spaceToUnderscore(){return(
(text) => {
	if (typeof(text) == "string") {text = text.replace(/ /g,'_');}
	return text;
}
)}

function _rFromArea(toNum){return(
(area) => {
  if (typeof(area) == "string") {area = toNum(area)}    // convert to a number if given a string.
  return Math.sqrt(area/Math.PI);   // get radius from an area value.  A = PI * r^2
}
)}

function _whFromRectArea(toNum){return(
(area,aspect) => {
	area = toNum(area);
	aspect = toNum(aspect);
	if (!aspect) {aspect = 1;}
	let h = Math.sqrt(area/aspect);
	let w = aspect * h;
	return {"width":w, "height":h};
}
)}

function _radiansFromDeg(toNum){return(
(deg) => {
	deg = toNum(deg);
	return deg * Math.PI / 180;
}
)}

function _degFromRadians(toNum){return(
(rad) => {
  rad = toNum(rad);
  return rad * 180 / Math.PI;
}
)}

function _polarXY(toNum,radiansFromDeg){return(
(magnitude,angle) => {
	magnitude = toNum(magnitude);
	angle = toNum(angle);
	let x = magnitude * Math.cos(radiansFromDeg(angle));
	let y = magnitude * Math.sin(radiansFromDeg(angle));
	return {"x":x, "y":y};
}
)}

function _centerXY(){return(
(elem) => {
	let bbox = elem.node().getBBox();
	return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}
)}

function _ticker(Promises){return(
function* (tickMS) {
  let i=0;
  while (true) {
    yield Promises.delay(tickMS, i++);
  }
}
)}

function _colorByID(d3,toNum){return(
(objectSet,data,objectIDfield,dataIDfield,dataValueField,extents,colorScale) => {
  let minValue = (typeof extents === 'undefined') ? d3.min(data, d => toNum(d[dataValueField])) : extents[0];
  let maxValue = (typeof extents === 'undefined') ? d3.max(data, d => toNum(d[dataValueField])) : extents[1];
  if (!colorScale) {colorScale = d3.scaleLinear().domain([minValue, maxValue]).range(["white","black"])};

  data.forEach(d => {
    objectSet.filter(o=>o[objectIDfield] == d[dataIDfield])
      .style("fill",colorScale(toNum(d[dataValueField])))
  })
}
)}

function _importSVGnode(DOMParser,d3){return(
(svgText) => {
  const document = (new DOMParser).parseFromString(svgText, "image/svg+xml");
  const svg = d3.select(document.documentElement).remove(); 
  return svg.node();
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("toNum")).define("toNum", _toNum);
  main.variable(observer("spaceToUnderscore")).define("spaceToUnderscore", _spaceToUnderscore);
  main.variable(observer("rFromArea")).define("rFromArea", ["toNum"], _rFromArea);
  main.variable(observer("whFromRectArea")).define("whFromRectArea", ["toNum"], _whFromRectArea);
  main.variable(observer("radiansFromDeg")).define("radiansFromDeg", ["toNum"], _radiansFromDeg);
  main.variable(observer("degFromRadians")).define("degFromRadians", ["toNum"], _degFromRadians);
  main.variable(observer("polarXY")).define("polarXY", ["toNum","radiansFromDeg"], _polarXY);
  main.variable(observer("centerXY")).define("centerXY", _centerXY);
  main.variable(observer("ticker")).define("ticker", ["Promises"], _ticker);
  main.variable(observer("colorByID")).define("colorByID", ["d3","toNum"], _colorByID);
  main.variable(observer("importSVGnode")).define("importSVGnode", ["DOMParser","d3"], _importSVGnode);
  return main;
}
