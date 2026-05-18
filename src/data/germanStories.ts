import type { Story } from "./stories";

const s = (storyId: string, stepNum: number) => `${storyId}-step${stepNum}`;
const o = (storyId: string, stepNum: number, optNum: number) => `${storyId}-s${stepNum}-o${optNum}`;

export const germanStories: Story[] = [
  // ─── BEGINNER ──────────────────────────────────────────────

  {
    id: "de-airport",
    title: "Ankunft am Flughafen",
    location: "Flughafen Berlin Brandenburg",
    level: "beginner",
    language: "german",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("de-airport", 1), characterName: "Beamter", characterAvatar: "👮",
        dialogue: "Guten Tag! Willkommen in Deutschland. Ihren Reisepass, bitte.",
        options: [
          { id: o("de-airport", 1, 1), text: "Hier ist mein Reisepass.", isCorrect: true, feedback: "Perfekt! 'Hier ist' means 'Here is'." },
          { id: o("de-airport", 1, 2), text: "Ich bin Reisepass.", isCorrect: false, feedback: "'Ich bin' means 'I am'. Say 'Hier ist mein Reisepass'." },
          { id: o("de-airport", 1, 3), text: "Reisepass nein.", isCorrect: false, feedback: "You need to present your passport. Try 'Hier ist mein Reisepass'." },
        ],
      },
      {
        id: s("de-airport", 2), characterName: "Beamter", characterAvatar: "👮",
        dialogue: "Danke. Was ist der Zweck Ihres Besuchs?",
        options: [
          { id: o("de-airport", 2, 1), text: "Ich bin im Urlaub.", isCorrect: true, feedback: "Sehr gut! 'Im Urlaub' means 'on vacation'." },
          { id: o("de-airport", 2, 2), text: "Ich bin essen.", isCorrect: false, feedback: "'Essen' means 'to eat'. For vacation say 'Ich bin im Urlaub'." },
          { id: o("de-airport", 2, 3), text: "Ja.", isCorrect: false, feedback: "The officer asked the purpose of your visit. Try 'Ich bin im Urlaub'." },
        ],
      },
      {
        id: s("de-airport", 3), characterName: "Beamter", characterAvatar: "👮",
        dialogue: "Wie lange bleiben Sie in Deutschland?",
        options: [
          { id: o("de-airport", 3, 1), text: "Eine Woche.", isCorrect: true, feedback: "Gut! 'Eine Woche' means 'one week'." },
          { id: o("de-airport", 3, 2), text: "Viel Deutschland.", isCorrect: false, feedback: "The question is about duration. 'Eine Woche' is a good answer." },
          { id: o("de-airport", 3, 3), text: "Ich weiß nicht.", isCorrect: false, feedback: "'Ich weiß nicht' means 'I don't know'. Try giving a duration like 'Eine Woche'." },
        ],
      },
      {
        id: s("de-airport", 4), characterName: "Beamter", characterAvatar: "👮",
        dialogue: "Sehr gut. Wo werden Sie übernachten?",
        options: [
          { id: o("de-airport", 4, 1), text: "Im Hotel, im Stadtzentrum.", isCorrect: true, feedback: "Ausgezeichnet! You specified a hotel in the city center." },
          { id: o("de-airport", 4, 2), text: "Ich werde essen.", isCorrect: false, feedback: "The officer asked where you'll stay, not eat. Try 'Im Hotel'." },
          { id: o("de-airport", 4, 3), text: "Berlin ist groß.", isCorrect: false, feedback: "True, but not an answer! Say 'Im Hotel, im Stadtzentrum'." },
        ],
      },
      {
        id: s("de-airport", 5), characterName: "Beamter", characterAvatar: "👮",
        dialogue: "Alles klar. Schönen Aufenthalt in Deutschland!",
        options: [
          { id: o("de-airport", 5, 1), text: "Vielen Dank!", isCorrect: true, feedback: "Bravo! 'Vielen Dank' means 'Thank you very much'." },
          { id: o("de-airport", 5, 2), text: "Auf Wiedersehen, danke.", isCorrect: true, feedback: "Also great! Polite farewell." },
          { id: o("de-airport", 5, 3), text: "Ja ja.", isCorrect: false, feedback: "A bit casual! 'Vielen Dank' is more appropriate here." },
        ],
      },
      {
        id: s("de-airport", 6), characterName: "Taxifahrer", characterAvatar: "🚕",
        dialogue: "Hallo! Wohin möchten Sie?",
        options: [
          { id: o("de-airport", 6, 1), text: "Ins Stadtzentrum, bitte.", isCorrect: true, feedback: "Perfekt! Polite and clear." },
          { id: o("de-airport", 6, 2), text: "Ich bin der Flughafen.", isCorrect: false, feedback: "You're AT the airport already. Say where you want to GO: 'Ins Stadtzentrum'." },
          { id: o("de-airport", 6, 3), text: "Fahren Sie.", isCorrect: false, feedback: "Too commanding! Be polite: 'Ins Stadtzentrum, bitte'." },
        ],
      },
    ],
  },
  {
    id: "de-friend",
    title: "Einen neuen Freund kennenlernen",
    location: "Ein Café in München",
    level: "beginner",
    language: "german",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("de-friend", 1), characterName: "Lukas", characterAvatar: "👨",
        dialogue: "Hallo! Bist du neu hier?",
        options: [
          { id: o("de-friend", 1, 1), text: "Ja, ich bin zu Besuch hier.", isCorrect: true, feedback: "Nice! 'Zu Besuch' means visiting." },
          { id: o("de-friend", 1, 2), text: "Ich bin Haus.", isCorrect: false, feedback: "'Haus' means house. Try 'Ja, ich bin zu Besuch hier'." },
          { id: o("de-friend", 1, 3), text: "Nein, ich bin alt.", isCorrect: false, feedback: "'Alt' means old, not new. Try 'Ja, ich bin zu Besuch hier'." },
        ],
      },
      {
        id: s("de-friend", 2), characterName: "Lukas", characterAvatar: "👨",
        dialogue: "Super! Wie heißt du?",
        options: [
          { id: o("de-friend", 2, 1), text: "Ich heiße Alex. Und du?", isCorrect: true, feedback: "Sehr gut! 'Ich heiße' means 'My name is'." },
          { id: o("de-friend", 2, 2), text: "Mir geht es gut.", isCorrect: false, feedback: "He asked your name! Use 'Ich heiße...'." },
          { id: o("de-friend", 2, 3), text: "Du auch.", isCorrect: false, feedback: "'Du auch' means 'you too'. Answer with your name: 'Ich heiße...'." },
        ],
      },
      {
        id: s("de-friend", 3), characterName: "Lukas", characterAvatar: "👨",
        dialogue: "Freut mich, Alex! Woher kommst du?",
        options: [
          { id: o("de-friend", 3, 1), text: "Ich komme aus den USA.", isCorrect: true, feedback: "Perfekt! 'Ich komme aus' means 'I come from'." },
          { id: o("de-friend", 3, 2), text: "Ich bin von gut.", isCorrect: false, feedback: "Say a country! 'Ich komme aus den USA'." },
          { id: o("de-friend", 3, 3), text: "Von hier.", isCorrect: false, feedback: "'Von hier' means 'from here', but you said you're visiting! Try 'Ich komme aus den USA'." },
        ],
      },
      {
        id: s("de-friend", 4), characterName: "Lukas", characterAvatar: "👨",
        dialogue: "Cool! Du sprichst gut Deutsch!",
        options: [
          { id: o("de-friend", 4, 1), text: "Danke! Ich lerne seit sechs Monaten.", isCorrect: true, feedback: "Toll! 'Seit sechs Monaten' means 'for six months'." },
          { id: o("de-friend", 4, 2), text: "Nein, ich spreche Englisch.", isCorrect: false, feedback: "He complimented you! Accept it: 'Danke! Ich lerne seit sechs Monaten'." },
          { id: o("de-friend", 4, 3), text: "Deutsch ist schwer.", isCorrect: false, feedback: "Try being positive! 'Danke! Ich lerne seit sechs Monaten'." },
        ],
      },
      {
        id: s("de-friend", 5), characterName: "Lukas", characterAvatar: "👨",
        dialogue: "Möchtest du einen Kaffee mit mir trinken?",
        options: [
          { id: o("de-friend", 5, 1), text: "Ja, sehr gerne!", isCorrect: true, feedback: "'Sehr gerne' means 'with pleasure'. Great response!" },
          { id: o("de-friend", 5, 2), text: "Ich esse Kaffee.", isCorrect: false, feedback: "You don't eat coffee! Say 'Ja, sehr gerne!'." },
          { id: o("de-friend", 5, 3), text: "Kaffee nein danke tschüss.", isCorrect: false, feedback: "That's a bit abrupt! Try 'Ja, sehr gerne!'." },
        ],
      },
      {
        id: s("de-friend", 6), characterName: "Lukas", characterAvatar: "👨",
        dialogue: "Was möchtest du trinken?",
        options: [
          { id: o("de-friend", 6, 1), text: "Einen Milchkaffee, bitte.", isCorrect: true, feedback: "Perfekt! 'Bitte' is informal for 'please'." },
          { id: o("de-friend", 6, 2), text: "Heißes Wasser mit Milch.", isCorrect: true, feedback: "That works too! Hot water with milk." },
          { id: o("de-friend", 6, 3), text: "Ich trinke.", isCorrect: false, feedback: "Incomplete! Try 'Einen Milchkaffee, bitte'." },
        ],
      },
    ],
  },
  {
    id: "de-coffee",
    title: "Kaffee kaufen",
    location: "Eine Bäckerei in Hamburg",
    level: "beginner",
    language: "german",
    duration: "4 min",
    xpReward: 40,
    steps: [
      {
        id: s("de-coffee", 1), characterName: "Verkäuferin", characterAvatar: "☕",
        dialogue: "Guten Morgen! Was darf es sein?",
        options: [
          { id: o("de-coffee", 1, 1), text: "Einen Kaffee, bitte.", isCorrect: true, feedback: "Sehr gut! Simple and polite." },
          { id: o("de-coffee", 1, 2), text: "Kaffee mich.", isCorrect: false, feedback: "Try the polite form: 'Einen Kaffee, bitte'." },
          { id: o("de-coffee", 1, 3), text: "Ich will einen Kaffee essen.", isCorrect: false, feedback: "You drink coffee, not eat it! Say 'Einen Kaffee, bitte'." },
        ],
      },
      {
        id: s("de-coffee", 2), characterName: "Verkäuferin", characterAvatar: "☕",
        dialogue: "Einen Espresso oder einen Filterkaffee?",
        options: [
          { id: o("de-coffee", 2, 1), text: "Einen Espresso, bitte.", isCorrect: true, feedback: "Gute Wahl! Espresso is a classic." },
          { id: o("de-coffee", 2, 2), text: "Einen Filterkaffee.", isCorrect: true, feedback: "Also good! Filter coffee is very popular in Germany." },
          { id: o("de-coffee", 2, 3), text: "Beide.", isCorrect: false, feedback: "'Beide' means both! Pick one: Espresso or Filterkaffee." },
        ],
      },
      {
        id: s("de-coffee", 3), characterName: "Verkäuferin", characterAvatar: "☕",
        dialogue: "Dazu ein Brötchen?",
        options: [
          { id: o("de-coffee", 3, 1), text: "Ja, ein Butterbrötchen, bitte.", isCorrect: true, feedback: "Lecker! A butter roll is a German classic." },
          { id: o("de-coffee", 3, 2), text: "Nein danke, nur den Kaffee.", isCorrect: true, feedback: "That's fine too! 'Nur' means 'just'." },
          { id: o("de-coffee", 3, 3), text: "Brötchen ist Brot.", isCorrect: false, feedback: "True but not an answer! Say 'Ja' or 'Nein danke'." },
        ],
      },
      {
        id: s("de-coffee", 4), characterName: "Verkäuferin", characterAvatar: "☕",
        dialogue: "Das macht drei Euro fünfzig.",
        options: [
          { id: o("de-coffee", 4, 1), text: "Bitte. Kann ich mit Karte zahlen?", isCorrect: true, feedback: "Nice! 'Mit Karte zahlen' means 'pay by card'." },
          { id: o("de-coffee", 4, 2), text: "Bitte, in bar.", isCorrect: true, feedback: "'In bar' means cash. Both ways work!" },
          { id: o("de-coffee", 4, 3), text: "Drei ist viel.", isCorrect: false, feedback: "That's haggling! Just pay: 'Bitte' with your method." },
        ],
      },
      {
        id: s("de-coffee", 5), characterName: "Verkäuferin", characterAvatar: "☕",
        dialogue: "Danke! Einen schönen Tag noch!",
        options: [
          { id: o("de-coffee", 5, 1), text: "Danke, Ihnen auch!", isCorrect: true, feedback: "Perfekt! Very polite farewell." },
          { id: o("de-coffee", 5, 2), text: "Tschüss!", isCorrect: true, feedback: "Also correct! A casual goodbye." },
          { id: o("de-coffee", 5, 3), text: "Ja.", isCorrect: false, feedback: "A bit flat! Try 'Danke, Ihnen auch!'." },
        ],
      },
    ],
  },
  {
    id: "de-hotel",
    title: "Einchecken im Hotel",
    location: "Hotel am Dom, Köln",
    level: "beginner",
    language: "german",
    duration: "5 min",
    xpReward: 50,
    steps: [
      {
        id: s("de-hotel", 1), characterName: "Rezeptionist", characterAvatar: "🏨",
        dialogue: "Guten Abend! Haben Sie eine Reservierung?",
        options: [
          { id: o("de-hotel", 1, 1), text: "Ja, auf den Namen Müller.", isCorrect: true, feedback: "'Auf den Namen' means 'under the name of'." },
          { id: o("de-hotel", 1, 2), text: "Ich bin Hotel.", isCorrect: false, feedback: "You're not a hotel! Say 'Ja, auf den Namen...' + your name." },
          { id: o("de-hotel", 1, 3), text: "Reservierung ja nein.", isCorrect: false, feedback: "Be clear! 'Ja, auf den Namen Müller'." },
        ],
      },
      {
        id: s("de-hotel", 2), characterName: "Rezeptionist", characterAvatar: "🏨",
        dialogue: "Für wie viele Nächte?",
        options: [
          { id: o("de-hotel", 2, 1), text: "Drei Nächte, bitte.", isCorrect: true, feedback: "'Nächte' means nights. Great!" },
          { id: o("de-hotel", 2, 2), text: "Viele Nächte.", isCorrect: false, feedback: "Be specific! 'Drei Nächte' (three nights)." },
          { id: o("de-hotel", 2, 3), text: "Nacht.", isCorrect: false, feedback: "How many? Try 'Drei Nächte, bitte'." },
        ],
      },
      {
        id: s("de-hotel", 3), characterName: "Rezeptionist", characterAvatar: "🏨",
        dialogue: "Hier ist Ihr Schlüssel. Zimmer 204, im zweiten Stock.",
        options: [
          { id: o("de-hotel", 3, 1), text: "Danke. Gibt es einen Aufzug?", isCorrect: true, feedback: "'Aufzug' means elevator. Smart question!" },
          { id: o("de-hotel", 3, 2), text: "Vielen Dank.", isCorrect: true, feedback: "Simple and polite!" },
          { id: o("de-hotel", 3, 3), text: "Der Schlüssel ist klein.", isCorrect: false, feedback: "That's not relevant! Thank them: 'Vielen Dank'." },
        ],
      },
      {
        id: s("de-hotel", 4), characterName: "Rezeptionist", characterAvatar: "🏨",
        dialogue: "Das Frühstück wird von sieben bis zehn Uhr serviert.",
        options: [
          { id: o("de-hotel", 4, 1), text: "Ist das im Preis inbegriffen?", isCorrect: true, feedback: "'Im Preis inbegriffen' means 'included in the price'. Smart!" },
          { id: o("de-hotel", 4, 2), text: "In Ordnung, danke.", isCorrect: true, feedback: "'In Ordnung' means OK. Simple and effective!" },
          { id: o("de-hotel", 4, 3), text: "Ich esse sieben Stunden.", isCorrect: false, feedback: "You don't eat seven hours! Say 'In Ordnung, danke'." },
        ],
      },
      {
        id: s("de-hotel", 5), characterName: "Rezeptionist", characterAvatar: "🏨",
        dialogue: "Schönen Aufenthalt!",
        options: [
          { id: o("de-hotel", 5, 1), text: "Danke, guten Abend!", isCorrect: true, feedback: "'Guten Abend' means good evening. Perfect!" },
          { id: o("de-hotel", 5, 2), text: "Auf Wiedersehen!", isCorrect: true, feedback: "Classic and polite!" },
          { id: o("de-hotel", 5, 3), text: "Aufenthalt.", isCorrect: false, feedback: "Say goodbye properly! 'Danke, guten Abend!'." },
        ],
      },
    ],
  },

  // ─── INTERMEDIATE ──────────────────────────────────────────

  {
    id: "de-restaurant",
    title: "Im Restaurant bestellen",
    location: "Gasthaus zur Krone, Heidelberg",
    level: "intermediate",
    language: "german",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("de-restaurant", 1), characterName: "Kellner", characterAvatar: "🧑‍🍳",
        dialogue: "Guten Abend! Haben Sie reserviert?",
        options: [
          { id: o("de-restaurant", 1, 1), text: "Nein, haben Sie einen Tisch für zwei?", isCorrect: true, feedback: "Great! Asking for a table politely." },
          { id: o("de-restaurant", 1, 2), text: "Ja, auf den Namen Schmidt.", isCorrect: true, feedback: "If you reserved, this is perfect!" },
          { id: o("de-restaurant", 1, 3), text: "Tisch jetzt.", isCorrect: false, feedback: "Too blunt! Try 'Haben Sie einen Tisch für zwei?'." },
        ],
      },
      {
        id: s("de-restaurant", 2), characterName: "Kellner", characterAvatar: "🧑‍🍳",
        dialogue: "Hier ist die Speisekarte. Ich lasse Sie erst mal schauen.",
        options: [
          { id: o("de-restaurant", 2, 1), text: "Was können Sie empfehlen?", isCorrect: true, feedback: "Asking for a recommendation—very natural!" },
          { id: o("de-restaurant", 2, 2), text: "Was ist das Tagesgericht?", isCorrect: true, feedback: "'Tagesgericht' means dish of the day. Excellent!" },
          { id: o("de-restaurant", 2, 3), text: "Ich will alles.", isCorrect: false, feedback: "You can't eat everything! Ask 'Was können Sie empfehlen?'." },
        ],
      },
      {
        id: s("de-restaurant", 3), characterName: "Kellner", characterAvatar: "🧑‍🍳",
        dialogue: "Ich empfehle die Schweinshaxe. Das ist unsere Spezialität.",
        options: [
          { id: o("de-restaurant", 3, 1), text: "Das klingt lecker. Das nehme ich.", isCorrect: true, feedback: "'Das klingt lecker' means 'That sounds delicious'." },
          { id: o("de-restaurant", 3, 2), text: "Ich hätte lieber etwas Leichteres.", isCorrect: true, feedback: "'Etwas Leichteres' means something lighter. Good preference!" },
          { id: o("de-restaurant", 3, 3), text: "Schwein ist Tier.", isCorrect: false, feedback: "True but irrelevant! Respond to the recommendation." },
        ],
      },
      {
        id: s("de-restaurant", 4), characterName: "Kellner", characterAvatar: "🧑‍🍳",
        dialogue: "Und was möchten Sie trinken?",
        options: [
          { id: o("de-restaurant", 4, 1), text: "Ein Glas Weißwein, bitte.", isCorrect: true, feedback: "White wine with a hearty meal—excellent choice!" },
          { id: o("de-restaurant", 4, 2), text: "Ein Wasser ohne Kohlensäure, bitte.", isCorrect: true, feedback: "'Ohne Kohlensäure' means still (no bubbles). A fine choice!" },
          { id: o("de-restaurant", 4, 3), text: "Trinken nein.", isCorrect: false, feedback: "Pick a drink! 'Ein Glas Weißwein' or 'Ein Wasser'." },
        ],
      },
      {
        id: s("de-restaurant", 5), characterName: "Kellner", characterAvatar: "🧑‍🍳",
        dialogue: "Möchten Sie noch ein Dessert?",
        options: [
          { id: o("de-restaurant", 5, 1), text: "Ja, einen Apfelstrudel, bitte.", isCorrect: true, feedback: "A classic German-Austrian dessert choice!" },
          { id: o("de-restaurant", 5, 2), text: "Nein danke, nur die Rechnung.", isCorrect: true, feedback: "'Die Rechnung' means the bill. Direct and clear!" },
          { id: o("de-restaurant", 5, 3), text: "Dessert ist Zucker.", isCorrect: false, feedback: "Yes, but answer the question! Say ja or nein." },
        ],
      },
      {
        id: s("de-restaurant", 6), characterName: "Kellner", characterAvatar: "🧑‍🍳",
        dialogue: "Hier ist die Rechnung. Das macht zweiundvierzig Euro.",
        options: [
          { id: o("de-restaurant", 6, 1), text: "Kann ich mit Karte zahlen?", isCorrect: true, feedback: "Practical question about payment!" },
          { id: o("de-restaurant", 6, 2), text: "Bitte sehr. Es war ausgezeichnet, danke!", isCorrect: true, feedback: "Complimenting the meal while paying. Wunderbar!" },
          { id: o("de-restaurant", 6, 3), text: "Das ist zu teuer.", isCorrect: false, feedback: "That's rude in a restaurant! Pay gracefully." },
        ],
      },
      {
        id: s("de-restaurant", 7), characterName: "Kellner", characterAvatar: "🧑‍🍳",
        dialogue: "Vielen Dank! Schönen Abend noch!",
        options: [
          { id: o("de-restaurant", 7, 1), text: "Danke, das Essen war köstlich. Schönen Abend!", isCorrect: true, feedback: "Perfect farewell! Complimenting the meal." },
          { id: o("de-restaurant", 7, 2), text: "Auf Wiedersehen und danke!", isCorrect: true, feedback: "Simple and warm goodbye." },
          { id: o("de-restaurant", 7, 3), text: "Ja.", isCorrect: false, feedback: "Too brief! Say 'Danke, schönen Abend!'." },
        ],
      },
    ],
  },
  {
    id: "de-directions",
    title: "Nach dem Weg fragen",
    location: "Straßen von Frankfurt",
    level: "intermediate",
    language: "german",
    duration: "6 min",
    xpReward: 65,
    steps: [
      {
        id: s("de-directions", 1), characterName: "Passant", characterAvatar: "🚶",
        dialogue: "Suchen Sie etwas?",
        options: [
          { id: o("de-directions", 1, 1), text: "Ja, ich suche den Bahnhof.", isCorrect: true, feedback: "'Der Bahnhof' means the train station." },
          { id: o("de-directions", 1, 2), text: "Ich habe mich verlaufen.", isCorrect: true, feedback: "'Ich habe mich verlaufen' means 'I'm lost'. Good start!" },
          { id: o("de-directions", 1, 3), text: "Nein, alles gut.", isCorrect: false, feedback: "But you need directions! Try 'Ich suche den Bahnhof'." },
        ],
      },
      {
        id: s("de-directions", 2), characterName: "Passant", characterAvatar: "🚶",
        dialogue: "Der Bahnhof? Der ist zehn Minuten zu Fuß. Gehen Sie geradeaus.",
        options: [
          { id: o("de-directions", 2, 1), text: "Geradeaus, alles klar. Und dann?", isCorrect: true, feedback: "'Geradeaus' means straight ahead. 'Und dann' means 'and then'." },
          { id: o("de-directions", 2, 2), text: "Ist es weit?", isCorrect: true, feedback: "'Ist es weit' means 'Is it far?' Good question!" },
          { id: o("de-directions", 2, 3), text: "Ich gehe nicht.", isCorrect: false, feedback: "But you asked for directions! Follow up: 'Und dann?'." },
        ],
      },
      {
        id: s("de-directions", 3), characterName: "Passant", characterAvatar: "🚶",
        dialogue: "Biegen Sie an der Ampel links ab, dann gehen Sie weiter geradeaus.",
        options: [
          { id: o("de-directions", 3, 1), text: "Links an der Ampel, verstanden!", isCorrect: true, feedback: "'Links' = left, 'Ampel' = traffic light. Well understood!" },
          { id: o("de-directions", 3, 2), text: "Können Sie das bitte wiederholen?", isCorrect: true, feedback: "Asking to repeat is perfectly fine!" },
          { id: o("de-directions", 3, 3), text: "Links oder rechts?", isCorrect: false, feedback: "They said 'links' (left)! Confirm: 'Links, verstanden'." },
        ],
      },
      {
        id: s("de-directions", 4), characterName: "Passant", characterAvatar: "🚶",
        dialogue: "Sie sehen den Bahnhof dann auf der rechten Seite.",
        options: [
          { id: o("de-directions", 4, 1), text: "Wunderbar, vielen Dank für Ihre Hilfe!", isCorrect: true, feedback: "Polite and grateful. Well done!" },
          { id: o("de-directions", 4, 2), text: "Auf der rechten Seite, alles klar. Danke!", isCorrect: true, feedback: "Confirming the direction. Great!" },
          { id: o("de-directions", 4, 3), text: "Rechts.", isCorrect: false, feedback: "Too brief! Thank them: 'Vielen Dank!'." },
        ],
      },
      {
        id: s("de-directions", 5), characterName: "Passant", characterAvatar: "🚶",
        dialogue: "Gern geschehen! Viel Erfolg!",
        options: [
          { id: o("de-directions", 5, 1), text: "Danke, schönen Tag noch!", isCorrect: true, feedback: "A warm goodbye! 'Schönen Tag noch' means 'have a nice day'." },
          { id: o("de-directions", 5, 2), text: "Auf Wiedersehen!", isCorrect: true, feedback: "Simple and classic." },
          { id: o("de-directions", 5, 3), text: "Erfolg.", isCorrect: false, feedback: "Respond with a proper goodbye: 'Danke, schönen Tag noch!'." },
        ],
      },
    ],
  },
  {
    id: "de-market",
    title: "Auf dem Markt einkaufen",
    location: "Wochenmarkt, Freiburg",
    level: "intermediate",
    language: "german",
    duration: "6 min",
    xpReward: 70,
    steps: [
      {
        id: s("de-market", 1), characterName: "Verkäufer", characterAvatar: "🧑‍🌾",
        dialogue: "Guten Morgen! Schauen Sie sich diese schönen Tomaten an!",
        options: [
          { id: o("de-market", 1, 1), text: "Die sehen lecker aus! Was kostet das Kilo?", isCorrect: true, feedback: "Asking the price per kilo—very natural at a market!" },
          { id: o("de-market", 1, 2), text: "Ich hätte gerne Tomaten, bitte.", isCorrect: true, feedback: "'Ich hätte gerne' means 'I would like'. Polite!" },
          { id: o("de-market", 1, 3), text: "Tomaten rot.", isCorrect: false, feedback: "That's just a description! Try asking the price or ordering." },
        ],
      },
      {
        id: s("de-market", 2), characterName: "Verkäufer", characterAvatar: "🧑‍🌾",
        dialogue: "Drei Euro das Kilo. Wie viel möchten Sie?",
        options: [
          { id: o("de-market", 2, 1), text: "Ein Kilo, bitte.", isCorrect: true, feedback: "Clear and polite order!" },
          { id: o("de-market", 2, 2), text: "Zwei Kilo, bitte.", isCorrect: true, feedback: "A bigger order! Both work." },
          { id: o("de-market", 2, 3), text: "Euro nein.", isCorrect: false, feedback: "Just say how much you want: 'Ein Kilo, bitte'." },
        ],
      },
      {
        id: s("de-market", 3), characterName: "Verkäufer", characterAvatar: "🧑‍🌾",
        dialogue: "Bitte sehr! Noch etwas?",
        options: [
          { id: o("de-market", 3, 1), text: "Ja, haben Sie Erdbeeren?", isCorrect: true, feedback: "'Erdbeeren' means strawberries. Yummy!" },
          { id: o("de-market", 3, 2), text: "Nein danke, das ist alles.", isCorrect: true, feedback: "'Das ist alles' means 'that's all'. Perfect!" },
          { id: o("de-market", 3, 3), text: "Etwas ja.", isCorrect: false, feedback: "Be specific! 'Haben Sie Erdbeeren?' or 'Das ist alles'." },
        ],
      },
      {
        id: s("de-market", 4), characterName: "Verkäufer", characterAvatar: "🧑‍🌾",
        dialogue: "Natürlich! Probieren Sie, die sind sehr süß!",
        options: [
          { id: o("de-market", 4, 1), text: "Mmm, die sind hervorragend! Ich nehme eine Schale.", isCorrect: true, feedback: "'Schale' means a small container/punnet. Market vocabulary!" },
          { id: o("de-market", 4, 2), text: "Danke! Die sind sehr gut.", isCorrect: true, feedback: "Appreciating the taste. Natural!" },
          { id: o("de-market", 4, 3), text: "Süß nein.", isCorrect: false, feedback: "They said the strawberries are sweet! Try 'Die sind hervorragend'." },
        ],
      },
      {
        id: s("de-market", 5), characterName: "Verkäufer", characterAvatar: "🧑‍🌾",
        dialogue: "Das macht zusammen sieben Euro.",
        options: [
          { id: o("de-market", 5, 1), text: "Bitte sehr. Vielen Dank, schönen Tag noch!", isCorrect: true, feedback: "Perfect market farewell!" },
          { id: o("de-market", 5, 2), text: "Hier, bitte. Auf Wiedersehen!", isCorrect: true, feedback: "'Hier, bitte' means 'here you go'. Great!" },
          { id: o("de-market", 5, 3), text: "Sieben.", isCorrect: false, feedback: "Pay and say goodbye! 'Bitte sehr, vielen Dank!'." },
        ],
      },
    ],
  },
  {
    id: "de-train",
    title: "Eine Fahrkarte kaufen",
    location: "Hauptbahnhof, München",
    level: "intermediate",
    language: "german",
    duration: "7 min",
    xpReward: 75,
    steps: [
      {
        id: s("de-train", 1), characterName: "Mitarbeiter", characterAvatar: "🚂",
        dialogue: "Guten Tag! Kann ich Ihnen helfen?",
        options: [
          { id: o("de-train", 1, 1), text: "Ja, ich hätte gerne eine Fahrkarte nach Berlin.", isCorrect: true, feedback: "'Eine Fahrkarte nach' means 'a ticket to'. Perfect!" },
          { id: o("de-train", 1, 2), text: "Eine Hin- und Rückfahrkarte nach Hamburg, bitte.", isCorrect: true, feedback: "'Hin- und Rückfahrkarte' means round trip!" },
          { id: o("de-train", 1, 3), text: "Zug Berlin.", isCorrect: false, feedback: "Be polite! 'Ich hätte gerne eine Fahrkarte nach Berlin'." },
        ],
      },
      {
        id: s("de-train", 2), characterName: "Mitarbeiter", characterAvatar: "🚂",
        dialogue: "Einfache Fahrt oder Hin- und Rückfahrt?",
        options: [
          { id: o("de-train", 2, 1), text: "Hin- und Rückfahrt, bitte.", isCorrect: true, feedback: "Round trip! Good choice." },
          { id: o("de-train", 2, 2), text: "Einfache Fahrt.", isCorrect: true, feedback: "'Einfache Fahrt' means one-way. Also valid!" },
          { id: o("de-train", 2, 3), text: "Ich verstehe die Frage nicht.", isCorrect: false, feedback: "'Einfache Fahrt' = one-way, 'Hin- und Rückfahrt' = round trip." },
        ],
      },
      {
        id: s("de-train", 3), characterName: "Mitarbeiter", characterAvatar: "🚂",
        dialogue: "Erste oder zweite Klasse?",
        options: [
          { id: o("de-train", 3, 1), text: "Zweite Klasse, bitte.", isCorrect: true, feedback: "Wirtschaftlich! Second class is standard." },
          { id: o("de-train", 3, 2), text: "Erste Klasse.", isCorrect: true, feedback: "First class! More spacious." },
          { id: o("de-train", 3, 3), text: "Die beste Klasse.", isCorrect: false, feedback: "Specify: 'Erste' or 'Zweite' Klasse." },
        ],
      },
      {
        id: s("de-train", 4), characterName: "Mitarbeiter", characterAvatar: "🚂",
        dialogue: "Der nächste Zug fährt um vierzehn Uhr dreißig. Passt Ihnen das?",
        options: [
          { id: o("de-train", 4, 1), text: "Ja, das passt.", isCorrect: true, feedback: "Great! 14:30 works for you." },
          { id: o("de-train", 4, 2), text: "Gibt es einen früheren Zug?", isCorrect: true, feedback: "'Früheren' means earlier. Smart question!" },
          { id: o("de-train", 4, 3), text: "Vierzehn nein.", isCorrect: false, feedback: "Be specific! 'Gibt es einen früheren Zug?' or 'Ja, das passt'." },
        ],
      },
      {
        id: s("de-train", 5), characterName: "Mitarbeiter", characterAvatar: "🚂",
        dialogue: "Das macht fünfundvierzig Euro. Wie möchten Sie zahlen?",
        options: [
          { id: o("de-train", 5, 1), text: "Mit EC-Karte, bitte.", isCorrect: true, feedback: "'EC-Karte' is a German bank card. Very common!" },
          { id: o("de-train", 5, 2), text: "In bar.", isCorrect: true, feedback: "Cash payment. Still accepted!" },
          { id: o("de-train", 5, 3), text: "Kostenlos?", isCorrect: false, feedback: "Trains aren't free! Pay: 'Mit EC-Karte, bitte'." },
        ],
      },
      {
        id: s("de-train", 6), characterName: "Mitarbeiter", characterAvatar: "🚂",
        dialogue: "Hier ist Ihre Fahrkarte. Gleis sieben. Gute Reise!",
        options: [
          { id: o("de-train", 6, 1), text: "Vielen Dank! Schönen Tag noch!", isCorrect: true, feedback: "'Gleis' means platform. Gute Reise!" },
          { id: o("de-train", 6, 2), text: "Gleis sieben, verstanden. Danke!", isCorrect: true, feedback: "Confirming the platform number. Smart!" },
          { id: o("de-train", 6, 3), text: "Reise.", isCorrect: false, feedback: "Say goodbye properly! 'Vielen Dank, schönen Tag noch!'." },
        ],
      },
    ],
  },

  // ─── ADVANCED ──────────────────────────────────────────────

  {
    id: "de-interview",
    title: "Vorstellungsgespräch",
    location: "Büro in Frankfurt am Main",
    level: "advanced",
    language: "german",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("de-interview", 1), characterName: "Personalleiter", characterAvatar: "💼",
        dialogue: "Guten Tag, danke, dass Sie gekommen sind. Erzählen Sie mir etwas über sich.",
        options: [
          { id: o("de-interview", 1, 1), text: "Guten Tag. Ich habe einen Abschluss in Marketing und drei Jahre Berufserfahrung.", isCorrect: true, feedback: "Strong professional introduction!" },
          { id: o("de-interview", 1, 2), text: "Ich bin nett und mag Katzen.", isCorrect: false, feedback: "Too personal! Focus on professional experience." },
          { id: o("de-interview", 1, 3), text: "Guten Tag. Ich habe Internationalen Handel in München studiert.", isCorrect: true, feedback: "Good! Mentioning your studies and city." },
        ],
      },
      {
        id: s("de-interview", 2), characterName: "Personalleiter", characterAvatar: "💼",
        dialogue: "Warum möchten Sie bei unserem Unternehmen arbeiten?",
        options: [
          { id: o("de-interview", 2, 1), text: "Ihr Unternehmen ist bekannt für Innovation und starke Werte.", isCorrect: true, feedback: "Formal and flattering. Well done!" },
          { id: o("de-interview", 2, 2), text: "Weil ich Geld brauche.", isCorrect: false, feedback: "Too direct! Focus on company values, not money." },
          { id: o("de-interview", 2, 3), text: "Ich bin leidenschaftlich an Ihrer Branche interessiert und möchte einen Beitrag leisten.", isCorrect: true, feedback: "'Einen Beitrag leisten' means to contribute. Very professional!" },
        ],
      },
      {
        id: s("de-interview", 3), characterName: "Personalleiter", characterAvatar: "💼",
        dialogue: "Was sind Ihre Stärken?",
        options: [
          { id: o("de-interview", 3, 1), text: "Ich bin gewissenhaft, kreativ und ein guter Teamplayer.", isCorrect: true, feedback: "'Teamplayer' is widely used in German business. Great qualities!" },
          { id: o("de-interview", 3, 2), text: "Ich bin perfekt.", isCorrect: false, feedback: "Too arrogant! List specific strengths with examples." },
          { id: o("de-interview", 3, 3), text: "Ich bin gut organisiert und passe mich leicht an neue Situationen an.", isCorrect: true, feedback: "Adaptability is valued! Excellent answer." },
        ],
      },
      {
        id: s("de-interview", 4), characterName: "Personalleiter", characterAvatar: "💼",
        dialogue: "Wo sehen Sie sich in fünf Jahren?",
        options: [
          { id: o("de-interview", 4, 1), text: "Ich möchte mich zu einer Teamleiterposition entwickeln.", isCorrect: true, feedback: "'Teamleiterposition' = team leader position. Ambitious yet realistic!" },
          { id: o("de-interview", 4, 2), text: "An Ihrem Platz.", isCorrect: false, feedback: "Threatening the interviewer is not wise! Think growth." },
          { id: o("de-interview", 4, 3), text: "Ich möchte meine Fähigkeiten vertiefen und mehr Verantwortung übernehmen.", isCorrect: true, feedback: "'Vertiefen' means to deepen. Very professional!" },
        ],
      },
      {
        id: s("de-interview", 5), characterName: "Personalleiter", characterAvatar: "💼",
        dialogue: "Haben Sie Fragen an uns?",
        options: [
          { id: o("de-interview", 5, 1), text: "Ja, wie sieht ein typischer Arbeitstag in dieser Position aus?", isCorrect: true, feedback: "Asking about daily routine shows genuine interest!" },
          { id: o("de-interview", 5, 2), text: "Welche Aufstiegsmöglichkeiten gibt es im Unternehmen?", isCorrect: true, feedback: "'Aufstiegsmöglichkeiten' means growth opportunities. Smart!" },
          { id: o("de-interview", 5, 3), text: "Nein, keine Fragen.", isCorrect: false, feedback: "Always ask questions! It shows interest in the role." },
        ],
      },
      {
        id: s("de-interview", 6), characterName: "Personalleiter", characterAvatar: "💼",
        dialogue: "Sehr gut. Wir melden uns nächste Woche bei Ihnen. Vielen Dank!",
        options: [
          { id: o("de-interview", 6, 1), text: "Danke für Ihre Zeit. Ich freue mich auf Ihre Rückmeldung.", isCorrect: true, feedback: "'Ich freue mich auf' means 'I look forward to'. Professional closure!" },
          { id: o("de-interview", 6, 2), text: "Vielen Dank. Einen schönen Tag noch!", isCorrect: true, feedback: "Clean and professional farewell." },
          { id: o("de-interview", 6, 3), text: "OK, tschüss.", isCorrect: false, feedback: "Too casual for a job interview! Stay formal." },
        ],
      },
    ],
  },
  {
    id: "de-business",
    title: "Geschäftsbesprechung",
    location: "Konferenzraum, Stuttgart",
    level: "advanced",
    language: "german",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("de-business", 1), characterName: "Kollege", characterAvatar: "👔",
        dialogue: "Guten Morgen zusammen. Beginnen wir mit der Quartalsbilanz.",
        options: [
          { id: o("de-business", 1, 1), text: "Ich habe eine Zusammenfassung der Ergebnisse vorbereitet. Darf ich anfangen?", isCorrect: true, feedback: "Taking initiative in a meeting. Very professional!" },
          { id: o("de-business", 1, 2), text: "Die Zahlen sind dieses Quartal positiv.", isCorrect: true, feedback: "Direct and relevant comment." },
          { id: o("de-business", 1, 3), text: "Ich habe nichts vorbereitet.", isCorrect: false, feedback: "Not prepared for a meeting? Try being proactive!" },
        ],
      },
      {
        id: s("de-business", 2), characterName: "Kollege", characterAvatar: "👔",
        dialogue: "Der Umsatz ist um 15% gestiegen. Was denken Sie?",
        options: [
          { id: o("de-business", 2, 1), text: "Das ist ermutigend. Ich glaube, unsere neue Strategie trägt Früchte.", isCorrect: true, feedback: "'Früchte tragen' means 'to bear fruit'. Idiomatic!" },
          { id: o("de-business", 2, 2), text: "Wir sollten analysieren, welche Produkte am besten abgeschnitten haben.", isCorrect: true, feedback: "Analytical thinking! Great professional response." },
          { id: o("de-business", 2, 3), text: "Fünfzehn Prozent ist gut.", isCorrect: false, feedback: "Too simple! Add analysis: 'Unsere Strategie trägt Früchte'." },
        ],
      },
      {
        id: s("de-business", 3), characterName: "Kollege", characterAvatar: "👔",
        dialogue: "Welche Ziele schlagen Sie für das nächste Quartal vor?",
        options: [
          { id: o("de-business", 3, 1), text: "Ich schlage vor, unsere Präsenz in den sozialen Medien zu verstärken.", isCorrect: true, feedback: "'Soziale Medien' means social media. Strategic thinking!" },
          { id: o("de-business", 3, 2), text: "Wir sollten ein Wachstum von 20% anstreben und neue Märkte erschließen.", isCorrect: true, feedback: "'Neue Märkte erschließen' means develop new markets. Ambitious!" },
          { id: o("de-business", 3, 3), text: "Mehr verkaufen.", isCorrect: false, feedback: "Too vague! Be specific about strategy and numbers." },
        ],
      },
      {
        id: s("de-business", 4), characterName: "Kollege", characterAvatar: "👔",
        dialogue: "Gibt es Hindernisse, die wir voraussehen sollten?",
        options: [
          { id: o("de-business", 4, 1), text: "Der Wettbewerb wird stärker, wir müssen innovativer werden.", isCorrect: true, feedback: "'Der Wettbewerb' means competition. Strategic awareness!" },
          { id: o("de-business", 4, 2), text: "Das Marketingbudget könnte ein Hindernis sein, wenn wir es nicht erhöhen.", isCorrect: true, feedback: "'Hindernis' means obstacle. Good financial thinking!" },
          { id: o("de-business", 4, 3), text: "Nein, alles ist gut.", isCorrect: false, feedback: "Being realistic about challenges is important in business!" },
        ],
      },
      {
        id: s("de-business", 5), characterName: "Kollege", characterAvatar: "👔",
        dialogue: "Gut. Fassen wir die nächsten Schritte zusammen.",
        options: [
          { id: o("de-business", 5, 1), text: "Ich übernehme den Marketingplan und schicke Ihnen am Freitag einen Bericht.", isCorrect: true, feedback: "'Ich übernehme' means 'I'll take care of'. Taking ownership!" },
          { id: o("de-business", 5, 2), text: "Ich schlage vor, dass wir uns nächste Woche treffen, um den Plan zu bestätigen.", isCorrect: true, feedback: "Follow-up meetings show good project management!" },
          { id: o("de-business", 5, 3), text: "In Ordnung.", isCorrect: false, feedback: "Take action! Volunteer for tasks." },
        ],
      },
    ],
  },
  {
    id: "de-travel-problem",
    title: "Ein Reiseproblem lösen",
    location: "Bahnhof, Dresden",
    level: "advanced",
    language: "german",
    duration: "7 min",
    xpReward: 90,
    steps: [
      {
        id: s("de-travel-problem", 1), characterName: "Bahnangestellter", characterAvatar: "🚉",
        dialogue: "Es tut mir leid, Ihr Zug wurde wegen eines Streiks gestrichen.",
        options: [
          { id: o("de-travel-problem", 1, 1), text: "Das ist ärgerlich. Welche Möglichkeiten habe ich?", isCorrect: true, feedback: "'Das ist ärgerlich' means 'that's annoying'. Calm and practical!" },
          { id: o("de-travel-problem", 1, 2), text: "Gibt es heute noch einen anderen Zug?", isCorrect: true, feedback: "Direct question about alternatives. Smart!" },
          { id: o("de-travel-problem", 1, 3), text: "Das ist inakzeptabel, ich will sofort eine Erstattung!", isCorrect: false, feedback: "Understandable frustration, but first ask about alternatives." },
        ],
      },
      {
        id: s("de-travel-problem", 2), characterName: "Bahnangestellter", characterAvatar: "🚉",
        dialogue: "Es gibt in zwei Stunden einen Ersatzbus oder morgen früh einen Zug.",
        options: [
          { id: o("de-travel-problem", 2, 1), text: "Ich nehme den Bus. Wo fährt er ab?", isCorrect: true, feedback: "'Ersatzbus' means replacement bus." },
          { id: o("de-travel-problem", 2, 2), text: "Können Sie mir einen Platz im Zug morgen reservieren?", isCorrect: true, feedback: "Planning ahead! Professional approach." },
          { id: o("de-travel-problem", 2, 3), text: "Zwei Stunden sind zu lang, nein.", isCorrect: false, feedback: "Those are your options. Pick one!" },
        ],
      },
      {
        id: s("de-travel-problem", 3), characterName: "Bahnangestellter", characterAvatar: "🚉",
        dialogue: "Selbstverständlich. Möchten Sie eine Erstattung oder einen Umtausch?",
        options: [
          { id: o("de-travel-problem", 3, 1), text: "Ein Umtausch wäre mir lieber.", isCorrect: true, feedback: "'Umtausch' means exchange. Practical choice!" },
          { id: o("de-travel-problem", 3, 2), text: "Ich hätte lieber eine Erstattung, bitte.", isCorrect: true, feedback: "Getting your money back. Valid option!" },
          { id: o("de-travel-problem", 3, 3), text: "Beides.", isCorrect: false, feedback: "You can't have both! Pick one option." },
        ],
      },
      {
        id: s("de-travel-problem", 4), characterName: "Bahnangestellter", characterAvatar: "🚉",
        dialogue: "Das ist erledigt. Entschuldigen Sie nochmals die Unannehmlichkeiten.",
        options: [
          { id: o("de-travel-problem", 4, 1), text: "Kein Problem. Danke für Ihre Hilfe.", isCorrect: true, feedback: "'Kein Problem' means 'no problem'. Graceful!" },
          { id: o("de-travel-problem", 4, 2), text: "Danke. So etwas passiert. Schönen Tag noch!", isCorrect: true, feedback: "'So etwas passiert' = these things happen. Philosophical!" },
          { id: o("de-travel-problem", 4, 3), text: "Nächstes Mal keinen Streik.", isCorrect: false, feedback: "The employee can't control strikes! Be graceful." },
        ],
      },
    ],
  },
  {
    id: "de-debate",
    title: "Eine Meinung diskutieren",
    location: "Uni-Café, Berlin",
    level: "advanced",
    language: "german",
    duration: "8 min",
    xpReward: 100,
    steps: [
      {
        id: s("de-debate", 1), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Glaubst du, dass künstliche Intelligenz die Lehrer ersetzen wird?",
        options: [
          { id: o("de-debate", 1, 1), text: "Ich glaube nicht. KI kann unterstützen, aber der menschliche Kontakt bleibt unverzichtbar.", isCorrect: true, feedback: "Nuanced opinion with reasoning. Excellent!" },
          { id: o("de-debate", 1, 2), text: "Langfristig ist es möglich, aber es wirft ethische Fragen auf.", isCorrect: true, feedback: "'Ethische Fragen' means ethical questions. Deep thinking!" },
          { id: o("de-debate", 1, 3), text: "Ja, Roboter sind besser.", isCorrect: false, feedback: "Too simplistic! Develop your argument with nuance." },
        ],
      },
      {
        id: s("de-debate", 2), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Aber lernen Schüler nicht besser mit Technologie?",
        options: [
          { id: o("de-debate", 2, 1), text: "Das kommt darauf an. Technologie ist ein Werkzeug, kein Selbstzweck.", isCorrect: true, feedback: "'Kein Selbstzweck' means 'not an end in itself'. Philosophical!" },
          { id: o("de-debate", 2, 2), text: "Teilweise, aber die Interaktion mit einem Lehrer fördert kritisches Denken.", isCorrect: true, feedback: "'Kritisches Denken' means critical thinking. Well argued!" },
          { id: o("de-debate", 2, 3), text: "Nein, Bücher sind besser.", isCorrect: false, feedback: "Too dismissive! Engage with the argument more deeply." },
        ],
      },
      {
        id: s("de-debate", 3), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Interessant. Und was den Arbeitsmarkt betrifft?",
        options: [
          { id: o("de-debate", 3, 1), text: "KI wird viele Berufe verändern, aber auch neue schaffen.", isCorrect: true, feedback: "Balanced view on AI and employment. Mature reasoning!" },
          { id: o("de-debate", 3, 2), text: "Man muss sich anpassen. Lebenslanges Lernen wird entscheidend sein.", isCorrect: true, feedback: "'Lebenslanges Lernen' means lifelong learning. Forward-thinking!" },
          { id: o("de-debate", 3, 3), text: "Alle werden ihre Arbeit verlieren.", isCorrect: false, feedback: "Too alarmist! A nuanced view is better." },
        ],
      },
      {
        id: s("de-debate", 4), characterName: "Student", characterAvatar: "🎓",
        dialogue: "Du hast recht. Auf jeden Fall ist es ein faszinierendes Thema.",
        options: [
          { id: o("de-debate", 4, 1), text: "Absolut. Es ist wichtig, darüber zu diskutieren, um sich auf die Zukunft vorzubereiten.", isCorrect: true, feedback: "'Sich auf die Zukunft vorzubereiten' means preparing for the future. Great conclusion!" },
          { id: o("de-debate", 4, 2), text: "Ja, ich mag solche Diskussionen. Lass uns das nochmal machen!", isCorrect: true, feedback: "Expressing enthusiasm for future discussion. Friendly!" },
          { id: o("de-debate", 4, 3), text: "Ja.", isCorrect: false, feedback: "Engage more! This is a rich topic deserving a thoughtful conclusion." },
        ],
      },
    ],
  },
];
