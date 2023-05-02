# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#  Clothes Seeds

clothes = JSON.parse(File.read('db/clothes.json'))

colours = []
clothes.each {|item| colours.push(item["baseColour"])}
colours.uniq.each do |colour|
  Colour.create(name: colour)
end

clothes.each do |item|
  Clothe.create({
    description: item["productDisplayName"],
    colour: colours.uniq.find_index(item["baseColour"]) + 1,
    image: item["id"],
  })
  end


