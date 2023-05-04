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

1000.times{
  num = rand(clothes.length - 1)
  Clothe.create({
    description: clothes[num]["productDisplayName"],
    colour: colours.uniq.find_index(clothes[num]["baseColour"]) + 1,
    image: clothes[num]["id"],
    brand: rand(brands.length)
  })
    }

occasions = []
clothes.each {|item| occasions.push(item["usage"])}
occasions.uniq.each do |occasion|
  Occasion.create(name: occasion)
end
count = 1
seasons = ['Summer', 'Autumn', 'Winter', 'Spring']

seasons.each do |season|
  Season.create({
    name: season
  })
end 


10.times{
  allClothes = Clothe.select("*")

  outfit = Outfit.create({
    name: "Outfit #{count}",
    occasion: rand(20),
    season: rand(4),
    image: 'https://plus.unsplash.com/premium_photo-1669740216354-6c2976bb358c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80',
  })
  outfitItems = []
  4.times{
    outfitItems.push(allClothes[rand(100)]["id"])
  }
  outfitItems.each do |item|
    outfit.clothes << Clothe.where("id = ?", item).select("*")
  end 
  count += 1
}






