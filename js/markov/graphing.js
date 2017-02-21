    //Draw the Rectangle

var addChain = function(g, x, y, text) {
  var height = 50,
      width = 100,
      font_size = 10,
      pointer_size = 30;

   var rect = g.append("rect")
     .attr("x", x)
     .attr("y", y)
     .attr("width", width - pointer_size)
     .attr("height", height)
     .attr('stroke', 'black')
     .style("fill-opacity", "0.1");

   // Outer for the pointer
   var outerrect = g.append("rect")
     .attr("x", x)
     .attr("y", y)
     .attr("width", width)
     .attr("height", height)
     .attr('stroke', 'black')
     .style("fill-opacity", "0.1");

   // pointer circle
   var circle = g.append("circle")
     .attr("cx", x + width - pointer_size / 2)
     .attr("cy", y + height / 2)
     .attr("r", 5);

   var text = g.append("text")
     .text(function(d) { return text; })
     .attr("x", x + 15 )
     .attr("y", y + height / 2 + font_size / 2)
     .attr("fill", "black");

  return {
    "rect": rect,
    "outerrect": outerrect,
    "circle": circle,
    "text": text,
    "mfx": x + width,  //middle far x/y
    "mfy": y + height / 2,
    "mnx": x,  //middle near x/y
    "mny": y + height / 2,
    "cx": circle.attr("cx"),
    "cy": circle.attr("cy")
  }
}

var drawLine = function(g, fx, fy, tx, ty, text="") {
  var path = d3.path();

  path.moveTo(fx, fy);
  path.lineTo(tx, ty);
  path.closePath();

  // line
  g.append("path")
    .attr("d", path.toString())
    .attr('stroke', 'black')
    .attr('stroke-width', '3')
    .attr('id', 'arrow');

  // arrow rotation
  var headrotation = 0,
      distance = Math.sqrt(Math.pow(tx - fx, 2) + Math.pow(ty - fy, 2));

  if(fy != ty || fx != tx) {
    headrotation = Math.atan2(ty - fy, tx - fx) * 180 / Math.PI;
  }

  // arrowhead
  var head = g.append("path")
              .attr("d", "M0,-5L10,0L0,5")
              .attr("x", 0)
              .attr("y", 0)
              .attr("transform", function(d) {
                var headBBox = this.getBBox(),
                    headCX = headBBox.width / 2.0,
                    headCY = headBBox.height / 2.0,
                    arrowX = tx - headCX - 1,
                    arrowY = ty;

                // Rotation rotates from the top left, so scoot us up/down by half...
                if(ty - fy < 0) {
                  arrowY += headCY;
                } else if(ty - fy > 0) {
                  arrowY -= headCY;
                }

                var arrowCoords = arrowX+ ", " + arrowY;
                return "translate(" + arrowCoords + ") rotate(" + headrotation + ")";
              });

  if(text != "") {
    var textx = (tx - (tx - fx)/2) - text.length * 3,
        texty = parseInt(fy) - 7;

    // label
    g.append("text")
     .text(text)
     .attr("fill", "black")
     .attr("transform", function(d) {
       var labelBBox = this.getBBox(),
           labelCX = labelBBox.width,
           labelCY = labelBBox.height,
           labelX = parseInt(fx) + labelCX,
           labelY = parseInt(fy) - labelCY / 4;

       if(ty - fy < 0) {
         labelY -= labelCY + labelCY / 4;
       } else if(ty - fy > 0) {
         labelY += labelCY;
       }

       var labelCoords = labelX + ", " + labelY;
       return "translate(" + labelCoords + ") rotate(" + headrotation + ")";
     });
  }

  return path;
};
