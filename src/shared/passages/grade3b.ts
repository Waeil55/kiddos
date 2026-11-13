import { passage, q, type Passage } from "./types";

// Grade 3, part 2 of 5 (stories 21-40).
export const GRADE3_B: Passage[] = [
  passage(3, "space-mission-2", "Mission to the Red Planet, Part 2", "🚀", "fiction", `
    The crew put on their space suits and stepped onto the dusty red ground. Dev, the youngest scientist, carried the
    rock drill. They followed the winding groove for nearly a mile. Along the way, they found smooth, round pebbles,
    just like the ones in rivers on Earth. "Rocks only get this smooth when water rolls them for a long time," Dev said.
    Suddenly, an alarm beeped on Zara's wrist. A dust storm was coming. "We have one hour," she said. "Let's take samples
    quickly."`, [
    q("text-structure", "Where would this paragraph fit in the whole story?", ["at the beginning", "in the middle", "at the end", "It is the whole story."], 1, "The crew already landed, and the problem is still happening, so it is the middle."),
    q("inference", "Why were the smooth pebbles important?", ["They were pretty.", "They were clues that water once flowed there.", "They were made of gold.", "They could be eaten."], 1, "Dev says rocks get smooth when water rolls them."),
    q("character", "Who carried the rock drill?", ["Zara", "Dev", "the robot", "nobody"], 1, "Dev, the youngest scientist, carried it."),
    q("cause-effect", "Why did the crew need to hurry?", ["Their lunch was ready.", "A dust storm was coming.", "Their ship was leaving.", "It was getting dark."], 1, "The alarm warned that a dust storm was coming."),
    q("synonym", "Which word means the same as 'quickly'?", ["slowly", "fast", "carefully", "quietly"], 1, "Fast means the same as quickly."),
  ]),
  passage(3, "space-mission-3", "Mission to the Red Planet, Part 3", "🚀", "fiction", `
    The crew raced back to the Starhopper just as orange dust began to swirl around them. They climbed inside and sealed
    the door. While the storm roared outside, Dev looked at the rock samples under a microscope. Tiny crystals sparkled
    in the light. "These crystals form when salty water dries up," he said. Captain Zara grinned and sent a message home:
    "Mission complete. Mars once had water." Two days later, the storm cleared, and the Starhopper lifted off toward Earth.`, [
    q("text-structure", "Where does this paragraph belong in the story?", ["at the beginning", "in the middle", "at the end", "It is the whole story."], 2, "The mission is complete and the ship goes home, so it is the end."),
    q("detail", "What did Dev see under the microscope?", ["tiny crystals", "a bug", "a fish fossil", "gold coins"], 0, "Tiny crystals sparkled in the light."),
    q("main-idea", "What did the crew discover?", ["Mars once had water.", "Mars has aliens.", "Mars is made of cheese.", "Mars has no rocks."], 0, "Zara's message says Mars once had water."),
    q("character", "How did Captain Zara feel when she sent the message?", ["proud and happy", "angry", "scared", "bored"], 0, "She grinned because the mission was a success."),
    q("vocabulary", "In the story, 'sealed' means:", ["opened wide", "closed tightly", "painted", "broke"], 1, "They sealed the door to keep the storm out."),
  ]),
  passage(3, "chameleon", "The Color-Changing Chameleon", "🦎", "nonfiction", `
    Chameleons are lizards known for changing color. Many people think chameleons change color only to hide, but that
    is not the whole story. Chameleons often change color to show their mood or to warm up and cool down. A calm
    chameleon may be green or brown. An angry or excited one may flash bright reds and yellows. Chameleons also have
    amazing eyes. Each eye can move by itself, so a chameleon can look in two directions at once! Their long, sticky
    tongues shoot out to catch insects in less than a second.`, [
    q("main-idea", "What is this text mostly about?", ["interesting facts about chameleons", "how to care for a dog", "why the sky is blue", "lizards that fly"], 0, "Each part gives facts about chameleons."),
    q("detail", "Besides hiding, why do chameleons change color?", ["to show their mood or control their temperature", "to go to sleep", "to find water", "to grow bigger"], 0, "They change color to show mood or warm up and cool down."),
    q("detail", "What is special about a chameleon's eyes?", ["They glow at night.", "Each eye can move by itself.", "They are closed all day.", "They are on its back."], 1, "Each eye can move by itself."),
    q("inference", "A bright red chameleon is probably:", ["calm", "asleep", "angry or excited", "cold"], 2, "Angry or excited chameleons flash bright reds and yellows."),
    q("visual", "Which picture would help a reader most?", ["a chameleon's tongue catching an insect", "a red fire truck", "a polar bear", "a birthday cake"], 0, "It shows a fact from the text about chameleons."),
  ]),
  passage(3, "lemonade-stand", "The Lemonade Stand Problem", "🍋", "fiction", `
    Kai and Lucy set up a lemonade stand to raise money for the animal shelter. They sold cups for fifty cents each.
    By noon, they had sold only three cups. "Nobody is walking down our street," Lucy sighed. Kai thought for a moment.
    "Let's move to the park! There's a soccer game today." They loaded the table into a wagon and pulled it to the park.
    The thirsty soccer players and their families lined up. By the end of the day, Kai and Lucy had raised forty dollars
    for the shelter.`, [
    q("cause-effect", "Why did they sell only three cups in the morning?", ["The lemonade was sour.", "Nobody was walking down their street.", "It was raining.", "The cups were too big."], 1, "Lucy says nobody is walking down their street."),
    q("detail", "Why were Kai and Lucy selling lemonade?", ["to buy a new bike", "to raise money for the animal shelter", "to go to the movies", "to pay for soccer"], 1, "The first sentence says it was for the animal shelter."),
    q("sequence", "What happened right after Kai had his idea?", ["They closed the stand.", "They moved the stand to the park.", "They made more lemonade.", "They went home."], 1, "They loaded the table into a wagon and went to the park."),
    q("character", "Which word best describes Kai?", ["a problem solver", "a lazy person", "a grumpy friend", "a shy boy"], 0, "He thought of a way to fix their problem."),
    q("phonics", "Which word has the same beginning sound as 'thirsty'?", ["three", "tree", "tired", "this"], 0, "Thirsty and three both start with the 'th' sound in 'think'."),
  ]),
  passage(3, "great-wall", "The Great Wall of China", "🏯", "nonfiction", `
    The Great Wall of China is one of the longest structures ever built by people. Parts of it are more than two thousand
    years old. Long ago, Chinese emperors ordered workers to build walls to protect their land from enemies coming from
    the north. Over hundreds of years, many walls were connected and made longer. Workers used stone, brick, wood, and
    even packed dirt. Soldiers watched from tall towers along the wall and lit fires to send signals. Today, millions of
    people from around the world visit the wall every year.`, [
    q("detail", "Why was the Great Wall built?", ["to protect the land from enemies", "to keep animals inside", "for people to race on", "to hold back the ocean"], 0, "Emperors built walls to protect their land."),
    q("detail", "How did soldiers send signals?", ["by phone", "by lighting fires", "by sending letters", "by ringing bells"], 1, "They lit fires on the towers to send signals."),
    q("vocabulary", "In this text, 'structures' are:", ["things that are built", "kinds of food", "animals", "songs"], 0, "Walls, towers, and buildings are structures."),
    q("detail", "Which material was NOT named in the text?", ["stone", "brick", "glass", "wood"], 2, "The text lists stone, brick, wood, and packed dirt, but not glass."),
    q("author-purpose", "The author wrote this text mainly to:", ["give information about the Great Wall", "tell a funny story", "teach how to build a wall at home", "sell trips to China"], 0, "It shares facts and history."),
  ]),
  passage(3, "lost-library-book", "The Lost Library Book", "📕", "fiction", `
    Hana searched everywhere for her library book, "The Secret of Owl Hollow." It was due tomorrow. She checked her
    backpack, under the couch, and even inside the refrigerator, just in case. Then she remembered reading it in her
    treehouse on Saturday. She climbed up the ladder and found the book sitting on the windowsill. But there was a
    problem: the rain had made the cover wavy and wet. Hana took a deep breath, brought the book to the library, and
    told the librarian the truth. The librarian thanked her for being honest and showed her how to dry it carefully.`, [
    q("sequence", "Where did Hana finally find the book?", ["in her backpack", "under the couch", "in her treehouse", "in the refrigerator"], 2, "She found it on the windowsill of her treehouse."),
    q("cause-effect", "Why was the book's cover wavy and wet?", ["Hana spilled juice.", "It got rained on.", "The dog chewed it.", "It fell in a bath."], 1, "The rain made the cover wavy and wet."),
    q("character", "Which word best describes Hana at the end?", ["honest", "sneaky", "careless", "angry"], 0, "She told the librarian the truth."),
    q("inference", "Why did Hana check the refrigerator?", ["She was hungry.", "She was looking everywhere, even silly places.", "She keeps books cold.", "Her mom told her to."], 1, "She looked everywhere 'just in case.'"),
    q("main-idea", "What is the lesson of the story?", ["Telling the truth is the right thing to do.", "Never read books.", "Treehouses are dangerous.", "Libraries are closed on Saturdays."], 0, "The librarian thanked Hana for being honest."),
  ]),
  passage(3, "penguin-dads", "Emperor Penguin Dads", "🐧", "nonfiction", `
    Emperor penguins live in Antarctica, the coldest place on Earth. After a mother penguin lays an egg, she passes it to
    the father and goes to the ocean to find food. The father balances the egg on his feet and covers it with a warm
    fold of skin called a brood pouch. For about two months, the fathers huddle together in the freezing wind and do not
    eat at all! When the chick hatches, the mother returns with food. Then the parents take turns caring for their baby.`, [
    q("setting", "Where do emperor penguins live?", ["in the desert", "in Antarctica", "in the rain forest", "in a city"], 1, "They live in Antarctica, the coldest place on Earth."),
    q("detail", "Where does the father keep the egg?", ["in a nest of sticks", "on his feet under a brood pouch", "in the water", "in a cave"], 1, "He balances it on his feet and covers it with his brood pouch."),
    q("vocabulary", "In this text, 'huddle' means:", ["stand close together", "run away", "swim fast", "sleep alone"], 0, "Huddling is crowding close together to stay warm."),
    q("inference", "Why do the fathers huddle together?", ["to stay warm", "to play games", "to find food", "to fight"], 0, "They are in freezing wind, so they huddle for warmth."),
    q("sequence", "What happens when the chick hatches?", ["The father leaves forever.", "The mother returns with food.", "The egg is lost.", "They move to the desert."], 1, "When the chick hatches, the mother returns with food."),
  ]),
  passage(3, "class-pet", "Who Will Take Care of Nibbles?", "🐹", "fiction", `
    Nibbles the hamster was the class pet in Room 12. Over winter break, someone had to take him home. Five students
    raised their hands. Mrs. Diaz said, "To be fair, let's draw a name from a hat." Everyone held their breath as she
    pulled out a slip of paper. "Oliver!" Oliver jumped up and cheered. He promised to feed Nibbles every morning,
    give him fresh water, and clean his cage on Saturdays. When school started again, Nibbles was happy, healthy, and
    a little bit chubbier.`, [
    q("detail", "What kind of animal is Nibbles?", ["a rabbit", "a hamster", "a fish", "a guinea pig"], 1, "Nibbles the hamster was the class pet."),
    q("cause-effect", "Why did Mrs. Diaz draw a name from a hat?", ["to be fair", "to save time", "because she lost her list", "to play a trick"], 0, "She said, 'To be fair, let's draw a name.'"),
    q("detail", "When did Oliver promise to clean the cage?", ["every morning", "on Saturdays", "every night", "never"], 1, "He promised to clean it on Saturdays."),
    q("inference", "Why was Nibbles 'a little bit chubbier' after the break?", ["Oliver fed him well.", "He was sick.", "He ran a lot.", "He was a different hamster."], 0, "Oliver fed him every morning."),
    q("antonym", "What is the opposite of 'fair'?", ["fine", "unfair", "nice", "quick"], 1, "Adding 'un-' makes the opposite: unfair."),
  ]),
  passage(3, "helen-keller", "Helen Keller", "✋", "biography", `
    Helen Keller was born in Alabama in 1880. When she was a baby, an illness left her unable to see or hear. Helen was
    often frustrated because she could not talk with others. When Helen was almost seven, a teacher named Anne Sullivan
    came to live with her family. Anne spelled words into Helen's hand using finger shapes. One day at a water pump,
    Anne spelled "w-a-t-e-r" as cool water rushed over Helen's other hand. Suddenly, Helen understood that the letters
    were a word! She went on to learn to read, write, and graduate from college.`, [
    q("detail", "What did the illness do to Helen?", ["It made her unable to see or hear.", "It made her very tall.", "It made her unable to walk.", "It gave her a cold."], 0, "It left her unable to see or hear."),
    q("character", "Who was Anne Sullivan?", ["Helen's sister", "Helen's teacher", "a doctor", "a neighbor"], 1, "A teacher named Anne Sullivan came to live with them."),
    q("detail", "How did Anne teach Helen words?", ["by spelling them into Helen's hand", "by showing pictures", "by playing music", "by writing on a board"], 0, "She spelled words into Helen's hand with finger shapes."),
    q("main-idea", "Why was the moment at the water pump important?", ["Helen understood that letters make words.", "Helen got very wet.", "Anne lost her job.", "Helen learned to swim."], 0, "Helen suddenly understood the letters were a word."),
    q("vocabulary", "In this text, 'frustrated' means:", ["upset because something is hard", "very sleepy", "excited and happy", "hungry"], 0, "Helen was upset because she could not talk with others."),
  ]),
  passage(3, "soccer-rain", "The Muddy Championship", "⚽", "fiction", `
    It had rained all night, and the soccer field was a giant mud puddle. The Tigers and the Hawks slipped and slid
    every time they kicked the ball. Maya, the Tigers' goalie, was covered in mud from head to toe. With one minute left,
    the score was tied 1 to 1. A Hawk player kicked the ball hard toward the goal. Maya dove sideways, splashing through
    a puddle, and caught it! The game ended in a tie, but Maya's teammates lifted her onto their shoulders anyway.`, [
    q("setting", "What was the field like?", ["dry and dusty", "covered in snow", "a giant mud puddle", "freshly cut and dry"], 2, "It had rained all night, so it was muddy."),
    q("character", "What position did Maya play?", ["goalie", "coach", "referee", "striker"], 0, "Maya was the Tigers' goalie."),
    q("detail", "What was the final score?", ["Tigers won 2 to 1", "Hawks won 2 to 1", "a tie, 1 to 1", "0 to 0"], 2, "The game ended in a 1 to 1 tie."),
    q("inference", "Why did the team lift Maya onto their shoulders?", ["She was hurt.", "Her save kept them from losing.", "She scored three goals.", "It was her birthday."], 1, "Her catch at the last minute saved the game."),
    q("phonics", "Which word begins with the same blend as 'slipped'?", ["sip", "slide", "spill", "lip"], 1, "Slipped and slide both begin with 'sl'."),
  ]),
  passage(3, "monarch-migration", "The Monarch Butterfly's Long Trip", "🦋", "nonfiction", `
    Every fall, millions of monarch butterflies fly south from Canada and the United States to the mountains of Mexico.
    Some fly more than two thousand miles! This trip is called a migration. The monarchs travel to Mexico to escape the
    cold winter. They rest together in fir trees, covering the branches like orange blankets. In spring, they fly north
    again. Amazingly, the butterflies that return north in fall have never made the trip before. Scientists are still
    learning how monarchs know where to go.`, [
    q("vocabulary", "What is a migration?", ["a long trip animals make each year", "a kind of tree", "a butterfly's wings", "a winter coat"], 0, "The text says this trip is called a migration."),
    q("cause-effect", "Why do monarchs fly to Mexico?", ["to escape the cold winter", "to find the ocean", "to lay eggs in snow", "to meet bees"], 0, "They travel to escape the cold winter."),
    q("detail", "Where do the monarchs rest in Mexico?", ["in fir trees", "in caves", "on the beach", "in houses"], 0, "They rest together in fir trees."),
    q("vocabulary", "What does the author mean by 'like orange blankets'?", ["So many butterflies cover the branches that they look like blankets.", "People put blankets on trees.", "The trees are made of cloth.", "The butterflies sleep in beds."], 0, "This comparison shows how many butterflies cover the trees."),
    q("inference", "Why are scientists amazed by monarchs?", ["They are very large.", "They find the way without ever having made the trip.", "They can talk.", "They glow."], 1, "The butterflies have never made the trip, yet they know where to go."),
  ]),
  passage(3, "baking-bread", "Baking Bread with Abuela", "🍞", "fiction", `
    On Sunday mornings, Sofia helped her abuela bake bread. First, they mixed flour, yeast, salt, and warm water in a big
    bowl. Then Sofia pushed and folded the dough. "That's called kneading," Abuela said. They covered the bowl with a towel
    and waited. An hour later, Sofia gasped. The dough had grown twice as big! "The yeast makes it rise," Abuela explained.
    They shaped the loaves and baked them in the oven. Soon the whole house smelled warm and delicious.`, [
    q("sequence", "What did Sofia and Abuela do first?", ["baked the loaves", "mixed flour, yeast, salt, and water", "kneaded the dough", "covered the bowl"], 1, "First, they mixed the ingredients."),
    q("vocabulary", "What is 'kneading'?", ["pushing and folding dough", "eating bread", "washing dishes", "baking in the oven"], 0, "Abuela said pushing and folding is called kneading."),
    q("cause-effect", "What made the dough rise?", ["the towel", "the yeast", "the salt", "the oven light"], 1, "Abuela explained that yeast makes it rise."),
    q("inference", "Who is 'Abuela'?", ["Sofia's grandmother", "Sofia's dog", "a baker in town", "Sofia's teacher"], 0, "'Abuela' is the Spanish word for grandmother."),
    q("setting", "When does this story happen?", ["on Sunday mornings", "on Friday nights", "at lunchtime on a school day", "during a storm"], 0, "The first sentence says on Sunday mornings."),
  ]),
  passage(3, "my-shadow", "My Shadow (a poem)", "👤", "poem", `
    I have a friend who follows me / Wherever I may go. / When I run fast, it runs fast too, / When I walk slow, it's slow. /
    It's very tall in morning light, / And short at lunch, it's true. / It disappears when clouds roll in. / My shadow, I see you!`, [
    q("genre", "What kind of text is this?", ["a poem", "a biography", "a news report", "a how-to text"], 0, "It has short lines with rhyming words."),
    q("inference", "Who is the 'friend' in the poem?", ["the speaker's shadow", "a dog", "a sister", "the sun"], 0, "The last line names it: 'My shadow.'"),
    q("detail", "When is the shadow very tall?", ["in the morning light", "at lunch", "when it is cloudy", "at midnight"], 0, "The poem says it is tall in morning light."),
    q("cause-effect", "Why does the shadow disappear?", ["Clouds block the sun.", "The speaker goes to school.", "It gets lost.", "The speaker runs too fast."], 0, "It disappears when clouds roll in and block the sunlight."),
    q("phonics", "Which word rhymes with 'go'?", ["slow", "goat", "glue", "dog"], 0, "Go and slow rhyme."),
  ]),
  passage(3, "mae-jemison", "Mae Jemison, Space Explorer", "👩‍🚀", "biography", `
    As a girl in Chicago, Mae Jemison loved science and dreamed of going to space. She studied hard and became a doctor
    and an engineer. She even worked as a doctor in Africa. In 1987, Mae was chosen to train as an astronaut. On
    September 12, 1992, she flew aboard the space shuttle Endeavour. She became the first African American woman to
    travel into space. Mae did science experiments while orbiting Earth. Today, she encourages children to follow their
    dreams and learn about science.`, [
    q("detail", "Where did Mae grow up?", ["Chicago", "Miami", "Boston", "Houston"], 0, "The text says 'As a girl in Chicago.'"),
    q("detail", "What spaceship did Mae fly on?", ["Apollo 11", "the space shuttle Endeavour", "Starhopper", "the Moon rover"], 1, "She flew aboard the space shuttle Endeavour."),
    q("main-idea", "Why is Mae Jemison famous?", ["She was the first African American woman to travel into space.", "She invented airplanes.", "She was a famous singer.", "She discovered Mars."], 0, "The text says she was the first African American woman in space."),
    q("sequence", "What did Mae do before becoming an astronaut?", ["She became a doctor and engineer.", "She was a pilot in a race.", "She lived on the Moon.", "She was a chef."], 0, "She became a doctor and an engineer first."),
    q("vocabulary", "In this text, 'orbiting' means:", ["traveling around", "falling into", "landing on", "drawing a picture of"], 0, "The shuttle traveled around Earth."),
  ]),
  passage(3, "tooth-fairy-mix", "The Tooth Fairy's Mix-Up", "🦷", "fiction", `
    Twins Ben and Bella each lost a tooth on the same day. They put their teeth under their pillows and fell asleep.
    In the morning, Ben found a shiny coin and a note that said, "For Bella." Bella found a coin and a note that said,
    "For Ben." The twins laughed. "The tooth fairy got us mixed up!" said Bella. "Maybe it's hard to tell twins apart
    in the dark," Ben giggled. They traded notes, and Bella wrote a thank-you letter that said, "P.S. I'm the one with
    the freckles!"`, [
    q("character", "Who are Ben and Bella?", ["best friends", "twins", "cousins", "neighbors"], 1, "The first sentence calls them twins."),
    q("main-idea", "What was the problem in the story?", ["The tooth fairy mixed up the notes.", "They lost their teeth in the yard.", "The coins were fake.", "They could not sleep."], 0, "Each twin got the note meant for the other."),
    q("inference", "Why did Bella write 'I'm the one with the freckles'?", ["to help the tooth fairy tell them apart", "to show off", "because she is sad", "to trick her brother"], 0, "She wants to make it easier to tell them apart next time."),
    q("grammar", "What does 'P.S.' at the end of a letter mean?", ["something added after the letter", "the title", "a question", "the date"], 0, "P.S. is an extra note added after the main letter."),
    q("character", "How did the twins react to the mix-up?", ["They laughed.", "They cried.", "They were angry.", "They hid."], 0, "The twins laughed about it."),
  ]),
  passage(3, "rainforest-layers", "Layers of the Rain Forest", "🌳", "nonfiction", `
    A rain forest has four layers. The tallest trees poke out at the very top in the emergent layer, where eagles fly.
    Below that is the canopy, a thick roof of leaves and branches. Most rain forest animals, like monkeys and toucans,
    live in the canopy. Under the canopy is the understory, which is dark and shady. Snakes and jaguars hide there.
    The bottom layer is the forest floor. Very little sunlight reaches it, and it is covered with fallen leaves that
    insects and fungi break down.`, [
    q("detail", "How many layers does a rain forest have?", ["two", "three", "four", "five"], 2, "The first sentence says four layers."),
    q("detail", "Where do most rain forest animals live?", ["the emergent layer", "the canopy", "the understory", "the forest floor"], 1, "Most animals live in the canopy."),
    q("text-structure", "How is this text organized?", ["from the top layer to the bottom layer", "from oldest to newest", "as a story with characters", "as a list of questions"], 0, "It describes layers from top to bottom."),
    q("inference", "Why is the forest floor dark?", ["The canopy blocks most sunlight.", "It is always night there.", "The ground is black.", "Animals turn off the light."], 0, "Very little sunlight gets through all the leaves above."),
    q("visual", "Which picture would help the reader most?", ["a diagram showing the four rain forest layers", "a map of the ocean", "a photo of a snowman", "a picture of a city"], 0, "A labeled diagram would show where each layer is."),
  ]),
  passage(3, "kindness-chain", "The Kindness Chain", "🔗", "fiction", `
    Mr. Patel's class started a kindness chain. Every time someone did something kind, they wrote it on a strip of paper
    and added a link to the chain. Aiden wrote, "Helped Grace pick up her crayons." Grace wrote, "Aiden shared his snack."
    Soon the chain stretched across the whole classroom. By spring, it went out the door and down the hallway! Other
    classes asked if they could add links too. On the last day of school, the chain wrapped around the entire building.`, [
    q("detail", "What did students write on the paper strips?", ["their spelling words", "kind things they or others did", "math problems", "their names only"], 1, "Each strip shows something kind someone did."),
    q("sequence", "Where did the chain reach by spring?", ["out the door and down the hallway", "the teacher's desk only", "the bus stop", "the playground swings"], 0, "By spring it went out the door and down the hallway."),
    q("main-idea", "What is the story mostly about?", ["how kindness can grow and spread", "how to make paper", "a class field trip", "a broken chain"], 0, "The chain grows as more kind acts happen."),
    q("inference", "Why did other classes want to add links?", ["They liked the idea of sharing kind acts.", "They needed paper.", "They were told to.", "They wanted to break it."], 0, "They wanted to join in being kind."),
    q("word-parts", "What does the word 'kindness' mean?", ["being kind", "not kind", "kind again", "kind before"], 0, "The suffix -ness turns 'kind' into 'the state of being kind.'"),
  ]),
  passage(3, "moon-landing", "Footprints on the Moon", "🌕", "nonfiction", `
    On July 20, 1969, millions of people around the world watched their televisions. The spacecraft Apollo 11 had landed on
    the Moon. Astronaut Neil Armstrong climbed down a ladder and became the first person to walk on the Moon. Buzz Aldrin
    joined him soon after. They collected rocks, took photos, and planted an American flag. Because the Moon has no wind,
    their footprints are probably still there today! The astronauts returned safely to Earth four days later.`, [
    q("detail", "Who was the first person to walk on the Moon?", ["Buzz Aldrin", "Neil Armstrong", "Mae Jemison", "Orville Wright"], 1, "Neil Armstrong was the first."),
    q("detail", "What was the spacecraft called?", ["Endeavour", "Apollo 11", "Starhopper", "Moonbeam"], 1, "The spacecraft was Apollo 11."),
    q("cause-effect", "Why are the footprints probably still on the Moon?", ["The Moon has no wind.", "Someone protects them.", "They were painted.", "It rains a lot there."], 0, "No wind means nothing blows them away."),
    q("detail", "Which of these did the astronauts NOT do?", ["collect rocks", "take photos", "plant a flag", "build a house"], 3, "They did not build a house."),
    q("genre", "This text is:", ["nonfiction", "a fairy tale", "a poem", "a fable"], 0, "It tells about a real event in history."),
  ]),
  passage(3, "garden-mystery", "The Vanishing Strawberries", "🍓", "fiction", `
    Every morning, more strawberries disappeared from Mrs. Lee's garden. "Who is taking them?" she wondered. Her
    grandson, Eli, decided to solve the mystery. He set up his tablet to record the garden overnight. In the morning,
    they watched the video together. At 3:00 a.m., a fluffy raccoon waddled in, sniffed around, and gobbled up five
    strawberries! Eli and his grandmother laughed. They built a small fence around the strawberry patch and planted
    an extra row near the woods for the hungry raccoon.`, [
    q("character", "Who solved the mystery?", ["Mrs. Lee", "Eli", "a police officer", "the raccoon"], 1, "Eli set up the tablet to record the garden."),
    q("detail", "How did Eli solve the mystery?", ["He stayed awake all night.", "He recorded the garden overnight.", "He asked the neighbors.", "He followed footprints."], 1, "He recorded the garden with his tablet."),
    q("detail", "Who was eating the strawberries?", ["a rabbit", "a deer", "a raccoon", "a bird"], 2, "The video showed a fluffy raccoon."),
    q("character", "What does planting an extra row for the raccoon show?", ["They were kind to the animal.", "They wanted to trap it.", "They didn't like strawberries.", "They were angry."], 0, "They shared food with the raccoon instead of hurting it."),
    q("vocabulary", "In this story, 'vanishing' means:", ["disappearing", "growing", "getting sweeter", "turning red"], 0, "The strawberries kept disappearing."),
  ]),
  passage(3, "how-plants-drink", "Celery Experiment", "🧪", "how-to", `
    Want to see how plants drink water? Try this experiment. You will need a stalk of celery with leaves, a clear cup,
    water, and red food coloring. First, fill the cup halfway with water. Next, add ten drops of food coloring and stir.
    Then, place the celery in the cup with the leaves pointing up. Wait one whole day. The next day, look closely at the
    leaves. They will have red spots! This shows that water travels up through tiny tubes inside the stem to the leaves.`, [
    q("genre", "What kind of text is this?", ["a how-to experiment", "a fairy tale", "a poem", "a biography"], 0, "It gives materials and steps for an experiment."),
    q("detail", "Which material is NOT needed?", ["celery", "a clear cup", "food coloring", "a magnet"], 3, "A magnet is not on the list."),
    q("sequence", "What should you do right after filling the cup with water?", ["Add food coloring and stir.", "Look at the leaves.", "Wait one day.", "Eat the celery."], 0, "Next, add ten drops of food coloring and stir."),
    q("main-idea", "What does the experiment show?", ["Water travels up the stem to the leaves.", "Celery likes the color red.", "Plants can talk.", "Water turns into ice."], 0, "The red spots show water moved up through the stem."),
    q("prediction", "What would happen if you used blue food coloring?", ["The leaves would get blue spots.", "Nothing would happen.", "The cup would break.", "The celery would grow flowers."], 0, "The colored water would travel up and show blue."),
  ]),
];
