// Comprehensive Step-by-Step Recipes for all Food Items

export const recipesData = {
  // 1: Tuscan Farmhouse Pizza
  1: {
    prepTime: "25 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Stone-baked Italian style sourdough crust with sweet San Marzano tomato base and fresh garden toppings.",
    ingredients: [
      { name: "Sourdough pizza dough ball", amount: "250g", category: "Base" },
      { name: "San Marzano canned tomato puree", amount: "1/2 cup", category: "Sauce" },
      { name: "Fresh Fior Di Latte mozzarella", amount: "150g", category: "Cheese" },
      { name: "Bell peppers (sliced into strips)", amount: "1/2 cup", category: "Toppings" },
      { name: "Button mushrooms (thinly sliced)", amount: "1/2 cup", category: "Toppings" },
      { name: "Sweet corn kernels", amount: "1/4 cup", category: "Toppings" },
      { name: "Black Kalamata olives (pitted)", amount: "2 tbsp", category: "Toppings" },
      { name: "Extra virgin olive oil & fresh basil", amount: "2 tbsp", category: "Garnish" },
      { name: "Dried oregano & sea salt flakes", amount: "1 tsp each", category: "Seasoning" }
    ],
    steps: [
      {
        step: 1,
        title: "Dough Resting & Stretching",
        instruction: "Bring the chilled sourdough dough ball to room temperature for 30 minutes. Dust your work surface with semolina flour and gently stretch the dough by pressing outwards from the center to form a 12-inch round with an airy, raised border (cornicione).",
        timerMinutes: 30,
        tip: "Never roll with a rolling pin; use your fingertips to protect internal air bubbles."
      },
      {
        step: 2,
        title: "Prepare San Marzano Sauce",
        instruction: "In a small bowl, crush San Marzano tomatoes with extra virgin olive oil, a pinch of sea salt, and crushed dried oregano. Stir gently without over-blending.",
        tip: "A raw, un-cooked tomato sauce retains the freshest flavor when baked in the oven."
      },
      {
        step: 3,
        title: "Sauce & Mozzarella Foundation",
        instruction: "Ladle the tomato sauce onto the center of the stretched dough and spread outward in circular motions, leaving a 1-inch border. Tear fresh mozzarella into pieces and pat dry with paper towels before distributing evenly.",
        tip: "Drying fresh mozzarella prevents the pizza center from becoming watery."
      },
      {
        step: 4,
        title: "Layer the Farmhouse Veggies",
        instruction: "Scatter sliced bell peppers, fresh button mushrooms, sweet corn, and sliced black olives across the cheese. Drizzle a swirl of olive oil over the veggies.",
        timerMinutes: 3,
        tip: "Don't overload with heavy veggies so the bottom crust bakes crisp."
      },
      {
        step: 5,
        title: "High-Heat Baking",
        instruction: "Slide the pizza onto a preheated baking steel or pizza stone at 250°C (480°F). Bake for 10-12 minutes until the crust edge blisters with golden-brown leopard spots and the cheese bubbles.",
        timerMinutes: 12,
        tip: "Bake on the bottom rack or directly on a hot baking stone for maximum crispness."
      },
      {
        step: 6,
        title: "Herb Glaze & Plating",
        instruction: "Remove from the oven, immediately scatter freshly torn Genovese basil leaves, drizzle aromatic herb olive oil, slice into wedges, and serve piping hot.",
        tip: "Add fresh basil after baking so it stays vibrant green without turning black."
      }
    ],
    chefTips: [
      "Preheat your pizza stone or cast iron pan at the highest oven temperature for at least 45 minutes prior.",
      "A drizzle of chili-infused olive oil adds a traditional Tuscan hearth finish."
    ],
    nutrition: {
      calories: "280 kcal/slice",
      protein: "12g",
      carbs: "34g",
      fat: "9g"
    }
  },

  // 2: Spicy Pepperoni & Jalapeno Pizza
  2: {
    prepTime: "20 mins",
    cookTime: "12 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Smoky cured pepperoni with pickled jalapeno heat, baked until the pepperoni cups crisp up with savory red oils.",
    ingredients: [
      { name: "Fermented pizza dough", amount: "250g", category: "Base" },
      { name: "Spicy tomato coulis with chili paste", amount: "1/2 cup", category: "Sauce" },
      { name: "Low-moisture whole milk mozzarella", amount: "180g", category: "Cheese" },
      { name: "Artisanal cured pepperoni slices", amount: "80g (approx 20 slices)", category: "Meat" },
      { name: "Pickled jalapeño rings", amount: "3 tbsp", category: "Toppings" },
      { name: "Crushed red chili flakes & hot honey", amount: "1 tbsp each", category: "Finish" }
    ],
    steps: [
      {
        step: 1,
        title: "Base Stretching & Pan Prep",
        instruction: "Gently stretch your dough into a 12-inch disc on parchment paper dusted with cornmeal to give the base a signature rustic bite.",
        timerMinutes: 10,
        tip: "Cornmeal prevents sticking and gives a delightful crunch to the bottom crust."
      },
      {
        step: 2,
        title: "Apply Fiery Sauce Base",
        instruction: "Spread the spicy tomato coulis evenly over the dough, ensuring every bite carries robust garlic and chili warmth.",
        tip: "Keep the sauce thin so the base cooks crisp."
      },
      {
        step: 3,
        title: "Double Mozzarella Blanket",
        instruction: "Scatter shredded whole milk mozzarella generously edge-to-edge right up to the crust line.",
        tip: "Low-moisture mozzarella yields an irresistible cheese pull without getting greasy."
      },
      {
        step: 4,
        title: "Arrange Pepperoni & Jalapeño",
        instruction: "Shingle pepperoni slices across the cheese in concentric rings. Distribute tangy pickled jalapeno slices between the pepperoni.",
        tip: "Space pepperoni so edges can curl into crispy flavor cups during high-heat baking."
      },
      {
        step: 5,
        title: "Bake to Charred Perfection",
        instruction: "Bake at 240°C (465°F) for 10-12 minutes until the crust is blistered and the pepperoni edges are crisply curled.",
        timerMinutes: 12,
        tip: "Watch closely in the last 2 minutes as cured meats crisp up rapidly."
      },
      {
        step: 6,
        title: "Hot Honey Drizzle & Slice",
        instruction: "Remove from heat, immediately drizzle warm hot honey, sprinkle chili flakes, cut into 6 triangles, and enjoy.",
        tip: "Hot honey pairs magically with the salty pepperoni and sharp pickled jalapeños."
      }
    ],
    chefTips: [
      "Use natural casing pepperoni slices that curl into cups to hold flavorful juices.",
      "Toss jalapeños on paper towel before topping to remove excess brine."
    ],
    nutrition: {
      calories: "340 kcal/slice",
      protein: "15g",
      carbs: "32g",
      fat: "16g"
    }
  },

  // 3: Four Cheese Margherita Gourmet
  3: {
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Decadent four-cheese harmony combining Buffalo Mozzarella, aged Parmigiano, creamy Gorgonzola, and smoked Provolone.",
    ingredients: [
      { name: "Neapolitan style pizza dough", amount: "240g", category: "Base" },
      { name: "San Marzano plum tomato crush", amount: "1/3 cup", category: "Sauce" },
      { name: "Fresh Buffalo Mozzarella", amount: "100g", category: "Cheese" },
      { name: "Aged Parmigiano Reggiano (shaved)", amount: "40g", category: "Cheese" },
      { name: "Smoked Provolone cheese (grated)", amount: "50g", category: "Cheese" },
      { name: "Gorgonzola Dolce crumbles", amount: "40g", category: "Cheese" },
      { name: "Fresh Genovese basil & olive oil", amount: "Handful", category: "Garnish" }
    ],
    steps: [
      {
        step: 1,
        title: "Shape Neapolitan Crust",
        instruction: "Hand-stretch fermented dough onto a peel with fine semolina. Push air to the outer 1-inch edge to form a puffy rim.",
        timerMinutes: 5,
        tip: "Gentle hands keep the air trapped inside the dough cornicione."
      },
      {
        step: 2,
        title: "Light Sauce Coating",
        instruction: "Coat the dough with a thin layer of crushed San Marzano tomatoes, seasoned purely with sea salt.",
        tip: "A lighter sauce layer allows the complex gourmet cheeses to take center stage."
      },
      {
        step: 3,
        title: "Layer the Four Cheeses",
        instruction: "Start with a blanket of smoked provolone, tear buffalo mozzarella over top, dot with Gorgonzola crumbles, and dust with Parmigiano Reggiano.",
        tip: "Even distribution balances pungent Gorgonzola with sweet mozzarella."
      },
      {
        step: 4,
        title: "Flash Bake at Maximum Heat",
        instruction: "Bake on maximum oven setting (250°C/480°F or higher) for 8-10 minutes until cheese is a bubbling, golden tapestry.",
        timerMinutes: 9,
        tip: "High heat gives the cheese a caramelized brown speckle without drying out."
      },
      {
        step: 5,
        title: "Garnish & Rest",
        instruction: "Scatter fresh basil leaves and drizzle cold-pressed extra virgin olive oil. Rest for 2 minutes before slicing.",
        tip: "Resting allows the molten 4-cheese blend to settle slightly so it doesn't slide off."
      }
    ],
    chefTips: [
      "Use Gorgonzola Dolce rather than Piccante for a creamy, mild blue cheese note.",
      "Authentic Parmigiano Reggiano adds crucial savory umami depth."
    ],
    nutrition: {
      calories: "310 kcal/slice",
      protein: "14g",
      carbs: "30g",
      fat: "14g"
    }
  },

  // 4: Classic Smoked Cheeseburger
  4: {
    prepTime: "20 mins",
    cookTime: "12 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Cast-iron seared juicy patties with double melted sharp cheddar, caramelized shallots, and house secret relish.",
    ingredients: [
      { name: "Prime coarse-ground burger patties", amount: "2 x 180g", category: "Patty" },
      { name: "Brioche burger buns", amount: "2 pairs", category: "Buns" },
      { name: "Aged sharp cheddar cheese slices", amount: "4 slices", category: "Cheese" },
      { name: "Shallots (thinly sliced)", amount: "3 large", category: "Topping" },
      { name: "Butterhead crisp lettuce leaves", amount: "4 leaves", category: "Produce" },
      { name: "Dill gherkins / pickle chips", amount: "8 slices", category: "Produce" },
      { name: "House secret relish (Mayo + Dijonnaise + Paprika)", amount: "3 tbsp", category: "Sauce" },
      { name: "Butter, salt & coarse black pepper", amount: "As needed", category: "Pantry" }
    ],
    steps: [
      {
        step: 1,
        title: "Caramelize the Shallots",
        instruction: "Melt 1 tbsp butter in a skillet over medium-low heat. Add sliced shallots with a pinch of brown sugar and sea salt. Cook slowly for 12-15 minutes until deep golden brown and jammy.",
        timerMinutes: 15,
        tip: "Low heat and patience unlock maximum natural sweetness in shallots."
      },
      {
        step: 2,
        title: "Season & Indent Patties",
        instruction: "Form patties slightly larger than your buns. Make a shallow thumb depression in the center to prevent doming. Season both sides aggressively with salt and pepper right before hitting the pan.",
        tip: "Only season right before cooking so the meat stays tender and juicy."
      },
      {
        step: 3,
        title: "Sear & Melt Cheese",
        instruction: "Preheat a heavy cast iron skillet until smoking. Sear patties for 3-4 minutes undisturbed to develop a dark crust. Flip, immediately top each patty with 2 slices of sharp cheddar, cover with a lid or dome for 2 minutes to steam-melt the cheese.",
        timerMinutes: 6,
        tip: "Covering creates an internal steam vortex that perfectly melts cheddar."
      },
      {
        step: 4,
        title: "Toast Brioche Buns",
        instruction: "Butter cut sides of brioche buns and toast in the pan until golden and fragrant (about 90 seconds).",
        timerMinutes: 2,
        tip: "Toasting prevents the burger sauces from making the bun soggy."
      },
      {
        step: 5,
        title: "Assemble the Masterpiece",
        instruction: "Spread secret relish on bottom bun. Layer crisp butterhead lettuce, pickle slices, sizzling cheesy patty, caramelized shallots, more sauce on top bun, and gently crown.",
        tip: "Placing lettuce under the patty creates a moisture barrier protecting the bottom bun."
      }
    ],
    chefTips: [
      "Never press down on burger patties with a spatula while searing, or juices will escape.",
      "Let the burger rest for 2 minutes before cutting in half so juices redistribute."
    ],
    nutrition: {
      calories: "580 kcal",
      protein: "34g",
      carbs: "42g",
      fat: "31g"
    }
  },

  // 5: Crispy Paneer Royale Burger
  5: {
    prepTime: "25 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Thick panko-crusted cajun paneer steak with zesty mint garlic mayo, melted gouda, and crisp purple cabbage slaw.",
    ingredients: [
      { name: "Fresh block paneer (sliced into steaks)", amount: "2 x 120g slabs", category: "Patty" },
      { name: "Brioche or sesame burger buns", amount: "2 pairs", category: "Buns" },
      { name: "Panko breadcrumbs", amount: "1 cup", category: "Coating" },
      { name: "All-purpose flour & cornstarch", amount: "1/4 cup each", category: "Batter" },
      { name: "Cajun spice & smoked paprika", amount: "1 tbsp each", category: "Spice" },
      { name: "Gouda cheese slices", amount: "2 slices", category: "Cheese" },
      { name: "Mint garlic mayo (Mint + Garlic + Mayo)", amount: "4 tbsp", category: "Sauce" },
      { name: "Shredded purple cabbage slaw", amount: "1 cup", category: "Produce" }
    ],
    steps: [
      {
        step: 1,
        title: "Marinate Paneer Steaks",
        instruction: "Pat paneer dry with towels. Marinate slabs in 1 tbsp curd, cajun spice, smoked paprika, garlic paste, and salt for 15 minutes.",
        timerMinutes: 15,
        tip: "Drying paneer first ensures spices adhere tightly."
      },
      {
        step: 2,
        title: "Prepare Batter & Crumb Coating",
        instruction: "Whisk flour, cornstarch, salt, and water into a smooth batter of pancake-like consistency. Spread seasoned panko breadcrumbs on a flat plate.",
        tip: "Panko breadcrumbs create a shatteringly crisp exterior compared to regular crumbs."
      },
      {
        step: 3,
        title: "Double Dredge Paneer",
        instruction: "Dip marinated paneer steak into wet batter, then roll thoroughly in panko breadcrumbs, pressing firmly so crumbs coat all edges.",
        tip: "Press firmly on the edges so no spots remain bare."
      },
      {
        step: 4,
        title: "Crisp Shallow Frying",
        instruction: "Heat oil in a skillet to 180°C (350°F). Fry paneer patties for 3-4 minutes per side until deep golden and crunchy. Place a slice of Gouda on hot paneer to soften.",
        timerMinutes: 8,
        tip: "Ensure oil is sufficiently hot so crumbs absorb minimal oil."
      },
      {
        step: 5,
        title: "Toss Slaw & Toast Buns",
        instruction: "Toss purple cabbage with 1 tsp lemon juice and a pinch of salt. Butter and toast burger buns on a skillet until warm and crisp.",
        timerMinutes: 3,
        tip: "Lemon juice gives the slaw bright acidity and gorgeous magenta color."
      },
      {
        step: 6,
        title: "Assemble Royale Burger",
        instruction: "Slather mint garlic mayo on both buns. Place purple slaw on bottom bun, rest the hot cheesy paneer steak, add sliced heirloom tomato, and close with top bun.",
        tip: "Serve immediately while the panko crust is at peak crunch."
      }
    ],
    chefTips: [
      "Use fresh soft malai paneer for a pillowy inside and crunchy outside contrast.",
      "Air-fryer alternative: Air-fry breaded patties at 190°C for 12 minutes, turning midway."
    ],
    nutrition: {
      calories: "520 kcal",
      protein: "22g",
      carbs: "48g",
      fat: "27g"
    }
  },

  // 6: Fiery BBQ Crispy Chicken Burger
  6: {
    prepTime: "30 mins",
    cookTime: "18 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Golden buttermilk soaked fried chicken thigh glazed with smoky hickory chipotle sauce and crunchy coleslaw.",
    ingredients: [
      { name: "Boneless chicken thighs", amount: "2 pieces (approx 160g each)", category: "Meat" },
      { name: "Buttermilk", amount: "1 cup", category: "Marinade" },
      { name: "Seasoned all-purpose flour", amount: "1.5 cups", category: "Dredge" },
      { name: "Cayenne, garlic powder, onion powder", amount: "1 tsp each", category: "Seasoning" },
      { name: "Hickory chipotle BBQ sauce", amount: "1/2 cup", category: "Glaze" },
      { name: "Creamy coleslaw (cabbage + carrot + mayo)", amount: "1 cup", category: "Slaw" },
      { name: "Pickled jalapeno slices", amount: "2 tbsp", category: "Topping" },
      { name: "Brioche buns & butter", amount: "2 pairs", category: "Buns" }
    ],
    steps: [
      {
        step: 1,
        title: "Buttermilk Brining",
        instruction: "Submerge chicken thighs in buttermilk seasoned with hot sauce, garlic powder, and 1 tsp salt. Refrigerate for at least 30 minutes to tenderize meat.",
        timerMinutes: 30,
        tip: "Lactic acid in buttermilk breaks down proteins, guaranteeing super tender chicken."
      },
      {
        step: 2,
        title: "Flour Dredging Technique",
        instruction: "Drizzle 2 tablespoons of buttermilk into your seasoned flour bowl and rub with fingers to create small clumps. Dredge chicken thoroughly in flour, dip briefly back in buttermilk, and dredge once more.",
        tip: "Flour clumps fry into jagged, extra-crunchy fried chicken ridges."
      },
      {
        step: 3,
        title: "Deep Fry to Golden Crisp",
        instruction: "Heat vegetable oil to 175°C (350°F). Lower chicken thighs into oil and fry for 7-8 minutes until internal temperature reaches 74°C (165°F) and crust is deep mahogany.",
        timerMinutes: 8,
        tip: "Avoid overcrowding the oil so temperature doesn't drop."
      },
      {
        step: 4,
        title: "Hickory BBQ Glaze",
        instruction: "Warm barbecue sauce in a small pan. Immediately brush or toss freshly fried chicken in the sauce so it glazes while remaining crunchy.",
        timerMinutes: 2,
        tip: "Brush right before serving to preserve crisp skin."
      },
      {
        step: 5,
        title: "Assemble with Cool Slaw",
        instruction: "Toast buttered brioche buns. Stack bottom bun with generous creamy coleslaw, spicy BBQ chicken thigh, pickled jalapeño rings, and top bun.",
        tip: "Cold slaw provides the ultimate temperature and texture contrast to piping hot chicken."
      }
    ],
    chefTips: [
      "Chicken thighs are far juicier and forgive slight overcooking better than chicken breasts.",
      "Rest fried chicken on a wire rack rather than paper towels to prevent soggy bottoms."
    ],
    nutrition: {
      calories: "640 kcal",
      protein: "36g",
      carbs: "54g",
      fat: "32g"
    }
  },

  // 7: Hyderabadi Dum Chicken Biryani
  7: {
    prepTime: "40 mins",
    cookTime: "45 mins",
    servings: 4,
    difficulty: "Chef Special",
    chefNote: "Royal Mughal heritage biryani slow-cooked in sealed handi with saffron milk, caramelized birista, and tender marinated chicken.",
    ingredients: [
      { name: "Aged long-grain Basmati rice", amount: "500g (soaked 30 mins)", category: "Rice" },
      { name: "Bone-in chicken cuts", amount: "650g", category: "Meat" },
      { name: "Hung curd (thick yogurt)", amount: "1 cup", category: "Marinade" },
      { name: "Ginger-garlic paste", amount: "2 tbsp", category: "Marinade" },
      { name: "Kashmiri red chili & shahi garam masala", amount: "1 tbsp each", category: "Spices" },
      { name: "Fried onions (golden Birista)", amount: "1.5 cups", category: "Garnish" },
      { name: "Desi ghee & mint-coriander leaves", amount: "4 tbsp & 1 cup", category: "Aromatics" },
      { name: "Saffron strands soaked in warm milk", amount: "1/4 cup", category: "Aromatics" },
      { name: "Whole spices (cardamom, cloves, star anise, cinnamon)", amount: "Handful", category: "Spices" }
    ],
    steps: [
      {
        step: 1,
        title: "Marinate the Chicken",
        instruction: "Combine chicken pieces with hung curd, ginger-garlic paste, red chili powder, turmeric, shahi garam masala, half the fried onions, chopped mint, coriander, 2 tbsp ghee, and salt. Marinate for at least 45 minutes.",
        timerMinutes: 45,
        tip: "Bone-in chicken infuses rich stock into the rice during slow dum."
      },
      {
        step: 2,
        title: "Parboil Basmati Rice",
        instruction: "Bring a large pot of water to a rolling boil with whole spices, 2 tbsp salt, and 1 tsp ghee. Add drained soaked basmati rice. Cook for exactly 5-6 minutes until rice is 70% cooked (soft on outside, slight bite in center); drain immediately.",
        timerMinutes: 6,
        tip: "Never over-boil rice at this stage; it finishes cooking under steam dum."
      },
      {
        step: 3,
        title: "Handi Layering",
        instruction: "In a heavy-bottomed handi or Dutch oven, spread marinated chicken evenly across the base. Spread the 70% parboiled rice gently over the chicken layer.",
        tip: "Do not press down rice tightly; keep it airy so steam rises evenly."
      },
      {
        step: 4,
        title: "Royal Aromatics Garnish",
        instruction: "Drizzle saffron-infused warm milk, pure desi ghee, kewra water, remaining crispy fried onions (birista), and chopped fresh mint over the rice.",
        tip: "Saffron creates iconic alternating yellow and white fragrant rice grains."
      },
      {
        step: 5,
        title: "Sealed Dum Cooking",
        instruction: "Seal the rim of the pot with wheat flour dough or heavy foil with a tight lid. Cook on medium-high heat for 10 minutes, then lower onto a flat iron tawa on lowest simmer for 30 minutes.",
        timerMinutes: 40,
        tip: "A tawa diffuser prevents chicken on the bottom from catching."
      },
      {
        step: 6,
        title: "Rest & Fluff",
        instruction: "Turn off heat and let the handi rest unopened for 10 minutes. Cut the seal and gently fluff from the sides with a flat spatula to reveal layers.",
        timerMinutes: 10,
        tip: "Serve with cooling cucumber pomegranate raita and fiery Mirchi ka Salan."
      }
    ],
    chefTips: [
      "Use aged basmati rice (at least 2 years old) for extra-long non-sticky grains.",
      "Fried onions (birista) must be golden brown, not dark, to avoid bitterness."
    ],
    nutrition: {
      calories: "720 kcal",
      protein: "38g",
      carbs: "82g",
      fat: "28g"
    }
  },

  // 8: Nawabi Paneer Tikka Biryani
  8: {
    prepTime: "30 mins",
    cookTime: "35 mins",
    servings: 3,
    difficulty: "Medium",
    chefNote: "Tandoor-charred malai paneer layered with basmati, roasted cashews, fried raisins, and aromatic kewra essence.",
    ingredients: [
      { name: "Malai Paneer cubes (charred tikka)", amount: "350g", category: "Protein" },
      { name: "Extra-long Basmati rice", amount: "400g (soaked)", category: "Rice" },
      { name: "Thick curd & roasted besan (gram flour)", amount: "1/2 cup & 1 tbsp", category: "Marinade" },
      { name: "Onion-tomato shahi gravy base", amount: "1.5 cups", category: "Gravy" },
      { name: "Cashews & golden raisins (roasted in ghee)", amount: "1/4 cup", category: "Garnish" },
      { name: "Kashmiri saffron milk & kewra water", amount: "3 tbsp", category: "Aromatics" },
      { name: "Desi ghee & fresh mint leaves", amount: "3 tbsp", category: "Aromatics" }
    ],
    steps: [
      {
        step: 1,
        title: "Marinate & Char Paneer Tikka",
        instruction: "Toss paneer cubes in mustard oil, roasted besan, hung curd, ajwain, and tandoori masala. Sear in a hot grill pan for 4 minutes until edges get aromatic char marks.",
        timerMinutes: 15,
        tip: "High searing temperature chars the exterior without drying the paneer."
      },
      {
        step: 2,
        title: "Simmer Shahi Masala Base",
        instruction: "In a pan, cook finely chopped onions, ginger-garlic paste, tomato puree, cashew paste, and garam masala until oil releases.",
        timerMinutes: 10,
        tip: "Cashew paste lends a velvety royal richness to the gravy."
      },
      {
        step: 3,
        title: "Parboil Basmati Rice",
        instruction: "Cook soaked basmati rice in spiced boiling water with green cardamom and cloves until 75% done; drain gently.",
        timerMinutes: 6,
        tip: "Rinse with a touch of cold water to stop cooking immediately."
      },
      {
        step: 4,
        title: "Layer Tikka & Rice",
        instruction: "In a heavy pot, spread half the rice, add shahi gravy and charred paneer tikka, top with remaining rice, roasted cashews, raisins, saffron milk, and fresh mint.",
        tip: "Distribute paneer evenly so every serving gets succulent tikka pieces."
      },
      {
        step: 5,
        title: "Dum Steam Infusion",
        instruction: "Cover with foil and tight lid. Simmer on low flame for 20 minutes to allow aromas to meld.",
        timerMinutes: 20,
        tip: "Keep flame low so bottom rice layer develops a fragrant golden crust."
      }
    ],
    chefTips: [
      "Soak paneer in warm salted water for 10 minutes before marinating for ultimate softness.",
      "Garnish with edible silver leaf (vark) for royal banqueting style."
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "24g",
      carbs: "78g",
      fat: "28g"
    }
  },

  // 9: Royal Gujarati Heritage Thali
  9: {
    prepTime: "40 mins",
    cookTime: "35 mins",
    servings: 2,
    difficulty: "Chef Special",
    chefNote: "Quintessential grand Gujarati feast: Khatti-Meethi Dal, Kathor Sabzi, puffed Phulkas with ghee, Basundi, and Chaas.",
    ingredients: [
      { name: "Toor dal (pigeon pea lentils)", amount: "1 cup", category: "Dal" },
      { name: "Jaggery & Kokum/lemon juice", amount: "2 tbsp each", category: "Dal" },
      { name: "Paneer Makhanwala / seasonal kathor", amount: "200g", category: "Sabzi" },
      { name: "Whole wheat flour (gehu ka atta)", amount: "1.5 cups", category: "Breads" },
      { name: "Pure cow desi ghee", amount: "4 tbsp", category: "Breads" },
      { name: "Full cream milk & saffron for Basundi", amount: "500ml", category: "Sweet" },
      { name: "Khaman dhokla & roasted papad", amount: "2 pcs each", category: "Sides" },
      { name: "Chilled spiced masala chaas (buttermilk)", amount: "2 glasses", category: "Beverage" }
    ],
    steps: [
      {
        step: 1,
        title: "Prepare Khatti-Meethi Dal",
        instruction: "Pressure-cook toor dal with turmeric and water for 4 whistles; blend smooth. Temper in ghee with mustard seeds, cumin, cloves, cinnamon, curry leaves, and dry red chilies. Add jaggery, kokum, peanuts, and simmer for 15 minutes.",
        timerMinutes: 20,
        tip: "Simmering for 15 minutes allows sweet and sour notes to balance perfectly."
      },
      {
        step: 2,
        title: "Cook Paneer Makhanwala / Sabzi",
        instruction: "Sauté ginger, green chilies, and ripe tomato puree with mild spices. Add diced paneer, fresh cream, a spoon of sugar, and kasuri methi.",
        timerMinutes: 12,
        tip: "A hint of sugar balances the acidity in traditional Gujarati style."
      },
      {
        step: 3,
        title: "Knead & Puff Ghee Phulkas",
        instruction: "Knead soft pliable wheat dough with a dash of oil. Roll paper-thin round rotis and cook on hot tava until speckled; place directly over open flame to puff like balloons, brush with pure cow ghee.",
        timerMinutes: 10,
        tip: "Rolling evenly ensures uniform puffing on the flame."
      },
      {
        step: 4,
        title: "Simmer Saffron Basundi",
        instruction: "Boil full cream milk in a wide pan, continuously scraping cream from sides until reduced to half. Stir in sugar, cardamom powder, saffron, and sliced almonds.",
        timerMinutes: 20,
        tip: "Scraping the malai into the milk gives authentic basundi texture."
      },
      {
        step: 5,
        title: "Assemble Royal Heritage Thali",
        instruction: "Arrange steaming hot phulkas wrapped in cotton cloth, khatti-meethi dal, sabzi, fragrant steamed rice, soft khaman dhokla, roasted papad, chilled basundi, and frosted masala chaas in a traditional kansa thali.",
        tip: "Serve with love (aagrah) in timeless Gujarati hospitality style."
      }
    ],
    chefTips: [
      "Gujarati dal always features raw peanuts boiled along with the lentils for delightful bite.",
      "Temper the chaas with roasted cumin powder and rock salt (kala namak)."
    ],
    nutrition: {
      calories: "780 kcal",
      protein: "26g",
      carbs: "110g",
      fat: "28g"
    }
  },

  // 10: Kathiyawadi Sev Tameta & Rotla Combo
  10: {
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Rustic Saurashtra flavors: spicy tomato curry topped with crunchy sev, hand-patted bajra rotla, white butter, and jaggery.",
    ingredients: [
      { name: "Juicy ripe country tomatoes (desi tameta)", amount: "4 large (chopped)", category: "Curry" },
      { name: "Thick spicy chickpea Sev (Ratlami/Kathiyawadi)", amount: "1.5 cups", category: "Curry" },
      { name: "Bajra flour (pearl millet)", amount: "2 cups", category: "Rotla" },
      { name: "Freshly churned white butter (safed makhan)", amount: "4 tbsp", category: "Accompaniment" },
      { name: "Organic country jaggery (gud)", amount: "50g", category: "Accompaniment" },
      { name: "Garlic chutney paste (lahsun chutney)", amount: "2 tbsp", category: "Spices" },
      { name: "Peanut oil & mustard cumin seeds", amount: "2 tbsp", category: "Pantry" }
    ],
    steps: [
      {
        step: 1,
        title: "Temper Kathiyawadi Vaghar",
        instruction: "Heat peanut oil in a kadai. Splutter mustard seeds, cumin seeds, hing (asafoetida), curry leaves, and 1 tbsp fiery red garlic chutney.",
        timerMinutes: 3,
        tip: "Authentic Kathiyawadi cuisine always uses peanut oil and generous garlic."
      },
      {
        step: 2,
        title: "Simmer Tangy Tomato Gravy",
        instruction: "Add chopped tomatoes, turmeric, coriander-cumin powder (dhana-jeeru), Kashmiri red chili, salt, and a small piece of jaggery. Cover and simmer for 8-10 minutes until tomatoes break down into a glossy curry.",
        timerMinutes: 10,
        tip: "Use desi (local sour) tomatoes for signature tangy depth."
      },
      {
        step: 3,
        title: "Hand-Pat Bajra Rotla",
        instruction: "Take 1 cup bajra flour, add warm water gradually, and knead with your heel of hand until soft and elastic. Hand-pat between palms into a 1/2-inch thick disc without rolling pin.",
        timerMinutes: 8,
        tip: "Kneading with warm water develops elasticity in gluten-free millet flour."
      },
      {
        step: 4,
        title: "Roast on Earthen Clay Tawa",
        instruction: "Place rotla on hot tawa, smear water on top surface with fingers. Flip when bottom is sealed. Roast both sides and puff on open flame. Smear with dollops of safed makhan.",
        timerMinutes: 6,
        tip: "Water on top prevents cracks and gives a soft skin."
      },
      {
        step: 5,
        title: "Add Sev Just Before Serving",
        instruction: "Right before serving, stir thick crunchy sev into the hot tomato gravy. Do not overcook so sev retains its bite.",
        tip: "Adding sev too early makes it soggy; add right at the dining table."
      },
      {
        step: 6,
        title: "Plating the Village Feast",
        instruction: "Serve piping hot Sev Tameta alongside steaming bajra rotla, generous lumps of safed makhan, blocks of jaggery, raw onions, and fried green chilies.",
        tip: "Mashing hot rotla with white butter and jaggery creates the legendary 'Churma' bite."
      }
    ],
    chefTips: [
      "Use thick ratlami or Bhavnagri sev, never fine nylon sev.",
      "Traditional clay lodhi (tawa) gives an incomparable smoky earthen aroma to rotlas."
    ],
    nutrition: {
      calories: "590 kcal",
      protein: "16g",
      carbs: "84g",
      fat: "24g"
    }
  },

  // 11: Szechuan Hakka Noodles
  11: {
    prepTime: "20 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "High-heat wok charred noodles tossed with crunchy julienned veggies and fiery Szechuan chili oil.",
    ingredients: [
      { name: "Hakka egg or wheat noodles", amount: "200g", category: "Noodles" },
      { name: "Julienned bell peppers (capsicum)", amount: "1/2 cup", category: "Veggies" },
      { name: "Shredded cabbage & carrots", amount: "1 cup", category: "Veggies" },
      { name: "Spring onions (whites and greens separated)", amount: "1/2 cup", category: "Veggies" },
      { name: "Minced garlic & ginger matchsticks", amount: "2 tbsp each", category: "Aromatics" },
      { name: "Szechuan chili paste & dark soy sauce", amount: "2 tbsp & 1 tbsp", category: "Sauce" },
      { name: "Toasted sesame oil & white pepper", amount: "1 tbsp & 1/2 tsp", category: "Seasoning" }
    ],
    steps: [
      {
        step: 1,
        title: "Boil Noodles Al Dente",
        instruction: "Bring 6 cups of water with 1 tsp salt to a rolling boil. Add noodles and cook for 4-5 minutes until 85% done. Drain immediately, rinse in icy cold water, and toss with 1 tsp oil.",
        timerMinutes: 5,
        tip: "Rinsing stops residual cooking and keeps noodle strands non-sticky."
      },
      {
        step: 2,
        title: "Wok Preparation (Smoking Hot)",
        instruction: "Heat a seasoned carbon steel wok over the highest flame until smoking hot. Swirl 2 tbsp vegetable oil around the perimeter.",
        tip: "High heat creates 'wok hei' (breath of the wok) imparting restaurant-style smokiness."
      },
      {
        step: 3,
        title: "Flash-Fry Aromatics",
        instruction: "Toss in minced garlic, ginger, and spring onion whites. Stir-fry rapidly for 20 seconds without burning.",
        timerMinutes: 1,
        tip: "Keep everything moving continuously in the wok."
      },
      {
        step: 4,
        title: "Toss Crisp Veggies",
        instruction: "Add julienned carrots, cabbage, and bell peppers. Stir-fry on highest flame for 90 seconds so veggies stay vibrant and crunchy.",
        timerMinutes: 2,
        tip: "Never steam the veggies; keep flame roaring."
      },
      {
        step: 5,
        title: "Add Noodles & Szechuan Sauce",
        instruction: "Add the boiled noodles, Szechuan paste, dark soy sauce, rice vinegar, and white pepper. Toss vigorously with tongs or flick the wok to coat every strand evenly.",
        timerMinutes: 3,
        tip: "Use two forks or cooking chopsticks to untangle and coat noodles without breaking."
      },
      {
        step: 6,
        title: "Finishing Touch",
        instruction: "Drizzle toasted sesame oil around the rim, scatter chopped spring onion greens, toss once more, and serve smoking hot.",
        tip: "Toasted sesame oil should only be added at the very end to preserve delicate nutty aromas."
      }
    ],
    chefTips: [
      "Prep all veggies and sauces in bowls before turning on the flame; wok cooking happens in seconds.",
      "Add a pinch of sugar to round off the sharpness of Szechuan chilies."
    ],
    nutrition: {
      calories: "490 kcal",
      protein: "14g",
      carbs: "68g",
      fat: "18g"
    }
  },

  // 12: Steamed Crystal Dimsums (6 Pcs)
  12: {
    prepTime: "35 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Chef Special",
    chefNote: "Translucent handcrafted dumplings stuffed with shiitake, water chestnuts, and bok choy, steamed in bamboo baskets.",
    ingredients: [
      { name: "Wheat starch (tang mian) & Tapioca starch", amount: "100g & 50g", category: "Dough" },
      { name: "Boiling water", amount: "150ml", category: "Dough" },
      { name: "Dried Shiitake mushrooms (rehydrated & minced)", amount: "4 large", category: "Filling" },
      { name: "Water chestnuts (finely diced)", amount: "1/4 cup", category: "Filling" },
      { name: "Bok choy & carrot (finely minced)", amount: "1/2 cup", category: "Filling" },
      { name: "Toasted sesame oil & light soy sauce", amount: "1 tbsp each", category: "Filling" },
      { name: "Crispy chili garlic oil for dipping", amount: "2 tbsp", category: "Dip" }
    ],
    steps: [
      {
        step: 1,
        title: "Prepare Savory Vegetable Filling",
        instruction: "Squeeze moisture from minced shiitake, water chestnuts, and bok choy. Sauté in sesame oil with minced ginger, light soy sauce, and white pepper for 3 minutes. Allow to cool completely.",
        timerMinutes: 8,
        tip: "Cool filling prevents wrappers from tearing during pleating."
      },
      {
        step: 2,
        title: "Make Crystal Translucent Dough",
        instruction: "Combine wheat starch and tapioca starch in a bowl. Pour rapidly boiling water directly into starch, stirring immediately with chopsticks. Cover for 5 minutes, then knead with 1 tsp lard or oil into a glossy, smooth dough.",
        timerMinutes: 7,
        tip: "Water must be boiling hot to gelatinize starch and yield translucent wrappers."
      },
      {
        step: 3,
        title: "Flatten Paper-Thin Skins",
        instruction: "Roll dough into a rope, cut into 12 equal portions. Keep covered with a damp towel. Flatten each ball with the flat oiled blade of a cleaver into a thin, round translucent skin.",
        tip: "Make edges thinner than the center to hold the filling securely."
      },
      {
        step: 4,
        title: "Pleat and Seal",
        instruction: "Place 1 tablespoon filling in the center. Fold into a half moon and pleat 6-8 delicate folds along the front edge, pressing firmly to seal.",
        tip: "Handle gently as starch dough has no gluten."
      },
      {
        step: 5,
        title: "Steam in Bamboo Basket",
        instruction: "Line a bamboo steamer with perforated parchment or cabbage leaves. Arrange dimsums with space between them. Steam over high boiling water for 6-8 minutes until skins turn completely crystal clear.",
        timerMinutes: 8,
        tip: "Do not over-steam or crystal wrappers become gummy."
      },
      {
        step: 6,
        title: "Serve with Chili Oil",
        instruction: "Serve immediately straight from the bamboo basket with artisanal crispy chili garlic oil and sweet dumpling soy.",
        tip: "Best enjoyed while steam rises from the delicate dumplings."
      }
    ],
    chefTips: [
      "Water chestnuts provide essential crisp contrast to tender steamed mushroom filling.",
      "Work quickly and keep unused dough under a damp kitchen towel to prevent drying."
    ],
    nutrition: {
      calories: "240 kcal",
      protein: "7g",
      carbs: "44g",
      fat: "4g"
    }
  },

  // 13: Crispy Chilli Paneer Dry
  13: {
    prepTime: "20 mins",
    cookTime: "12 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Golden battered cottage cheese wok-tossed with fresh green chilies, dark soy sauce, and crunchy scallions.",
    ingredients: [
      { name: "Fresh paneer (cut into 1-inch cubes)", amount: "250g", category: "Protein" },
      { name: "Cornstarch & all-purpose flour", amount: "3 tbsp & 2 tbsp", category: "Batter" },
      { name: "Green bell peppers & onions (cut into petals)", amount: "1 cup", category: "Veggies" },
      { name: "Green chilies (slit lengthwise) & minced garlic", amount: "4 chilies & 2 tbsp garlic", category: "Aromatics" },
      { name: "Dark soy sauce & red chili sauce", amount: "1.5 tbsp each", category: "Sauce" },
      { name: "Rice vinegar & tomato ketchup", amount: "1 tsp each", category: "Sauce" },
      { name: "Spring onion greens (chopped)", amount: "1/4 cup", category: "Garnish" }
    ],
    steps: [
      {
        step: 1,
        title: "Batter & Coat Paneer",
        instruction: "Toss paneer cubes in cornstarch, flour, black pepper, and salt with a splash of water so each cube is wrapped in a light batter coat.",
        timerMinutes: 5,
        tip: "A light coating keeps the exterior super crisp without forming a heavy breading."
      },
      {
        step: 2,
        title: "Crisp Shallow Fry",
        instruction: "Heat oil in a wide skillet. Fry paneer cubes on medium-high heat for 3-4 minutes until all sides turn pale golden and crunchy. Drain on a wire rack.",
        timerMinutes: 5,
        tip: "Do not over-fry or paneer interior turns rubbery."
      },
      {
        step: 3,
        title: "Sizzle Aromatics in Wok",
        instruction: "Heat 1 tbsp oil in a hot wok. Flash-sauté minced garlic, ginger, and slit green chilies for 30 seconds until fragrant.",
        timerMinutes: 1,
        tip: "Slitting chilies releases their fragrant heat directly into the cooking oil."
      },
      {
        step: 4,
        title: "Toss Crisp Petals",
        instruction: "Add onion cubes and green bell pepper petals. Toss on high heat for 90 seconds so vegetables remain crunchy.",
        timerMinutes: 2,
        tip: "Crunchy vegetables are essential to signature Indo-Chinese dishes."
      },
      {
        step: 5,
        title: "Glossy Glaze & Final Toss",
        instruction: "Pour in dark soy sauce, chili sauce, ketchup, vinegar, and 1 tbsp cornstarch slurry. Boil for 30 seconds until glossy. Toss in crispy paneer and spring onions for 30 seconds to glaze.",
        timerMinutes: 2,
        tip: "Toss quickly so paneer stays crunchy while absorbing the spicy savory glaze."
      }
    ],
    chefTips: [
      "Always serve immediately; the contrast between hot crispy paneer and spicy savory sauce is unmatched.",
      "A splash of Chinese cooking rice vinegar balances the salty soy sauce."
    ],
    nutrition: {
      calories: "450 kcal",
      protein: "20g",
      carbs: "26g",
      fat: "29g"
    }
  },

  // 14: Mysore Masala Ghee Roast Dosa
  14: {
    prepTime: "15 mins",
    cookTime: "12 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Golden crepe smeared with fiery red garlic Mysore chutney, tempered potato masala, and pure melted desi ghee.",
    ingredients: [
      { name: "Fermented rice & urad dal dosa batter", amount: "2 cups", category: "Batter" },
      { name: "Desi ghee (pure clarified butter)", amount: "4 tbsp", category: "Roast" },
      { name: "Spicy red Mysore garlic chutney", amount: "4 tbsp", category: "Chutney" },
      { name: "Tempered potato masala (Aloo Bhaji)", amount: "1.5 cups", category: "Filling" },
      { name: "Fresh coconut chutney & drumstick sambar", amount: "For serving", category: "Accompaniment" }
    ],
    steps: [
      {
        step: 1,
        title: "Prepare Spicy Mysore Chutney",
        instruction: "Blend soaked Kashmiri dry red chilies, roasted chana dal, garlic cloves, tamarind pulp, and salt with water into a thick, fiery red paste.",
        timerMinutes: 5,
        tip: "Kashmiri chilies give bright red color with balanced heat."
      },
      {
        step: 2,
        title: "Prepare Tempered Potato Masala",
        instruction: "Heat 1 tsp oil, temper mustard seeds, urad dal, curry leaves, ginger, and green chilies. Add boiled mashed potatoes, turmeric, and salt. Mix well with fresh coriander.",
        timerMinutes: 8,
        tip: "Keep potatoes slightly chunky rather than completely pureed."
      },
      {
        step: 3,
        title: "Heat Cast Iron Tawa",
        instruction: "Heat a heavy cast iron tawa until sizzling hot. Sprinkle water droplets to cool slightly and wipe with an oiled onion slice.",
        tip: "Rubbing an onion slice prevents batter from sticking and builds natural seasoning."
      },
      {
        step: 4,
        title: "Pour & Swirl Dosa",
        instruction: "Pour a ladle of batter in center. With the bottom of ladle, gently spiral outward in circular motion to form an ultra-thin crepe.",
        tip: "Consistent spiral pressure creates paper-thin, even thickness."
      },
      {
        step: 5,
        title: "Ghee Roast & Chutney Smear",
        instruction: "Drizzle generous desi ghee all around the edges and center. Spread 1-2 tbsp of Mysore red chutney evenly across the dosa surface.",
        timerMinutes: 3,
        tip: "Desi ghee roasts the bottom into an irresistible mahogany golden hue."
      },
      {
        step: 6,
        title: "Fill, Roll & Serve",
        instruction: "Once the bottom turns crunchy and lifts off edges, place potato masala in center. Fold into a crisp golden cylinder and serve piping hot with coconut chutney and hot sambar.",
        tip: "Serve immediately straight from tawa to plate for peak crispness."
      }
    ],
    chefTips: [
      "Use well-fermented batter (fermented 10-12 hours in warm spot) for delicate sour notes and golden browning.",
      "Pure desi ghee creates the iconic buttery crisp crust that oil cannot replicate."
    ],
    nutrition: {
      calories: "410 kcal",
      protein: "9g",
      carbs: "58g",
      fat: "16g"
    }
  },

  // 15: Steamed Button Idlis with Medu Vada (Combo)
  15: {
    prepTime: "20 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Melt-in-mouth steamed mini idlis alongside crunchy golden medu vadas, dunked in fragrant drumstick sambar.",
    ingredients: [
      { name: "Fermented idli batter", amount: "2 cups", category: "Idli" },
      { name: "Soaked urad dal batter for Vada", amount: "1.5 cups (aerated)", category: "Vada" },
      { name: "Crushed peppercorns, cumin, curry leaves, ginger", amount: "1 tbsp", category: "Vada Spice" },
      { name: "Aromatic drumstick sambar", amount: "2 big bowls", category: "Sambar" },
      { name: "Fresh coconut chutney & gunpowder podi with ghee", amount: "4 tbsp each", category: "Sides" }
    ],
    steps: [
      {
        step: 1,
        title: "Steam Fluffy Button Idlis",
        instruction: "Grease mini button idli moulds with ghee. Spoon fermented batter into cavities. Steam in an idli steamer on high heat for 8-10 minutes until a skewer comes out clean.",
        timerMinutes: 10,
        tip: "Let steam settle for 2 minutes before demoulding with a wet spoon."
      },
      {
        step: 2,
        title: "Aerate Medu Vada Batter",
        instruction: "Grind soaked urad dal with minimal ice water. Whip batter vigorously in one direction for 5 minutes with hands until fluffy and light enough to float in a cup of water. Fold in peppercorns, cumin, curry leaves, ginger, and salt.",
        timerMinutes: 8,
        tip: "Whipping traps micro-air bubbles, guaranteeing light crispy vadas."
      },
      {
        step: 3,
        title: "Shape & Golden Fry Vadas",
        instruction: "Wet your palms with water. Take a lemon-sized portion of batter, flatten on fingers, make a hole in center with thumb, and slide gently into medium-hot oil (175°C). Fry for 4-5 minutes until deep golden brown and crunchy.",
        timerMinutes: 6,
        tip: "Wet hands prevent sticky batter from clinging to fingers."
      },
      {
        step: 4,
        title: "Simmer Drumstick Sambar",
        instruction: "Bring cooked toor dal to boil with tamarind pulp, drumstick pieces, shallots, sambar powder, and hing. Temper with mustard seeds and curry leaves.",
        timerMinutes: 10,
        tip: "Shallots (sambhar onions) give authentic South Indian sweetness."
      },
      {
        step: 5,
        title: "Grand South Indian Plating",
        instruction: "Serve a bowl of steaming button idlis drenched in piping hot sambar, with crispy medu vadas on side, coconut chutney, and a dollop of spicy gunpowder podi mixed with ghee.",
        tip: "Dunking idlis in hot sambar allows them to soak up spiced lentil goodness."
      }
    ],
    chefTips: [
      "Use chilled ice water while grinding urad dal to prevent mixer heat from cooking the batter.",
      "The water-float test ensures your vada batter has the right aeration before frying."
    ],
    nutrition: {
      calories: "320 kcal",
      protein: "14g",
      carbs: "52g",
      fat: "7g"
    }
  },

  // 16: Creamy Truffle Fettuccine Alfredo
  16: {
    prepTime: "15 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Handcrafted egg fettuccine ribbons in silky garlic cream, 24-month aged Parmigiano Reggiano, and white truffle essence.",
    ingredients: [
      { name: "Egg fettuccine pasta", amount: "250g", category: "Pasta" },
      { name: "Unsalted European butter", amount: "3 tbsp", category: "Sauce" },
      { name: "Heavy whipping cream", amount: "1 cup", category: "Sauce" },
      { name: "Freshly grated Parmigiano Reggiano", amount: "1 cup (aged 24 mos)", category: "Cheese" },
      { name: "Finely grated garlic cloves", amount: "2 cloves", category: "Aromatics" },
      { name: "White truffle oil", amount: "1.5 tsp", category: "Finish" },
      { name: "Freshly cracked black pepper & sea salt", amount: "1 tsp", category: "Seasoning" }
    ],
    steps: [
      {
        step: 1,
        title: "Boil Fettuccine Al Dente",
        instruction: "Bring a large pot of water to a rolling boil with 1.5 tbsp salt. Cook fettuccine for 8-9 minutes until firm to bite. Crucial: Reserve 1/2 cup of starchy pasta water before draining.",
        timerMinutes: 9,
        tip: "Starchy pasta water is liquid gold that binds sauce and pasta together."
      },
      {
        step: 2,
        title: "Gently Sauté Garlic in Butter",
        instruction: "Melt butter in a wide skillet over medium-low heat. Add finely grated garlic and sauté for 60 seconds until fragrant without browning.",
        timerMinutes: 2,
        tip: "Gentle heat prevents garlic from turning bitter."
      },
      {
        step: 3,
        title: "Simmer Cream & Melt Parmesan",
        instruction: "Pour in heavy cream and bring to a gentle simmer for 2 minutes. Remove pan from direct heat, gradually whisk in freshly grated Parmigiano Reggiano until a velvety, glossy sauce forms.",
        timerMinutes: 4,
        tip: "Take off high heat when adding cheese to prevent clumping and graininess."
      },
      {
        step: 4,
        title: "Emulsify with Pasta Water",
        instruction: "Toss hot drained fettuccine straight into the skillet. Pour in 3-4 tablespoons of reserved pasta water. Toss vigorously with tongs until the sauce clings like silk to every pasta ribbon.",
        timerMinutes: 2,
        tip: "Continuous tossing emulsifies butter, cream, and starch into a restaurant glaze."
      },
      {
        step: 5,
        title: "Truffle Oil Finish & Plating",
        instruction: "Drizzle white truffle oil, season with freshly cracked black pepper, swirl into warm shallow bowls, top with extra shaved parmesan curls, and serve immediately.",
        tip: "Add truffle oil off heat; high heat destroys delicate truffle aroma compounds."
      }
    ],
    chefTips: [
      "Always grate parmesan from a whole block; pre-grated bagged cheese contains cellulose that prevents smooth melting.",
      "Serve in warmed plates so the creamy sauce stays silky down to the last bite."
    ],
    nutrition: {
      calories: "540 kcal",
      protein: "18g",
      carbs: "56g",
      fat: "28g"
    }
  },

  // 17: Penne Arrabbiata Piccante
  17: {
    prepTime: "15 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Fiery Italian classic: al dente penne bathed in spicy San Marzano tomato reduction with sliced garlic and fresh Genovese basil.",
    ingredients: [
      { name: "Penne Rigate pasta", amount: "250g", category: "Pasta" },
      { name: "San Marzano whole peeled tomatoes (crushed)", amount: "400g can", category: "Sauce" },
      { name: "Extra virgin olive oil", amount: "3 tbsp", category: "Base" },
      { name: "Garlic cloves (thinly sliced)", amount: "4 cloves", category: "Aromatics" },
      { name: "Crushed red pepper flakes (or Birdseye chili)", amount: "1.5 tsp", category: "Spice" },
      { name: "Kalamata olives (sliced)", amount: "2 tbsp", category: "Toppings" },
      { name: "Fresh Genovese basil leaves & sea salt", amount: "Handful", category: "Finish" }
    ],
    steps: [
      {
        step: 1,
        title: "Cook Penne Rigate",
        instruction: "Cook penne in salted boiling water for 10 minutes until al dente. Reserve 1/2 cup pasta cooking water and drain.",
        timerMinutes: 10,
        tip: "Penne rigate has outer ridges that hold tomato sauce exceptionally well."
      },
      {
        step: 2,
        title: "Infuse Garlic & Chili in Olive Oil",
        instruction: "Heat extra virgin olive oil in a skillet over medium heat. Add sliced garlic and crushed chili flakes. Sizzle gently for 2 minutes until garlic edges turn golden.",
        timerMinutes: 3,
        tip: "Infusing oil slowly extracts heat and fragrance without burning chili seeds."
      },
      {
        step: 3,
        title: "Simmer Spicy Arrabbiata Reduction",
        instruction: "Pour crushed San Marzano tomatoes and 1/2 tsp sea salt into the skillet. Simmer on medium-low heat for 12 minutes until sauce turns deep ruby red and thickens.",
        timerMinutes: 12,
        tip: "Simmering reduces tomato acidity and intensifies sweetness."
      },
      {
        step: 4,
        title: "Toss Pasta into Sauce",
        instruction: "Add sliced olives and drained penne into the simmering sauce with 3 tablespoons pasta water. Toss vigorously over heat for 60 seconds so pasta absorbs sauce into its tubes.",
        timerMinutes: 2,
        tip: "Cooking pasta inside the sauce for the final minute infuses deep flavor."
      },
      {
        step: 5,
        title: "Herb Glaze & Plating",
        instruction: "Tear fresh basil leaves into the pasta, swirl extra virgin olive oil over top, and serve with freshly grated Pecorino Romano or Parmesan.",
        tip: "Torn basil releases more aromatic essential oils than knife-cut basil."
      }
    ],
    chefTips: [
      "Arrabbiata translates to 'angry' in Italian—adjust chili flakes to your desired level of fire.",
      "A drizzle of quality finishing olive oil ties the acidity and spice together."
    ],
    nutrition: {
      calories: "420 kcal",
      protein: "13g",
      carbs: "68g",
      fat: "11g"
    }
  },

  // 18: Mediterranean Quinoa & Avocado Bowl
  18: {
    prepTime: "20 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Nutrient-packed powerhouse: fluffy tri-color quinoa, Hass avocado fan, Greek feta, cherry tomatoes, and lemon-oregano vinaigrette.",
    ingredients: [
      { name: "Organic tri-color quinoa", amount: "1 cup (rinsed)", category: "Grain" },
      { name: "Vegetable broth or water", amount: "2 cups", category: "Grain" },
      { name: "Ripe Hass avocado (sliced)", amount: "1 whole", category: "Produce" },
      { name: "Sweet cherry tomatoes (halved)", amount: "1 cup", category: "Produce" },
      { name: "English cucumber (diced)", amount: "1 cup", category: "Produce" },
      { name: "Kalamata olives & crumbled Greek feta", amount: "1/4 cup & 60g", category: "Toppings" },
      { name: "Toasted pumpkin seeds", amount: "2 tbsp", category: "Crunch" },
      { name: "Lemon oregano dressing (Olive oil + Lemon + Oregano + Garlic)", amount: "4 tbsp", category: "Dressing" }
    ],
    steps: [
      {
        step: 1,
        title: "Rinse & Cook Quinoa",
        instruction: "Rinse quinoa under cold water in a fine strainer to remove bitter saponin. Simmer with vegetable broth in a covered pot on low heat for 15 minutes. Remove from heat and let steam covered for 5 minutes, then fluff with a fork.",
        timerMinutes: 20,
        tip: "Cooking in vegetable broth infuses savory flavor into every quinoa seed."
      },
      {
        step: 2,
        title: "Whisk Lemon Oregano Vinaigrette",
        instruction: "In a jar, shake 3 tbsp extra virgin olive oil, 1.5 tbsp lemon juice, 1 minced garlic clove, 1/2 tsp dried Greek oregano, 1/2 tsp Dijon mustard, salt, and pepper.",
        tip: "Dijon mustard acts as an emulsifier holding lemon and oil in suspension."
      },
      {
        step: 3,
        title: "Prep Fresh Mediterranean Veggies",
        instruction: "Halve cherry tomatoes, dice crisp cucumbers, thinly slice red onions, and pit kalamata olives.",
        timerMinutes: 5,
        tip: "Uniform dice creates a beautiful mosaic presentation."
      },
      {
        step: 4,
        title: "Fan the Avocado",
        instruction: "Halve avocado, remove pit, slice thinly, and gently fan out with hands. Squeeze fresh lemon juice over slices to keep bright green.",
        tip: "Lemon citric acid prevents enzymatic browning."
      },
      {
        step: 5,
        title: "Assemble the Wellness Bowl",
        instruction: "Divide fluffy quinoa between wide shallow bowls. Arrange cucumber, cherry tomatoes, olives, and avocado fans in color-blocked sections. Crumble authentic Greek feta over top, scatter toasted pumpkin seeds, and drizzle vinaigrette.",
        tip: "Arrange ingredients in separate vibrant wedges for stunning visual appeal."
      }
    ],
    chefTips: [
      "Authentic Greek sheep's milk feta is creamier and less salty than cow's milk salad cheese.",
      "Can be prepped in advance as a healthy meal-prep lunch that stays fresh for 3 days."
    ],
    nutrition: {
      calories: "380 kcal",
      protein: "14g",
      carbs: "46g",
      fat: "18g"
    }
  },

  // 19: Smoked Chicken Protein Caesar Bowl
  19: {
    prepTime: "20 mins",
    cookTime: "15 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Char-grilled herb chicken tenderloins over crisp romaine hearts, sourdough croutons, soft-boiled egg, and Greek yogurt Caesar dressing.",
    ingredients: [
      { name: "Boneless chicken breast fillets", amount: "300g", category: "Protein" },
      { name: "Smoked paprika, garlic, dried thyme, olive oil", amount: "1 tbsp each", category: "Marinade" },
      { name: "Crisp Romaine lettuce hearts", amount: "1 large head (chopped)", category: "Greens" },
      { name: "Rustic sourdough bread (cubed for croutons)", amount: "1 cup", category: "Croutons" },
      { name: "Soft-boiled eggs (jammy yolk)", amount: "2 eggs", category: "Protein" },
      { name: "Shaved Parmigiano Reggiano", amount: "40g", category: "Cheese" },
      { name: "Greek yogurt Caesar dressing", amount: "4 tbsp", category: "Dressing" }
    ],
    steps: [
      {
        step: 1,
        title: "Herb Marinate Chicken",
        instruction: "Rub chicken breast fillets with olive oil, smoked paprika, dried thyme, minced garlic, salt, and black pepper. Marinate for 15 minutes.",
        timerMinutes: 15,
        tip: "Pounding chicken to uniform 1/2-inch thickness ensures even cooking."
      },
      {
        step: 2,
        title: "Bake Golden Sourdough Croutons",
        instruction: "Toss cubed sourdough bread with 1 tbsp olive oil, garlic powder, and sea salt. Bake in preheated oven at 190°C (375°F) for 8 minutes until golden and deeply crunchy.",
        timerMinutes: 8,
        tip: "Sourdough croutons stay crunchier longer in dressing than white bread."
      },
      {
        step: 3,
        title: "Char-Grill Chicken",
        instruction: "Preheat a cast-iron grill pan until smoking. Grill chicken for 5-6 minutes per side until prominent char marks appear and internal temperature reaches 74°C (165°F). Rest 5 minutes, then slice into diagonal strips.",
        timerMinutes: 12,
        tip: "Resting keeps juices locked inside instead of bleeding onto the plate."
      },
      {
        step: 4,
        title: "Whisk Protein Caesar Dressing",
        instruction: "Whisk Greek yogurt, grated parmesan, Dijon mustard, 1 tbsp lemon juice, 1 tsp Worcestershire sauce, and 1 tsp caper brine until creamy.",
        tip: "Greek yogurt provides classic creamy Caesar texture with triple the protein and half the fat."
      },
      {
        step: 5,
        title: "Toss & Assemble",
        instruction: "Toss crisp cold romaine hearts with 2 tbsp dressing. Top with sliced grilled chicken strips, jammy soft-boiled egg halves, crunchy croutons, and wide curls of shaved parmesan.",
        tip: "Toss greens right before eating so lettuce remains crisp."
      }
    ],
    chefTips: [
      "Boil eggs for exactly 6.5 minutes and plunge into ice water for perfect jammy yolks.",
      "Dry lettuce thoroughly with a salad spinner; wet lettuce dilutes Caesar dressing."
    ],
    nutrition: {
      calories: "410 kcal",
      protein: "42g",
      carbs: "22g",
      fat: "16g"
    }
  },

  // 20: Molten Belgian Chocolate Lava Cake
  20: {
    prepTime: "20 mins",
    cookTime: "12 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: "Decadent French dessert: individual warm chocolate sponge with a flowing center of 70% dark Belgian ganache.",
    ingredients: [
      { name: "70% dark Belgian chocolate (coarsely chopped)", amount: "120g", category: "Chocolate" },
      { name: "Unsalted European butter", amount: "80g", category: "Base" },
      { name: "Whole eggs + Egg yolk", amount: "2 whole + 1 yolk", category: "Batter" },
      { name: "Fine castor sugar", amount: "50g", category: "Batter" },
      { name: "All-purpose flour", amount: "30g (sifted)", category: "Dry" },
      { name: "Pure vanilla bean extract & pinch of salt", amount: "1 tsp", category: "Flavor" },
      { name: "Cocoa powder for dusting ramekins", amount: "1 tbsp", category: "Prep" },
      { name: "Madagascar vanilla bean ice cream", amount: "2 scoops", category: "Serving" }
    ],
    steps: [
      {
        step: 1,
        title: "Butter & Dust Ramekins",
        instruction: "Brush interior of two 6-oz ceramic ramekins thoroughly with soft butter using upward strokes. Dust with cocoa powder, tapping out any excess. Chill in fridge while prepping batter.",
        timerMinutes: 5,
        tip: "Upward butter strokes help the cake rise evenly without sticking."
      },
      {
        step: 2,
        title: "Melt Chocolate & Butter",
        instruction: "Place chopped Belgian dark chocolate and unsalted butter in a heatproof bowl over a pot of barely simmering water (bain-marie). Stir gently until glossy and melted. Set aside to cool slightly.",
        timerMinutes: 6,
        tip: "Do not let water touch bottom of bowl or chocolate may seize."
      },
      {
        step: 3,
        title: "Whip Eggs & Sugar to Ribbon Stage",
        instruction: "In a separate bowl, whip eggs, extra yolk, sugar, vanilla extract, and pinch of salt using a hand mixer on high speed for 3-4 minutes until pale, thick, and ribbon-like.",
        timerMinutes: 4,
        tip: "Whipped eggs give structural lift without needing baking powder."
      },
      {
        step: 4,
        title: "Fold Batters Gently",
        instruction: "Gently fold melted chocolate into the whipped egg mixture with a rubber spatula. Sift in flour and fold just until no flour streaks remain.",
        tip: "Never over-mix or you deflate the aerated egg structure."
      },
      {
        step: 5,
        title: "Bake to Molten Precision",
        instruction: "Pour batter into prepared ramekins. Bake in preheated oven at 200°C (400°F) for exactly 11-12 minutes until edges are set but center jiggles gently when shaken.",
        timerMinutes: 12,
        tip: "Timing is everything: 11 mins = gooey lava; 14 mins = regular chocolate cake."
      },
      {
        step: 6,
        title: "Invert & Serve",
        instruction: "Let ramekins rest for 2 minutes. Run a thin knife around edges, invert onto dessert plates, dust with powdered sugar, and serve immediately alongside cold vanilla ice cream.",
        tip: "The magical moment is slicing the cake to watch molten chocolate ganache flow out."
      }
    ],
    chefTips: [
      "Quality of chocolate defines this dish; use couverture chocolate with at least 65-70% cocoa solids.",
      "Bake a test ramekin if using an unfamiliar oven to dial in precise molten timing."
    ],
    nutrition: {
      calories: "390 kcal",
      protein: "7g",
      carbs: "38g",
      fat: "24g"
    }
  },

  // 21: New York Berry Cheesecake Slice
  21: {
    prepTime: "30 mins",
    cookTime: "60 mins",
    servings: 8,
    difficulty: "Chef Special",
    chefNote: "Velvety smooth Philadelphia cream cheese on buttery Graham crust, crowned with wild blueberry & raspberry compote.",
    ingredients: [
      { name: "Graham cracker crumbs", amount: "1.5 cups", category: "Crust" },
      { name: "Melted unsalted butter & sugar", amount: "5 tbsp & 2 tbsp", category: "Crust" },
      { name: "Original Philadelphia cream cheese (room temp)", amount: "500g (2 blocks)", category: "Filling" },
      { name: "Granulated sugar", amount: "3/4 cup", category: "Filling" },
      { name: "Sour cream & heavy cream", amount: "1/2 cup each", category: "Filling" },
      { name: "Large eggs (room temp)", amount: "3 whole", category: "Filling" },
      { name: "Wild blueberries & raspberries", amount: "1.5 cups", category: "Compote" },
      { name: "Lemon juice & cornstarch", amount: "1 tbsp each", category: "Compote" }
    ],
    steps: [
      {
        step: 1,
        title: "Bake Graham Cracker Crust",
        instruction: "Mix cracker crumbs with melted butter and sugar. Press firmly into bottom of 8-inch springform pan using the bottom of a drinking glass. Bake at 175°C (350°F) for 10 minutes, then cool completely.",
        timerMinutes: 12,
        tip: "Packing tightly ensures crust stays intact when sliced."
      },
      {
        step: 2,
        title: "Beat Cream Cheese & Sugar",
        instruction: "Beat room-temperature cream cheese and sugar on low speed with a paddle attachment for 2-3 minutes until completely smooth and lump-free.",
        timerMinutes: 4,
        tip: "Low speed prevents whipping excess air which causes cheesecake to crack."
      },
      {
        step: 3,
        title: "Fold Sour Cream & Eggs",
        instruction: "Gently stir in sour cream, heavy cream, vanilla, and 1 tsp lemon juice. Add eggs one at a time, mixing on lowest speed just until incorporated.",
        tip: "Room-temperature ingredients blend smoothly without curdling."
      },
      {
        step: 4,
        title: "Water Bath (Bain-Marie) Baking",
        instruction: "Wrap outer pan with heavy-duty foil. Pour batter over crust. Place pan inside a roasting tray filled with 1 inch of boiling water. Bake at 150°C (300°F) for 55-60 minutes until edges are set and center has a gentle wobble.",
        timerMinutes: 60,
        tip: "A water bath insulates against harsh heat, guaranteeing crack-free velvety texture."
      },
      {
        step: 5,
        title: "Gradual Oven Cooling & Chill",
        instruction: "Turn off oven, crack door open 2 inches, and leave cheesecake inside for 1 hour. Remove, bring to room temperature, then chill in refrigerator for at least 6 hours (preferably overnight).",
        timerMinutes: 60,
        tip: "Gradual cooling prevents the cheesecake from sinking in the middle."
      },
      {
        step: 6,
        title: "Simmer Wild Berry Compote",
        instruction: "Simmer blueberries, raspberries, sugar, and lemon juice in a small pan for 5 minutes until glossy and syrupy. Spoon warm or chilled compote over cheesecake slices before serving.",
        tip: "Slightly tart berries balance the decadent richness of sweet cream cheese."
      }
    ],
    chefTips: [
      "Dip your slicing knife in hot water and wipe clean between every cut for pristine bakery-grade slices.",
      "Never open the oven door during the first 45 minutes of baking."
    ],
    nutrition: {
      calories: "420 kcal/slice",
      protein: "8g",
      carbs: "36g",
      fat: "28g"
    }
  },

  // 22: Belgian Waffle with Nutella & Strawberries
  22: {
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Crisp deep-pocket Brussels waffle crowned with generous warm Nutella, sweet strawberries, and toasted hazelnut crunch.",
    ingredients: [
      { name: "All-purpose flour & cornstarch", amount: "1.5 cups & 2 tbsp", category: "Dry" },
      { name: "Baking powder & pinch of salt", amount: "2 tsp & 1/4 tsp", category: "Dry" },
      { name: "Whole milk & melted butter", amount: "1 cup & 4 tbsp", category: "Wet" },
      { name: "Eggs (separated into yolks & whites)", amount: "2 large", category: "Wet" },
      { name: "Warm creamy Nutella", amount: "4 tbsp", category: "Topping" },
      { name: "Fresh strawberries (sliced)", amount: "1 cup", category: "Produce" },
      { name: "Roasted hazelnuts (crushed) & powdered sugar", amount: "2 tbsp each", category: "Garnish" }
    ],
    steps: [
      {
        step: 1,
        title: "Whisk Dry & Wet Ingredients",
        instruction: "In a large bowl, whisk flour, cornstarch, baking powder, sugar, and salt. In another bowl, whisk milk, melted butter, egg yolks, and vanilla. Pour wet mixture into dry and stir gently.",
        timerMinutes: 4,
        tip: "Adding a little cornstarch gives the waffle crust exceptional crispness."
      },
      {
        step: 2,
        title: "Whip Egg Whites for Airy Lift",
        instruction: "In a clean grease-free bowl, whip egg whites with a hand mixer until stiff glossy peaks form. Gently fold whipped whites into the batter with a spatula in two additions.",
        timerMinutes: 5,
        tip: "Folding whipped egg whites is the secret to light-as-air Belgian waffles."
      },
      {
        step: 3,
        title: "Preheat Belgian Waffle Iron",
        instruction: "Preheat deep-pocket Belgian waffle maker to medium-high heat. Brush grids lightly with melted butter or oil.",
        tip: "A piping hot iron creates immediate crust caramelization."
      },
      {
        step: 4,
        title: "Bake to Golden Crunch",
        instruction: "Pour 1/2 cup batter into center of iron, close lid (flip if rotating model). Bake for 4-5 minutes until steam subsides and exterior is deep golden brown and crisp.",
        timerMinutes: 5,
        tip: "Stop when steam stops escaping from the iron; that signals moisture has evaporated and the crust is crisp."
      },
      {
        step: 5,
        title: "Nutella & Strawberry Crown",
        instruction: "Transfer hot waffle to plate. Drizzle warm Nutella into deep waffle pockets. Arrange fresh sliced strawberries, scatter toasted crushed hazelnuts, and dust with powdered sugar.",
        tip: "Warm Nutella slightly in microwave for 10 seconds so it drizzles effortlessly."
      }
    ],
    chefTips: [
      "Place baked waffles on a wire rack in a 100°C (200°F) oven to keep them warm and super crisp while baking the rest.",
      "Pair with a scoop of Madagascar vanilla ice cream for dessert indulgence."
    ],
    nutrition: {
      calories: "480 kcal",
      protein: "9g",
      carbs: "62g",
      fat: "22g"
    }
  },

  // 23: Mango Passionfruit Sparkler
  23: {
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Tropical mocktail refresher: Alphonso mango pulp, exotic passionfruit nectar, fresh garden mint, and chilled sparkling club soda.",
    ingredients: [
      { name: "Alphonso mango pulp / puree", amount: "1/2 cup", category: "Fruit" },
      { name: "Passionfruit syrup or nectar", amount: "4 tbsp", category: "Flavor" },
      { name: "Fresh spearmint leaves", amount: "12-15 leaves", category: "Herbs" },
      { name: "Juicy lime wedges", amount: "4 wedges", category: "Citrus" },
      { name: "Finely crushed ice", amount: "2 cups", category: "Ice" },
      { name: "Chilled club soda or sparkling water", amount: "300ml", category: "Fizz" }
    ],
    steps: [
      {
        step: 1,
        title: "Muddle Mint & Lime",
        instruction: "In tall highball glasses, add fresh mint leaves and lime wedges. Gently press with a wooden muddler 4-5 times to express fragrant citrus oils and mint aromas.",
        timerMinutes: 2,
        tip: "Muddle gently; tearing mint leaves releases bitter chlorophyll."
      },
      {
        step: 2,
        title: "Layer Mango Pulp",
        instruction: "Spoon 3 tablespoons of ripe Alphonso mango puree into each glass over the muddled aromatics.",
        tip: "Alphonso mangoes provide unmatched honeyed sweetness and floral aroma."
      },
      {
        step: 3,
        title: "Add Passionfruit Nectar",
        instruction: "Drizzle 2 tablespoons exotic passionfruit syrup into each glass to add tangy tropical acidity.",
        tip: "The natural tartness of passionfruit cuts through mango sweetness."
      },
      {
        step: 4,
        title: "Pack with Crushed Ice",
        instruction: "Fill the glasses to the brim with finely crushed pebble ice.",
        tip: "Crushed ice chills the drink instantly and keeps fruit layers in place."
      },
      {
        step: 5,
        title: "Top with Chilled Fizz",
        instruction: "Slowly top with bubbly chilled club soda. Gently pull spoon from bottom to top once to swirl layers without losing effervescence. Garnish with a mint sprig and lime wheel.",
        tip: "Pour soda slowly along the inside of glass to retain maximum fizz."
      }
    ],
    chefTips: [
      "Slap mint sprig between your palms before garnishing to release aromatic essential oils.",
      "Use sparkling mineral water for clean mineral effervescence."
    ],
    nutrition: {
      calories: "120 kcal",
      protein: "1g",
      carbs: "29g",
      fat: "0g"
    }
  },

  // 24: Thick Belgian Dark Chocolate Shake
  24: {
    prepTime: "10 mins",
    cookTime: "0 mins",
    servings: 2,
    difficulty: "Easy",
    chefNote: "Gourmet milkshake blended with Belgian chocolate gelato, fudge brownie chunks, whole cream milk, and dark chocolate ganache drizzle.",
    ingredients: [
      { name: "Belgian dark chocolate gelato or ice cream", amount: "4 large scoops (300g)", category: "Base" },
      { name: "Full cream chilled milk", amount: "1 cup", category: "Liquid" },
      { name: "Warm dark chocolate fudge sauce", amount: "4 tbsp", category: "Ganache" },
      { name: "Fudge brownie bits / crumbs", amount: "1/2 cup", category: "Mix-in" },
      { name: "Fresh whipped cream", amount: "For topping", category: "Garnish" },
      { name: "Dark chocolate curls or shavings", amount: "2 tbsp", category: "Garnish" }
    ],
    steps: [
      {
        step: 1,
        title: "Glass Decoration & Rim",
        instruction: "Drizzle warm dark chocolate ganache along the inside walls of tall milkshake glasses. Dip rims into chocolate fudge and coat with dark chocolate curls. Place glasses in freezer for 5 minutes.",
        timerMinutes: 5,
        tip: "Freezing glasses sets the chocolate swirls so they don't dissolve."
      },
      {
        step: 2,
        title: "Blend Gelato & Milk",
        instruction: "Add chocolate gelato, full cream milk, and 2 tbsp dark fudge sauce to a high-speed blender. Blend on high speed for 30-40 seconds until ultra-thick and velvety smooth.",
        timerMinutes: 1,
        tip: "Minimal milk keeps the shake thick enough to eat with a spoon."
      },
      {
        step: 3,
        title: "Pulse Brownie Crumbs",
        instruction: "Add half the brownie chunks to the blender. Pulse 2-3 times just to fold them in without pulverizing.",
        tip: "Short pulses leave delightful chewy brownie pockets."
      },
      {
        step: 4,
        title: "Pour into Chilled Glasses",
        instruction: "Pour thick velvety shake into chilled prepared glasses.",
        tip: "Pour slowly to admire the rich chocolate marbling."
      },
      {
        step: 5,
        title: "Crown & Garnish",
        instruction: "Top with a generous swirl of fresh whipped cream, remaining brownie cubes, dark chocolate curls, and a final drizzle of chocolate ganache. Serve with a wide straw and dessert spoon.",
        tip: "Serve immediately while ice-cold and thick."
      }
    ],
    chefTips: [
      "Use premium dark chocolate gelato with high cocoa solids rather than regular chocolate ice cream.",
      "Never add ice cubes to milkshakes as they water down the rich dairy creaminess."
    ],
    nutrition: {
      calories: "450 kcal",
      protein: "10g",
      carbs: "54g",
      fat: "22g"
    }
  }
};

/**
 * Helper to get recipe for any food item.
 * If food doesn't have an explicit recipe in recipesData (e.g. newly created by admin),
 * it dynamically synthesizes a realistic, high-quality step-by-step recipe!
 */
export const getRecipeForFood = (food) => {
  if (!food) return null;

  // If already directly attached on food
  if (food.recipe && Array.isArray(food.recipe.steps) && food.recipe.steps.length > 0) {
    return food.recipe;
  }

  // If present in recipesData by id
  if (recipesData[food.id]) {
    return recipesData[food.id];
  }

  // Synthesize dynamic recipe for custom admin food
  const category = (food.category || 'specialty').toLowerCase();
  const ingredientsList = Array.isArray(food.ingredients) && food.ingredients.length > 0
    ? food.ingredients.map(ing => ({ name: ing, amount: "As desired", category: "Fresh Produce" }))
    : [
        { name: "Chef's primary ingredients", amount: "Freshly sourced", category: "Core" },
        { name: "Herb & spice seasoning blend", amount: "2 tbsp", category: "Seasoning" },
        { name: "Pure cooking oil or butter", amount: "2 tbsp", category: "Cooking Base" }
      ];

  return {
    prepTime: "20 mins",
    cookTime: food.deliveryTime || "25 mins",
    servings: 2,
    difficulty: "Medium",
    chefNote: `Signature handcrafted recipe for ${food.name}, prepared fresh with premium quality ingredients and verified hygienic standards.`,
    ingredients: ingredientsList,
    steps: [
      {
        step: 1,
        title: "Ingredient Selection & Prep",
        instruction: `Carefully wash and prepare all fresh produce and key ingredients for ${food.name}. Organize seasonings and preheat cooking surfaces to appropriate temperatures.`,
        timerMinutes: 10,
        tip: "Mise en place (preparing all ingredients before firing the stove) guarantees cooking success."
      },
      {
        step: 2,
        title: "Marination & Flavor Infusion",
        instruction: `Season the base elements using aromatic spices, herbs, and marinades specific to ${food.cuisine || 'gourmet'} culinary tradition. Allow flavors to infuse for 10-15 minutes.`,
        timerMinutes: 15,
        tip: "Even seasoning ensures every layer carries authentic flavor depth."
      },
      {
        step: 3,
        title: "Core Cooking & Searing",
        instruction: `Cook the dish following authentic artisanal methods for ${category}. Control heat precisely to lock in natural juices, aroma, and signature crispness or tenderness.`,
        timerMinutes: 15,
        tip: "Avoid disturbing the dish during initial sear to develop rich caramelization."
      },
      {
        step: 4,
        title: "Finishing Glaze & Quality Check",
        instruction: `Add finishing sauces, fresh herb garnishes, and seasoning adjustments. Ensure temperature and aroma reach peak perfection before plating.`,
        timerMinutes: 5,
        tip: "Fresh herb garnishes added at the final minute preserve bright aromas."
      },
      {
        step: 5,
        title: "Artisanal Plating & Presentation",
        instruction: `Plate ${food.name} warm in a stylish serving dish. Garnish with complementary fresh toppings and serve immediately alongside suggested accompaniments.`,
        tip: "Serve immediately while steaming hot for the ultimate dining experience."
      }
    ],
    chefTips: [
      "Use freshest seasonal produce and authentic spices for purest flavor.",
      "Preheat cookware thoroughly before starting for best culinary results."
    ],
    nutrition: {
      calories: food.calories || "380 kcal",
      protein: "14g",
      carbs: "42g",
      fat: "16g"
    }
  };
};
