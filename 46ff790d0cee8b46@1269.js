import define1 from "./dc0989a48fac63a7@276.js";
import define2 from "./cd4e11b4fb179a94@89.js";

function _1(md){return(
md`# Earth's Fever 
Diagnosing the symptoms of environmental fragility and injustice
`
)}

function _svgContainer(htl){return(
htl.html`<svg id="base" width="1000" height="750">
  <g id="heatmap"></g>
  
  
  <g id="layer1"></g>
  <text x="650" y="30" style="font-size: 14px; font-weight: bold;">Float Over Circles For Info</text>
  <text x="100" y="30" style="font-size: 14px; font-weight: bold;">Select Sort, Color, Year (click boxes)</text>
<text x="360" y="280" style="font-size: 14px; font-weight: bold;">Size of Circle = USD Damages Adjusted for GDP</text>
  <text id="explain" x="500" y="70" style="font-size: 15px; font-weight: bold;"></text>
   <text id="explain2" x="500" y="90" style="font-size: 15px; font-weight: bold;"></text>
    <text id="explain3" x="500" y="110" style="font-size: 15px; font-weight: bold;"></text>
  <text id="explain4" x="500" y="130" style="font-size: 15px; font-weight: bold;"></text>
   <text id="explain5" x="500" y="150" style="font-size: 15px; font-weight: bold;"></text>
     <text id="explain6" x="325" y="260" style="font-size: 20px; font-weight: bold;"></text>
</svg>

<div id="controls">
  <button id="btn_all">All together</button>
  <button id="btn_Disaster">Sort by Disaster Type</button>
   <button id="btn_Climate">Sort by Climate Type</button>
  <button id="btn_Poverty">Color By Poverty</button>
<button id="btn_CO2"> Color By CO2 </button>
  <button id="btn_Disaster2"> Color By Disaster Type </button>
</div>
<style>

#controls 
  {position: absolute; top:50px; right: 650px;}
  button {background: none; border: 1px solid #888; border-radius: 10px; padding: 20px; cursor: pointer;}
  button:hover {background-color: #aaa;}
</style>`
)}

function _3(md){return(
md`------CLUSTERS------`
)}

function _4(htl){return(
htl.html`<style>
  .node {fill:none;}
  .node text {font-size: 12px; fill: white; text-anchor: middle}
  
  .Drought  {fill:#A600FF; background-color:#000000; color: #dddddd;}         /* black */
  .Earthquake {fill:#1D7900; background-color:#00ff00;}                      /* green */
  .Extreme {fill:#EF3014; background-color:#777700;}                          /* brown */
  .Flood {fill:#365DDF; background-color:#00ffff; color: #dddddd;}                        /* blue */
  .Landslide {fill:#512C0A; background-color:#00ffff;}                      /* cyan */
  .Storm {fill:#FF6EAD; background-color:#A6A277;}                   /* brown */
  .Volcanic {fill: #808080 ; background-color: #FF66FF;}                       /* pink */
  .Wildfire {fill: #F7CC23; background-color: #ffff00;}                      /* yellow */
  .Mass {fill: #00ffff; background-color: #888888;}                       /* gray */


</style>
`
)}

function _data(FileAttachment){return(
FileAttachment("Natural_disaster_data.csv").csv()
)}

function _slice2(data){return(
data.filter(d=>d["Disaster.Type"]!="Epidemic" & d["Disaster.Type"]!="Fog" & d["Disaster.Type"]!="Insect infestation" & d["Disaster.Type"]!="Mass movement (dry)")
)}

function _clElem(d3,svgContainer){return(
d3.select(svgContainer).select("#layer1")
)}

function _fociDisaster(){return(
{
  "Drought":{x: 200, y: 350},"Earthquake":{x: 400, y: 350},"Flood":{x: 600, y: 350},"Storm":{x: 800, y: 350},
  "Landslide":{x: 200, y: 600},"Wildfire":{x: 400, y: 600},"Extreme temperature":{x: 600, y: 600},
  "Volcanic activity":{x: 800, y: 600}}
)}

function _fociClimate(){return(
{
  "Sub Tropical":{x: 300, y: 350},"Warm Temperate":{x: 500, y: 350},"Cold Temperate":{x: 700, y: 350},"Tropical":{x: 400, y: 600},
  "Polar":{x: 600, y: 600}
}
)}

function _fociOneCenter(){return(
[{x: 500, y: 400}]
)}

function _options(){return(
{
  "classField": "Disaster.Type",		// color scale????
  "strength": -.5,
  "alphaTarget": 0.09,
 "dotScaleFactor":7000,
}
)}

function _currentcolor(){return(
""
)}

function _clusters(){return(
""
)}

function _currentlocation(){return(
""
)}

function _focifield(){return(
""
)}

function _bynumbers(d3,data,toNum,$0,$1){return(
(fieldname) => {
  let colorScale = d3.scaleLinear().domain(d3.extent(data,d=>toNum(d[fieldname]))).range(["#A8FFE5","#011C4B"]);
  $0.value.style("fill",d=>colorScale(+d.data[fieldname]))
  $1.value= fieldname;
}
)}

function _17(d3,svgContainer,dvClusterMoveNodes,fociOneCenter,dvClusterFociLabels,labelLayer,$0,$1,fociDisaster,fociClimate,bynumbers)
{
  // register event listeners
  const btns = d3.select(svgContainer).select("#controls");
  btns.select("#btn_all").on("click", () => {dvClusterMoveNodes(fociOneCenter); dvClusterFociLabels(labelLayer,fociOneCenter); $0.value=fociOneCenter;$1.value=""});
  btns.select("#btn_Disaster").on("click", () => {dvClusterMoveNodes(fociDisaster,"Disaster.Type"); dvClusterFociLabels(labelLayer,fociDisaster,{offsetY:140, offsetX: -25}); $0.value=fociDisaster;$1.value="Disaster.Type"});
  btns.select("#btn_Climate").on("click", () => {dvClusterMoveNodes(fociClimate,"Classification"); dvClusterFociLabels(labelLayer,fociClimate,{offsetY:140, offsetX: -50});$0.value=fociClimate;$1.value="Classification"});
  btns.select("#btn_Poverty").on("click", () => {bynumbers("X.1.90.per.day...poverty.gap.index")});
  btns.select("#btn_CO2").on("click", () => {bynumbers("co2_per_capita")});
   btns.select("#btn_Disaster2").on("click", () => {bynumbers("Disaster.Type")});
}


function _18(md){return(
md`-----Labels------`
)}

function _labelLayer(clElem){return(
clElem.append("g").attr("id","labels")
)}

function _20(md){return(
md`-----highlight-----`
)}

function _unhighlight(d3){return(
(evt) => {
  d3.select(evt.currentTarget)
    .style("stroke","")
    .style("stroke-width","");
}
)}

function _22(md){return(
md`----interaction----`
)}

function _explain(d3){return(
(evt,d) => {
  let thisElem = evt.currentTarget;
  d3.select(thisElem)
    .style("stroke","yellow")
    .style("stroke-width","2");
  let elemD3 = d3.select(thisElem);
   d3.select("#explain").text(d.data["Disaster.Type"]+" in " + d.data["Country"] + " - " + d.data["Year"] ) ; 
  d3.select("#explain2").text(" Deaths: " + (d.data["Total.Deaths..adjusted."]-1)); //bring in data not adjusted
  d3.select("#explain3").text(" Damages: " + (d.data["Total.Damage..adjusted."]-1)+ " U.S Dollars")
  d3.select("#explain4").text(" Poverty Index: " + d.data["X.1.90.per.day...poverty.gap.index"] + "% living below $1.9 a day (extreme)") ;
  d3.select("#explain5").text(" C02 Production Per Capita: " + d.data["co2_per_capita"] + " (in range 0.012-35.356)") ;
}
)}

function _ChangeYear($0,dvCluster,clElem,slice2,options,bynumbers,$1,dvClusterMoveNodes,$2,$3,d3){return(
(evt,d) => {
  let thisElem = evt.currentTarget;
  let selectedyear = d.Year
  $0.value = dvCluster(clElem,slice2.filter(d=>d["Year"]==selectedyear),1000,800,"Damage.pergdp",options)
  bynumbers($1.value)
  dvClusterMoveNodes($2.value, $3.value)
   let elemD3 = d3.select(thisElem);
  d3.select("#explain6").text(d.Year + " Global Temperature Change: " + d["Temperature Change"] + " °C");
}
)}

function _25(heatmap2,ChangeYear){return(
heatmap2.on("click", ChangeYear)
)}

function _26(clusters,explain){return(
clusters.on("mouseover", explain)
)}

function _27(clusters,unhighlight){return(
clusters.on("mouseout", unhighlight)
)}

function _28(md){return(
md`----Heatmap-----`
)}

function _hmElem(d3,svgContainer){return(
d3.select(svgContainer).select("#heatmap")
)}

function _heatmap2(dvHeatmap,hmElem,data2,options2){return(
dvHeatmap(hmElem,data2.filter(d=>d["Year"]>=1981),"Year","Type","Temperature Change",options2)
)}

function _data2(FileAttachment){return(
FileAttachment("world_temp.csv").csv()
)}

function _colorScale2(d3){return(
d3.scaleLinear().domain([-1,0,2]).range(["blue","white","red"])
)}

function _options2(colorScale2){return(
{
  boxSize: 20,
  paddingX: 3,
  colorScale: colorScale2,   // next cell below
  startPos: {x:20,y:220},   // shifts it to accomodate the side and top labels
  rotateColumnTextDeg: -60   // negative directions go counter-clockwise.  Azimuth not Cartesian.
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["world_temp.csv", {url: new URL("./files/1c7f5a397631190caab88c6514ce90fbc012c91ae35a144fa4bee4f82805e3eebe89adb3336b0a1a97488eb6c27b285e2d6d4481058307fd1a2e1382c88f02bf.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Natural_disaster_data.csv", {url: new URL("./files/75f905e8961218276adb91f6ccd47c6e3653fb4704702501319237669af7a47c54f11f7d1dddf9e06ea0becd0900053e2911ab9ac1e0974ed41c98a0ab48a200.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("svgContainer")).define("svgContainer", ["htl"], _svgContainer);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["htl"], _4);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("slice2")).define("slice2", ["data"], _slice2);
  main.variable(observer("clElem")).define("clElem", ["d3","svgContainer"], _clElem);
  main.variable(observer("fociDisaster")).define("fociDisaster", _fociDisaster);
  main.variable(observer("fociClimate")).define("fociClimate", _fociClimate);
  main.variable(observer("fociOneCenter")).define("fociOneCenter", _fociOneCenter);
  main.variable(observer("options")).define("options", _options);
  main.define("initial currentcolor", _currentcolor);
  main.variable(observer("mutable currentcolor")).define("mutable currentcolor", ["Mutable", "initial currentcolor"], (M, _) => new M(_));
  main.variable(observer("currentcolor")).define("currentcolor", ["mutable currentcolor"], _ => _.generator);
  main.define("initial clusters", _clusters);
  main.variable(observer("mutable clusters")).define("mutable clusters", ["Mutable", "initial clusters"], (M, _) => new M(_));
  main.variable(observer("clusters")).define("clusters", ["mutable clusters"], _ => _.generator);
  main.define("initial currentlocation", _currentlocation);
  main.variable(observer("mutable currentlocation")).define("mutable currentlocation", ["Mutable", "initial currentlocation"], (M, _) => new M(_));
  main.variable(observer("currentlocation")).define("currentlocation", ["mutable currentlocation"], _ => _.generator);
  main.define("initial focifield", _focifield);
  main.variable(observer("mutable focifield")).define("mutable focifield", ["Mutable", "initial focifield"], (M, _) => new M(_));
  main.variable(observer("focifield")).define("focifield", ["mutable focifield"], _ => _.generator);
  main.variable(observer("bynumbers")).define("bynumbers", ["d3","data","toNum","mutable clusters","mutable currentcolor"], _bynumbers);
  main.variable(observer()).define(["d3","svgContainer","dvClusterMoveNodes","fociOneCenter","dvClusterFociLabels","labelLayer","mutable currentlocation","mutable focifield","fociDisaster","fociClimate","bynumbers"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("labelLayer")).define("labelLayer", ["clElem"], _labelLayer);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("unhighlight")).define("unhighlight", ["d3"], _unhighlight);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("explain")).define("explain", ["d3"], _explain);
  main.variable(observer("ChangeYear")).define("ChangeYear", ["mutable clusters","dvCluster","clElem","slice2","options","bynumbers","mutable currentcolor","dvClusterMoveNodes","mutable currentlocation","mutable focifield","d3"], _ChangeYear);
  main.variable(observer()).define(["heatmap2","ChangeYear"], _25);
  main.variable(observer()).define(["clusters","explain"], _26);
  main.variable(observer()).define(["clusters","unhighlight"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("hmElem")).define("hmElem", ["d3","svgContainer"], _hmElem);
  main.variable(observer("heatmap2")).define("heatmap2", ["dvHeatmap","hmElem","data2","options2"], _heatmap2);
  main.variable(observer("data2")).define("data2", ["FileAttachment"], _data2);
  main.variable(observer("colorScale2")).define("colorScale2", ["d3"], _colorScale2);
  main.variable(observer("options2")).define("options2", ["colorScale2"], _options2);
  const child1 = runtime.module(define1);
  main.import("dvHeatmap", child1);
  const child2 = runtime.module(define1);
  main.import("dvCluster", child2);
  main.import("dvClusterMoveNodes", child2);
  const child3 = runtime.module(define2);
  main.import("toNum", child3);
  const child4 = runtime.module(define1);
  main.import("dvClusterFociLabels", child4);
  return main;
}
