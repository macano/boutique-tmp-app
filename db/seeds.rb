# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Product.create(sku: "SW-CN", parent_sku: "", name: "100% SHETLAND WOOL CREW Round Neck Knit JUMPER Pullover Mens Sweater Knitted New", rrp: 149.95, brand: "Jacksmith")
Product.create(sku: "SW-CN-BLU-42-S", parent_sku: "SW-CN", name: "100% SHETLAND WOOL CREW Round Neck Knit JUMPER Pullover Mens Sweater Knitted New", rrp: 149.95, brand: "Jacksmith")
Product.create(sku: "SW-CN", parent_sku: "SW-CN-BLU-42-L", name: "100% SHETLAND WOOL CREW Round Neck Knit JUMPER Pullover Mens Sweater Knitted New", rrp: 149.95, brand: "Jacksmith")
Product.create(sku: "SW-CN-BLU42-M", parent_sku: "SW-CN", name: "100% SHETLAND WOOL CREW Round Neck Knit JUMPER Pullover Mens Sweater Knitted New", rrp: 149.95, brand: "Jacksmith")
