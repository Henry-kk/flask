/*!
 * Ark Graphs v1.0.0-0 (2015-08-27)
 * http://ark.genesys.com
 * Copyright (c) 2015 Ark Team at Genesys; License: MIT
 */

// d3.tip
// Copyright (c) 2013 Justin Palmer
//
// Tooltips for d3.js SVG visualizations

// Modified by Christophe Marchadour
// Remove direction in favor of coordinate
// for smoother and more precise tooltip location/move

// Public - contructs a new tooltip
//
// Returns a tip
d3.tip = function(item) {
  var coordinate = d3_tip_coordinate,
    offset = d3_tip_offset,
    html = d3_tip_html,
    node = initNode(),
    svg = null,
    point = null,
    target = null

  function tip(vis) {
    svg = getSVGNode(vis)
    point = svg.createSVGPoint()
    if (typeof item !== 'undefined' && document.getElementById(item) !== null) {
      document.getElementById(item).appendChild(node)
    } else {
      document.body.appendChild(node)
    }
  }

  // Public - show the tooltip on the screen
  //
  // Returns a tip
  tip.show = function() {
    var args = Array.prototype.slice.call(arguments)
    if (args[args.length - 1] instanceof SVGElement) target = args.pop()
    var content = html.apply(this, args),
      poffset = offset.apply(this, args),
      nodel = d3.select(node)

    nodel.html(content)
      .style({
        opacity: 0.9,
        'pointer-events': 'all'
      }) // changed for some transparency

    nodel.style({
      top: (coordinate().y + poffset[0]) + 'px',
      left: (coordinate().x + poffset[1]) + 'px'
    })

    return tip
  }

  // Public - hide the tooltip
  //
  // Returns a tip
  tip.hide = function() {
    nodel = d3.select(node)
    nodel.style({
      opacity: 0,
      'pointer-events': 'none'
    })
    return tip
  }

  // Public: Proxy attr calls to the d3 tip container.  Sets or gets attribute value.
  //
  // n - name of the attribute
  // v - value of the attribute
  //
  // Returns tip or attribute value
  tip.attr = function(n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).attr(n)
    } else {
      var args = Array.prototype.slice.call(arguments)
      d3.selection.prototype.attr.apply(d3.select(node), args)
    }
    return tip
  }

  // Public: Proxy style calls to the d3 tip container.  Sets or gets a style value.
  //
  // n - name of the property
  // v - value of the property
  //
  // Returns tip or style property value
  tip.style = function(n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).style(n)
    } else {
      var args = Array.prototype.slice.call(arguments)
      d3.selection.prototype.style.apply(d3.select(node), args)
    }

    return tip
  }

  // Public: Set or get the coordinate of the tooltip
  //
  // v - {x:"",y:""}
  //
  // Returns tip or coordinate
  tip.coordinate = function(v) {
    if (!arguments.length) return coordinate;
    coordinate = v == null ? v : d3.functor(v)

    return tip
  }

  // Public: Sets or gets the offset of the tip
  //
  // v - Array of [x, y] offset
  //
  // Returns offset or
  tip.offset = function(v) {
    if (!arguments.length) return offset
    offset = v == null ? v : d3.functor(v)

    return tip
  }

  // Public: sets or gets the html value of the tooltip
  //
  // v - String value of the tip
  //
  // Returns html value or tip
  tip.html = function(v) {
    if (!arguments.length) return html
    html = v == null ? v : d3.functor(v)

    return tip
  }

  function d3_tip_offset() {
    return [0, 0]
  }

  function d3_tip_html() {
    return ' '
  }

  function d3_tip_coordinate() {
    return {
      x: 0,
      y: 0
    }
  }

  function initNode() {
    var node = d3.select(document.createElement('div'))
    node.style({
      position: 'absolute',
      opacity: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box'
    })

    return node.node()
  }

  function getSVGNode(el) {
    el = el.node()
    if (el.tagName.toLowerCase() == 'svg')
      return el

    return el.ownerSVGElement
  }

  return tip
};
