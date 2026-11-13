import { passage, q, type Passage } from "./types";

// Grade 3, part 4 of 5 (stories 61-80).
export const GRADE3_D: Passage[] = [
  passage(3, "lion-mouse-new", "The Lion and the Mouse", "🦁", "fable", `
    A lion was sleeping in the sun when a little mouse ran across his nose. The lion woke up and trapped the mouse under
    his huge paw. "Please let me go," squeaked the mouse. "One day I may help you." The lion laughed, but he let the mouse
    go. A few days later, hunters caught the lion in a strong rope net. He roared, but he could not escape. The mouse heard
    him, ran over, and chewed through the ropes until the lion was free. Moral: Even the smallest friend can be a big help.`, [
    q("genre", "This story is a fable because it:", ["has talking animals and teaches a lesson", "tells about a real person", "gives steps to follow", "has rhyming lines"], 0, "Fables use animal characters and end with a moral."),
    q("cause-effect", "Why did the lion wake up?", ["A mouse ran across his nose.", "Hunters shouted.", "It started raining.", "He was hungry."], 0, "The mouse ran across his nose."),
    q("character", "How did the lion feel when the mouse said it could help him?", ["He thought it was funny.", "He was scared.", "He was sad.", "He was angry."], 0, "The lion laughed."),
    q("detail", "How did the mouse free the lion?", ["It chewed through the ropes.", "It called the hunters.", "It pulled the net with its tail.", "It dug a hole."], 0, "It chewed through the ropes."),
    q("main-idea", "What is the moral?", ["Even the smallest friend can be a big help.", "Lions are kings.", "Never sleep in the sun.", "Mice are scary."], 0, "The moral is at the end."),
  ]),
  passage(3, "coral-reef", "Coral Reefs", "🪸", "nonfiction", `
    Coral reefs look like colorful underwater rocks, but they are built by tiny animals called coral polyps. Each polyp
    is smaller than a pencil eraser. Polyps build hard skeletons around themselves, and over thousands of years, these
    skeletons pile up to form huge reefs. Coral reefs cover less than one percent of the ocean floor, yet about one
    quarter of all ocean animals live on or near them. Reefs need clean, warm, clear water. When the water gets too hot,
    corals can turn white and may die. This is called coral bleaching.`, [
    q("detail", "What builds coral reefs?", ["tiny animals called coral polyps", "fish", "underwater volcanoes", "divers"], 0, "Coral polyps build them."),
    q("detail", "About how many ocean animals live on or near reefs?", ["one quarter", "all of them", "none", "exactly ten"], 0, "About one quarter of all ocean animals."),
    q("vocabulary", "What is 'coral bleaching'?", ["when corals turn white because the water is too hot", "cleaning coral with soap", "a kind of fish", "coral growing taller"], 0, "The text defines it."),
    q("inference", "Why is it important to protect coral reefs?", ["Many ocean animals depend on them.", "They are good for building houses.", "They make the ocean salty.", "They keep sharks away."], 0, "A quarter of ocean animals live on or near reefs."),
    q("detail", "What do reefs need to stay healthy?", ["clean, warm, clear water", "cold, muddy water", "lots of sunlight on land", "plastic"], 0, "Reefs need clean, warm, clear water."),
  ]),
  passage(3, "chores-chart", "Max and the Chore Chart", "🧹", "fiction", `
    Max hated chores. Every Saturday, he hid in his room when Mom brought out the chore chart. One week, Mom tried
    something new. Each chore earned points: feeding the dog was five points, folding laundry was ten, and washing the
    car was twenty. Points could be traded for things like extra reading time or choosing dinner. Max did every chore on
    the chart and earned sixty-five points. He chose tacos for dinner and a trip to the skate park. "Maybe chores aren't
    so bad," he admitted.`, [
    q("character", "How did Max feel about chores at the beginning?", ["He hated them.", "He loved them.", "He didn't know what they were.", "He thought they were easy."], 0, "The first sentence says Max hated chores."),
    q("detail", "How many points was washing the car worth?", ["five", "ten", "twenty", "sixty-five"], 2, "Washing the car was twenty points."),
    q("cause-effect", "What made Max want to do chores?", ["He could trade points for rewards.", "His friend did chores.", "He was bored.", "The dog asked him."], 0, "Points could be traded for things he wanted."),
    q("character", "How did Max change by the end?", ["He decided chores weren't so bad.", "He hid in his room more.", "He ran away.", "He got angry at Mom."], 0, "He admitted chores weren't so bad."),
    q("word-parts", "What does 'unhappy' mean? (Max was unhappy about chores at first.)", ["not happy", "very happy", "happy again", "happy before"], 0, "The prefix un- means 'not.'"),
  ]),
  passage(3, "harriet-tubman", "Harriet Tubman", "🕯️", "biography", `
    Harriet Tubman was born into slavery in Maryland around 1822. As a young woman, she escaped to freedom in the North by
    following the North Star at night. But Harriet did not stop there. She went back again and again to guide other
    enslaved people to freedom along the Underground Railroad. It was not a real railroad. It was a secret network of
    people and safe houses that helped people escape. Harriet made about thirteen trips and helped around seventy people.
    She once said she "never lost a passenger."`, [
    q("detail", "How did Harriet find her way north at night?", ["She followed the North Star.", "She used a phone.", "She took a train.", "She asked strangers."], 0, "She followed the North Star at night."),
    q("vocabulary", "What was the Underground Railroad?", ["a secret network that helped people escape slavery", "a subway train", "a tunnel for trains", "a railroad company"], 0, "The text says it was not a real railroad but a secret network."),
    q("character", "Which word best describes Harriet Tubman?", ["brave", "lazy", "careless", "shy"], 0, "She went back again and again despite the danger."),
    q("detail", "About how many people did Harriet help?", ["seventy", "seven", "seven hundred", "two"], 0, "She helped around seventy people."),
    q("inference", "What did she mean by 'never lost a passenger'?", ["Everyone she guided reached freedom safely.", "She drove a real train.", "She never went on trips.", "She counted her bags."], 0, "Passengers were the people she guided."),
  ]),
  passage(3, "magnets", "The Pull of Magnets", "🧲", "nonfiction", `
    A magnet is an object that pulls on certain metals, like iron and steel. Every magnet has two ends called poles: a
    north pole and a south pole. If you put the north pole of one magnet near the south pole of another, they snap
    together. Opposite poles attract. But if you put two north poles together, they push away from each other. Like poles
    repel. Magnets are used in many things, from refrigerator doors to speakers to the compass that helps hikers find north.`, [
    q("detail", "What are the two ends of a magnet called?", ["poles", "tips", "corners", "sides"], 0, "The ends are called poles."),
    q("cause-effect", "What happens when two north poles are put together?", ["They push away from each other.", "They snap together.", "They melt.", "They change color."], 0, "Like poles repel."),
    q("antonym", "In this text, the opposite of 'attract' is:", ["repel", "snap", "pull", "stick"], 0, "Attract means pull together; repel means push away."),
    q("detail", "Which metal does a magnet pull on?", ["iron", "gold", "wood", "plastic"], 0, "Magnets pull on iron and steel."),
    q("inference", "Would a magnet pick up a paper clip made of steel?", ["Yes, because magnets pull on steel.", "No, paper clips are too small.", "No, magnets only pull wood.", "Only at night."], 0, "Magnets pull on steel."),
  ]),
  passage(3, "museum-trip", "A Night at the Museum Sleepover", "🦴", "fiction", `
    The third graders were sleeping over at the natural history museum! After dinner, they took a flashlight tour. The
    giant dinosaur skeleton looked spooky in the dark. Its long shadow stretched across the ceiling. Kenji whispered,
    "What if it comes alive?" His friend Ana laughed. "It's just bones. They've been there for millions of years." At
    bedtime, everyone unrolled their sleeping bags right under the whale model hanging from the ceiling. Kenji fell asleep
    dreaming of swimming with whales.`, [
    q("setting", "Where does this story take place?", ["at a natural history museum", "at a zoo", "in a tent in the woods", "at Kenji's house"], 0, "They are sleeping over at the museum."),
    q("character", "How did Kenji feel about the dinosaur skeleton?", ["a little scared", "angry", "bored", "sleepy"], 0, "He whispered, 'What if it comes alive?'"),
    q("detail", "Where did the kids sleep?", ["under the whale model", "next to the dinosaur", "in a classroom", "on a bus"], 0, "They unrolled sleeping bags under the whale model."),
    q("character", "Which word describes Ana?", ["calm", "frightened", "rude", "tired"], 0, "She laughed and explained it was just bones."),
    q("phonics", "Which word has the same vowel sound as 'bones'?", ["home", "bins", "buns", "barns"], 0, "Bones and home both have the long 'o' sound."),
  ]),
  passage(3, "recipe-smoothie", "Make a Rainbow Smoothie", "🥤", "how-to", `
    A rainbow smoothie is healthy, colorful, and fun to make. Ask a grown-up to help you use the blender. You will need:
    one banana, one cup of strawberries, one cup of spinach, half a cup of yogurt, and half a cup of milk. Step 1: Peel
    the banana and break it into pieces. Step 2: Put all the ingredients into the blender. Step 3: Put the lid on tightly.
    Step 4: Blend for about one minute until smooth. Pour it into a glass and enjoy! Don't worry, you won't taste the
    spinach.`, [
    q("genre", "What kind of text is this?", ["a recipe (how-to)", "a fable", "a biography", "a poem"], 0, "It lists ingredients and steps."),
    q("detail", "How much yogurt do you need?", ["half a cup", "one cup", "two cups", "a spoonful"], 0, "Half a cup of yogurt."),
    q("sequence", "What do you do right before blending?", ["Put the lid on tightly.", "Peel the banana.", "Pour it into a glass.", "Wash the dishes."], 0, "Step 3 is putting the lid on; Step 4 is blending."),
    q("inference", "Why should a grown-up help?", ["Blenders have sharp blades.", "Kids can't peel bananas.", "Grown-ups like smoothies.", "It is the law."], 0, "Blenders can be dangerous."),
    q("author-purpose", "Why does the author say 'you won't taste the spinach'?", ["so kids will still want to try it", "to trick readers", "because spinach is gross", "to sell spinach"], 0, "The author wants readers to try it even with spinach."),
  ]),
  passage(3, "new-language", "Words in Two Languages", "🗣️", "fiction", `
    Min-jun moved from Korea to Texas in the middle of third grade. He knew only a few English words. At lunch, he sat
    alone. One day, a girl named Riley sat next to him and pointed to her apple. "Apple," she said slowly. Min-jun smiled
    and said, "Sagwa." That is "apple" in Korean. Every day after that, they traded words: dog and gae, friend and chingu.
    By the end of the year, Min-jun could speak English well, and Riley could count to ten in Korean.`, [
    q("setting", "Where did Min-jun move?", ["from Korea to Texas", "from Texas to Korea", "from China to Texas", "from Korea to Canada"], 0, "He moved from Korea to Texas."),
    q("vocabulary", "What does 'chingu' mean in the story?", ["friend", "dog", "apple", "lunch"], 0, "They traded friend and chingu."),
    q("character", "How did Riley help Min-jun?", ["She taught him English words and learned Korean.", "She did his homework.", "She ignored him.", "She moved away."], 0, "They traded words every day."),
    q("main-idea", "What is the story mostly about?", ["two friends learning each other's language", "a cooking contest", "a trip to Korea", "a lost apple"], 0, "They traded English and Korean words."),
    q("inference", "How did Min-jun probably feel when he sat alone at lunch?", ["lonely", "excited", "proud", "angry"], 0, "Sitting alone in a new place can feel lonely."),
  ]),
  passage(3, "bats", "Bats in the Night", "🦇", "nonfiction", `
    Bats are the only mammals that can truly fly. Their wings are made of thin skin stretched between long finger bones.
    Many bats hunt at night using echolocation. A bat makes high squeaks, and the sound bounces off objects like insects
    and trees. The bat listens for the echoes to figure out where things are. One little brown bat can eat hundreds of
    mosquitoes in an hour! Other bats eat fruit and help spread seeds, and some drink nectar and pollinate flowers.`, [
    q("detail", "What makes bats special among mammals?", ["They are the only mammals that can truly fly.", "They lay eggs.", "They live underwater.", "They have feathers."], 0, "The first sentence says this."),
    q("vocabulary", "What is echolocation?", ["finding things by listening to echoes", "a kind of wing", "sleeping upside down", "flying in a group"], 0, "Bats listen for echoes to figure out where things are."),
    q("detail", "What are bat wings made of?", ["thin skin stretched between finger bones", "feathers", "scales", "paper"], 0, "Thin skin stretched between long finger bones."),
    q("inference", "Why might people be glad to have bats nearby?", ["Bats eat lots of mosquitoes.", "Bats are loud.", "Bats eat people's lunch.", "Bats glow at night."], 0, "One bat can eat hundreds of mosquitoes an hour."),
    q("main-idea", "Which sentence tells the main idea?", ["Bats are amazing flying mammals that help nature.", "Bats eat only fruit.", "Bats are scary.", "Bats sleep all day."], 0, "The text describes how bats fly, hunt, and help."),
  ]),
  passage(3, "art-contest", "The Art Contest", "🎨", "fiction", `
    Zoe spent two weeks painting a picture of her family's farm for the art contest. On the day it was due, her little
    brother bumped the table, and blue paint splashed across the sky. Zoe wanted to cry. Then she looked again. The
    splashes looked a little like a storm coming in. She added dark clouds, a few raindrops, and a flash of yellow
    lightning. She named it "The Storm Is Coming." Zoe did not win first place, but the judges gave her a special ribbon
    for creativity.`, [
    q("main-idea", "What was the problem?", ["Paint splashed on Zoe's picture.", "Zoe forgot to paint.", "The contest was canceled.", "Zoe lost her brushes."], 0, "Her brother bumped the table and paint splashed."),
    q("detail", "What did Zoe add to her painting?", ["dark clouds, raindrops, and lightning", "a rainbow and sun", "a cat and dog", "a boat"], 0, "She added dark clouds, raindrops, and lightning."),
    q("character", "Which word describes Zoe?", ["creative", "careless", "mean", "lazy"], 0, "She turned a mistake into something new."),
    q("detail", "What prize did Zoe get?", ["a special ribbon for creativity", "first place", "a trophy", "nothing"], 0, "She got a special ribbon for creativity."),
    q("main-idea", "What lesson does the story teach?", ["Mistakes can become something good.", "Never paint near your brother.", "Art contests are unfair.", "Blue is the best color."], 0, "Zoe turned a mistake into a creative painting."),
  ]),
  passage(3, "hummingbird-colors", "How the Hummingbird Got Its Colors", "🐦", "myth", `
    Long ago, the story goes, the hummingbird was plain gray. She worked hard carrying seeds from flower to flower so the
    meadow could grow. One day, the Rainbow saw how hard the little bird worked. "You help everyone, but no one notices
    you," the Rainbow said. "Let me give you a gift." The Rainbow touched the bird's feathers, and they shimmered green,
    red, and purple. Now, the story says, when the hummingbird flies in the sunlight, she carries a tiny piece of the
    rainbow with her.`, [
    q("genre", "What kind of story is this?", ["a myth that explains something in nature", "a science article", "a how-to", "a letter"], 0, "It tells a made-up explanation of the hummingbird's colors."),
    q("character", "What color was the hummingbird at first?", ["gray", "green", "red", "purple"], 0, "The hummingbird was plain gray."),
    q("cause-effect", "Why did the Rainbow give the hummingbird a gift?", ["She worked hard helping others.", "She asked for it.", "She sang a song.", "She was the fastest bird."], 0, "The Rainbow saw how hard she worked."),
    q("vocabulary", "What does 'shimmered' mean?", ["shined and sparkled", "fell off", "turned dark", "got wet"], 0, "The colorful feathers shone in the light."),
    q("author-purpose", "Why do people tell stories like this?", ["to explain nature in a fun way", "to teach math", "to sell birds", "to give directions"], 0, "Myths explain how things came to be."),
  ]),
  passage(3, "bike-ride", "Learning to Ride", "🚲", "fiction", `
    Everyone on Elm Street could ride a bike except Owen. His training wheels had come off, and he kept tipping over.
    "I'll never learn," he grumbled. His older sister, Nina, held the back of his seat and jogged beside him. "Look ahead,
    not down," she said. "And keep pedaling." Owen looked at the end of the street and pedaled hard. He felt the bike
    steady. "You're doing it!" Nina shouted from far behind. Owen realized she had let go a long time ago.`, [
    q("cause-effect", "Why did Owen keep tipping over?", ["He was just learning without training wheels.", "His bike was broken.", "The street was icy.", "Nina pushed him."], 0, "His training wheels had come off and he was learning."),
    q("detail", "What advice did Nina give?", ["Look ahead and keep pedaling.", "Close your eyes.", "Go slowly and stop often.", "Ride on the grass."], 0, "She said look ahead, not down, and keep pedaling."),
    q("inference", "What did Owen realize at the end?", ["He was riding by himself.", "He had a flat tire.", "Nina was still holding on.", "He was lost."], 0, "Nina had let go a long time ago."),
    q("character", "How did Owen's feelings change?", ["from discouraged to proud", "from happy to sad", "from brave to scared", "from angry to bored"], 0, "He grumbled at first, then succeeded."),
    q("vocabulary", "What does 'grumbled' mean?", ["complained in a grumpy way", "laughed loudly", "whispered a secret", "sang"], 0, "Owen complained, 'I'll never learn.'"),
  ]),
  passage(3, "pyramids", "The Pyramids of Egypt", "🔺", "nonfiction", `
    More than four thousand years ago, the ancient Egyptians built giant pyramids as tombs for their kings, called
    pharaohs. The Great Pyramid of Giza is made of more than two million stone blocks. Some blocks weigh as much as a car!
    Thousands of workers cut the blocks, dragged them on sleds, and stacked them using ramps. Inside, there were hidden
    rooms and tunnels. For almost four thousand years, the Great Pyramid was the tallest building in the world.`, [
    q("detail", "Why were the pyramids built?", ["as tombs for pharaohs", "as schools", "as markets", "as lighthouses"], 0, "They were tombs for their kings."),
    q("vocabulary", "Who were the pharaohs?", ["the kings of ancient Egypt", "pyramid workers", "Egyptian animals", "boats"], 0, "The text says kings were called pharaohs."),
    q("detail", "How did workers move the heavy blocks?", ["on sleds and ramps", "with trucks", "with cranes", "by boat only"], 0, "They dragged them on sleds and used ramps."),
    q("inference", "Why does the author say some blocks weigh as much as a car?", ["to help readers picture how heavy they were", "because cars were there", "to sell cars", "because blocks had wheels"], 0, "Comparing to a car helps us imagine the weight."),
    q("visual", "Which picture would help most with this text?", ["workers dragging a stone block up a ramp", "a modern skyscraper", "a snowy mountain", "a sailboat race"], 0, "It shows how the pyramids were built."),
  ]),
  passage(3, "squirrel-winter", "Squirrel's Forgotten Acorns", "🐿️", "fiction", `
    All autumn, Squirrel buried acorns around the forest. She dug a hole by the big rock, another by the creek, and a
    hundred more everywhere else. When winter came, Squirrel was hungry, but she could only remember where half of them
    were. "Oh well," she said, and ate the ones she found. In spring, Squirrel looked around in surprise. Tiny oak trees
    were sprouting all over the forest, right where she had buried the forgotten acorns.`, [
    q("sequence", "When did Squirrel bury the acorns?", ["in autumn", "in winter", "in spring", "in summer"], 0, "All autumn, Squirrel buried acorns."),
    q("detail", "How many acorns could Squirrel find in winter?", ["about half", "all of them", "none", "just one"], 0, "She could only remember where half were."),
    q("cause-effect", "Why did oak trees sprout in spring?", ["The forgotten acorns grew into trees.", "Someone planted them.", "It snowed a lot.", "Squirrel watered them."], 0, "The forgotten acorns sprouted."),
    q("inference", "What is the author showing about squirrels?", ["Squirrels help plant new trees by accident.", "Squirrels hate acorns.", "Squirrels sleep all winter.", "Squirrels are bad at digging."], 0, "Forgotten acorns grow into trees."),
    q("phonics", "Which word has the same 'ou' sound as 'found'?", ["ground", "food", "four", "could"], 0, "Found and ground share the 'ow' sound."),
  ]),
  passage(3, "jackie-robinson", "Jackie Robinson", "⚾", "biography", `
    Jackie Robinson was a talented athlete who played football, basketball, track, and baseball. In 1947, he joined the
    Brooklyn Dodgers and became the first Black player in Major League Baseball in modern times. Some fans and players
    treated him badly because of the color of his skin. Jackie stayed calm and let his playing do the talking. He was
    named Rookie of the Year. His courage opened the door for many other players. Today, every Major League player wears
    the number 42 on April 15th to honor him.`, [
    q("detail", "What team did Jackie Robinson join in 1947?", ["the Brooklyn Dodgers", "the New York Yankees", "the Chicago Cubs", "the Boston Red Sox"], 0, "He joined the Brooklyn Dodgers."),
    q("main-idea", "Why is Jackie Robinson important?", ["He was the first Black player in modern Major League Baseball.", "He invented baseball.", "He was the oldest player.", "He played only football."], 0, "He broke the color barrier in baseball."),
    q("vocabulary", "What does 'let his playing do the talking' mean?", ["He showed his skill instead of arguing.", "He talked during games.", "His bat could speak.", "He stopped playing."], 0, "He answered unfair treatment by playing great baseball."),
    q("detail", "How do players honor him on April 15th?", ["They all wear number 42.", "They skip the game.", "They wear red hats.", "They sing a song."], 0, "Every player wears number 42."),
    q("character", "Which word best describes Jackie Robinson?", ["courageous", "lazy", "rude", "careless"], 0, "The text talks about his courage."),
  ]),
  passage(3, "ice-cream-melt", "Science of Melting Ice Cream", "🍦", "nonfiction", `
    Why does ice cream melt so fast on a hot day? Ice cream is mostly frozen milk, cream, and sugar. Heat is a form of
    energy. When warm air touches the cold ice cream, heat moves from the air into the ice cream. The tiny ice crystals
    absorb the heat and change from solid to liquid. That's melting! Dark-colored cones in direct sunlight can melt faster
    because dark colors absorb more heat. To slow down melting, eat your ice cream in the shade.`, [
    q("main-idea", "What does this text explain?", ["why ice cream melts", "how to make ice cream", "the history of cones", "where milk comes from"], 0, "It explains melting."),
    q("cause-effect", "What makes ice cream melt?", ["Heat moves from the air into the ice cream.", "Cold air blows on it.", "Sugar makes it melt.", "It gets tired."], 0, "Heat moves from warm air into the ice cream."),
    q("vocabulary", "In this text, 'absorb' means:", ["take in", "push away", "throw out", "freeze"], 0, "The crystals take in the heat."),
    q("inference", "Where would ice cream melt more slowly?", ["in the shade", "in direct sunlight", "next to a fire", "in a hot car"], 0, "The text suggests eating in the shade."),
    q("antonym", "What is the opposite of 'solid'?", ["liquid", "hard", "frozen", "heavy"], 0, "The text says ice changes from solid to liquid."),
  ]),
  passage(3, "buddy-bench", "A Letter to the Principal", "📝", "letter", `
    Dear Principal Jones, My name is Ivy, and I am in Room 14. I think our school should have a buddy bench on the
    playground. A buddy bench is a special bench where kids can sit if they feel lonely. When other kids see someone on
    the bench, they invite them to play. Last week, I saw a new student standing alone at recess. A buddy bench would help
    kids like him make friends. Our class could even paint the bench. Thank you for reading my letter. Sincerely, Ivy`, [
    q("author-purpose", "Why did Ivy write the letter?", ["to ask for a buddy bench", "to complain about lunch", "to say goodbye", "to invite the principal to a party"], 0, "She thinks the school should have a buddy bench."),
    q("vocabulary", "What is a buddy bench?", ["a bench where lonely kids can sit so others invite them to play", "a bench for teachers", "a bench for eating lunch", "a broken bench"], 0, "Ivy explains it in the letter."),
    q("detail", "What made Ivy think of the idea?", ["She saw a new student standing alone.", "Her friend asked her.", "She read a book.", "The principal told her."], 0, "She saw a new student alone at recess."),
    q("genre", "Which part shows this is a letter?", ["'Dear Principal Jones' and 'Sincerely, Ivy'", "a list of steps", "rhyming lines", "a moral"], 0, "Letters have a greeting and a closing."),
    q("character", "Which word describes Ivy?", ["caring", "selfish", "silly", "bossy"], 0, "She wants to help lonely kids."),
  ]),
  passage(3, "bridge-builders", "The Bridge Challenge", "🌉", "fiction", `
    Mr. Brooks gave his class a challenge: build a bridge using only straws and tape that could hold ten pennies. Team A
    made a long, flat bridge. When they added the pennies, it sagged and broke. Team B made triangles out of straws and
    connected them. Their bridge held fifty pennies! "Why did it work?" asked Mr. Brooks. "Triangles are strong shapes,"
    said Luna. "They don't bend easily." Team A tried again using triangles, and this time their bridge held sixty pennies.`, [
    q("detail", "What materials could they use?", ["straws and tape", "wood and nails", "paper and glue", "blocks"], 0, "Only straws and tape."),
    q("cause-effect", "Why did Team B's bridge hold so many pennies?", ["They used strong triangle shapes.", "They used more tape.", "Their pennies were lighter.", "They were lucky."], 0, "Triangles are strong shapes."),
    q("detail", "How many pennies did Team A's second bridge hold?", ["ten", "fifty", "sixty", "zero"], 2, "This time their bridge held sixty pennies."),
    q("main-idea", "What did the class learn?", ["Triangles make strong structures.", "Straws are useless.", "Pennies are heavy.", "Bridges should be flat."], 0, "Triangles don't bend easily."),
    q("character", "What does Team A's second try show about them?", ["They didn't give up.", "They cheated.", "They were angry.", "They quit."], 0, "They tried again and improved."),
  ]),
  passage(3, "rainbow-science", "How Rainbows Form", "🌈", "nonfiction", `
    Sunlight looks white, but it is really made of many colors mixed together. When sunlight shines through raindrops,
    each drop works like a tiny prism. It bends the light and spreads the colors apart. That's why rainbows appear when
    the Sun is shining during or right after rain. The colors always appear in the same order: red, orange, yellow, green,
    blue, indigo, and violet. To see a rainbow, stand with the Sun behind you and look toward the rain.`, [
    q("detail", "What is sunlight really made of?", ["many colors mixed together", "only yellow", "water", "fire"], 0, "Sunlight is made of many colors."),
    q("vocabulary", "What does a prism do?", ["bends light and spreads out the colors", "makes rain", "blocks sunlight", "makes things hot"], 0, "Each drop works like a prism that bends light."),
    q("detail", "Which color comes first in a rainbow?", ["red", "violet", "green", "blue"], 0, "Red, orange, yellow, green, blue, indigo, violet."),
    q("inference", "When would you most likely see a rainbow?", ["on a sunny day right after it rains", "at midnight", "on a cloudy day with no rain", "inside a dark room"], 0, "You need both sunshine and raindrops."),
    q("detail", "Where should the Sun be when you look for a rainbow?", ["behind you", "in front of you", "under you", "it doesn't matter"], 0, "Stand with the Sun behind you."),
  ]),
  passage(3, "space-mission-4", "Mission to the Red Planet, Part 4: Home", "🚀", "fiction", `
    After seven months in space, the Starhopper splashed down in the Pacific Ocean. Boats rushed out to meet the crew.
    Dev's legs felt wobbly as he stood up, because his muscles had gotten used to floating in space. Captain Zara waved to
    the cheering crowd. Back at the lab, scientists from around the world lined up to study the Mars rocks. Dev's little
    sister ran up and hugged him. "Did you see any aliens?" she asked. Dev laughed. "No, but I found something just as
    exciting: proof that Mars once had water."`, [
    q("text-structure", "Where does this part fit in the Mars mission series?", ["at the very end", "at the very beginning", "in the middle", "before the launch"], 0, "The crew returns home, so it is the end of the series."),
    q("cause-effect", "Why did Dev's legs feel wobbly?", ["His muscles got used to floating in space.", "He was scared.", "The boat was rocking.", "He was cold."], 0, "His muscles had gotten used to floating."),
    q("setting", "Where did the Starhopper land?", ["in the Pacific Ocean", "on the Moon", "in a desert", "on Mars"], 0, "It splashed down in the Pacific Ocean."),
    q("detail", "What did the scientists want to study?", ["the Mars rocks", "the spaceship engine", "aliens", "the ocean"], 0, "They lined up to study the Mars rocks."),
    q("prediction", "What will scientists most likely do next?", ["study the rocks to learn more about Mars", "throw the rocks away", "forget about Mars", "send the rocks back"], 0, "They are lining up to study the rocks."),
  ]),
];
