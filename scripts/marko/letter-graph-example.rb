require 'json'

words = JSON.load(IO.read("100words.json"))

output = {
  nodes: [],
  links: []
}

nodes_by_letter = {}

# each node will have an id.
# each link will have a target, a destination, and a weight

# chains will be used internally, and it will store:
# {
#   "someletter": {
#      "someotherletter": "numberoftimes",
#      [...]
#   },
#   [...]
# }
#
chains = {
  "^" => {}
}

words.each do |w|
  letters = w.split('')
  chains["^"][letters.first] = 0 if not chains["^"].has_key?(letters.first)
  chains["^"][letters.first] += 1

  letters.each_with_index do |l, i|
    chains[l] = {} if not chains.has_key?(l)
    thisletter = chains[l]
    nextl = "$"  # Terminator

    # if this isn't the end of a word, set the letter
    if i + 1 != letters.size
      nextl = w[i+1]
    end

    if not thisletter.has_key?(nextl)
      thisletter[nextl] = 1
    else
      thisletter[nextl] += 1
    end
  end
end

nodes = output[:nodes]
links = output[:links]

# Create all nodes
chains.each do |letter, _|
  node = {
    data: {
      id: letter,
      name: letter,
    }
  }

  nodes_by_letter[letter] = node
  nodes << node
end

nodes << {
  data: {
    id: "$",
    name: "$",
  }
} << {
  data: {
    id: "^",
    name: "^",
  }
}

# Create all links
chains.each do |letter, l_links|
  node = nodes_by_letter[letter]

  link_count = l_links.map { |_, v| v }.reduce(:+)
  # Add up our probability so, in the end, we can get a random number
  # from (0, 1) and find the first # here that's > than that.
  prob_cumulative = 0

  l_links.each do |linked_letter, count|
    prob = count.to_f / link_count
    prob_cumulative += prob
    links << {
      data: {
        source: node[:data][:id],
        target: linked_letter,
        value: prob,
        cum_value: prob_cumulative,
      }
    }
  end
end

IO.write("words.json", JSON.dump(output))
