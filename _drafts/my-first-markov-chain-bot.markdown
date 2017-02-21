---
layout: post
title:  "Marko: My First Markov Bot (Part 1)"
#date:   2017-02-20 12:00:00 -0600
categories: markov chain marko ruby bot irc
---

{% raw %}
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <script src="/js/markov/graphing.js"></script>
{% endraw %}

Background
----------
Back around 2006, some friends and I had an IRC bot which we lovingly named superborg. Superborg stored text it received from the channels it occupied into a flatfile. After a while, he would randomly respond to a message with a cobbled together phrase from those stored messages. So, wanting to make him as smart as possible, we loaded him up with Shakespeare, Wikipedia, and some questionable content.

After a while, superborg would get bogged down; his responses would slow and become ncreasingly schizophrenic. Although I knew he was open source and even had experience in C, I was quite green. The idea of objects terrified me, so looking into how superborg ticked was I was new to programming at the time, and algorithms were beyond me--- hell, objects confused me. So when I delved into [seeborg](https://github.com/hmage/seeborg)'s source code, I ran the other way. The bot's idea stuck with me for many years.

Markov Chains
-------------
Seeborg came up in a discussion with [Nathan Jarus](http://nathanjar.us/) in November 2013. Nate had started a project which aimed to make an IRC bot using the same underlying algorithm as seeborg, [Markov chains](https://en.wikipedia.org/wiki/Markov_chain). This was the same algorithm which powered seeborg (although I wasn't sure of this at the time).

Markov chains and [Markov decision processes (MDPs)](https://en.wikipedia.org/wiki/Markov_decision_process) have many applications which I won't even scratch. I'll instead cover the absolute minimum that I needed to know in order to write [Markovirc](https://github.com/LinuxMercedes/markovirc).

Markov chains, for the purposes of an IRC bot, are best represented by directional graphs. Each node in this graph will hold data (a "word) and each edge will have a number, (0, 1], representing the probability of that direction. Below is a visualization of a Markov chain with 3 nodes:

{% raw %}
<svg id="markov-chain" width="960" height="175"></svg>

<style type="text/css">
</style>

<script>
  var svg = d3.select("svg#markov-chain"),
      g = svg.append("g");

  var first = addChain(g, 50, 50, "data");
  var second = addChain(g, 200, 50, "data");
  var third = addChain(g, 350, 50, "data");

  drawLine(g, first.cx, first.cy, second.mnx, second.mny, "1.0");
  drawLine(g, second.cx, second.cy, third.mnx, third.mny, "1.0");
</script>
{% endraw %}

This chain's three nodes all have edges with a probability of 1.0 and some arbitrary data "data". It will always be the case that the sum of each node's edges will be 1.0; however, on average in a Markov chain bot there will be more than one edge.

When "data" here is swapped out for words in a sentence, the application becomes a bit more clear.

{% raw %}
<svg id="markov-chain-sentence" width="960" height="500"></svg>

<script>
  var svg = d3.select("svg#markov-chain-sentence"),
      g = svg.append("g"),
      sentence1 = ["A", "dog", "jumps", "over", "the", "log"],
      sentence2 = ["The", "bear", "jumps", "clear", "of", "harm"],
      chains1 = [],
      chains2 = [];

  var thisx = 50,
      thisy = 50,
      xspacing = 140,
      yspacing = 100;

  sentence1.forEach(function(e, i) {
    if(i != 2) {
      chains1.push(addChain(g, thisx, thisy, e));
    }
    thisx += xspacing;
  });

  thisx = 50,
  thisy += yspacing;
  sentence2.forEach(function(e, i) {
    if(i != 2) {
      chains2.push(addChain(g, thisx, thisy, e));
    }
    thisx += xspacing;
  });

  // draw crossover word
  thisy -= yspacing / 2;
  var crossover = addChain(g, xspacing * 2 + 50, thisy, "jumps");

  for(var i=0; i<chains1.length-1; i++) {
    if(i == 1) {
      drawLine(g, chains1[i].cx, chains1[i].cy, crossover.mnx, crossover.mny, "1.0");
    } else {
      drawLine(g, chains1[i].cx, chains1[i].cy, chains1[i+1].mnx, chains1[i+1].mny, "1.0");
    }
  }
  for(var i=0; i<chains2.length-1; i++) {
    if(i == 1) {
      drawLine(g, chains2[i].cx, chains2[i].cy, crossover.mnx, crossover.mny, "1.0");
    } else {
      drawLine(g, chains2[i].cx, chains2[i].cy, chains2[i+1].mnx, chains2[i+1].mny, "1.0");
    }
  }

  // Draw crossover lines
  drawLine(g, crossover.cx, crossover.cy, chains1[2].mnx, chains1[2].mny, "0.5");
  drawLine(g, crossover.cx, crossover.cy, chains2[2].mnx, chains2[2].mny, "0.5");
</script>
{% endraw %}
