import { passage, q, type Passage } from "./types";

// Grade 2 starter set. Shorter texts, simpler questions.
export const GRADE2: Passage[] = [
  passage(2, "lost-mitten", "The Lost Mitten", "🧤", "fiction", `
    Mia had two red mittens. One cold morning, she could only find one. She looked under her bed.
    She looked in her coat pocket. Then her dog, Pepper, ran into the room. Pepper had something red in his mouth.
    It was the lost mitten! Mia laughed and gave Pepper a hug. "Next time, I will put my mittens in my backpack," she said.`, [
    q("detail", "What color were Mia's mittens?", ["blue", "green", "red", "yellow"], 2, "The story says Mia had two red mittens."),
    q("character", "Who found the lost mitten?", ["Mia", "Pepper", "Mom", "a cat"], 1, "Pepper the dog had the red mitten in his mouth."),
    q("sequence", "Where did Mia look first?", ["under her bed", "in her coat pocket", "in her backpack", "outside"], 0, "First she looked under her bed, then in her coat pocket."),
    q("phonics", "Which word rhymes with 'hug'?", ["hat", "bug", "hog", "huge"], 1, "Hug and bug both end with the -ug sound."),
    q("inference", "How did Mia feel at the end?", ["happy", "angry", "scared", "sleepy"], 0, "She laughed and hugged Pepper, so she was happy."),
  ]),
  passage(2, "bean-plant", "How a Bean Grows", "🌱", "nonfiction", `
    A bean plant starts as a small seed. When you put the seed in soil and give it water, it begins to grow.
    First, a tiny root grows down into the dirt. Next, a green shoot pushes up toward the sun. Soon, leaves open up.
    The plant needs sunlight, water, and air to stay healthy. After many weeks, new beans grow on the plant!`, [
    q("main-idea", "What is this text mostly about?", ["how to cook beans", "how a bean plant grows", "why the sun is hot", "a farmer's dog"], 1, "Every sentence tells a step in how a bean grows."),
    q("sequence", "What grows first?", ["leaves", "beans", "a root", "a flower"], 2, "First, a tiny root grows down into the dirt."),
    q("detail", "What does the plant need to stay healthy?", ["candy and milk", "sunlight, water, and air", "music", "snow"], 1, "The text lists sunlight, water, and air."),
    q("vocabulary", "In this text, 'soil' means:", ["dirt", "a cloud", "a leaf", "a bucket"], 0, "Soil is the dirt where plants grow."),
    q("genre", "This text is:", ["a made-up story", "a poem", "a true, teaching text", "a letter"], 2, "It gives real facts about plants, so it is nonfiction."),
  ]),
  passage(2, "big-race", "The Big Race", "🏃", "fiction", `
    Sam and Leo were best friends. On Field Day, they both ran in the big race. Leo was very fast, but he tripped
    near the end and fell down. Sam stopped running. He helped Leo get up. They crossed the finish line together,
    holding hands. They did not win, but everyone cheered the loudest for them.`, [
    q("setting", "When does the story happen?", ["on a birthday", "on Field Day", "at night", "in winter break"], 1, "The story says, 'On Field Day, they both ran in the big race.'"),
    q("cause-effect", "Why did Sam stop running?", ["He was tired.", "Leo fell down.", "It started to rain.", "He lost his shoe."], 1, "Sam stopped to help Leo after Leo tripped and fell."),
    q("character", "Which word best describes Sam?", ["kind", "lazy", "mean", "silly"], 0, "Sam gave up winning to help his friend. That is kind."),
    q("antonym", "What is the opposite of 'fast'?", ["quick", "slow", "loud", "tall"], 1, "Slow is the opposite of fast."),
    q("main-idea", "What lesson does the story teach?", ["Always win.", "Helping a friend matters more than winning.", "Running is boring.", "Do not play games."], 1, "Everyone cheered because Sam helped his friend."),
  ]),
  passage(2, "octopus", "Amazing Octopus", "🐙", "nonfiction", `
    An octopus lives in the ocean. It has eight long arms. Each arm has suckers that help it grab food and hold onto rocks.
    An octopus can change the color of its skin to hide from danger. If a hungry fish comes close, the octopus can
    squirt dark ink and swim away fast.`, [
    q("detail", "How many arms does an octopus have?", ["six", "ten", "four", "eight"], 3, "The text says an octopus has eight long arms."),
    q("detail", "What do the suckers help the octopus do?", ["sing", "grab food and hold onto rocks", "fly", "sleep"], 1, "Suckers help it grab food and hold onto rocks."),
    q("cause-effect", "Why does an octopus change color?", ["to hide from danger", "to look pretty", "to get warm", "to find friends"], 0, "It changes color to hide from danger."),
    q("phonics", "Which word begins with the same sound as 'squirt'?", ["skip", "squeak", "sun", "quit"], 1, "Squirt and squeak both start with 'squ'."),
    q("setting", "Where does an octopus live?", ["in a tree", "in the desert", "in the ocean", "in a cave on land"], 2, "The first sentence says it lives in the ocean."),
  ]),
  passage(2, "rainy-day", "Rainy Day Fort", "🏰", "fiction", `
    It was raining, so Ava and her little brother Ben could not play outside. Ben was grumpy. Ava had an idea.
    She took blankets and pillows and made a fort in the living room. They brought in a flashlight and some books.
    Inside the fort, Ava read stories to Ben. Soon Ben was smiling. "Rainy days are the best!" he said.`, [
    q("cause-effect", "Why couldn't Ava and Ben play outside?", ["It was too hot.", "It was raining.", "It was nighttime.", "They were sick."], 1, "The first sentence says it was raining."),
    q("detail", "What did Ava use to make the fort?", ["sticks and rocks", "boxes", "blankets and pillows", "chairs only"], 2, "She took blankets and pillows."),
    q("vocabulary", "'Grumpy' means:", ["in a bad mood", "very hungry", "sleepy", "excited"], 0, "Grumpy means in a bad mood."),
    q("character", "How did Ben change in the story?", ["happy to sad", "grumpy to happy", "scared to brave", "awake to asleep"], 1, "He started grumpy and ended smiling."),
    q("grammar", "Which word in this sentence is a noun: 'Ava read stories to Ben'?", ["read", "to", "stories", "the"], 2, "Stories is a thing, so it is a noun."),
  ]),
  passage(2, "community-helpers", "Helpers in Town", "🚒", "nonfiction", `
    Many people help our town. Firefighters put out fires and keep us safe. Doctors and nurses help us when we are sick.
    Mail carriers bring letters and boxes to our homes. Teachers help us learn to read and do math.
    These helpers work hard every day. We can say thank you to the helpers in our town!`, [
    q("main-idea", "What is the main idea?", ["Many people help our town.", "Fires are hot.", "Math is fun.", "Letters are small."], 0, "The first sentence tells the main idea."),
    q("detail", "Who brings letters to our homes?", ["firefighters", "mail carriers", "doctors", "teachers"], 1, "Mail carriers bring letters and boxes."),
    q("detail", "Who helps us when we are sick?", ["doctors and nurses", "mail carriers", "bus drivers", "chefs"], 0, "Doctors and nurses help us when we are sick."),
    q("author-purpose", "Why did the author write this?", ["to tell a funny joke", "to teach about town helpers", "to sell a toy", "to tell a scary story"], 1, "The author gives facts about helpers to teach us."),
    q("phonics", "How many syllables are in 'firefighters'?", ["one", "two", "three", "four"], 2, "Fire-fight-ers has three parts."),
  ]),
  passage(2, "snowman", "Sunny the Snowman", "⛄", "fiction", `
    Lily built a snowman in her yard. She gave him a carrot nose and a yellow hat. She named him Sunny.
    The next day, the sun came out and it got warm. Sunny started to melt! Lily was sad. Then her dad said,
    "Let's take a picture so we can remember him." Lily smiled and hugged the picture all winter long.`, [
    q("detail", "What did Lily use for the snowman's nose?", ["a button", "a rock", "a carrot", "a stick"], 2, "She gave him a carrot nose."),
    q("cause-effect", "Why did Sunny start to melt?", ["It snowed more.", "The sun came out and it got warm.", "A dog knocked him over.", "It was nighttime."], 1, "Warm sun melts snow."),
    q("character", "Who had the idea to take a picture?", ["Lily", "Mom", "Dad", "Sunny"], 2, "Her dad said, 'Let's take a picture.'"),
    q("synonym", "Which word means the same as 'sad'?", ["glad", "unhappy", "funny", "fast"], 1, "Unhappy means the same as sad."),
    q("title", "Which is another good title?", ["Lily's Snowy Friend", "The Hot Desert", "A Trip to the Moon", "Dad Goes Fishing"], 0, "The story is about Lily and her snowman friend."),
  ]),
  passage(2, "bees", "Busy Bees", "🐝", "nonfiction", `
    Bees are small insects that live together in a hive. They fly from flower to flower to collect nectar,
    a sweet juice inside flowers. Bees use nectar to make honey. When bees visit flowers, they also carry pollen.
    This helps new plants and fruits grow. Without bees, we would have fewer apples, berries, and pumpkins!`, [
    q("vocabulary", "What is nectar?", ["a sweet juice inside flowers", "a kind of bug", "a bee's home", "a fruit"], 0, "The text says nectar is a sweet juice inside flowers."),
    q("detail", "Where do bees live?", ["in a nest", "in a hive", "in a burrow", "in the water"], 1, "They live together in a hive."),
    q("cause-effect", "What happens when bees carry pollen?", ["Plants and fruits grow.", "Bees get sick.", "It rains.", "Flowers close."], 0, "Carrying pollen helps new plants and fruits grow."),
    q("inference", "Why are bees important to people?", ["They help our food grow.", "They are loud.", "They sleep a lot.", "They can swim."], 0, "Without bees, we would have fewer fruits."),
    q("phonics", "Which word has the same vowel sound as 'bee'?", ["bed", "tree", "big", "bay"], 1, "Bee and tree both have the long e sound."),
  ]),
  passage(2, "new-kid", "The New Kid", "🎒", "fiction", `
    A new girl named Rosa came to Mr. Kim's class. She did not know anyone, and she sat alone at lunch.
    Jada saw Rosa eating by herself. Jada walked over and asked, "Do you want to sit with us?"
    Rosa nodded. At recess, they played tag together. By the end of the day, Rosa had three new friends.`, [
    q("setting", "Where does most of the story happen?", ["at a park", "at school", "at a beach", "at home"], 1, "It happens in Mr. Kim's class, lunch, and recess."),
    q("character", "Who sat alone at lunch?", ["Jada", "Mr. Kim", "Rosa", "the teacher"], 2, "Rosa sat alone because she was new."),
    q("inference", "How did Rosa probably feel at lunch at first?", ["lonely", "angry", "silly", "proud"], 0, "She sat alone and did not know anyone."),
    q("sequence", "What happened after lunch?", ["Rosa went home.", "They played tag at recess.", "Rosa moved away.", "They took a test."], 1, "At recess, they played tag together."),
    q("vocabulary", "What does 'nodded' tell us Rosa did?", ["shook her head no", "moved her head up and down to say yes", "cried", "ran away"], 1, "Nodding means moving your head to say yes."),
  ]),
  passage(2, "moon-shapes", "The Changing Moon", "🌙", "nonfiction", `
    Have you noticed the moon looks different on different nights? Sometimes it is a big round circle. This is a full moon.
    Sometimes it is a thin curve called a crescent. Some nights, we cannot see it at all. That is a new moon.
    The moon does not really change shape. We just see different parts of it lit up by the sun.`, [
    q("vocabulary", "A thin curved moon is called a:", ["full moon", "crescent", "new moon", "star"], 1, "The text says a thin curve is called a crescent."),
    q("detail", "What is it called when we cannot see the moon at all?", ["new moon", "full moon", "half moon", "blue moon"], 0, "Some nights we cannot see it. That is a new moon."),
    q("main-idea", "What is the text mostly about?", ["why the moon seems to change shape", "how to build a rocket", "stars at night", "the sun's color"], 0, "It explains why the moon looks different."),
    q("detail", "What lights up the moon?", ["the stars", "the sun", "street lights", "the ocean"], 1, "We see parts of it lit up by the sun."),
    q("text-structure", "The first sentence of the text is:", ["a question", "a command", "a joke", "a list"], 0, "It ends with a question mark."),
  ]),
];
