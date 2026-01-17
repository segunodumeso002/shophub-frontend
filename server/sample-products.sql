-- Additional Products for E-Commerce Database
-- Run this after the initial schema setup

-- Electronics (category_id = 1)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Dell XPS 15 Laptop', 'dell-xps-15', 'Powerful laptop with Intel i7 processor', 1499.99, 1699.99, 1, 25, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'),
('Sony WH-1000XM4 Headphones', 'sony-wh-1000xm4', 'Premium noise-canceling headphones', 349.99, 399.99, 1, 60, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400'),
('iPad Pro 12.9"', 'ipad-pro-12', 'Apple tablet with M2 chip', 1099.99, 1199.99, 1, 40, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'),
('Canon EOS R6 Camera', 'canon-eos-r6', 'Professional mirrorless camera', 2499.99, 2799.99, 1, 15, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400'),
('Apple Watch Series 9', 'apple-watch-9', 'Latest smartwatch from Apple', 399.99, 449.99, 1, 80, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400'),
('Bose SoundLink Speaker', 'bose-soundlink', 'Portable Bluetooth speaker', 129.99, 149.99, 1, 100, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'),
('LG 55" OLED TV', 'lg-55-oled-tv', '4K OLED smart television', 1299.99, 1499.99, 1, 20, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'),
('Logitech MX Master 3', 'logitech-mx-master-3', 'Wireless ergonomic mouse', 99.99, 119.99, 1, 150, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'),
('Kindle Paperwhite', 'kindle-paperwhite', 'Waterproof e-reader', 139.99, 159.99, 1, 90, 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400'),
('GoPro Hero 11', 'gopro-hero-11', 'Action camera with 5.3K video', 399.99, 449.99, 1, 45, 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=400');

-- Clothing (category_id = 2)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Nike Dri-FIT T-Shirt', 'nike-dri-fit-tshirt', 'Moisture-wicking athletic shirt', 29.99, 39.99, 2, 200, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'),
('Adidas Hoodie', 'adidas-hoodie', 'Comfortable cotton blend hoodie', 59.99, 79.99, 2, 150, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'),
('Zara Leather Jacket', 'zara-leather-jacket', 'Genuine leather biker jacket', 199.99, 249.99, 2, 50, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'),
('H&M Summer Dress', 'hm-summer-dress', 'Floral print sundress', 39.99, 49.99, 2, 120, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'),
('Ralph Lauren Polo', 'ralph-lauren-polo', 'Classic fit polo shirt', 89.99, 109.99, 2, 100, 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400'),
('Gap Chinos', 'gap-chinos', 'Slim fit casual pants', 49.99, 69.99, 2, 180, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400'),
('North Face Puffer Jacket', 'north-face-puffer', 'Insulated winter jacket', 249.99, 299.99, 2, 60, 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400'),
('Uniqlo Flannel Shirt', 'uniqlo-flannel', 'Soft cotton flannel', 34.99, 44.99, 2, 140, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400'),
('Tommy Hilfiger Sweater', 'tommy-hilfiger-sweater', 'Cable knit pullover', 79.99, 99.99, 2, 90, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400'),
('Carhartt Work Pants', 'carhartt-work-pants', 'Durable canvas pants', 59.99, 74.99, 2, 110, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400');

-- Shoes (category_id = 3)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Converse Chuck Taylor', 'converse-chuck-taylor', 'Classic canvas sneakers', 55.00, 65.00, 3, 200, 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400'),
('Vans Old Skool', 'vans-old-skool', 'Iconic skate shoes', 65.00, 75.00, 3, 180, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400'),
('New Balance 990', 'new-balance-990', 'Premium running shoes', 185.00, 210.00, 3, 90, 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400'),
('Timberland Boots', 'timberland-boots', 'Waterproof leather boots', 189.99, 219.99, 3, 70, 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400'),
('Puma Suede Classic', 'puma-suede-classic', 'Retro style sneakers', 75.00, 90.00, 3, 130, 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400'),
('Dr. Martens 1460', 'dr-martens-1460', 'Iconic 8-eye boots', 159.99, 179.99, 3, 85, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400'),
('Reebok Classic', 'reebok-classic', 'Vintage athletic shoes', 79.99, 95.00, 3, 140, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400'),
('Skechers Go Walk', 'skechers-go-walk', 'Comfortable walking shoes', 69.99, 85.00, 3, 160, 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400'),
('Clarks Desert Boot', 'clarks-desert-boot', 'Suede chukka boots', 139.99, 159.99, 3, 95, 'https://images.unsplash.com/photo-1478186014654-93c7298c4b43?w=400'),
('Birkenstock Arizona', 'birkenstock-arizona', 'Classic comfort sandals', 99.99, 119.99, 3, 120, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400');

-- Jewelry (category_id = 4)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Pandora Charm Bracelet', 'pandora-charm-bracelet', 'Sterling silver bracelet', 79.99, 99.99, 4, 80, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'),
('Swarovski Crystal Necklace', 'swarovski-crystal-necklace', 'Elegant pendant necklace', 129.99, 159.99, 4, 60, 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'),
('Michael Kors Watch', 'michael-kors-watch', 'Rose gold chronograph', 199.99, 249.99, 4, 45, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400'),
('Diamond Stud Earrings', 'diamond-stud-earrings', '14K white gold earrings', 299.99, 349.99, 4, 35, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'),
('Fossil Leather Bracelet', 'fossil-leather-bracelet', 'Braided leather band', 49.99, 64.99, 4, 100, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'),
('Kate Spade Bangle', 'kate-spade-bangle', 'Gold-plated bangle set', 89.99, 109.99, 4, 70, 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400'),
('Cartier Love Ring', 'cartier-love-ring', 'Iconic screw design ring', 450.00, 550.00, 4, 25, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400'),
('Alex and Ani Bracelet', 'alex-ani-bracelet', 'Expandable wire bangle', 34.99, 44.99, 4, 150, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'),
('David Yurman Cable', 'david-yurman-cable', 'Signature cable bracelet', 395.00, 450.00, 4, 30, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'),
('Chopard Happy Diamonds', 'chopard-happy-diamonds', 'Floating diamond pendant', 599.99, 699.99, 4, 20, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400');

-- Home & Kitchen (category_id = 5)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Ninja Air Fryer', 'ninja-air-fryer', 'Large capacity air fryer', 129.99, 159.99, 5, 75, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'),
('Dyson V15 Vacuum', 'dyson-v15-vacuum', 'Cordless stick vacuum', 649.99, 749.99, 5, 40, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400'),
('Instant Pot Duo', 'instant-pot-duo', '7-in-1 pressure cooker', 99.99, 129.99, 5, 90, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'),
('Cuisinart Coffee Maker', 'cuisinart-coffee-maker', 'Programmable drip coffee maker', 79.99, 99.99, 5, 110, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400'),
('Le Creuset Dutch Oven', 'le-creuset-dutch-oven', 'Cast iron cookware', 349.99, 399.99, 5, 50, 'https://images.unsplash.com/photo-1584990347449-39b4aa02d0c6?w=400'),
('Vitamix Blender', 'vitamix-blender', 'Professional-grade blender', 449.99, 549.99, 5, 55, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400'),
('Nespresso Machine', 'nespresso-machine', 'Espresso and coffee maker', 199.99, 249.99, 5, 80, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400'),
('All-Clad Cookware Set', 'all-clad-cookware', '10-piece stainless steel set', 599.99, 699.99, 5, 35, 'https://images.unsplash.com/photo-1584990347449-39b4aa0d2c6?w=400'),
('Breville Toaster Oven', 'breville-toaster-oven', 'Smart countertop oven', 279.99, 329.99, 5, 60, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'),
('Shark Robot Vacuum', 'shark-robot-vacuum', 'Self-emptying robot vacuum', 449.99, 549.99, 5, 45, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400');

-- Beauty & Personal Care (category_id = 6)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Dyson Airwrap', 'dyson-airwrap', 'Multi-styler hair tool', 549.99, 599.99, 6, 40, 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400'),
('Fenty Beauty Foundation', 'fenty-beauty-foundation', 'Pro Filt''r foundation', 39.99, 45.00, 6, 200, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'),
('Olaplex Hair Treatment', 'olaplex-hair-treatment', 'Bond building treatment', 28.99, 34.99, 6, 180, 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400'),
('La Mer Moisturizer', 'la-mer-moisturizer', 'Luxury face cream', 195.00, 225.00, 6, 60, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'),
('Philips Sonicare', 'philips-sonicare', 'Electric toothbrush', 129.99, 159.99, 6, 100, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'),
('MAC Lipstick', 'mac-lipstick', 'Matte finish lipstick', 19.99, 24.99, 6, 250, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'),
('Neutrogena Sunscreen', 'neutrogena-sunscreen', 'SPF 50 face sunscreen', 14.99, 18.99, 6, 300, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400'),
('Urban Decay Palette', 'urban-decay-palette', 'Naked eyeshadow palette', 54.99, 64.99, 6, 120, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'),
('Clarisonic Brush', 'clarisonic-brush', 'Facial cleansing brush', 199.99, 249.99, 6, 70, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400'),
('Tatcha Water Cream', 'tatcha-water-cream', 'Oil-free moisturizer', 68.99, 78.99, 6, 90, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400');

-- Books (category_id = 7)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Atomic Habits', 'atomic-habits', 'James Clear bestseller', 16.99, 19.99, 7, 150, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
('The Midnight Library', 'midnight-library', 'Matt Haig novel', 14.99, 17.99, 7, 120, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'),
('Educated', 'educated-memoir', 'Tara Westover memoir', 15.99, 18.99, 7, 100, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400'),
('Sapiens', 'sapiens-book', 'Yuval Noah Harari', 18.99, 22.99, 7, 130, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'),
('The Alchemist', 'the-alchemist', 'Paulo Coelho classic', 12.99, 15.99, 7, 180, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
('Becoming', 'becoming-obama', 'Michelle Obama autobiography', 19.99, 24.99, 7, 110, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'),
('Where the Crawdads Sing', 'crawdads-sing', 'Delia Owens bestseller', 16.99, 19.99, 7, 140, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400'),
('The Subtle Art', 'subtle-art', 'Mark Manson self-help', 15.99, 18.99, 7, 160, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'),
('1984', '1984-orwell', 'George Orwell classic', 13.99, 16.99, 7, 200, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
('Harry Potter Set', 'harry-potter-set', 'Complete 7-book series', 89.99, 109.99, 7, 80, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400');

-- Pet Supplies (category_id = 8)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Furbo Dog Camera', 'furbo-dog-camera', 'Pet monitoring camera', 169.99, 199.99, 8, 60, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'),
('PetSafe Fountain', 'petsafe-fountain', 'Automatic water fountain', 39.99, 49.99, 8, 100, 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=400'),
('Kong Classic Dog Toy', 'kong-classic-toy', 'Durable rubber toy', 12.99, 15.99, 8, 250, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400'),
('Litter Robot', 'litter-robot', 'Self-cleaning litter box', 499.99, 599.99, 8, 35, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'),
('Blue Buffalo Dog Food', 'blue-buffalo-food', '30lb bag premium food', 54.99, 64.99, 8, 120, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400'),
('Petcube Play Camera', 'petcube-play', 'Interactive pet camera', 199.99, 249.99, 8, 50, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'),
('Furminator Brush', 'furminator-brush', 'De-shedding tool', 34.99, 44.99, 8, 140, 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'),
('PetSafe Collar', 'petsafe-collar', 'Training collar system', 129.99, 159.99, 8, 70, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'),
('Whisker City Tower', 'whisker-city-tower', 'Cat scratching post', 79.99, 99.99, 8, 85, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400'),
('Nylabone Chew Toys', 'nylabone-chews', 'Dental chew toy pack', 19.99, 24.99, 8, 200, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400');

-- Sports & Outdoors (category_id = 9)
INSERT INTO products (name, slug, description, price, compare_at_price, category_id, stock_quantity, image_url) VALUES
('Yeti Cooler', 'yeti-cooler', '45-quart insulated cooler', 349.99, 399.99, 9, 50, 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400'),
('Hydro Flask', 'hydro-flask', '32oz insulated bottle', 44.99, 54.99, 9, 180, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'),
('Coleman Tent', 'coleman-tent', '6-person camping tent', 159.99, 199.99, 9, 70, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400'),
('Bowflex Dumbbells', 'bowflex-dumbbells', 'Adjustable weight set', 349.99, 429.99, 9, 60, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'),
('Peloton Bike', 'peloton-bike', 'Indoor cycling bike', 1445.00, 1645.00, 9, 25, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'),
('North Face Backpack', 'north-face-backpack', '40L hiking backpack', 149.99, 179.99, 9, 90, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'),
('Wilson Basketball', 'wilson-basketball', 'Official size basketball', 29.99, 39.99, 9, 150, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'),
('Spalding Hoop', 'spalding-hoop', 'Portable basketball hoop', 299.99, 349.99, 9, 40, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'),
('Garmin Fenix Watch', 'garmin-fenix', 'GPS multisport watch', 699.99, 799.99, 9, 45, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400'),
('TRX Suspension Trainer', 'trx-suspension', 'Home workout system', 179.99, 219.99, 9, 80, 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400');
