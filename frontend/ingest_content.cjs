
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const newData = [
    {
        post_id: 9901,
        title: "Filósofos míticos del mítico siglo XX: Simone Weil",
        post_name: "simone-weil-primeras-notas",
        content: `
            <p><img src="https://www.davidlopez.info/wp-content/uploads/2013/07/simoneweil.jpg" alt="Simone Weil" class="aligncenter" /></p>
            <p>Simone Weil. Una preciosa mujer, una hipertrofia de la inteligencia y del amor: una hipertrofia de la humana capacidad de sacralizar al otro ser humano.</p>
            <p>Un labios bellísimos, muy sensuales, dibujados con un pincel prodigioso. Unos labios que, al parecer, nadie besó.</p>
            <p>El filósofo (a diferencia del “sabio”) ama lo que no sabe, sacraliza lo otro de lo ya conocido, ama el deseo en sí… el deseo de Verdad. El filósofo ama la Verdad. Quisiera tener una reproducción exacta del Ser en su mente. Por eso estudia tanto. Por eso pregunta y escucha tanto. Por eso no le vale cualquier cosa: todo modelo le parece pequeño en comparación con lo que intuye que de verdad está pasando. Con lo que de verdad hay.</p>
            <p>El místico del amor (Simone Weil por ejemplo) incendia ese amor intelectual con el respeto a los demás seres humanos. El respeto…</p>
            <p>Para Simone Weil el sufrimiento ajeno es muchísimo más doloroso que el propio. El propio es asumible, es incluso recibido como un regalo, como una sacra energía. El problema es aceptar el sufrimiento del otro, que es el que duele de forma atroz, que es el que parece negar el sentido de cualquier teología y, sobre todo, de cualquier teodicea.</p>
            <p>Simone Weil me ayudó hace años a engranar la Mística con la Magia (dos temas fundamentales de mi Filosofía).&nbsp;La clave está en la dualidad Gravedad-Gracia, dualidad decisiva en mi concepción de lo que aquí está ocurriendo y en mi análisis metafísico de la Magia a través de las obras de Schopenhauer.</p>
            <p>“El hombre que tiene contacto con lo sobrenatural es por esencia un rey, porque es la presencia dentro de la sociedad de algo que está por encima de la sociedad”.</p>
        `,
        category: "Filósofos Míticos"
    },
    {
        post_id: 9902,
        title: "Pensadores vivos: Habermas",
        post_name: "pensadores-vivos-habernas",
        content: `
            <p><img src="https://www.davidlopez.info/wp-content/uploads/2014/04/Habermans11_14113765000-200x300.jpg" alt="Habermas" class="aligncenter" /></p>
            <p>Jürgen Habermas -Düsseldorf, 1929- cree que podemos elevar la Humanidad -salvarla, o seguirla salvando- a través de un diálogo libre e igualitario que sea asistido por la Razón: una misteriosa fuerza que nos puede asistir, con la que podemos conectar. O no.</p>
            <p>¿Dónde está esa fuerza que se invoca en el dialogar humano? ¿Puede existir fuera de “lo humano”? ¿Cabe no ser “racional”, es decir “lógico”? ¿Cabe aislarse del prodigioso orden que se dice que lo vertebra todo, incluyendo en ese “todo” el pensar y el dialogar humanos?</p>
            <p>Sugiero la lectura de mi bailarina lógica “Logos” [<a href="/logos">Véase</a>]. El Logos, según Heráclito, “no quiere y quiere verse llamado Zeus”. ¿Dios? ¿Un Dios impersonal pero omnipotente? ¿Es eso “la Razón”?</p>
            <p>Hay pensadores que, de hecho, le han preguntado a la Razón si Dios puede existir o no: si es lógico, si tiene sentido, si cabe pensarlo, hablar de Él, con lógica. Porque, al parecer, solo lo lógico tendría posibilidad de existir, de desplegarse ahí, ante una conciencia.</p>
        `,
        category: "Pensadores Vivos"
    },
    {
        post_id: 9903,
        title: "Pensadores vivos: Noam Chomsky",
        post_name: "pensadores-vivos-noam-chomsky-primeras-notas-sueltas",
        content: `
            <p><img src="https://www.davidlopez.info/wp-content/uploads/2013/09/noam-chomsky-2.jpg" alt="Chomsky" class="aligncenter" /></p>
            <p>Chomsky (Logical Structure of Linguistic Theory) piensa, dice -condicionado por la gramática genéticamente inserta en su cerebro-, que todos los seres humanos son la misma criatura, y que comparten una gramática básica, generativa, transformacional: algo así como un mecanismo biológico, innato, recibido genéticamente, que les permite crear frases gramaticalmente correctas, infinitas frases nunca antes creadas; y hacerlo además muy pronto, en la primera infancia, sin recibir la suficiente formación para ello, sin que haya proporción entre los estímulos lingüísticos exteriores y las sorprendentes expresiones que enseguida se configuran.</p>
            <p>Estaríamos ante una especie de programación que es anterior a la influencia cultural, ante unas leyes prenatales que condicionarían todo lo que podemos decir, lo cual sería, además, infinito.</p>
            <p>Chomsky cree en la idea de una gramática universal, subyacente en todos los lenguajes humanos: una idea ya defendida por Roger Bacon en el siglo XIII d.C.</p>
        `,
        category: "Pensadores Vivos"
    }
];

posts.push(...newData);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4));
console.log('Ingested 3 new pages into posts.json');
