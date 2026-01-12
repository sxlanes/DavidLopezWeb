const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
console.log(`Updating ${pagesPath}`);

const rawData = fs.readFileSync(pagesPath, 'utf8');
let pages = JSON.parse(rawData);

// --- 1. AI Course Update ---
const aiCourseSlug = 'nuevo-curso-online-fisica-y-metafisica-de-la-inteligencia-artificial';
const aiCourseTitle = 'FÍSICA Y METAFÍSICA DE LA INTELIGENCIA ARTIFICIAL';
const aiCourseContent = `
<div class="course-content">
    <blockquote style="border-left: 2px solid #c5a059; padding-left: 1rem; font-style: italic; margin-bottom: 2rem;">
        ¡Y cuántos dioses son todavía posibles!
        <footer style="margin-top: 0.5rem; font-size: 0.8em;">— Friedrich Nietzsche</footer>
    </blockquote>

    <p>Considero que los últimos avances en la inteligencia artificial suponen un salto cualitativo en la historia del ser humano (y por tanto en la historia de la vida y del universo en su conjunto). De hecho, esas inteligencias no humanas crearan otros modelos de universo. Y reescribirán también la historia de la producción de ese tipo de modelos: la así llamada historia de la ciencia.</p>

    <p>En cualquier caso, la inteligencia artificial es algo de enorme trascendencia, y no conozco nada más elevado para observarlo, para calibrarlo, para canalizarlo sabiamente, y hasta para amarlo, que la Filosofía. Siempre con mayúscula.</p>

    <p>Se nos presenta por lo tanto una gran oportunidad para vislumbrar, en lo posible, esa física y también metafísica Totalidad a la que aspira la razón humana, la cual parece estar condenada a volar hacia el infinito. Gloriosa condena.</p>

    <p>Sugiero en cualquier caso que mantengamos bien abiertos los ojos (y también el corazón) ante el sublime espectáculo que ofrece la gran fertilidad, y libertad, del Ser con mayúscula. Claro que pueden estar naciendo nuevos dioses. Hay fertilidad y creatividad de sobra para eso y para mucho más.</p>

    <p style="text-align: right; font-style: italic;">David López</p>

    <h3 style="margin-top: 3rem; margin-bottom: 1.5rem; text-transform: uppercase; color: #c5a059;">PROGRAMA</h3>

    <ol style="list-style-type: decimal; padding-left: 1.5rem; space-y: 1rem;">
        <li>Introducción. El salto cualitativo. ¿Qué ha pasado? ¿Hemos perdido el control? Las “cajas negras”: Los científicos ya no saben qué ocurre dentro de sus creaciones.</li>
        <li>Análisis del concepto binario “inteligencia-artificial” desde el sistema filosófico de Schopenhauer.</li>
        <li>Inteligencia humana. Inteligencia animal. ¿Son también artificiales? ¿Cuál sería el artífice? ¿Son las inteligencias humanas también “cajas negras“ para ellas mismas?</li>
        <li>¿Qué habría que entender por “inteligencia divina”? El Nous de Anaxágoras. La “Mente única” de Averroes. Taoísmo: “Somos el sueño de una libélula” (¿Sueño activo o pasivo?). Reflexiones sobre la Creación con mayúscula.</li>
        <li>¿Cabría hablar de consciencias artificiales? ¿Qué es la consciencia? Referencia a Edmund Husserl. El concepto de consciencia desde las Upanishads.</li>
        <li>¿Está naciendo una nueva divinidad? ¿Son varias? ¿Un nuevo Olimpo con nuevos dioses y nuevos demonios, hermanados o en guerra entre sí? Referencia a la mitología griega. El hombre y lo divino, de María Zambrano.</li>
        <li>Futuros posibles. Las teorías de la evolución de las especies (y del universo en su conjunto).</li>
        <li>Conclusiones.</li>
    </ol>

    <div style="margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem;">
        <p><strong>Importe del curso entero: 80 euros.</strong></p>
        <p>Esta cantidad incluye:</p>
        <ul style="list-style-type: disc; padding-left: 1.5rem;">
            <li>Grabaciones de todas las conferencias.</li>
            <li>Atención personalizada vía email.</li>
            <li>Bibliografía a la carta. Esto significa que cada alumno me tendrá a su entera disposición para responder a todas sus dudas y para aconsejarle sobre textos que pudieran ser de su especial interés.</li>
        </ul>
        <p style="margin-top: 1.5rem;">Ponte en contacto conmigo para más información:</p>
        <p><a href="mailto:contacto@davidlopez.info" style="color: #c5a059;">contacto@davidlopez.info</a></p>
    </div>
</div>
`;

let courseIndex = pages.findIndex(p => p.post_name === aiCourseSlug);
if (courseIndex !== -1) {
    console.log(`Updated existing AI Course page.`);
    pages[courseIndex].content = aiCourseContent;
    pages[courseIndex].title = aiCourseTitle;
} else {
    console.log(`Created new AI Course page.`);
    pages.push({
        title: aiCourseTitle,
        content: aiCourseContent,
        post_name: aiCourseSlug,
        post_date: new Date().toISOString(),
        status: 'publish',
        link: 'https://www.davidlopez.info/cursos/' + aiCourseSlug,
        excerpt: '',
        meta: []
    });
}

// --- 2. Book Page Update ---
const bookSlug = 'el-nuevo-filosofo-del-martillo-novela';
const bookLink = 'https://www.amazon.es/dp/B0CTHQFZFC?ref_=cm_sw_r_cp_ud_dp_3XRG999K7TN12DF1RZWV';
const bookImage = '/images/el_filosofo_cover.png'; // Path to public image

// Reconstruct book content with image
const bookContent = `
<div style="text-align: center; margin-bottom: 2rem;">
    <img src="${bookImage}" alt="El Filósofo del Martillo" style="max-width: 300px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />
</div>

<p>En el cielo de la civilización de comienzos del siglo XXI suenan de pronto, y con una fuerza insólita, los martillazos de Nietzsche. La filosofía, y también la extrema violencia, toman enseguida la calle.</p>

<p>Millones de dedos acusan a la editorial Metamorfosis, la cual ha puesto en marcha una campaña de promoción de las obras de Nietzsche cuyas dimensiones superan todo lo conocido.</p>

<p>En medio del desconcierto social, una filósofa española lucha por encontrar a un poderoso hombre de negocios al que ama con locura, y que, aparéntemente, la ha abandonado para convertirse en un vagabundo contemplativo. Ella, sin embargo, cree que ha sido secuestrado por exaltados nietzscheanos.</p>

<p>La investigación de la filósofa y, sobre todo, la enorme fuerza de su amor la llevarán a un lugar decisivo en la vida del filósofo del martillo: el Montesacro de Orta, en el norte de Italia.</p>

<p>“Fue el sueño más maravilloso de mi vida”, dijo Nietzsche muchos años después de subir con Lou Salomé a aquel lugar prodigioso.</p>

<p>Esta novela es una nueva versión de una obra del autor que, con el mismo título, fue publicada por la editorial Planeta en 2001.</p>

<p style="text-align: center; margin-top: 2rem;">
    <a href="${bookLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 1rem 2rem; border: 1px solid #c5a059; color: #c5a059; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none;">
        Comprar la novela en Amazon
    </a>
</p>
`;

let bookIndex = pages.findIndex(p => p.post_name === bookSlug);
if (bookIndex !== -1) {
    console.log(`Updated Book page.`);
    pages[bookIndex].content = bookContent;
} else {
    console.log(`Created Book page (should have existed).`);
    pages.push({
        title: 'EL FILÓSOFO DE MARTILLO (Novela)',
        content: bookContent,
        post_name: bookSlug,
        post_date: new Date().toISOString(),
        status: 'publish',
        link: 'https://www.davidlopez.info/' + bookSlug,
        excerpt: '',
        meta: []
    });
}

fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
console.log('content-extraction/pages.json updated successfully with new content.');
