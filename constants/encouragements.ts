export type EncouragementStyle = 'playful' | 'empathetic' | 'minimalist';

export const encouragements: Record<EncouragementStyle, string[]> = {
  playful: [
    "You just ninja'd that habit! 🥷",
    "Achievement unlocked: Awesome Human! 🏆",
    "That was so easy, you're basically cheating at life now! 😎",
    "High five from the habit gods! ✋",
    "You blinked and built a habit. That's your superpower! ⚡",
    "Look at you being all productive and stuff! 🌟",
    "Your future self is doing a happy dance right now! 💃",
    "That's one small step for you, one giant leap for your awesomeness! 🚀",
    "Habit streak: Officially on fire! 🔥",
    "You're collecting good habits like Pokémon! Gotta catch 'em all! 🎮"
  ],
  empathetic: [
    "Even showing up counts. Proud of you. 💕",
    "That small step matters more than you know. ✨",
    "You're nurturing yourself in all the right ways. 🌱",
    "This is how lasting change happens—one tiny moment at a time. 🕰️",
    "Your commitment to yourself is beautiful to witness. 🌈",
    "Each small action is a form of self-care. Thank you for honoring yourself. 🙏",
    "This consistency is quietly transforming your life. Feel it? 💫",
    "You're exactly where you need to be on your journey. 🛤️",
    "That wasn't just a habit—that was an act of self-love. ❤️",
    "The smallest steps often lead to the most meaningful destinations. 🌅"
  ],
  minimalist: [
    "Done. ✓",
    "Progress made.",
    "Step taken.",
    "Habit formed.",
    "Moment captured.",
    "Forward motion.",
    "Small win.",
    "Present. Aware. Complete.",
    "One more. Good.",
    "Simplicity wins."
  ]
};

export const getRandomEncouragement = (style: EncouragementStyle): string => {
  const options = encouragements[style];
  return options[Math.floor(Math.random() * options.length)];
};
