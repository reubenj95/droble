clothes = JSON.parse(File.read('db/clothes.json'))

colours = []
clothes.each {|item| colours.push(item["baseColour"])}
colours.uniq.each do |colour|
  Colour.create(name: colour)
end

brands = ['Glassons', 'Hallensteins', 'Louis Vitton', 'Ruby', 'The Warehouse']
brands.each do |brand|
  Brand.create(name: brand)
end

clothes.each do |item|
  Clothe.create({
    description: item["productDisplayName"],
    colour: colours.uniq.find_index(item["baseColour"]) + 1,
    image: item["id"],
    brand: rand(brands.length + 1)
  })
  end

occasions = []
clothes.each {|item| occasions.push(item["usage"])}
occasions.uniq.each do |occasion|
  Occasion.create(name: occasion)
end






