document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.mood, .star-text');

    const starSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1"
            style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
            viewBox="0 0 784.11 815.53" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs></defs>
            <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path class="fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z">
                </path>
            </g>
        </svg>
    `;

    buttons.forEach(button => {
        for (let i = 1; i <= 6; i++) {
            const starDiv = document.createElement('div');
            starDiv.className = `star-${i}`;
            starDiv.innerHTML = starSVG;
            button.appendChild(starDiv);
        }
    });
});

document.addEventListener('mousemove', (e) => {
    const star = document.createElement('span');

    const shapes = ['✦', '★', '☆', '•', '+'];
    star.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];

    star.classList.add('glitter');

    star.style.left = e.clientX + 'px';
    star.style.top = e.clientY + 'px';

    const driftX = (Math.random() - 0.5) * 100 + 'px';
    const driftY = (Math.random() * 100 + 50) + 'px';
    star.style.setProperty('--x', driftX);
    star.style.setProperty('--y', driftY);

    const size = Math.random() * 20 + 10 + 'px';
    star.style.fontSize = size;

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1000);
});

const moodButtons = document.querySelectorAll(".mood");

const recommendations = document.getElementById("recommendations");
const head4El = document.getElementById("head4");
const watchEl = document.getElementById("watch");
const listenEl = document.getElementById("listen");
const readEl = document.getElementById("read");
const eatEl = document.getElementById("eat");
const drinkEl = document.getElementById("drink");
const activityEl = document.getElementById("activity");

const moodData = {
    happy: {
        label: "You're feeling Happy 😊 Here's what we recommend :",
        movies: ["The Grand Budapest Hotel", "La La Land", "Little Miss Sunshine", "Amélie", "Sing Street"],
        songs: ["Happy - Pharrell Williams", "Can't Stop the Feeling - Justin Timberlake", "Good as Hell - Lizzo", "Walking on Sunshine - Katrina", "Shake It Off - Taylor Swift"],
        books: ["The Hitchhiker's Guide to the Galaxy", "A Man Called Ove", "The Alchemist", "Eleanor Oliphant is Completely Fine", "Big Magic - Elizabeth Gilbert"],
        food: ["Pizza 🍕", "Waffles 🧇", "Ice Cream 🍦", "Tacos 🌮", "Pancakes 🥞"],
        drinks: ["Fresh Lemonade 🍋", "Mango Smoothie 🥭", "Iced Coffee ☕", "Bubble Tea 🧋", "Sparkling Water 💧"],
        activities: ["Go for a walk 🚶", "Call a friend 📞", "Dance to your favourite song 💃", "Start a new project 🎨", "Cook something new 🍳"]
    },
    sad: {
        label: "Feeling Sad 😔 it's okay. Here's a little comfort :",
        movies: ["Inside Out", "The Secret Life of Walter Mitty", "Good Will Hunting", "Eternal Sunshine of the Spotless Mind", "Coco"],
        songs: ["Fix You - Coldplay", "The Night We Met - Lord Huron", "Someone Like You - Adele", "Skinny Love - Bon Iver", "Let Her Go - Passenger"],
        books: ["The Bell Jar - Sylvia Plath", "Norwegian Wood - Murakami", "A Little Life - Hanya Yanagihara", "The Perks of Being a Wallflower", "Tuesdays with Morrie"],
        food: ["Mac & Cheese 🧀", "Chocolate 🍫", "Soup 🍜", "French Fries 🍟", "Hot Chocolate 🍵"],
        drinks: ["Warm Chamomile Tea 🫖", "Hot Cocoa ☕", "Honey Lemon Water 🍋", "Warm Milk 🥛", "Sparkling Water 💧"],
        activities: ["Journal your feelings ✍️", "Watch comfort shows 📺", "Take a long shower 🚿", "Listen to a playlist 🎵", "Rest and breathe 🌿"]
    },
    bored: {
        label: "Bored 😒? Let's fix that :",
        movies: ["Interstellar", "The Matrix", "Inception", "Baby Driver", "Scott Pilgrim vs. the World"],
        songs: ["Blinding Lights - The Weeknd", "Levitating - Dua Lipa", "As It Was - Harry Styles", "Uptown Funk - Bruno Mars", "Sunflower - Post Malone"],
        books: ["Ready Player One - Ernest Cline", "The Martian - Andy Weir", "Gone Girl - Gillian Flynn", "Atomic Habits - James Clear", "Sherlock Holmes - Arthur Conan Doyle"],
        food: ["Snack Platter 🧆", "Nachos 🫔", "Popcorn 🍿", "Sandwich 🥪", "Fruit Bowl 🍇"],
        drinks: ["Energy Drink ⚡", "Cold Brew Coffee ☕", "Iced Tea 🧊", "Fruit Punch 🍹", "Coconut Water 🥥"],
        activities: ["Learn something new online 💻", "Sketch or doodle 🎨", "Rearrange your room 🛋️", "Play a video game 🎮", "Start a book 📚"]
    },
    exhausted: {
        label: "Exhausted 😴? Time to recharge :",
        movies: ["Spirited Away", "My Neighbor Totoro", "Chef", "Julie & Julia", "The Secret Garden"],
        songs: ["Clair de Lune - Debussy", "Golden Hour - JVKE", "Coffee - beabadoobee", "Comptine d'un autre été", "Weightless - Marconi Union"],
        books: ["When Breath Becomes Air - Paul Kalanithi", "Ikigai - Héctor García", "The Wind-Up Bird Chronicle", "Milk and Honey - Rupi Kaur", "Digital Minimalism - Cal Newport"],
        food: ["Avocado Toast 🥑", "Oatmeal 🥣", "Nuts & Dates 🌰", "Banana 🍌", "Dark Chocolate 🍫"],
        drinks: ["Green Tea 🍵", "Bob Tea 🧋", "Warm Turmeric Milk 🥛", "Energy Drink 🥤", "Electrolyte Water 💧"],
        activities: ["Take a nap 😴", "Stretch or do yoga 🧘", "Meditate for 10 mins 🌬️", "Take a slow walk outside 🚶🏻", "Do absolutely nothing 🛌"]
    },
    stressed: {
        label: "Stressed 😫? Take a breath we've got you :",
        movies: ["Julie & Julia", "The Intern", "Up", "Soul", "Paddington 2"],
        songs: ["Breathe (2 AM) - Anna Nalick", "Landslide - Fleetwood Mac", "Holocene - Bon Iver", "Vienna - Billy Joel", "The Night Will Always Win - Manchester Orchestra"],
        books: ["The Power of Now - Eckhart Tolle", "4000 Weeks - Oliver Burkeman", "Big Magic - Elizabeth Gilbert", "Untamed - Glennon Doyle", "Anxiety & Phobia Workbook"],
        food: ["Dark Chocolate 🍫", "Almonds 🌰", "Yoghurt 🫙", "Herbal Soup 🍲", "Berries 🫐"],
        drinks: ["Lavender Tea 🪻", "Warm Lemon Water 🍋", "Chamomile Tea 🍵", "Cold Water with Mint 💧", "Ashwagandha Latte 🥛"],
        activities: ["Box breathing exercise 🌬️", "Go for a short walk 🚶", "Write a to-do list ✍️", "Turn off your phone 📵", "Watch something light & funny 😂"]
    }
};

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        const mood = button.dataset.mood;
        const data = moodData[mood];

        head4El.textContent = data.label;
        watchEl.textContent = "🎬 Watch : " + getRandomItem(data.movies);
        listenEl.textContent = "🎵 Listen : " + getRandomItem(data.songs);
        readEl.textContent = "📚 Read : " + getRandomItem(data.books);
        eatEl.textContent = "🍕 Eat : " + getRandomItem(data.food);
        drinkEl.textContent = "🥤 Drink : " + getRandomItem(data.drinks);
        activityEl.textContent = "🏃 Do : " + getRandomItem(data.activities);

        recommendations.style.display = "block";
    });
});