
import fs from 'fs';
const postsPath = './src/data/posts.json';
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// List of titles identified by the browser agent as having broken images
const brokenTitles = [
    "MONTE SACRO (Roman)",
    "El corona virus y los sacros manantiales de la libertad",
    "Unas primeras reflexiones filosóficas sobre el coronavirus",
    "La sacra sabiduría inferior.",
    "Las bailarinas logicas",
    "Ha sido un gran honor",
    "Pensadores vivos: E.O. Wilson",
    "Sobre eso que sea \"la Naturaleza\".",
    "Pensadores vivos: Martha Nussbaum",
    "Una reflexión filosófica sobre el mito de Europa",
    "Una conversación sobre Nietzsche",
    "Pensadores vivos: Moisés Naím",
    "Feliz 2015",
    "Una metafísica de la violencia",
    "Mi amiga Luz, la de Facinas",
    "Pensadores vivos: Rüdiger Safranski",
    "Feliz Verano",
    "Pensadores vivos. Emilio Lledó.",
    "Pensadores vivos: Richard Dawkins",
    "Pensadores vivos: Hilary Putnam",
    "Pensadores vivos: Habermas",
    "¿Quieres apoyar este proyecto?",
    "Conferencia de hoy en el aula infinita",
    "Pensadores vivos: Jacobo Muñoz",
    "La muerte desde un punto de vista filosófico",
    "Pensadores vivos: Antonio Damasio",
    "Pensadores vivos: Gianni Vattimo",
    "El nuevo filósofo del martillo",
    "Activismo interior y vuelo más allá de las Naciones Unidas",
    "Pensadores vivos: Michel Hulin.",
    "Pensadores vivos: Saskia Sassen",
    "Pensadores vivos: Stephen Hawking",
    "Pensadores vivos: Peter Sloterdijk",
    "Conferencia sobre el Yoga desde una perspectiva histórica y filosófica",
    "Pensadores vivos: Noam Chomsky",
    "¿Quieres ayudarme?",
    "Gracias",
    "Political Tribune: \"Hatred is foolish\"",
    "We must put an end to the employment. Human beings are too much big and sacred to be “employed”.",
    "Plenitud filosófica para el 2013",
    "Tribuna política: Europa, Aristóteles y la \"lógica del lugar\" de Kitarô Nishida.",
    "El Apocalipsis lógico",
    "Tribuna política: \"Los desahucios, la Poesía y Sócrates\"",
    "San Manuel Bueno Mártir, Lázaro, Unamuno y otros sacerdotes del sacro sueño de la vida.",
    "Bergson, el tiempo y el no-tiempo al que apunta el Yoga. Algunos apuntes improvisados.",
    "Un aviso; y el olor de la nada mágica."
];

// Abstract images available
const abstractImages = [
    '/images/generated/article_abstract_1.png',
    '/images/generated/article_abstract_2.png',
    '/images/generated/article_abstract_3.png',
    '/images/generated/article_abstract_4.png',
    '/images/generated/meditacion_diaria.png',
    '/images/generated/coronavirus_abstract.png'
];

let updatedCount = 0;

posts.forEach(post => {
    const title = (post.title || '').trim();

    // Check if this post title matches one of the broken ones
    // We use includes or exact match since titles might have minor whitespace differences
    const matched = brokenTitles.some(broken =>
        broken === title || (broken.length > 10 && title.includes(broken)) || (title.length > 10 && broken.includes(title))
    );

    if (matched) {
        // Assign a random abstract image
        const randomImage = abstractImages[updatedCount % abstractImages.length];
        post.custom_image = randomImage;
        updatedCount++;
    }
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Repaired images for ${updatedCount} posts found to be broken.`);
