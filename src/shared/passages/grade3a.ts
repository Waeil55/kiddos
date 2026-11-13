import { passage, q, type Passage } from "./types";

// Grade 3, part 1 of 5 (stories 1-20).
export const GRADE3_A: Passage[] = [
  passage(3, "robot-garden", "The Robot in the Garden", "🤖", "fiction", `
    Every morning, a small robot named Bolt rolled out of the shed behind Grandma Rosa's house. Its job was to water
    the tomato plants. One day, Bolt noticed that the leaves were full of holes. Bolt scanned the garden and found
    dozens of green caterpillars munching away. Bolt did not know what to do, so it beeped until Grandma Rosa came
    outside. She smiled and pointed to the birdhouse. "Our bird friends will help," she said. By the end of the week,
    the caterpillars were gone, and the tomatoes were growing big and red.`, [
    q("setting", "What is the setting of the story?", ["a city park", "Grandma Rosa's garden", "a robot factory", "a farm store"], 1, "Bolt waters the plants in the garden behind Grandma Rosa's house."),
    q("cause-effect", "Why were there holes in the leaves?", ["Bolt sprayed too much water.", "Caterpillars were eating them.", "It hailed.", "Grandma cut them."], 1, "Bolt found green caterpillars munching on the leaves."),
    q("vocabulary", "In the story, 'munching' means:", ["sleeping", "chewing", "hiding", "crawling"], 1, "To munch is to chew or eat."),
    q("inference", "How did the birds help the garden?", ["They watered the plants.", "They ate the caterpillars.", "They fixed Bolt.", "They planted seeds."], 1, "After the birds came, the caterpillars were gone."),
    q("visual", "Which picture would tell a reader more about this story?", ["a robot watering tomato plants", "a school bus", "a snowy mountain", "a fish tank"], 0, "Bolt watering the tomato plants shows the main part of the story."),
  ]),
  passage(3, "honeybee-dance", "The Honeybee Dance", "🐝", "nonfiction", `
    Honeybees have a clever way to share news. When a worker bee finds a field of flowers full of nectar, it flies
    back to the hive and does a special dance. This is called the waggle dance. The bee walks in a straight line while
    shaking its body, then circles back and does it again. The direction of the straight line tells the other bees which
    way to fly. The length of the waggle tells them how far away the flowers are. Scientists studied this dance for
    many years before they understood it.`, [
    q("main-idea", "What is the main idea of this text?", ["Bees sting when they are angry.", "Bees use a dance to tell others where food is.", "Scientists like to dance.", "Flowers grow in fields."], 1, "The whole text explains how the waggle dance shares where flowers are."),
    q("detail", "What does the direction of the straight line tell other bees?", ["how old the bee is", "which way to fly", "what color the flowers are", "when to sleep"], 1, "The direction tells which way to fly."),
    q("detail", "How do bees know how far away the flowers are?", ["by the length of the waggle", "by the smell of the hive", "by the bee's color", "by the sound of buzzing"], 0, "The length of the waggle tells how far."),
    q("vocabulary", "A word that means the same as 'clever' is:", ["slow", "smart", "noisy", "tiny"], 1, "Clever means smart."),
    q("author-purpose", "Why did the author write this text?", ["to teach about how bees communicate", "to make readers laugh", "to sell honey", "to tell about a bee's birthday"], 0, "It gives facts to teach us something."),
  ]),
  passage(3, "fox-grapes-new", "The Fox and the High Shelf", "🦊", "fable", `
    A hungry fox spotted a basket of berries on a high shelf in a farmer's barn. He jumped and jumped, but he could
    not reach it. Then he noticed an old wooden crate in the corner. Instead of giving up, the fox pushed the crate
    under the shelf, climbed on top, and reached the berries. A mouse watching from a hole squeaked, "I thought you
    would quit!" The fox replied, "When jumping does not work, try thinking."`, [
    q("character", "Which word best describes the fox?", ["lazy", "clever", "scared", "rude"], 1, "He solved his problem by thinking of using the crate."),
    q("sequence", "What did the fox do right after he noticed the crate?", ["He ate the berries.", "He pushed the crate under the shelf.", "He talked to the mouse.", "He left the barn."], 1, "He pushed the crate under the shelf, then climbed it."),
    q("main-idea", "What is the lesson of this fable?", ["Mice are good friends.", "Think of a new way when one way does not work.", "Berries are healthy.", "Never go into barns."], 1, "The fox says, 'When jumping does not work, try thinking.'"),
    q("antonym", "Which word means the opposite of 'high'?", ["tall", "low", "big", "far"], 1, "Low is the opposite of high."),
    q("genre", "This story is a fable because it:", ["has talking animals and teaches a lesson", "gives true facts", "is written as a letter", "tells how to cook"], 0, "Fables use animals to teach a lesson."),
  ]),
  passage(3, "ruby-bridges", "Ruby Bridges", "🏫", "biography", `
    In 1960, a six-year-old girl named Ruby Bridges walked into William Frantz Elementary School in New Orleans.
    Before that day, only white children went to that school. Ruby was one of the first Black children to go to an
    all-white school in the South. Many people were angry, so men from the government walked with her to keep her safe.
    Ruby was very brave. She went to school every day that year. Her teacher, Mrs. Henry, taught Ruby all by herself
    because other parents kept their children home. Today, Ruby Bridges is remembered as a hero.`, [
    q("detail", "How old was Ruby when she started at the school?", ["six", "eight", "ten", "twelve"], 0, "The text says she was six years old."),
    q("setting", "Where did this event take place?", ["New York", "New Orleans", "Chicago", "Los Angeles"], 1, "The school was in New Orleans."),
    q("cause-effect", "Why did government men walk with Ruby?", ["to carry her books", "to keep her safe", "to show her the way", "to teach her"], 1, "Many people were angry, so the men kept her safe."),
    q("character", "Which word best describes Ruby?", ["brave", "careless", "bored", "mean"], 0, "The text says Ruby was very brave."),
    q("genre", "What kind of text is this?", ["a fairy tale", "a biography", "a poem", "a recipe"], 1, "It tells true facts about a real person's life."),
  ]),
  passage(3, "volcano-island", "An Island Is Born", "🌋", "nonfiction", `
    Some islands are made by volcanoes deep under the ocean. Hot melted rock, called magma, pushes up through a crack
    in the sea floor. When magma comes out, it is called lava. The lava cools in the cold water and turns into hard rock.
    Over thousands of years, layer after layer of rock piles up. Finally, the top of the volcano rises above the water.
    A new island is born! The Hawaiian Islands were formed this way.`, [
    q("vocabulary", "What is magma?", ["cold water", "hot melted rock under the ground", "a kind of fish", "sand on a beach"], 1, "The text says magma is hot melted rock."),
    q("detail", "What is magma called when it comes out of the volcano?", ["lava", "steam", "ash", "coral"], 0, "When magma comes out, it is called lava."),
    q("sequence", "What happens right after the lava cools?", ["It turns into hard rock.", "It melts again.", "It becomes a cloud.", "It turns into sand."], 0, "Lava cools and turns into hard rock."),
    q("detail", "Which islands were formed this way?", ["the Hawaiian Islands", "every island", "only ice islands", "Greenland"], 0, "The last sentence names the Hawaiian Islands."),
    q("text-structure", "How is this text mostly organized?", ["in the order things happen", "as a list of jokes", "as questions and answers", "by comparing two animals"], 0, "It tells the steps in order, from magma to a new island."),
  ]),
  passage(3, "lunch-trade", "The Great Lunch Trade", "🥪", "fiction", `
    Every day, Marcus brought a peanut butter sandwich for lunch, and every day his friend Priya brought spicy rice
    with vegetables. One Monday, Marcus said, "Want to trade?" Priya agreed. Marcus took a big bite of the rice and his
    eyes watered. "It's hot!" he gasped, gulping his milk. Priya giggled as she ate the sandwich. "Too sticky!" she
    laughed. The next day, they each packed an extra snack to share instead. Marcus learned to love Priya's mango slices,
    and Priya discovered that she liked apple chips.`, [
    q("cause-effect", "Why did Marcus's eyes water?", ["He was sad.", "The rice was spicy.", "He got sand in them.", "He was tired."], 1, "The rice was spicy and hot."),
    q("vocabulary", "In the story, 'gasped' means:", ["whispered quietly", "breathed in quickly with surprise", "sang a song", "fell asleep"], 1, "Gasping is breathing in quickly because of surprise."),
    q("sequence", "What did the friends do the next day?", ["They traded lunches again.", "They each packed an extra snack to share.", "They skipped lunch.", "They ate alone."], 1, "They packed an extra snack to share instead."),
    q("phonics", "Which word begins with the same blend as 'spicy'?", ["sip", "spoon", "slice", "pie"], 1, "Spicy and spoon both begin with 'sp'."),
    q("main-idea", "What is the story mostly about?", ["two friends trying each other's food", "a boy who hates lunch", "how to make rice", "a school fire drill"], 0, "Marcus and Priya trade and share food."),
  ]),
  passage(3, "letter-camp", "A Letter from Camp", "✉️", "letter", `
    Dear Mom and Dad,
    Camp Pinecrest is amazing! On the first day, I was nervous because I didn't know anyone. But my bunkmate, Theo,
    showed me how to tie a canoe knot, and now we are friends. Yesterday we hiked to Eagle Rock and saw a real bald
    eagle! Tonight we are roasting marshmallows at the campfire. I miss you, but I am having fun. Please give Max
    a scratch behind the ears for me.
    Love, Nina`, [
    q("genre", "What kind of writing is this?", ["a letter", "a poem", "a news report", "a fable"], 0, "It begins with 'Dear' and ends with 'Love, Nina.'"),
    q("character", "Who wrote the letter?", ["Theo", "Mom", "Nina", "Max"], 2, "It is signed 'Love, Nina.'"),
    q("inference", "Who is Max most likely?", ["Nina's teacher", "the family pet", "a camp counselor", "Nina's bunkmate"], 1, "You scratch a pet behind the ears."),
    q("character", "How did Nina feel on the first day?", ["nervous", "angry", "bored", "sleepy"], 0, "She says she was nervous because she didn't know anyone."),
    q("detail", "What did Nina see at Eagle Rock?", ["a bear", "a bald eagle", "a waterfall", "a snake"], 1, "She saw a real bald eagle."),
  ]),
  passage(3, "paper-airplane", "How to Fold a Paper Airplane", "✈️", "how-to", `
    You will need one sheet of paper. First, fold the paper in half the long way, then unfold it so you have a crease
    down the middle. Next, fold the two top corners down so they meet at the center crease. It should look like a house
    with a pointed roof. Then, fold the new slanted edges to the center line again. After that, fold the plane in half
    along the crease. Finally, fold each side down to make the wings. Hold it under the wings and throw it gently forward!`, [
    q("genre", "What kind of text is this?", ["a story about a pilot", "a set of instructions", "a poem", "a letter"], 1, "It tells steps for how to make something."),
    q("sequence", "What is the first step?", ["Fold the wings.", "Fold the paper in half the long way.", "Throw the plane.", "Fold the corners."], 1, "First, fold the paper in half the long way."),
    q("detail", "After folding the top corners, the paper looks like:", ["a circle", "a house with a pointed roof", "a boat", "a star"], 1, "The text compares it to a house with a pointed roof."),
    q("text-structure", "Which words help show the order of the steps?", ["first, next, then, finally", "happy, sad, mad", "red, blue, green", "big, small, tall"], 0, "Order words tell what to do first and last."),
    q("vocabulary", "In this text, a 'crease' is:", ["a line made by folding", "a hole in the paper", "a drawing", "a sticker"], 0, "When you fold and unfold paper, it leaves a line called a crease."),
  ]),
  passage(3, "desert-tortoise", "The Desert Tortoise", "🐢", "nonfiction", `
    The desert tortoise lives in the hot, dry deserts of the southwestern United States. To escape the burning summer
    sun, it digs burrows under the ground with its strong front legs. A desert tortoise can go a whole year without
    drinking water! It gets most of its water from the plants it eats, such as grasses, wildflowers, and cactus.
    When it does rain, the tortoise drinks a lot and stores water in its body. Some desert tortoises live for more
    than fifty years.`, [
    q("setting", "Where does the desert tortoise live?", ["in the ocean", "in hot, dry deserts", "in snowy mountains", "in rain forests"], 1, "The first sentence tells us where it lives."),
    q("cause-effect", "Why does the tortoise dig burrows?", ["to find gold", "to escape the burning sun", "to hide food", "to meet friends"], 1, "It digs to escape the hot summer sun."),
    q("detail", "Where does the tortoise get most of its water?", ["from rivers", "from the plants it eats", "from snow", "from other animals"], 1, "It gets water from plants like grass and cactus."),
    q("antonym", "Which word is the opposite of 'dry'?", ["hot", "wet", "dusty", "sandy"], 1, "Wet is the opposite of dry."),
    q("visual", "Which picture would help a reader most?", ["a tortoise digging a burrow in the desert", "a penguin on ice", "a city street", "a sailboat"], 0, "It shows the animal and its home from the text."),
  ]),
  passage(3, "spelling-bee", "The Spelling Bee", "🐝", "fiction", `
    Jamal's hands were shaking as he stepped up to the microphone. It was the final round of the school spelling bee.
    The judge read the word: "Necessary." Jamal closed his eyes and remembered his grandmother's trick: "One collar and
    two sleeves," which meant one C and two S's. He spelled slowly, "N-E-C-E-S-S-A-R-Y." There was a pause. Then the
    judge smiled. "That is correct!" The crowd cheered, and Jamal saw his grandmother in the front row, clapping
    harder than anyone.`, [
    q("character", "How did Jamal feel at the start?", ["nervous", "bored", "angry", "silly"], 0, "His hands were shaking, which shows he was nervous."),
    q("detail", "Who taught Jamal the spelling trick?", ["his teacher", "the judge", "his grandmother", "his friend"], 2, "He remembered his grandmother's trick."),
    q("vocabulary", "What does 'final' mean in 'the final round'?", ["first", "last", "easiest", "funniest"], 1, "Final means last."),
    q("inference", "How did Jamal's grandmother feel at the end?", ["proud", "worried", "bored", "upset"], 0, "She was clapping harder than anyone."),
    q("title", "Which is the best title for this story?", ["A Trick to Win", "Lost in the Woods", "The Broken Microphone", "A Day at the Zoo"], 0, "Jamal used a trick to spell the word and win."),
  ]),
  passage(3, "wright-brothers", "The Wright Brothers", "🛩️", "biography", `
    Orville and Wilbur Wright were brothers who owned a bicycle shop in Dayton, Ohio. They loved to tinker and build
    things. The brothers dreamed of building a flying machine. They studied how birds flew and tested many gliders.
    On December 17, 1903, near Kitty Hawk, North Carolina, Orville flew their airplane for 12 seconds. It was the first
    powered airplane flight in history! The brothers kept improving their planes, and their work changed the way people
    travel around the world.`, [
    q("detail", "What kind of shop did the Wright brothers own?", ["a toy shop", "a bicycle shop", "a bakery", "a book shop"], 1, "They owned a bicycle shop in Dayton, Ohio."),
    q("detail", "How long was the first flight?", ["12 minutes", "12 hours", "12 seconds", "1 second"], 2, "Orville flew for 12 seconds."),
    q("vocabulary", "'Tinker' means:", ["to fix or play with machines", "to sleep late", "to sing loudly", "to paint pictures"], 0, "To tinker is to work on and fix things."),
    q("detail", "What did the brothers study to learn about flying?", ["fish", "birds", "clouds", "kites only"], 1, "They studied how birds flew."),
    q("main-idea", "Why are the Wright brothers famous?", ["They made the first powered airplane flight.", "They invented the bicycle.", "They built a city.", "They sailed around the world."], 0, "They made the first powered airplane flight in history."),
  ]),
  passage(3, "lighthouse-keeper", "The Lighthouse Keeper's Storm", "🌊", "fiction", `
    The wind howled around the tall lighthouse. Inside, old Captain Nell climbed the winding stairs with a lantern.
    The big light at the top had gone dark, and a fishing boat was somewhere out on the stormy sea. Nell's knees ached,
    but she kept climbing. At the top, she replaced the broken bulb and turned the switch. The great beam swept across
    the waves. Far away, the little boat turned toward the shore. The next morning, the fishermen brought Nell a basket
    of fresh fish to say thank you.`, [
    q("setting", "Where does most of the story take place?", ["in a lighthouse", "on a farm", "in a castle", "on a train"], 0, "Captain Nell climbs the lighthouse stairs."),
    q("cause-effect", "Why did Nell climb the stairs?", ["to watch the sunset", "because the big light had gone dark", "to find her cat", "to go to sleep"], 1, "The light had gone dark and a boat was at sea."),
    q("inference", "Why did the boat turn toward the shore?", ["The fishermen were bored.", "They could see the light and find their way.", "The storm ended.", "Their engine broke."], 1, "The light showed them the way home."),
    q("phonics", "Which word has the same vowel sound as 'light'?", ["lit", "kite", "late", "let"], 1, "Light and kite both have the long i sound."),
    q("character", "Which word best describes Captain Nell?", ["determined", "lazy", "careless", "mean"], 0, "Her knees ached, but she kept climbing."),
  ]),
  passage(3, "water-cycle", "Water's Never-Ending Trip", "💧", "nonfiction", `
    The water you drink today might have been in a dinosaur's puddle long ago! That is because water moves in a cycle.
    First, the sun heats water in oceans, lakes, and rivers. The water turns into an invisible gas called water vapor
    and rises into the sky. This is called evaporation. High in the sky, the vapor cools and forms tiny drops that make
    clouds. This is condensation. When the drops get too heavy, they fall as rain or snow. This is precipitation.
    Then the water flows back into rivers and oceans, and the cycle starts again.`, [
    q("vocabulary", "What is evaporation?", ["water turning into gas and rising", "rain falling", "ice melting in a cup", "a cloud moving"], 0, "The text calls water turning into vapor and rising evaporation."),
    q("sequence", "What happens after clouds form?", ["The water evaporates.", "Drops get heavy and fall as rain or snow.", "The sun heats the ocean.", "Water freezes into icebergs."], 1, "When drops get too heavy, they fall. That is precipitation."),
    q("detail", "What heats the water at the start of the cycle?", ["the moon", "the wind", "the sun", "volcanoes"], 2, "First, the sun heats the water."),
    q("inference", "Why might your water have been in a dinosaur's puddle?", ["Dinosaurs drank all the water.", "The same water keeps moving in a cycle.", "Water is made in factories.", "Dinosaurs lived recently."], 1, "Water keeps cycling, so it is very old."),
    q("text-structure", "Why does the author start with the dinosaur sentence?", ["to grab the reader's interest", "to explain lava", "to give directions", "to end the text"], 0, "A surprising first sentence makes readers want to read more."),
  ]),
  passage(3, "talent-show", "Leo's Talent Show Surprise", "🎤", "fiction", `
    Leo wanted to be in the school talent show, but he could not sing, dance, or do magic tricks. "I don't have a talent,"
    he told his sister. "Yes, you do," she said. "You make everyone laugh!" So Leo practiced telling jokes in front of the
    mirror every night. On the night of the show, he walked onto the stage and told his funniest joke about a penguin who
    wanted to fly. The whole audience burst out laughing. Leo didn't win first place, but he won the "Biggest Smile" award.`, [
    q("character", "What was Leo's problem at the beginning?", ["He was sick.", "He thought he had no talent.", "He lost his costume.", "He was late."], 1, "He said, 'I don't have a talent.'"),
    q("character", "Who helped Leo find his talent?", ["his teacher", "his sister", "a penguin", "his dad"], 1, "His sister said he makes everyone laugh."),
    q("detail", "How did Leo practice?", ["telling jokes in front of the mirror", "singing in the shower", "dancing in class", "reading books"], 0, "He practiced jokes in front of the mirror."),
    q("vocabulary", "In 'burst out laughing,' 'burst out' means:", ["suddenly started", "slowly stopped", "quietly whispered", "walked away"], 0, "To burst out is to start suddenly."),
    q("main-idea", "What lesson does the story teach?", ["Everyone has a special talent.", "Penguins can fly.", "Never try new things.", "Talent shows are scary."], 0, "Leo learned that making people laugh is a talent."),
  ]),
  passage(3, "ant-colony", "Life in an Ant Colony", "🐜", "nonfiction", `
    Ants live in large groups called colonies. Each colony has a queen, and her job is to lay eggs. Most of the ants are
    workers. Worker ants have many jobs. Some find food and carry it home. Some take care of the eggs and baby ants.
    Others dig tunnels and keep the nest clean. Soldier ants protect the colony from enemies. Ants can carry things that
    are many times heavier than their own bodies. By working together, a colony of ants can survive almost anywhere.`, [
    q("vocabulary", "What is a colony?", ["a large group of ants living together", "a single ant", "a kind of food", "an enemy"], 0, "The first sentence says ants live in large groups called colonies."),
    q("detail", "What is the queen's job?", ["to find food", "to dig tunnels", "to lay eggs", "to fight enemies"], 2, "Her job is to lay eggs."),
    q("detail", "Which ants protect the colony?", ["queen ants", "baby ants", "soldier ants", "sleeping ants"], 2, "Soldier ants protect the colony from enemies."),
    q("main-idea", "What is the main idea of the text?", ["Ants work together in colonies with different jobs.", "Ants are very small.", "Ants like sugar.", "Queens are lazy."], 0, "The text explains how ants share jobs in a colony."),
    q("visual", "Which picture would best go with this text?", ["ants carrying food through tunnels", "a bee on a flower", "a child at the beach", "a snowy owl"], 0, "It shows ants working in their colony."),
  ]),
  passage(3, "grandpa-quilt", "Grandpa's Story Quilt", "🧵", "fiction", `
    Grandpa Joe kept a colorful quilt folded at the end of his bed. One rainy afternoon, Ella asked why it had so many
    different squares. Grandpa unfolded it. "Each square tells a story," he said. He pointed to a blue square with
    anchors. "This was from my sailor shirt." A yellow square came from Grandma's sunflower apron. A tiny striped square
    came from Ella's first baby blanket. Ella traced the stitches with her finger. "Can we add a square from my soccer
    jersey?" she asked. Grandpa smiled. "That is a wonderful idea."`, [
    q("setting", "When does the story take place?", ["on a rainy afternoon", "on a snowy morning", "at midnight", "on a sunny beach day"], 0, "The text says 'One rainy afternoon.'"),
    q("detail", "Where did the blue square with anchors come from?", ["Ella's blanket", "Grandpa's sailor shirt", "Grandma's apron", "a soccer jersey"], 1, "Grandpa says it was from his sailor shirt."),
    q("main-idea", "What does Grandpa mean when he says 'Each square tells a story'?", ["Each square has words on it.", "Each square comes from something special in the family's life.", "The quilt is a book.", "The squares can talk."], 1, "Each square is from a meaningful piece of clothing."),
    q("prediction", "What will most likely happen next?", ["They will add a square from Ella's soccer jersey.", "Grandpa will throw the quilt away.", "Ella will go sailing.", "It will snow."], 0, "Grandpa said adding her jersey was a wonderful idea."),
    q("phonics", "Which word has the same beginning blend as 'stitches'?", ["sitting", "stripes", "switch", "snitch"], 1, "Stitches and stripes both start with 'st'."),
  ]),
  passage(3, "recycling", "Why We Recycle", "♻️", "nonfiction", `
    Every year, people throw away millions of tons of trash. Much of it ends up in landfills, which are huge areas
    where garbage is buried. Recycling helps make less trash. When we recycle, old things like paper, plastic bottles,
    and cans are collected and turned into new things. An old soda can might become part of a bicycle! Recycling saves
    trees, energy, and space in landfills. You can help by sorting your trash and putting recyclables in the right bin.`, [
    q("vocabulary", "What is a landfill?", ["a park", "a huge area where garbage is buried", "a recycling bin", "a factory"], 1, "The text explains that landfills are areas where garbage is buried."),
    q("main-idea", "What is the main idea?", ["Recycling helps make less trash.", "Soda tastes good.", "Bicycles are fast.", "Trees are tall."], 0, "The text explains how recycling reduces trash."),
    q("detail", "What might an old soda can become?", ["a tree", "part of a bicycle", "a book", "a shirt"], 1, "The text says it might become part of a bicycle."),
    q("author-purpose", "Why did the author write this text?", ["to convince and teach readers to recycle", "to tell a scary story", "to describe a vacation", "to explain a game"], 0, "It explains recycling and asks readers to help."),
    q("word-parts", "In the word 'recycle,' the prefix 're-' means:", ["not", "again", "before", "under"], 1, "Re- means again, so recycle means to use again."),
  ]),
  passage(3, "poem-autumn", "Autumn Leaves (a poem)", "🍂", "poem", `
    Red and orange, gold and brown, / The autumn leaves come floating down. / They dance and twirl upon the breeze, /
    Then softly land beneath the trees. / I rake them up into a mound, / The biggest pile in all the town. /
    Then with a run and with a leap, / I jump into the crunchy heap!`, [
    q("genre", "What kind of writing is this?", ["a poem", "a letter", "a news article", "a recipe"], 0, "It has lines that rhyme and a rhythm."),
    q("setting", "What season is the poem about?", ["winter", "spring", "summer", "autumn"], 3, "It is about autumn leaves."),
    q("phonics", "Which word rhymes with 'mound'?", ["mind", "town", "found", "moon"], 2, "Mound and found both end with -ound."),
    q("vocabulary", "In the poem, a 'heap' is:", ["a big pile", "a tiny leaf", "a tree", "a breeze"], 0, "A heap is a pile, like the pile of leaves."),
    q("inference", "How does the speaker feel about the leaves?", ["They enjoy them.", "They are scared of them.", "They are angry about them.", "They are bored by them."], 0, "Jumping into the pile shows the speaker is having fun."),
  ]),
  passage(3, "sloth", "Slow and Steady Sloths", "🦥", "nonfiction", `
    Sloths live high in the trees of rain forests in Central and South America. They are famous for being very slow.
    A sloth moves so slowly that tiny green plants called algae grow on its fur! The green color helps the sloth hide
    from eagles and jaguars. Sloths sleep up to fifteen hours a day. They hang upside down from branches using their
    long, curved claws. Sloths come down from the trees only about once a week.`, [
    q("setting", "Where do sloths live?", ["in rain forest trees", "in the desert", "in the ocean", "on ice"], 0, "They live high in rain forest trees."),
    q("cause-effect", "Why does algae grow on a sloth's fur?", ["The sloth eats it.", "The sloth moves very slowly.", "The sloth swims a lot.", "The sloth paints it."], 1, "It moves so slowly that algae can grow on it."),
    q("detail", "How does the green fur help the sloth?", ["It keeps it warm.", "It helps it hide from enemies.", "It helps it swim.", "It makes it faster."], 1, "The green color helps it hide from eagles and jaguars."),
    q("antonym", "Which word is the opposite of 'slowly'?", ["quietly", "quickly", "softly", "sadly"], 1, "Quickly is the opposite of slowly."),
    q("detail", "How do sloths hang from branches?", ["with their tails", "with their long, curved claws", "with their teeth", "with sticky feet"], 1, "They use their long, curved claws."),
  ]),
  passage(3, "space-mission-1", "Mission to the Red Planet, Part 1", "🚀", "fiction", `
    Captain Zara checked the screens one last time. Her spaceship, the Starhopper, was ready to land on Mars. Her crew
    of three young scientists buckled their seat belts. "Our mission is to find out if there was ever water on Mars,"
    Zara reminded them. The ship shook as it dropped through the thin pink sky. Dust flew everywhere when they touched
    down. Out the window, they saw red rocks, rolling hills, and something strange: a long, winding groove in the ground
    that looked like an old riverbed.`, [
    q("setting", "Where does this part of the story take place?", ["on the Moon", "on Mars", "on Earth", "under the sea"], 1, "The Starhopper lands on Mars."),
    q("main-idea", "What is the crew's mission?", ["to find out if there was ever water on Mars", "to build a house", "to look for aliens", "to bring back gold"], 0, "Zara says the mission is to look for signs of water."),
    q("text-structure", "Where would this paragraph fit within a longer story?", ["at the beginning", "at the end", "in the middle", "It is the whole story."], 0, "The crew is just landing, so it is the beginning."),
    q("prediction", "What will the crew probably do next?", ["explore the groove that looks like a riverbed", "fly home right away", "go to sleep for a year", "plant a garden"], 0, "They just spotted something that matches their mission."),
    q("phonics", "Which word begins with the same blend as 'strange'?", ["string", "sting", "range", "stay"], 0, "Strange and string both begin with 'str'."),
  ]),
];
