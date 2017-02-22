---
layout: post
title:  "Markov Chain Speech Generation Part 1: Background"
#date:   2017-02-20 12:00:00 -0600
categories: markov chain marko ruby bot irc
---

{% raw %}
  <script src="https://d3js.org/d3.v4.js"></script>
  <script src="https://code.jquery.com/jquery-3.1.1.js"></script>
  <script src="/js/cytoscape.js"></script>
  <script src="https://cdn.rawgit.com/cytoscape/cytoscape.js-cose-bilkent/1.0.5/cytoscape-cose-bilkent.js"></script>
  <script src="/js/markov/graphing.js"></script>
  <script src="/js/markov/graphs.js"></script>
{% endraw %}

History
----------
Back around 2006, some friends and I had an IRC bot that we lovingly named superborg. Superborg would join channels and log any text it saw into a flatfile. After a while, it would randomly respond to a message with a cobbled together phrase from those stored messages. Typically, those phrases sounded incoherent, but every once in a while it would randomly create a real gem. In our excitement with superborg's learning, we loaded it up hundreds of megabytes of Shakespeare, Wikipedia, and old speech transcripts.

Superborg got really bogged down; its responses slowed and they became increasingly schizophrenic. Although I knew superborg was open source and even had experience in C, I was quite green. Objects and algorithms were words to me, so when I delved into [seeborg](https://github.com/hmage/seeborg)'s source code, I ran the other way. However, the bot's idea stuck with me for many years.

Markov Chains
-------------
Seeborg came up in a discussion with [Nathan Jarus](http://nathanjar.us/) in November 2013. Nate had started a project a while before this conversation which aimed to make an IRC bot using the same underlying algorithm as seeborg, [Markov chains](https://en.wikipedia.org/wiki/Markov_chain). Markov chains have many, many applications which I won't even reference. I will instead explore a very specific niche where they can be used to generate speech.

Markov chains, for the purposes of an IRC bot, are best represented by directional graphs. Each node in this graph will hold data (a "word") and each edge will have a number, (0, 1], representing the probability of traversing this edge. Below is a visualization of a Markov chain with 3 nodes:

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

This chain's three nodes all have edges with a probability of 1.0 and some arbitrary data "data". It will always be the case that the sum of each node's outward edges will be 1.0; however, on average, in a Markov chain bot there will be more than one edge. As there is only one edge from each node in this graph, the traversal of this graph will always be the same.

With words
==========

When "data" is swapped out for words in a couple of sentences (which I'll refer to a sources or source text) the application becomes a bit more clear:
> A dog jumps over the log

> The bear jumps clear of harm

Note that with capitalization, there is only one word, "jumps", which is common to both sentences. A Markov chain would combine those words into a single node with two input edges and one output. This can be seen below.

{% raw %}
<svg id="markov-chain-sentence" width="960" height="250"></svg>

<script>
function secondExample(element, special_weights) {
  var svg = d3.select(element),
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
  drawLine(g, crossover.cx, crossover.cy, chains1[2].mnx, chains1[2].mny, special_weights[0]);
  drawLine(g, crossover.cx, crossover.cy, chains2[2].mnx, chains2[2].mny, special_weights[1]);
}
secondExample("svg#markov-chain-sentence", ["0.5", "0.5"]);
  </script>
{% endraw %}

When starting from the beginning of both of these chains, each movement along an edge to next node has 100% probability. However, once reaching the "jump" node, there's a 50% (0.5) chance of going to either destination. This comes from our original sentences where there are two distinct possibilities of what follows jumps, with one occurance of each. This gave each edge a probability of 0.5 (1/2). The decision of which edge to traverse will be made randomly by a program. For this Markov chain, there are 4 outputs which are all fairly coherent:
> A dog jumps over the log

> The bear jumps clear of harm

> The dog jumps clear of harm

> The bear jumps over the log

The chance of each output when traversing this chain, starting from a leftmost node randomly, is 25%.

Duplicate sources
=================

Now, if instead the source text had instead been:
> A dog jumps over the log

> A dog jumps over the log

> The bear jumps clear of harm

{% raw %}
<svg id="markov-chain-sentence-two" width="960" height="250"></svg>

<script>
  secondExample("svg#markov-chain-sentence-two", ["0.67", "0.33"]);
</script>
{% endraw %}

What held in the previous example still holds here: since there are two source sentences which have the transition "jumps" to "over", and one for "jumps" to "clear", the weight for each is 0.67 (2/3) and 0.33 (1/3) respectively. Traversing this graph after randomly choosing a leftmost node gives the following chances for each output sentence:

> A dog jumps over the log

33.3% (1/3)

> The bear jumps clear of harm

16.7% (1/6)

> The dog jumps clear of harm

16.7% (1/6)

> The bear jumps over the log

33.3% (1/3)

Word length
===========
In the last example, by traversing a Markov chain we generated four possible sentences as output. These sentences were based entirely on the source text, and if generated at scale in a large number of trials, the number of times specific fragments (subchain after a non-1.0 decision in this case) appeared would be proportional to frequency in the source text.

As more source text is added, the responses will become exponentially more diverse. At the same time, the total number of branch points where context can be lost will increase as well. The method I described above where each word in a sentence is a node is arbitrary--- one I've chosen as I felt it was easy to explain. It worked well in the examples provided as the set of possible node values (words) was incredibly large and I only selected a handful of them.

It's easy to demonstrate how this fails at scale by choosing a node value with a smaller set of possible values. Let's use letters, where our source text will be individual words. In theory, Markov chains would be able to randomly make new words using whatever source text I provide.

[Here's the list of words](/json/100words.json) we will make a Markov chain from.

{% raw %}
<div id="markov-chain-letter-graph" style="height: 600px; width: 960px;"></div>
<script>
  //letterGraph("#markov-chain-letter-graph");
</script>
{% endraw %}
