---
title:  "Markov Chain Speech Generation Part 1: Background"
date:   2017-02-20
layout: "layouts/post.njk"
tags:
  - posts
  - markov
  - chain
  - marko
  - ruby 
  - bot
  - irc
---

<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script src="http://underscorejs.org/underscore-min.js"></script>
<script src="{{ "/js/cytoscape.js" | url }}"></script>
<script src="/assets/js/markov.js"></script>

History
----------
Back around 2006, some friends and I had an IRC bot that we lovingly named superborg. Superborg would join channels and log any text it saw into a flatfile. After a while, it would randomly respond to a message with a cobbled together phrase from those stored messages. Typically, those phrases sounded incoherent, but every once in a while it would randomly create a real gem. In our excitement with superborg's learning, we loaded it up hundreds of megabytes of Shakespeare, Wikipedia, and old speech transcripts.

Superborg got really bogged down; its responses slowed and they became increasingly schizophrenic. Although I knew superborg was open source and even had experience in C, I was quite green. Objects and algorithms were words to me, so when I delved into [seeborg](https://github.com/hmage/seeborg)'s source code, I ran the other way. However, the bot's idea stuck with me for many years.

Markov Chains
-------------
Seeborg came up in a discussion with [Nathasha Jarus](https://web.mst.edu/~nmjxv3/) in November 2013. Nat had started a project a while before this conversation which aimed to make an IRC bot using the same underlying algorithm as seeborg, [Markov chains](https://en.wikipedia.org/wiki/Markov_chain). Markov chains have many, many applications which I won't even reference. I will instead explore a very specific niche where they can be used to generate speech.

Markov chains, for the purposes of an IRC bot, are best represented by directional graphs. Each node in this graph will hold data (a "word") and each edge will have a number, (0, 1], representing the probability of traversing this edge. Below is a visualization of a Markov chain with 3 nodes:

{% raw %}
<div id="markov-chain" class="markov-graph" style="width: 768px; height: 175px;"></div>

<script>
    markov.graphs.renderFirstExample("#markov-chain");
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
<div id="markov-chain-sentence" class="markov-graph" style="width: 768px; height: 300px;"></div>

<script>
  markov.graphs.renderSecondExample("#markov-chain-sentence");
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
<div id="markov-chain-sentence-two" class="markov-graph" style="width: 768px; height: 300px;"></div>

<script>
  markov.graphs.renderThirdExample("#markov-chain-sentence-two");
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

n-grams
=======
In the last example, by traversing a Markov chain we generated four possible sentences as output. These sentences were based entirely on the source text; if sentences were generated at scale in a large number of trials, the number of times specific fragments (subchain after a non-1.0 decision in this case) appeared would be proportional to frequency in the source text. This follows as the probabilites for these words appearing is equal to their frequency in the source text.

As more source text is added, the responses will become exponentially more diverse. At the same time, the total number of branch points where context can be lost will increase as well. The method I described above where each word in a sentence is a node is arbitrary--- one I've chosen as I felt it was easy to explain. It worked well in the examples provided as, although the set of possible node values (words) was incredibly large,  I only selected a handful of them.

It's easy to demonstrate how this method fails at scale by choosing a node value with a smaller set of possible values. Let's use letters, where our source text will be individual words. In theory, Markov chains would be able to randomly make new words using whatever source text we provide.

[Here's the list of 100 words](/assets/scripts/markov/100words.json) we will use as a source to make a Markov chain from. Click "Create a word" below to start.

{% raw %}
<div id="markov-chain-letter-graph" class="markov-graph" style="height: 600px; width: 768px;"></div>
<br />
<div id="built-word" style="height: 25px;"></div>
<a id="build-word" href="#">Create a word</a>
<script>
  $('#build-word').on('click', function(e) { e.preventDefault(); $('#built-word').text(''); markov.graphs.generateWord(3, "#built-word"); });
  markov.graphs.renderFourthExample();
</script>
{% endraw %}

A few notes regarding some non-letter symbols. "^" represents an arbitrary start of a word. This entry node in our graph ensures that the first letter on each word is in proportion with our source. "$", similarly, represents the end of a word, and ensures that letters which typically end words have that probability represented.

For the simplicity of the generation, the generated words do a lot right: "u" always follows "q", letters such as "y" usually end words, and most [consonant clusters](https://en.wikipedia.org/wiki/Consonant_cluster) and syllables in the words all appear in English. But there are also some drawbacks; the generated words can sometimes loop due to the cycles in this graph (much more on that later) and become incredibly long. There are also consonant clusters which never begin or never end a syllable that do--- for example, "nt" in English does not begin syllables nor does "pl" end syllables.

These drawbacks are all caused by a loss in context by the Markov chain. While it's traversing the graph, there's no way for it to represent the relationship between "pl" and "a", all it has is that "l" is preceded by "p" and followed by "l". One method for storing this relationship is by using n-grams. Our current representation could be considered a 1-gram; if we instead used a bigram, we could represent the relationship between "pl" and "a-" where "a- is followed by another letter."

Below is yet another example of a Markov chain which does just that. You can also click "Create a word" to see how the output is.

{% raw %}
<div id="markov-chain-digram-graph" class="markov-graph" style="height: 800px; width: 800px;"></div>
<br />
<div id="built-word-2" style="height: 25px;"></div>
<a href="javascript:$('#built-word-2').text(''); markov.graphs.generateWord(4, '#built-word-2');">Create a word</a>

<script>
  markov.graphs.renderFifthExample();
</script>
{% endraw %}
