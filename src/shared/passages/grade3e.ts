import { passage, q, type Passage } from "./types";

// Grade 3, part 5 of 5 (stories 81-100).
export const GRADE3_E: Passage[] = [
  passage(3, "ant-grasshopper-new", "The Ant and the Grasshopper", "🦗", "fable", `
    All summer, Ant carried seeds and grain to her nest. Grasshopper played his fiddle and laughed. "Why work so hard?
    There's plenty of food!" When winter came, snow covered the fields. Grasshopper was cold and hungry. He knocked on
    Ant's door. Ant let him in and shared her food. "Next summer," said Grasshopper, "I'll help you gather, and you can
    dance to my music while we work." Moral: Prepare today for the needs of tomorrow.`, [
    q("character", "What did Grasshopper do all summer?", ["played music", "gathered food", "built a house", "slept"], 0, "He played his fiddle and laughed."),
    q("cause-effect", "Why was Grasshopper hungry in winter?", ["He did not save food in summer.", "Ant stole his food.", "He was sick.", "It was too hot."], 0, "He played instead of gathering food."),
    q("character", "How is Ant in this version different from what you might expect?", ["She is kind and shares her food.", "She is mean.", "She is lazy.", "She laughs at Grasshopper."], 0, "Ant let him in and shared her food."),
    q("main-idea", "What is the moral?", ["Prepare today for the needs of tomorrow.", "Music is a waste of time.", "Winter is fun.", "Never share food."], 0, "The moral is stated at the end."),
    q("prediction", "What will Grasshopper probably do next summer?", ["help Ant gather food", "play music all day again", "move away", "sleep all summer"], 0, "He promised to help gather."),
  ]),
  passage(3, "octopus-escape", "Inky's Great Escape", "🐙", "nonfiction", `
    In 2016, an octopus named Inky made headlines around the world. Inky lived at the National Aquarium of New Zealand.
    One night, someone left the lid of his tank slightly open. Inky squeezed through the gap, slid across the floor, and
    found a drainpipe about fifty yards long that led to the ocean. In the morning, workers found only a wet trail. Inky
    was free! Octopuses have no bones, so they can squeeze through any opening bigger than their beak.`, [
    q("setting", "Where did Inky live?", ["at the National Aquarium of New Zealand", "in a pet store", "in a lake", "at a zoo in Texas"], 0, "The text names the aquarium."),
    q("detail", "How did Inky get to the ocean?", ["through a drainpipe", "in a bucket", "by jumping out a window", "a worker carried him"], 0, "He found a drainpipe that led to the ocean."),
    q("cause-effect", "Why can octopuses squeeze through small openings?", ["They have no bones.", "They are very tiny.", "They are slippery fish.", "They can shrink."], 0, "Octopuses have no bones."),
    q("inference", "What clue did workers find in the morning?", ["a wet trail", "a note", "footprints", "a broken tank"], 0, "They found a wet trail."),
    q("genre", "Is this story real or make-believe?", ["real; it is nonfiction", "make-believe; it is a fairy tale", "a poem", "a myth"], 0, "It tells about a real octopus and gives a date."),
  ]),
  passage(3, "grandpa-stories", "Grandpa's Stories", "👴", "fiction", `
    Every night, Grandpa told Nora stories about growing up on a fishing boat. He told about the time a whale swam right
    under the boat and the storm that rocked them for three days. One night, Grandpa said, "Now it's your turn. Tell me a
    story." Nora thought hard. Then she told him about the day she found a bird with a broken wing and helped nurse it
    back to health. Grandpa listened with a big smile. "That," he said, "is a story worth telling again."`, [
    q("setting", "Where did Grandpa grow up?", ["on a fishing boat", "on a farm", "in a castle", "in a big city"], 0, "His stories are about growing up on a fishing boat."),
    q("detail", "What did Nora's story tell about?", ["helping a bird with a broken wing", "a whale", "a storm", "a fishing trip"], 0, "She helped a bird with a broken wing."),
    q("character", "How did Grandpa feel about Nora's story?", ["He loved it.", "He was bored.", "He was angry.", "He fell asleep."], 0, "He listened with a big smile."),
    q("vocabulary", "What does 'nurse it back to health' mean?", ["take care of it until it is well", "take it to a hospital", "put it in a cage", "let it go right away"], 0, "Nora cared for the bird until it got better."),
    q("main-idea", "What is this story mostly about?", ["sharing stories between a grandpa and granddaughter", "a big storm", "a fishing contest", "how whales swim"], 0, "They take turns telling stories."),
  ]),
  passage(3, "dinosaur-fossils", "How Fossils Form", "🦖", "nonfiction", `
    How do we know what dinosaurs looked like? Scientists study fossils. A fossil forms when an animal dies and is
    quickly covered by mud or sand. Over millions of years, more layers pile on top and press down. Minerals in water
    slowly replace the bones, turning them into stone. Much later, wind, rain, or digging can uncover the fossil.
    Scientists called paleontologists dig up fossils carefully with brushes and small tools so they don't break them.`, [
    q("sequence", "What happens first when a fossil forms?", ["The animal is covered by mud or sand.", "Minerals replace the bones.", "Scientists dig it up.", "Wind uncovers it."], 0, "The animal is quickly covered by mud or sand."),
    q("vocabulary", "What is a paleontologist?", ["a scientist who studies fossils", "a doctor", "a dinosaur", "a kind of rock"], 0, "The text says scientists called paleontologists dig up fossils."),
    q("detail", "What turns bones into stone?", ["minerals in water", "the sun", "wind", "fire"], 0, "Minerals in water slowly replace the bones."),
    q("cause-effect", "Why do scientists use brushes and small tools?", ["so the fossils don't break", "because shovels are lost", "to clean their hands", "to paint fossils"], 0, "They dig carefully so they don't break them."),
    q("text-structure", "How is this text mostly organized?", ["the steps of how something happens", "a story with a problem", "a comparison of two animals", "a letter"], 0, "It explains the steps of fossil formation."),
  ]),
  passage(3, "letter-alaska", "Two Friends, Two Places", "🌎", "letter", `
    Dear Kai, I miss you since I moved to Alaska! It is so different from Hawaii. Here, it is winter, and there is snow
    everywhere. In December, the Sun only shines for about four hours a day! I learned to ice skate and built my first
    snowman. My new friend Tanya showed me how to make snowshoes. Do you still go surfing every weekend? Write back and
    tell me about the beach. I'll send you a picture of the northern lights. Your friend, Leilani`, [
    q("setting", "Where did Leilani move from and to?", ["from Hawaii to Alaska", "from Alaska to Hawaii", "from Texas to Alaska", "from Hawaii to Florida"], 0, "She says Alaska is different from Hawaii."),
    q("detail", "How long does the Sun shine in December in Alaska?", ["about four hours", "all day", "twelve hours", "it never sets"], 0, "The Sun shines about four hours a day."),
    q("inference", "What does Kai probably do in Hawaii?", ["go surfing", "ice skate", "make snowshoes", "build snowmen"], 0, "Leilani asks if he still goes surfing."),
    q("detail", "Who showed Leilani how to make snowshoes?", ["Tanya", "Kai", "her mom", "her teacher"], 0, "Her new friend Tanya did."),
    q("antonym", "Which word is the opposite of 'different'?", ["same", "new", "cold", "far"], 0, "Same is the opposite of different."),
  ]),
  passage(3, "garbage-truck", "A Day with the Garbage Truck", "🚛", "nonfiction", `
    Before most people wake up, sanitation workers start their day. They drive big trucks along every street to collect
    trash and recycling. Many trucks have a mechanical arm that lifts the bins and dumps them inside. A machine in the
    truck squeezes the trash so more can fit. When the truck is full, the workers drive to a landfill or recycling center.
    One truck can collect trash from about a thousand homes in a single day! Sanitation workers help keep our communities
    clean and healthy.`, [
    q("vocabulary", "What do sanitation workers do?", ["collect trash and recycling", "fight fires", "deliver mail", "teach school"], 0, "They collect trash and recycling."),
    q("detail", "Why does the truck squeeze the trash?", ["so more can fit", "to make it smell better", "to make it heavier", "to turn it into food"], 0, "A machine squeezes the trash so more can fit."),
    q("detail", "About how many homes can one truck collect from in a day?", ["about a thousand", "about ten", "about a million", "two"], 0, "About a thousand homes."),
    q("inference", "What would happen if no one collected trash?", ["Streets would get dirty and unhealthy.", "Nothing would change.", "Trash would disappear.", "Trucks would get bigger."], 0, "Workers keep communities clean and healthy."),
    q("author-purpose", "What is the author's purpose?", ["to inform readers about sanitation workers", "to tell a funny story", "to persuade you to buy a truck", "to teach a song"], 0, "It gives facts about their work."),
  ]),
  passage(3, "magic-paintbrush", "The Magic Paintbrush", "🖌️", "fiction", `
    Lin was a poor girl who loved to paint, but she had no paintbrush. One night, an old woman gave her a golden brush.
    Everything Lin painted came to life! She painted a bucket for her neighbor and water for the dry fields. Soon a greedy
    king heard about the brush. "Paint me a mountain of gold!" he ordered. Lin painted a golden mountain in the middle of a
    wide sea. The king sailed toward it. Then Lin painted a strong wind. The waves carried the king far away, and he never
    bothered anyone again.`, [
    q("character", "How did Lin use the brush at first?", ["to help her neighbors", "to get rich", "to trick people", "to paint the king"], 0, "She painted a bucket and water for others."),
    q("character", "What word describes the king?", ["greedy", "generous", "kind", "shy"], 0, "The text calls him a greedy king."),
    q("detail", "Where did Lin paint the mountain of gold?", ["in the middle of a wide sea", "in the palace", "in her house", "in the fields"], 0, "She painted it in the middle of a sea."),
    q("inference", "Why did Lin paint a strong wind?", ["to send the greedy king away", "to dry her paint", "to help the king get gold", "to make rain"], 0, "The wind carried the king far away."),
    q("main-idea", "What lesson does the story teach?", ["Greed does not win; using gifts to help others is good.", "Painting is hard.", "Kings are always kind.", "Never go to sea."], 0, "Lin used her gift to help and stopped the greedy king."),
  ]),
  passage(3, "solar-system", "Our Solar System", "🪐", "nonfiction", `
    Our solar system has eight planets that travel around the Sun. The four planets closest to the Sun are Mercury,
    Venus, Earth, and Mars. They are small and rocky. The four outer planets are Jupiter, Saturn, Uranus, and Neptune.
    They are giant planets made mostly of gas and ice. Jupiter is the biggest; more than a thousand Earths could fit inside
    it! Saturn is famous for its beautiful rings, which are made of ice and rock. Earth is the only planet we know of
    that has living things.`, [
    q("detail", "How many planets are in our solar system?", ["eight", "nine", "seven", "ten"], 0, "Our solar system has eight planets."),
    q("detail", "What is the biggest planet?", ["Jupiter", "Saturn", "Earth", "Neptune"], 0, "Jupiter is the biggest."),
    q("text-structure", "How does the author organize the planets?", ["inner rocky planets, then outer giant planets", "from smallest to biggest", "in alphabetical order", "by color"], 0, "First the four inner planets, then the four outer ones."),
    q("detail", "What are Saturn's rings made of?", ["ice and rock", "gold", "gas only", "fire"], 0, "They are made of ice and rock."),
    q("inference", "Why is Earth special?", ["It is the only known planet with living things.", "It is the biggest.", "It has the most rings.", "It is the farthest from the Sun."], 0, "The last sentence says this."),
  ]),
  passage(3, "chess-champion", "The Chess Club", "♟️", "fiction", `
    Aria had never played chess before she joined the after-school club. In her first game, she lost in six moves. In her
    second game, she lost in ten. "Every game, you last a little longer," said Coach Ramos. "That means you're learning."
    Aria practiced every night with her dad. She learned to protect her king and think two moves ahead. By spring, she won
    her first game in the club tournament. She didn't win the trophy, but she was proud of how far she had come.`, [
    q("detail", "How many moves did Aria last in her first game?", ["six", "ten", "two", "twenty"], 0, "She lost in six moves."),
    q("character", "What did Coach Ramos think about Aria's losses?", ["She was learning.", "She should quit.", "She wasn't trying.", "She was cheating."], 0, "He said lasting longer means she's learning."),
    q("detail", "Who did Aria practice with?", ["her dad", "her coach", "her sister", "a computer"], 0, "She practiced every night with her dad."),
    q("main-idea", "What is the lesson?", ["Practice helps you improve.", "Chess is boring.", "You must win trophies to be proud.", "Never play games."], 0, "Aria practiced and got better."),
    q("phonics", "Which word begins with the same sound as 'chess'?", ["cheese", "shell", "kiss", "cat"], 0, "Chess and cheese both begin with 'ch'."),
  ]),
  passage(3, "elephant-memory", "Elephants Never Forget", "🐘", "nonfiction", `
    You may have heard the saying "elephants never forget." Scientists have found that elephants do have amazing
    memories. The oldest female in a herd, called the matriarch, leads her family. She remembers where to find water
    holes, even ones she visited many years ago. During dry seasons, this memory helps the whole herd survive. Elephants
    also recognize old friends. When two elephant families meet after a long time apart, they greet each other with
    trumpets, ear flapping, and trunk touches.`, [
    q("vocabulary", "What is a matriarch?", ["the oldest female who leads the herd", "a baby elephant", "a kind of tree", "a water hole"], 0, "The oldest female leader is called the matriarch."),
    q("cause-effect", "How does the matriarch's memory help the herd?", ["She remembers where to find water.", "She sings songs.", "She builds nests.", "She scares lions with her memory."], 0, "She remembers water holes, which helps them survive."),
    q("detail", "How do elephant families greet each other?", ["with trumpets, ear flapping, and trunk touches", "by sleeping", "by running away", "by eating together"], 0, "The text lists these greetings."),
    q("main-idea", "What is the main idea?", ["Elephants have amazing memories.", "Elephants are gray.", "Elephants like peanuts.", "Elephants live in cities."], 0, "The text gives examples of their memory."),
    q("inference", "When is the matriarch's memory MOST important?", ["during dry seasons", "on rainy days", "at night", "when it snows"], 0, "During dry seasons, finding water is hardest."),
  ]),
  passage(3, "snow-day", "Snow Day!", "❄️", "fiction", `
    When Ruby woke up, the world outside was white and silent. The radio announced, "All schools are closed today!" Ruby
    cheered and pulled on her boots, coat, mittens, and hat. She and her neighbor Theo built a snow fort with thick walls.
    Then they had a snowball battle with the kids next door. By lunchtime, their cheeks were rosy and their mittens were
    soaked. They went inside, hung their mittens by the fire to dry, and drank hot cocoa with tiny marshmallows.`, [
    q("cause-effect", "Why was there no school?", ["It snowed a lot.", "It was a holiday.", "The teacher was sick.", "It was Saturday."], 0, "Schools were closed for the snow."),
    q("sequence", "What did Ruby and Theo do first?", ["built a snow fort", "had a snowball battle", "drank hot cocoa", "dried their mittens"], 0, "They built a fort first."),
    q("inference", "Why were their cheeks rosy?", ["from playing in the cold", "they were embarrassed", "they ate strawberries", "they were sunburned"], 0, "Cold air makes cheeks red."),
    q("vocabulary", "In this story, 'soaked' means:", ["very wet", "very dry", "very warm", "lost"], 0, "The mittens were wet from snow."),
    q("setting", "When does the story take place?", ["on a snowy winter day", "on a hot summer day", "in the spring", "at night"], 0, "There's snow, so it's winter."),
  ]),
  passage(3, "benjamin-franklin", "Ben Franklin, the Curious Inventor", "⚡", "biography", `
    Benjamin Franklin was born in Boston in 1706. He was one of seventeen children! He left school at age ten, but he never
    stopped learning. He read every book he could find. Franklin became a printer, a writer, a scientist, and an inventor.
    He invented bifocal glasses, a special stove, and the lightning rod, which protects buildings from lightning. He also
    helped write the Declaration of Independence. Franklin believed that curiosity and hard work could make life better
    for everyone.`, [
    q("detail", "How many children were in Franklin's family?", ["seventeen", "two", "seven", "ten"], 0, "He was one of seventeen children."),
    q("detail", "What does a lightning rod do?", ["protects buildings from lightning", "makes electricity for toys", "helps people see", "heats houses"], 0, "It protects buildings from lightning."),
    q("inference", "How did Franklin keep learning after leaving school?", ["He read every book he could find.", "He went back to school.", "He watched TV.", "He stopped learning."], 0, "He read every book he could find."),
    q("character", "Which word best describes Ben Franklin?", ["curious", "lazy", "bored", "unkind"], 0, "The title and text show he was curious."),
    q("detail", "Which of these did Franklin NOT invent?", ["the telephone", "bifocal glasses", "a special stove", "the lightning rod"], 0, "Alexander Graham Bell invented the telephone."),
  ]),
  passage(3, "lost-in-store", "Lost in the Store", "🛒", "fiction", `
    Leo was looking at toy trucks when he turned around and his mom was gone. His heart pounded. He wanted to run up and
    down the aisles, but he remembered what Mom had taught him: "If you get lost, stay calm, and ask a worker with a name
    tag for help." Leo found a woman in a blue vest with a name tag. "I can't find my mom," he said. She called on the
    speaker, "Leo's mom, please come to the front desk." In two minutes, Mom came hurrying over and hugged him tight.`, [
    q("character", "How did Leo feel when he realized he was lost?", ["scared", "happy", "bored", "sleepy"], 0, "His heart pounded."),
    q("detail", "What had Mom taught Leo?", ["Stay calm and ask a worker with a name tag.", "Run up and down the aisles.", "Go outside.", "Hide under a shelf."], 0, "Mom taught him to stay calm and ask a worker."),
    q("character", "Which word describes Leo's actions?", ["smart", "silly", "careless", "rude"], 0, "He followed the safety plan."),
    q("sequence", "What happened right after Leo talked to the worker?", ["She called on the speaker.", "Leo went home.", "Leo bought a truck.", "Mom left the store."], 0, "She called Leo's mom on the speaker."),
    q("author-purpose", "What does this story teach readers?", ["what to do if you get lost", "how to buy toys", "how to drive a truck", "how to make a speaker"], 0, "It shows a safety plan for getting lost."),
  ]),
  passage(3, "honey-making", "From Flower to Honey", "🍯", "nonfiction", `
    Honey starts as nectar, a sweet liquid inside flowers. Worker bees sip nectar and store it in a special honey stomach.
    Back at the hive, they pass the nectar to other bees, who chew it and add enzymes. Then the bees spread the nectar
    into wax cells. They fan their wings to dry it out until it becomes thick and sticky. Finally, they seal the cells with
    wax caps. One worker bee makes only about one-twelfth of a teaspoon of honey in her whole life!`, [
    q("vocabulary", "What is nectar?", ["a sweet liquid inside flowers", "a kind of bee", "wax", "a beehive"], 0, "The text defines nectar."),
    q("sequence", "What do bees do right before sealing the cells?", ["fan their wings to dry the honey", "sip nectar from flowers", "chew the nectar", "fly to the flowers"], 0, "They dry it out, then seal it."),
    q("detail", "How much honey does one worker bee make in her life?", ["about one-twelfth of a teaspoon", "a whole jar", "one cup", "a gallon"], 0, "About one-twelfth of a teaspoon."),
    q("inference", "What can you infer about a full jar of honey?", ["Many bees worked to make it.", "One bee made it in a day.", "It came from one flower.", "It was made without bees."], 0, "Each bee makes only a tiny amount."),
    q("text-structure", "How is this text organized?", ["in the order of steps", "as a problem and solution", "as a comparison", "as a list of questions"], 0, "It goes from flower to honey in order."),
  ]),
  passage(3, "time-capsule", "The Time Capsule", "⏳", "fiction", `
    For the school's fiftieth birthday, Mrs. Green's class made a time capsule. Each student added something that showed
    life today. Ethan added a photo of the class. Sofia added a drawing of her favorite video game. Malik wrote a letter
    describing what kids eat for lunch. They sealed everything inside a metal box and buried it under the flagpole. On the
    lid, they wrote, "Do not open until 2076." "I'll be really old then," Malik said. "Maybe I'll come back and open it!"`, [
    q("vocabulary", "What is a time capsule?", ["a box of items saved for people in the future to open", "a kind of clock", "a spaceship", "a lunchbox"], 0, "They sealed items to be opened in 2076."),
    q("detail", "What did Malik add?", ["a letter about school lunches", "a class photo", "a drawing", "a toy"], 0, "Malik wrote a letter about lunch."),
    q("setting", "Where did they bury the time capsule?", ["under the flagpole", "in the garden", "behind the gym", "in the classroom"], 0, "They buried it under the flagpole."),
    q("inference", "Why did Malik say he would be really old?", ["2076 is many years away.", "He was sick.", "He has a birthday soon.", "He was joking about the box."], 0, "The capsule won't be opened for about fifty years."),
    q("prediction", "What might people in 2076 think when they open it?", ["They'll learn what school was like long ago.", "They won't be able to read anything.", "They'll throw it away.", "They'll think it's from another planet."], 0, "The items show life today for future people."),
  ]),
  passage(3, "volcano-facts", "Inside a Volcano", "🌋", "nonfiction", `
    Deep under Earth's surface, it is so hot that rock melts. This melted rock is called magma. Magma is lighter than the
    solid rock around it, so it slowly rises. When pressure builds up, the magma bursts out of an opening in the ground.
    Once magma reaches the surface, it is called lava. Lava can be hotter than 2,000 degrees! When it cools, it hardens
    into new rock. Over time, layers of cooled lava can build a mountain. Some islands, like Hawaii, were made this way.`, [
    q("vocabulary", "What is magma?", ["melted rock under the ground", "a type of cloud", "cooled lava", "a mountain"], 0, "Melted rock underground is called magma."),
    q("detail", "What is magma called once it reaches the surface?", ["lava", "ash", "steam", "sand"], 0, "Once it reaches the surface, it is lava."),
    q("cause-effect", "Why does magma rise?", ["It is lighter than the solid rock around it.", "Wind pulls it up.", "It is cold.", "Animals push it."], 0, "Magma is lighter, so it rises."),
    q("detail", "What happens when lava cools?", ["It hardens into new rock.", "It turns into water.", "It disappears.", "It becomes gas."], 0, "When it cools, it hardens into new rock."),
    q("inference", "How were the Hawaiian islands formed?", ["by layers of cooled lava", "by sand piling up", "by people building them", "by glaciers"], 0, "Cooled lava built them over time."),
  ]),
  passage(3, "music-recital", "Butterflies Before the Recital", "🎹", "fiction", `
    Emma's hands were shaking as she waited backstage for her piano recital. "What if I forget the notes?" she whispered.
    Her teacher, Mr. Lee, knelt down. "Everyone gets butterflies," he said. "Take three deep breaths, and play it just
    like you did at home." Emma breathed in slowly, three times. She walked onto the stage, sat at the piano, and began.
    Her fingers remembered every note. When she finished, the audience clapped loudly, and Emma took a big bow.`, [
    q("vocabulary", "What does 'butterflies' mean in this story?", ["a nervous feeling", "real insects", "a song", "a dance"], 0, "Having butterflies means feeling nervous."),
    q("detail", "What advice did Mr. Lee give?", ["Take three deep breaths and play like at home.", "Play very fast.", "Close your eyes.", "Skip the hard parts."], 0, "He told her to take three deep breaths."),
    q("character", "How did Emma feel at the beginning?", ["nervous", "bored", "angry", "silly"], 0, "Her hands were shaking."),
    q("character", "How did Emma feel at the end?", ["proud", "embarrassed", "sad", "confused"], 0, "The audience clapped and she took a big bow."),
    q("phonics", "Which word has the same vowel sound as 'played'?", ["stage", "stand", "speed", "spot"], 0, "Played and stage both have the long 'a' sound."),
  ]),
  passage(3, "recycling-rap", "Recycling Rap (a poem)", "♻️", "poem", `
    Don't throw that bottle in the trash, / Recycle it, and make it last! / A can can come back as a bike, / A jug can be a
    slide you like. / Old paper turns to paper new, / There's so much good that we can do. / So sort it out and help the
    Earth, / Show everybody what it's worth!`, [
    q("author-purpose", "What does the poet want readers to do?", ["recycle", "buy more bottles", "ride bikes", "write poems"], 0, "The poem tells readers to recycle."),
    q("detail", "According to the poem, a can can come back as:", ["a bike", "a slide", "new paper", "a tree"], 0, "'A can can come back as a bike.'"),
    q("phonics", "Which word rhymes with 'trash'?", ["last", "cash", "trust", "train"], 1, "Trash and cash rhyme."),
    q("genre", "What kind of text is this?", ["a poem", "a biography", "a news report", "a fable"], 0, "It has rhyming lines."),
    q("vocabulary", "What does 'sort it out' mean in the poem?", ["put things into the right groups", "throw everything away", "lose it", "break it"], 0, "Sorting means putting recycling into groups."),
  ]),
  passage(3, "turtle-hatchlings", "Sea Turtle Hatchlings", "🐢", "nonfiction", `
    On summer nights, a mother sea turtle crawls onto a sandy beach. She digs a hole and lays about one hundred eggs.
    Then she covers them with sand and returns to the ocean. About two months later, the baby turtles, called hatchlings,
    break out of their shells. They usually come out at night when it is cooler and safer. The hatchlings follow the
    bright reflection of the moon on the water to find the ocean. Bright lights from houses can confuse them, so some
    beach towns turn off lights during hatching season.`, [
    q("detail", "About how many eggs does a mother sea turtle lay?", ["one hundred", "ten", "one thousand", "two"], 0, "She lays about one hundred eggs."),
    q("vocabulary", "What are hatchlings?", ["baby turtles that just came out of their eggs", "turtle eggs", "mother turtles", "seashells"], 0, "Baby turtles are called hatchlings."),
    q("detail", "How do hatchlings find the ocean?", ["They follow the moon's reflection on the water.", "Their mother leads them.", "They follow sounds.", "They smell the salt."], 0, "They follow the bright reflection of the moon."),
    q("cause-effect", "Why do some beach towns turn off lights?", ["Bright lights confuse the hatchlings.", "To save money.", "To see the stars.", "Because it's bedtime."], 0, "Lights can confuse the hatchlings."),
    q("sequence", "What does the mother turtle do after laying eggs?", ["covers them with sand and returns to the ocean", "waits for them to hatch", "carries them to the water", "eats them"], 0, "She covers them and goes back to the ocean."),
  ]),
  passage(3, "class-play", "The Class Play", "🎭", "fiction", `
    Room 9 was putting on a play about the three little pigs. Dante wanted to be the wolf, but he got the part of the
    third pig. He was disappointed. Then he read the script. The third pig was the smartest one, the pig who built the
    brick house! Dante practiced his lines every night. On the night of the play, he said, "Not by the hair of my chinny
    chin chin!" so loudly that the audience cheered. Afterward, Dante told his mom, "This was the best part after all."`, [
    q("character", "How did Dante feel when he first got his part?", ["disappointed", "thrilled", "scared", "angry at the teacher"], 0, "He wanted to be the wolf, so he was disappointed."),
    q("cause-effect", "What changed Dante's mind about his part?", ["He read the script and saw the pig was the smartest.", "His friend traded with him.", "The teacher gave him a prize.", "He got to be the wolf."], 0, "He read that the third pig was the smartest."),
    q("detail", "What did the third pig build his house with?", ["bricks", "straw", "sticks", "snow"], 0, "The pig who built the brick house."),
    q("prediction", "If Dante gets a small part next time, what will he probably do?", ["give it a chance", "quit the play", "cry all night", "refuse to practice"], 0, "He learned that any part can be great."),
    q("title", "Which is the best title?", ["The Best Part After All", "The Big Bad Wolf", "Building Houses", "Dante's New Pet"], 0, "Dante's last words give a great title."),
  ]),
];
