import { passage, q, type Passage } from "./types";

// Grade 3, part 3 of 5 (stories 41-60).
export const GRADE3_C: Passage[] = [
  passage(3, "tortoise-hare-new", "The Tortoise and the Hare Rematch", "🐢", "fable", `
    A year after losing the big race, Hare wanted a rematch. "This time I won't nap," he promised. Tortoise agreed. The
    race began, and Hare zoomed ahead. He did not stop once. But halfway through, the path crossed a wide river. Hare
    could not swim! He paced back and forth on the bank. Soon Tortoise arrived and said, "Climb on my shell." Tortoise
    swam them both across. On the other side, Hare said, "Let's finish together." They crossed the finish line side by
    side. Moral: Working together can get you farther than racing alone.`, [
    q("genre", "What kind of story is this?", ["a fable", "a biography", "a news article", "a recipe"], 0, "It has talking animals and ends with a moral."),
    q("cause-effect", "Why did Hare get stuck?", ["He fell asleep.", "He could not swim across the river.", "He hurt his leg.", "He got lost in the woods."], 1, "The path crossed a river, and Hare could not swim."),
    q("character", "How did Tortoise show kindness?", ["He carried Hare across the river.", "He laughed at Hare.", "He took a shortcut.", "He went home."], 0, "He told Hare to climb on his shell."),
    q("main-idea", "What is the moral of the story?", ["Working together can get you farther.", "Always run as fast as you can.", "Never swim in rivers.", "Tortoises are slow."], 0, "The moral is stated at the end."),
    q("prediction", "If they race again, what will they most likely do?", ["be friends and help each other", "never speak again", "fight on the bridge", "both fall asleep"], 0, "They learned that working together works best."),
  ]),
  passage(3, "letter-grandma", "A Letter to Grandma", "✉️", "letter", `
    Dear Grandma, Guess what? I joined the school orchestra! I play the violin. At first, it sounded like a squeaky door,
    and our cat ran away every time I practiced. But my teacher, Ms. Kim, showed me how to hold the bow gently. Now I can
    play "Twinkle, Twinkle, Little Star" all the way through. Our first concert is on May 3rd. Can you please come? I will
    save you a seat in the front row. Love, Noah`, [
    q("genre", "What kind of text is this?", ["a letter", "a poem", "a fable", "a how-to text"], 0, "It starts with 'Dear Grandma' and ends with 'Love, Noah.'"),
    q("detail", "What instrument does Noah play?", ["piano", "drums", "violin", "flute"], 2, "He says, 'I play the violin.'"),
    q("cause-effect", "Why did the cat run away when Noah practiced?", ["The violin sounded squeaky.", "The cat was hungry.", "Noah chased it.", "It was bath time."], 0, "It sounded like a squeaky door."),
    q("author-purpose", "Why did Noah write this letter?", ["to invite Grandma to his concert", "to ask for money", "to say he is sick", "to teach violin"], 0, "He asks, 'Can you please come?'"),
    q("vocabulary", "In this letter, 'gently' means:", ["softly and carefully", "very hard", "quickly", "loudly"], 0, "Holding the bow gently helps it sound better."),
  ]),
  passage(3, "sharks", "Sharks: Ocean Hunters", "🦈", "nonfiction", `
    Sharks have lived in the oceans for more than 400 million years, even before dinosaurs! There are over 500 kinds of
    sharks. The whale shark is the biggest fish in the world, but it eats only tiny plankton. The dwarf lantern shark is
    small enough to fit in your hand. Sharks do not have bones. Their skeletons are made of cartilage, the same bendy
    material that is in your ears and nose. Many sharks lose thousands of teeth in their lives, but new teeth keep
    growing in to replace them.`, [
    q("detail", "What is the biggest fish in the world?", ["the great white shark", "the whale shark", "the dwarf lantern shark", "the blue whale"], 1, "The whale shark is the biggest fish."),
    q("detail", "What are shark skeletons made of?", ["bones", "cartilage", "wood", "shells"], 1, "Their skeletons are made of cartilage."),
    q("inference", "How do you know cartilage is bendy?", ["It is in your ears and nose, which can bend.", "It is very hard.", "It glows.", "It is made of metal."], 0, "Your ears and nose bend, and they contain cartilage."),
    q("detail", "What happens when a shark loses a tooth?", ["A new tooth grows in.", "It cannot eat anymore.", "It goes to the dentist.", "It swims away."], 0, "New teeth keep growing in to replace them."),
    q("antonym", "What is the opposite of 'biggest'?", ["largest", "smallest", "tallest", "heaviest"], 1, "Smallest is the opposite of biggest."),
  ]),
  passage(3, "treehouse-plans", "The Treehouse Plan", "🛖", "fiction", `
    Marco and his sister Gia wanted to build a treehouse. Marco wanted a rope ladder. Gia wanted a slide. They argued
    until Dad stepped in. "Why don't you draw a plan together?" he said. They sat at the kitchen table with paper and
    markers. Marco drew the rope ladder on one side. Gia drew the slide on the other side. Then Gia added a window, and
    Marco added a flag on top. When they finished, they agreed it was the best treehouse plan ever. On Saturday, the
    whole family started building.`, [
    q("main-idea", "What was the problem?", ["Marco and Gia disagreed about the treehouse.", "The tree fell down.", "They had no markers.", "Dad was too busy."], 0, "They argued about a ladder or a slide."),
    q("detail", "How did they solve the problem?", ["They drew a plan together with both ideas.", "They flipped a coin.", "They gave up.", "Dad picked for them."], 0, "They put both the ladder and the slide in the plan."),
    q("setting", "Where did they draw the plan?", ["at the kitchen table", "in the tree", "at school", "at the store"], 0, "They sat at the kitchen table."),
    q("character", "Which word describes Dad?", ["helpful", "mean", "silly", "sleepy"], 0, "He helped them find a way to agree."),
    q("title", "Which is another good title for this story?", ["Two Ideas Are Better Than One", "The Broken Slide", "Dad's New Job", "A Day at the Beach"], 0, "They combined both ideas to make the best plan."),
  ]),
  passage(3, "seasons", "Why Do We Have Seasons?", "🌍", "nonfiction", `
    Earth travels around the Sun once every year. But Earth is tilted, like a spinning top that leans to one side. When
    the northern half of Earth tilts toward the Sun, it gets more direct sunlight and longer days. That is summer in the
    north. When the northern half tilts away from the Sun, the sunlight is weaker and the days are shorter. That is
    winter. Spring and fall happen in between. When it is summer in the United States, it is winter in Australia!`, [
    q("main-idea", "What is this text mostly about?", ["why Earth has seasons", "how to build a spinning top", "life in Australia", "how the Moon shines"], 0, "The title and text explain why we have seasons."),
    q("detail", "How long does it take Earth to travel around the Sun?", ["one day", "one month", "one year", "one week"], 2, "Earth travels around the Sun once every year."),
    q("cause-effect", "What causes summer in the north?", ["The northern half tilts toward the Sun.", "Earth stops spinning.", "The Moon gets bigger.", "It rains less."], 0, "Tilting toward the Sun gives more direct sunlight."),
    q("inference", "If it is July and hot in the United States, what is the season in Australia?", ["summer", "winter", "spring", "It has no seasons."], 1, "When it is summer in the US, it is winter in Australia."),
    q("vocabulary", "What does 'tilted' mean?", ["leaning to one side", "very round", "standing still", "upside down"], 0, "The text compares it to a top that leans to one side."),
  ]),
  passage(3, "brave-firefly", "The Littlest Firefly", "✨", "fiction", `
    Lumi was the smallest firefly in the meadow. Her light was so tiny that the other fireflies teased her. "Your glow is
    just a speck!" they laughed. One night, a thick fog rolled in. The big fireflies' lights spread out and got lost in
    the fog. But Lumi's small, bright point of light shone straight through. A lost baby rabbit saw Lumi's light and
    followed it home. The next night, nobody teased Lumi. Instead, they asked her to lead the way.`, [
    q("character", "How did Lumi feel when the others teased her?", ["probably sad", "proud", "angry at the rabbit", "sleepy"], 0, "Being teased usually makes someone feel sad."),
    q("cause-effect", "Why could the rabbit see Lumi's light in the fog?", ["Her small, bright light shone straight through.", "She was the biggest.", "She made a loud noise.", "The fog was gone."], 0, "Her small point of light shone through the fog."),
    q("main-idea", "What is the lesson of this story?", ["Being small can be a strength.", "Fog is scary.", "Rabbits get lost.", "Never go outside at night."], 0, "Lumi's tiny light was exactly what was needed."),
    q("sequence", "What happened right after the fog rolled in?", ["The big fireflies' lights got lost in the fog.", "Lumi went to sleep.", "The rabbit found its home.", "The fireflies teased Lumi."], 0, "The big lights spread out and got lost."),
    q("antonym", "Which word is the opposite of 'smallest'?", ["tiniest", "biggest", "brightest", "littlest"], 1, "Biggest is the opposite of smallest."),
  ]),
  passage(3, "cesar-chavez", "César Chávez", "🌾", "biography", `
    César Chávez was born in Arizona in 1927. When he was ten, his family lost their farm and moved to California to work
    in the fields. Farm workers picked grapes and lettuce for long hours and very little pay. César saw how hard their
    lives were. As an adult, he helped farm workers join together to ask for fair pay and safer working conditions. He
    believed in peaceful protest, not violence. He led marches and a boycott, asking people not to buy grapes until
    workers were treated fairly. His motto was "Sí, se puede," which means "Yes, it can be done."`, [
    q("detail", "Why did César's family move to California?", ["They lost their farm.", "They wanted to see the ocean.", "César got a new job.", "They won a prize."], 0, "His family lost their farm and moved to find work."),
    q("main-idea", "What was César Chávez known for?", ["helping farm workers get fair treatment", "inventing a tractor", "being a famous singer", "flying planes"], 0, "He helped farm workers ask for fair pay and safety."),
    q("vocabulary", "In this text, a 'boycott' means:", ["refusing to buy something to make a point", "a kind of farm", "a boy's bed", "a big party"], 0, "People did not buy grapes until workers were treated fairly."),
    q("detail", "What does 'Sí, se puede' mean?", ["Yes, it can be done.", "Thank you very much.", "Good morning.", "Let's eat grapes."], 0, "The text gives the meaning."),
    q("character", "Which word best describes César?", ["peaceful", "violent", "lazy", "selfish"], 0, "He believed in peaceful protest, not violence."),
  ]),
  passage(3, "pizza-fractions", "Pizza Night Fractions", "🍕", "fiction", `
    Mom cut the pizza into eight equal slices. "There are four of us," she said, "so how many slices does each person
    get?" Ava counted on her fingers. "Two slices each!" Just then, the doorbell rang. Ava's best friend, June, had come
    over. "Now there are five of us," Dad said. Ava frowned. Eight slices would not share evenly. Then she had an idea.
    "I'll give June one of my slices, and Dad can give her one of his." Everyone agreed it was a fair plan.`, [
    q("detail", "How many slices was the pizza cut into?", ["four", "six", "eight", "ten"], 2, "Mom cut it into eight equal slices."),
    q("inference", "Why did Ava frown?", ["Eight slices would not share evenly among five people.", "She did not like June.", "The pizza was cold.", "She was not hungry."], 0, "Eight cannot be split evenly by five."),
    q("detail", "Who gave slices to June?", ["Mom and Dad", "Ava and Dad", "Ava and Mom", "nobody"], 1, "Ava and Dad each gave her a slice."),
    q("inference", "After sharing, how many slices did June get?", ["one", "two", "three", "four"], 1, "Ava gave one and Dad gave one, so two."),
    q("word-parts", "In the word 'evenly', what does the suffix '-ly' do?", ["tells how something is done", "means 'not'", "means 'again'", "makes it plural"], 0, "Evenly tells how the slices are shared."),
  ]),
  passage(3, "earthworms", "Earthworms: Garden Helpers", "🪱", "nonfiction", `
    Earthworms may look slimy, but gardeners love them. As earthworms tunnel through the soil, they make spaces that let
    air and water reach plant roots. Worms eat dead leaves and bits of plants. What comes out the other end, called
    castings, is full of nutrients that help plants grow. Earthworms have no eyes, but they can sense light through their
    skin. They breathe through their skin too, which is why they come up to the surface after heavy rain, when the soil is
    full of water.`, [
    q("main-idea", "Why do gardeners love earthworms?", ["Worms help plants grow.", "Worms are pretty.", "Worms eat bugs.", "Worms sing."], 0, "Worms let in air and water and make castings full of nutrients."),
    q("vocabulary", "What are 'castings'?", ["waste from worms that helps plants grow", "fishing nets", "worm eggs", "plant roots"], 0, "Castings come out after worms eat and are full of nutrients."),
    q("detail", "How do earthworms breathe?", ["through their skin", "through their noses", "through their mouths", "through gills"], 0, "They breathe through their skin."),
    q("cause-effect", "Why do worms come up after heavy rain?", ["The soil is full of water, so they need air.", "They want to play.", "They are thirsty.", "They like puddles."], 0, "They breathe through their skin, and wet soil has little air."),
    q("visual", "Which picture would best match this text?", ["a worm tunneling under plant roots", "a whale in the ocean", "a rocket ship", "a castle"], 0, "It shows how worms help soil and roots."),
  ]),
  passage(3, "class-election", "The Class Election", "🗳️", "fiction", `
    Room 8 was electing a class president. Tyler made colorful posters that said, "Vote for Tyler: Longer Recess!" Priya
    made a simple poster that said, "Vote for Priya: I Will Listen to Your Ideas." Tyler gave a speech full of jokes.
    Priya gave a speech about starting a class suggestion box. When the votes were counted, Priya won by three votes.
    Tyler shook her hand. "Can I help with the suggestion box?" he asked. Priya smiled. "I was hoping you would!"`, [
    q("detail", "What did Priya promise to start?", ["longer recess", "a class suggestion box", "a pizza party", "a soccer team"], 1, "Priya's speech was about a suggestion box."),
    q("inference", "Why might students have voted for Priya?", ["She promised to listen to their ideas.", "Her posters were the brightest.", "She told the most jokes.", "She bribed them."], 0, "Her poster and speech were about listening."),
    q("character", "How did Tyler act after losing?", ["He was a good sport.", "He cried.", "He yelled.", "He quit school."], 0, "He shook her hand and offered to help."),
    q("detail", "How many votes did Priya win by?", ["one", "two", "three", "ten"], 2, "Priya won by three votes."),
    q("synonym", "Which word means the same as 'simple'?", ["plain", "fancy", "huge", "noisy"], 0, "A simple poster is a plain poster."),
  ]),
  passage(3, "how-to-plant-seed", "How to Plant a Sunflower", "🌻", "how-to", `
    Sunflowers can grow taller than a grown-up! Here's how to plant one. First, pick a sunny spot, because sunflowers need
    at least six hours of sunlight a day. Second, dig a hole about one inch deep. Third, drop in a seed and cover it with
    soil. Fourth, water it gently. Keep the soil moist but not soggy. In about ten days, a sprout will appear. Sunflower
    heads turn to follow the Sun across the sky while they are young. By late summer, your flower may be eight feet tall!`, [
    q("genre", "What kind of text is this?", ["how-to", "fable", "letter", "poem"], 0, "It gives steps: first, second, third, fourth."),
    q("detail", "How deep should the hole be?", ["one inch", "one foot", "six inches", "ten inches"], 0, "Dig a hole about one inch deep."),
    q("cause-effect", "Why should you pick a sunny spot?", ["Sunflowers need lots of sunlight.", "Bugs live in the shade.", "It is easier to dig.", "Rain falls there."], 0, "They need at least six hours of sunlight a day."),
    q("sequence", "What should you do right after dropping in the seed?", ["Cover it with soil.", "Pick a sunny spot.", "Wait ten days.", "Cut the flower."], 0, "Third, drop in a seed and cover it with soil."),
    q("antonym", "What is the opposite of 'moist'?", ["wet", "damp", "dry", "soggy"], 2, "Dry is the opposite of moist."),
  ]),
  passage(3, "dragon-library", "The Dragon Who Loved Books", "🐉", "fiction", `
    In the mountains lived a dragon named Ember. Everyone in the village below was afraid of her. One day, a girl named
    Rosa climbed up the mountain to find her lost goat. She found Ember curled up in a cave, reading a book by the light
    of her own flame. "You read?" Rosa asked in surprise. "Every day," Ember sighed. "But I've read all my books a hundred
    times." The next week, Rosa brought Ember a cart full of library books. Soon the whole village was visiting the
    dragon's cave for story time.`, [
    q("setting", "Where did Ember live?", ["in a cave in the mountains", "in a castle", "under the sea", "in the village library"], 0, "Rosa found Ember in a cave in the mountains."),
    q("cause-effect", "Why did Rosa climb the mountain?", ["to find her lost goat", "to fight the dragon", "to return a book", "to have a picnic"], 0, "She climbed up to find her lost goat."),
    q("inference", "Why was Ember sad?", ["She had read all her books many times.", "She was hungry.", "She lost her flame.", "Rosa was mean."], 0, "She sighed that she had read them a hundred times."),
    q("character", "How did the villagers change by the end?", ["They went from afraid to friendly.", "They moved away.", "They became dragons.", "They stopped reading."], 0, "At first they were afraid; later they visited for story time."),
    q("genre", "What kind of story is this?", ["fantasy fiction", "a biography", "a science text", "a how-to"], 0, "Dragons that read are make-believe."),
  ]),
  passage(3, "recess-rain-games", "Indoor Recess", "🎲", "fiction", `
    Thunder rumbled, so recess was inside. Some kids groaned. But Ms. Okafor had a surprise. She pulled out a big box
    of board games, puzzles, and building blocks. Liam and Sara built the tallest block tower in the room. It wobbled,
    swayed, and crashed! Everyone laughed. Then they built it again, wider at the bottom this time, and it stood strong.
    "Indoor recess is the best," Sara said. Liam nodded. "Maybe we should hope for rain tomorrow."`, [
    q("cause-effect", "Why was recess inside?", ["There was a thunderstorm.", "It was too hot.", "The playground was closed.", "It was a holiday."], 0, "Thunder rumbled, so recess was inside."),
    q("detail", "Why did the second tower stand strong?", ["It was wider at the bottom.", "They used glue.", "It was shorter.", "The teacher held it."], 0, "They built it wider at the bottom."),
    q("character", "How did Sara's feelings change?", ["She went from unsure to happy.", "She went from happy to angry.", "She was always bored.", "She was scared of thunder."], 0, "Kids groaned at first, but she ended up loving indoor recess."),
    q("phonics", "Which word starts with the same blend as 'crashed'?", ["cash", "crab", "chat", "car"], 1, "Crashed and crab both begin with 'cr'."),
    q("inference", "Why did Liam say they should hope for rain tomorrow?", ["He had so much fun at indoor recess.", "His garden needs water.", "He likes thunder.", "He wants to stay home."], 0, "He enjoyed indoor recess so much."),
  ]),
  passage(3, "statue-liberty", "The Statue of Liberty", "🗽", "nonfiction", `
    The Statue of Liberty stands on an island in New York Harbor. It was a gift from the people of France to the people
    of the United States, and it was finished in 1886. The statue is made of copper. When it was new, it was shiny and
    brown like a penny. Over many years, air and water turned the copper green. Lady Liberty holds a torch in her right
    hand. For millions of immigrants arriving by ship, the statue was the first thing they saw in their new country.`, [
    q("detail", "Who gave the Statue of Liberty to the United States?", ["the people of France", "the people of England", "the king of Spain", "Chinese emperors"], 0, "It was a gift from the people of France."),
    q("cause-effect", "Why is the statue green now?", ["Air and water changed the copper.", "It was painted green.", "Plants grew on it.", "Lights shine on it."], 0, "Over many years, air and water turned the copper green."),
    q("detail", "What does the statue hold in her right hand?", ["a book", "a torch", "a flag", "a sword"], 1, "She holds a torch in her right hand."),
    q("vocabulary", "In this text, 'immigrants' are:", ["people who move to a new country", "statue builders", "ship captains", "tourists on vacation"], 0, "They arrived by ship to their new country."),
    q("setting", "Where is the Statue of Liberty?", ["on an island in New York Harbor", "in Paris", "in a museum", "on a mountain"], 0, "The first sentence tells where it stands."),
  ]),
  passage(3, "sleepover-nerves", "The First Sleepover", "🌙", "fiction", `
    Jada was excited to sleep over at her cousin Mia's house. They ate popcorn, watched a movie, and built a blanket fort.
    But when the lights went out, Jada's stomach felt funny. The house made strange creaking noises, and she missed her
    own bed. Mia noticed and whispered, "I get nervous at sleepovers too." She handed Jada a flashlight. "Want to make
    shadow puppets?" They made a bunny, a bird, and a silly dog until they both fell asleep giggling.`, [
    q("character", "How did Jada feel when the lights went out?", ["nervous", "angry", "bored", "hungry"], 0, "Her stomach felt funny and she missed her bed."),
    q("detail", "Which of these did the girls NOT do?", ["eat popcorn", "build a blanket fort", "bake cookies", "watch a movie"], 2, "Baking cookies is not in the story."),
    q("character", "How did Mia help Jada?", ["She shared her feelings and made shadow puppets.", "She called Jada's parents.", "She turned on the TV.", "She told her to go to sleep."], 0, "Mia said she gets nervous too and made shadow puppets."),
    q("vocabulary", "What does 'creaking' describe?", ["a squeaky sound", "a bright light", "a sweet smell", "a soft blanket"], 0, "Creaking is a squeaky noise old houses make."),
    q("title", "Which is the best title for this story?", ["Shadow Puppets Save the Night", "The Popcorn Machine", "Jada Moves Away", "A Day at School"], 0, "The shadow puppets helped Jada feel better."),
  ]),
  passage(3, "telephone-bell", "Alexander Graham Bell's Big Idea", "☎️", "biography", `
    Alexander Graham Bell was born in Scotland in 1847. His mother was deaf, and he became interested in how sound
    travels. He later moved to the United States and taught deaf students. Bell wondered if a voice could travel through
    a wire. He worked with a helper named Thomas Watson. On March 10, 1876, Bell spoke into his invention: "Mr. Watson,
    come here. I want to see you." Watson heard him from another room! It was the first telephone call.`, [
    q("detail", "Where was Bell born?", ["Scotland", "France", "the United States", "China"], 0, "He was born in Scotland in 1847."),
    q("cause-effect", "Why did Bell become interested in sound?", ["His mother was deaf.", "He loved music.", "He was a singer.", "He worked on a farm."], 0, "His mother was deaf, so he became interested in sound."),
    q("detail", "Who was Thomas Watson?", ["Bell's helper", "Bell's teacher", "Bell's brother", "a king"], 0, "He worked with a helper named Thomas Watson."),
    q("main-idea", "What did Bell invent?", ["the telephone", "the light bulb", "the airplane", "the television"], 0, "It was the first telephone call."),
    q("sequence", "Which happened LAST?", ["Bell made the first telephone call.", "Bell was born in Scotland.", "Bell moved to the United States.", "Bell taught deaf students."], 0, "The phone call in 1876 came last."),
  ]),
  passage(3, "owl-pellets", "What Owls Leave Behind", "🦉", "nonfiction", `
    Owls swallow small animals like mice whole or in big pieces. Their stomachs cannot digest the fur and bones. So, a few
    hours after eating, the owl coughs up a small, gray lump called a pellet. Scientists and students study owl pellets to
    learn what owls eat. When they carefully pull a pellet apart, they often find tiny skulls and bones. By putting the
    bones together like a puzzle, they can tell which animals the owl ate.`, [
    q("vocabulary", "What is an owl pellet?", ["a lump of fur and bones an owl coughs up", "an owl's egg", "an owl's nest", "a kind of feather"], 0, "The owl coughs up a lump called a pellet."),
    q("cause-effect", "Why do owls cough up pellets?", ["They cannot digest fur and bones.", "They are sick.", "They want to feed babies.", "They don't like mice."], 0, "Their stomachs cannot digest fur and bones."),
    q("author-purpose", "Why do scientists study owl pellets?", ["to learn what owls eat", "to make jewelry", "to grow plants", "to train owls"], 0, "They study pellets to learn what owls eat."),
    q("vocabulary", "What does 'like a puzzle' tell you?", ["The bones are fit together piece by piece.", "The bones are made of cardboard.", "Owls play games.", "The bones are easy to find."], 0, "They fit bones together the way you fit puzzle pieces."),
    q("inference", "If a pellet has tiny mouse skulls, what did the owl eat?", ["mice", "fish", "berries", "worms"], 0, "The bones show what the owl ate."),
  ]),
  passage(3, "lost-puppy-poster", "Finding Pepper", "🐶", "fiction", `
    Pepper, the Garcias' puppy, slipped out of the gate and disappeared. Luis made "Lost Puppy" posters with Pepper's photo
    and his phone number. He and his dad hung them all over the neighborhood. A whole day passed. Luis could barely eat
    dinner. Then the phone rang. "I think I have your puppy," said Mrs. Ortiz from three streets away. "He's been napping
    on my porch." Luis ran the whole way there. Pepper wagged his tail so hard his whole body wiggled.`, [
    q("cause-effect", "How did Pepper get lost?", ["He slipped out of the gate.", "He jumped in a car.", "He was stolen.", "He dug a tunnel."], 0, "Pepper slipped out of the gate."),
    q("detail", "What did Luis put on the posters?", ["Pepper's photo and his phone number", "a map of the town", "a reward of $100", "a drawing of a cat"], 0, "The posters had Pepper's photo and Luis's phone number."),
    q("inference", "Why could Luis barely eat dinner?", ["He was worried about Pepper.", "He did not like the food.", "He had a stomachache from candy.", "He was late."], 0, "He was worried because Pepper was still missing."),
    q("character", "How did Pepper feel when he saw Luis?", ["very happy", "angry", "scared", "sleepy"], 0, "He wagged his tail so hard his body wiggled."),
    q("text-structure", "Which part shows how the problem was solved?", ["Mrs. Ortiz called about the puppy.", "Pepper slipped out of the gate.", "Luis made posters.", "A whole day passed."], 0, "The phone call solved the problem of the lost puppy."),
  ]),
  passage(3, "weather-tools", "Tools for Watching the Weather", "🌡️", "nonfiction", `
    Meteorologists are scientists who study the weather. They use special tools. A thermometer measures how hot or cold
    the air is. A rain gauge is a tube that collects rain so you can measure how much fell. A wind vane points in the
    direction the wind is coming from. An anemometer has spinning cups that measure how fast the wind blows. Using these
    tools and computers, meteorologists can predict whether tomorrow will be sunny, rainy, or snowy.`, [
    q("vocabulary", "What is a meteorologist?", ["a scientist who studies weather", "a person who studies rocks", "a doctor", "a pilot"], 0, "The first sentence explains it."),
    q("detail", "Which tool measures how much rain fell?", ["a thermometer", "a rain gauge", "a wind vane", "an anemometer"], 1, "A rain gauge collects rain to measure it."),
    q("detail", "What does an anemometer measure?", ["how fast the wind blows", "how hot it is", "how much rain fell", "the time"], 0, "Its spinning cups measure wind speed."),
    q("inference", "Which tool would tell you if you need a jacket because it's cold?", ["a thermometer", "a rain gauge", "a wind vane", "a ruler"], 0, "A thermometer measures how cold the air is."),
    q("text-structure", "How is most of this text organized?", ["It describes one tool after another.", "It tells a story in time order.", "It compares two animals.", "It gives a problem and a solution."], 0, "Each sentence describes a different weather tool."),
  ]),
  passage(3, "grandmas-garden-poem", "Grandma's Garden (a poem)", "🌷", "poem", `
    In Grandma's garden, rows and rows / Of carrots, beans, and peas. / The pumpkins sleep in orange heaps, / The bees hum
    in the breeze. / We pull the weeds, we fill the pail, / We dig with muddy hands. / And when the sun goes down at last, /
    We eat the best food in the land!`, [
    q("genre", "How can you tell this is a poem?", ["It has short lines and rhyming words.", "It has a list of steps.", "It starts with 'Dear.'", "It has a moral at the end."], 0, "Poems often use short lines and rhymes."),
    q("setting", "Where does this poem take place?", ["in Grandma's garden", "at the beach", "at school", "in a city"], 0, "The title and first line say Grandma's garden."),
    q("vocabulary", "What does 'The pumpkins sleep in orange heaps' mean?", ["The pumpkins are lying in piles.", "The pumpkins are tired.", "The pumpkins are in beds.", "The pumpkins are dreaming."], 0, "Pumpkins can't sleep; it means they lie in piles."),
    q("phonics", "Which word from the poem rhymes with 'peas'?", ["breeze", "pail", "hands", "rows"], 0, "Peas and breeze rhyme."),
    q("inference", "Why is the food 'the best food in the land'?", ["They grew it themselves.", "It came from a store.", "It was very expensive.", "Grandma bought it."], 0, "They worked hard to grow it, so it tastes extra special."),
  ]),
];
