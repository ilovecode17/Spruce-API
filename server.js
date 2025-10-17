const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

app.use(limiter);

const musicData = [
  { id: 1, era: "Ancient", title: "The Epic of Gilgamesh", region: "Sumerian", composer: "", year: "2100 BC", youtube: "https://youtu.be/FTG5lhtJ5rE", wikipedia: "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh", spotify: "", lyrics: "" },
  { id: 2, era: "Ancient", title: "Hymn of Lipit Ishtar", region: "Sumerian", composer: "", year: "1950 BC", youtube: "https://youtu.be/JX129g7QJTI", wikipedia: "https://en.wikipedia.org/wiki/Lipit-Ishtar", spotify: "", lyrics: "" },
  { id: 3, era: "Ancient", title: "Ancient Egyptian Love Song", region: "", composer: "", year: "1500 BC", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 4, era: "Ancient", title: "Hurrian Hymn No. 6 to Nikkal", region: "", composer: "", year: "1400 BC", youtube: "https://youtu.be/QpxN2VXPMLc", wikipedia: "https://en.wikipedia.org/wiki/Hurrian_songs", spotify: "", lyrics: "" },
  { id: 5, era: "Ancient", title: "Sāmaveda: Of the Vedas I am the Sama", region: "India", composer: "", year: "1100 BC", youtube: "", wikipedia: "https://en.wikipedia.org/wiki/Samaveda", spotify: "", lyrics: "" },
  { id: 6, era: "Ancient", title: "Ancient Celtic Pipe Music", region: "", composer: "", year: "1000 BC", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 7, era: "Ancient", title: "Hebrew Chanting Psalm 95", region: "", composer: "", year: "900 BC", youtube: "https://youtu.be/HEfF8fr5stY", wikipedia: "https://en.wikipedia.org/wiki/Psalm_95", spotify: "", lyrics: "" },
  { id: 8, era: "Ancient", title: "The Illiad", region: "Greece", composer: "By Homer", year: "800 BC", youtube: "https://youtu.be/qI0mkt6Z3I0", wikipedia: "https://en.wikipedia.org/wiki/Iliad", spotify: "", lyrics: "" },
  { id: 9, era: "Ancient", title: "You Lan", region: "China", composer: "", year: "500 BC", youtube: "https://youtu.be/YPqX2rgCAok", wikipedia: "", spotify: "", lyrics: "" },
  { id: 10, era: "Ancient", title: "Stasimon Chorus from Orestes", region: "Greece", composer: "By Euripides", year: "400 BC", youtube: "https://youtu.be/3cZyv7UgbOOY", wikipedia: "", spotify: "", lyrics: "" },
  { id: 11, era: "Ancient", title: "Traditional Chinese Music at Han Dynasty", region: "China", composer: "", year: "300 BC", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 12, era: "Ancient", title: "Seikilos Epitaph", region: "Greece", composer: "", year: "200 BC", youtube: "https://youtu.be/mGfOHoun0OQ", wikipedia: "https://en.wikipedia.org/wiki/Seikilos_epitaph", spotify: "", lyrics: "" },
  { id: 13, era: "Ancient", title: "Ancient Roman Lyre Music", region: "Italy", composer: "", year: "100 BC", youtube: "https://youtu.be/COpe-Nq6QaY", wikipedia: "", spotify: "", lyrics: "" },
  { id: 14, era: "Ancient", title: "Flaccus - Unnamed Roman Song", region: "Italy", composer: "", year: "0 AD", youtube: "https://youtu.be/D01lgDlbsy0", wikipedia: "", spotify: "", lyrics: "" },
  { id: 15, era: "Ancient", title: "Mesomedes of Crete - Hymn to Nemesis", region: "Greece", composer: "", year: "100 AD", youtube: "https://youtu.be/U7DnGQqlVsI", wikipedia: "", spotify: "", lyrics: "" },
  { id: 16, era: "Ancient", title: "Oxyrhynchus Hymn (Earliest Christian Tune)", region: "", composer: "", year: "250 AD", youtube: "https://youtu.be/ksqqcBanAhs", wikipedia: "", spotify: "", lyrics: "" },
  { id: 17, era: "Ancient", title: "Te Deum (Christian Hymn)", region: "", composer: "", year: "400 AD", youtube: "https://youtu.be/mkzzqcuMpEs", wikipedia: "", spotify: "", lyrics: "" },
  { id: 18, era: "Medieval", title: "Kyrie Eleison", region: "Greece", composer: "Byzantine Chant", year: "500 AD", youtube: "https://youtu.be/ZXF1XXR-VkY", wikipedia: "https://www.christianity.com/wiki/christian-terms/kyrie-eleison-meaning-and-use-in-christianity.html", spotify: "", lyrics: "" },
  { id: 19, era: "Medieval", title: "Hymn of the Nativity", region: "Greece", composer: "By St. Romanos the Melodist", year: "600 AD", youtube: "https://youtu.be/MvjiVam2HO4", wikipedia: "", spotify: "", lyrics: "" },
  { id: 20, era: "Medieval", title: "Christmas Gradual Viderunt Omnes", region: "", composer: "", year: "700 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 21, era: "Medieval", title: "Musica Enchiriadis (Organum)", region: "", composer: "", year: "800 AD", youtube: "https://youtu.be/E6CVxtPcW78", wikipedia: "https://en.wikipedia.org/wiki/Musica_enchiriadis", spotify: "", lyrics: "" },
  { id: 22, era: "Medieval", title: "O Aggelos Eboa", region: "Greece", composer: "Byzantine Chant", year: "900 AD", youtube: "https://youtu.be/XKx4ZElfHuk", wikipedia: "", spotify: "", lyrics: "" },
  { id: 23, era: "Medieval", title: "Tempus est Iocundum \"Codex Buranus. 179\"", region: "", composer: "", year: "1000 AD", youtube: "https://youtu.be/x9fBEOC3ujw", wikipedia: "", spotify: "", lyrics: "" },
  { id: 24, era: "Medieval", title: "Salve Regina (Gregorian Chant)", region: "", composer: "", year: "1050 AD", youtube: "https://youtu.be/Tu7LIZJqA5M", wikipedia: "https://en.wikipedia.org/wiki/Salve_Regina", spotify: "", lyrics: "" },
  { id: 25, era: "Medieval", title: "Pos de Chantar M'es Pres Talenz", region: "", composer: "By William IX", year: "1100 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 26, era: "Medieval", title: "Ja Nus Hons Pris", region: "UK", composer: "By Richard the Lionheart", year: "1150 AD", youtube: "https://youtu.be/ejYmffwkuqo", wikipedia: "", spotify: "", lyrics: "" },
  { id: 27, era: "Medieval", title: "Organum Duplum", region: "", composer: "By Léonin", year: "1200 AD", youtube: "https://youtu.be/_p9WQlyVPrA", wikipedia: "", spotify: "", lyrics: "" },
  { id: 28, era: "Medieval", title: "Chinggis Khaanii Magtal", region: "Mongolia", composer: "", year: "1210 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 29, era: "Medieval", title: "Mirie It Is While Sumer Ilast", region: "England", composer: "", year: "1225 AD", youtube: "https://youtu.be/7UvesKl8_W8", wikipedia: "", spotify: "", lyrics: "" },
  { id: 30, era: "Medieval", title: "Dies Irae", region: "Byzantine Chant", composer: "", year: "1250 AD", youtube: "https://youtu.be/2OBB5-bP6qs", wikipedia: "", spotify: "", lyrics: "" },
  { id: 31, era: "Medieval", title: "Rókatáne", region: "", composer: "Anonymous Hungarian Dance", year: "1300 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 32, era: "Medieval", title: "Messe de Nostre Dame", region: "", composer: "By Guillaume de Machaut", year: "", youtube: "https://youtu.be/Y47JdUI_PhE", wikipedia: "https://en.wikipedia.org/wiki/Messe_de_Nostre_Dame", spotify: "", lyrics: "" },
  { id: 33, era: "Medieval", title: "La Rotta", region: "Italy", composer: "By Lamento di Tristano", year: "1380 AD", youtube: "https://youtu.be/TkP2Z73Rm7w", wikipedia: "", spotify: "", lyrics: "" },
  { id: 34, era: "Renaissance", title: "Missa L'homme armé", region: "France", composer: "By Guillaume Dufay", year: "1440 AD", youtube: "https://youtu.be/ibSeyIbNGYA", wikipedia: "", spotify: "", lyrics: "" },
  { id: 35, era: "Renaissance", title: "Salve Regina", region: "France", composer: "By Johannes Ockeghem", year: "1450 AD", youtube: "https://youtu.be/Ospfv3AP1_c", wikipedia: "", spotify: "", lyrics: "" },
  { id: 36, era: "Renaissance", title: "Lamentations of Jeremiah", region: "France", composer: "By Johannes Ockeghem", year: "1460 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 37, era: "Renaissance", title: "Alma Redemptoris Mater", region: "Italy", composer: "By Josquin des Prez", year: "1470 AD", youtube: "https://youtu.be/Zo8qYNMwCqM", wikipedia: "", spotify: "", lyrics: "" },
  { id: 38, era: "Renaissance", title: "Ave Maria … Virgo Serena", region: "Italy", composer: "By Josquin des Prez", year: "1485 AD", youtube: "https://youtu.be/7iblmcdCSgU", wikipedia: "https://en.wikipedia.org/wiki/Ave_Maria_..._virgo_serena", spotify: "", lyrics: "" },
  { id: 39, era: "Renaissance", title: "Missa Se la face ay pale", region: "Italy", composer: "By Josquin des Prez", year: "1490 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 40, era: "Renaissance", title: "El Grillo", region: "Italy", composer: "By Josquin des Prez", year: "1500 AD", youtube: "https://youtu.be/OI-bQ0RkArA", wikipedia: "", spotify: "", lyrics: "" },
  { id: 41, era: "Renaissance", title: "La Spagna", region: "Italy", composer: "Anonymous", year: "1510 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 42, era: "Renaissance", title: "Mille Regretz", region: "France", composer: "By Josquin des Prez", year: "1520 AD", youtube: "https://youtu.be/107gP2moTKM", wikipedia: "", spotify: "", lyrics: "" },
  { id: 43, era: "Renaissance", title: "Tant que vivray", region: "France", composer: "By Claudin de Sermisy", year: "1528 AD", youtube: "https://youtu.be/xxHkPm4TP5c", wikipedia: "", spotify: "", lyrics: "" },
  { id: 44, era: "Renaissance", title: "Il Bianco e Dolce Cigno", region: "Italy", composer: "By Jacques Arcadelt", year: "1538 AD", youtube: "https://youtu.be/juAw5n6rRUc", wikipedia: "", spotify: "", lyrics: "" },
  { id: 45, era: "Renaissance", title: "If Ye Love Me", region: "England", composer: "By Thomas Tallis", year: "1549 AD", youtube: "https://youtu.be/eqt005j1dB0", wikipedia: "https://en.wikipedia.org/wiki/If_ye_love_me", spotify: "", lyrics: "" },
  { id: 46, era: "Renaissance", title: "Missa Papae Marcelli", region: "Italy", composer: "By Giovanni Pierluigi da Palestrina", year: "1562 AD", youtube: "https://youtu.be/3n8XdKkrqgo", wikipedia: "https://en.wikipedia.org/wiki/Missa_Papae_Marcelli", spotify: "", lyrics: "" },
  { id: 47, era: "Renaissance", title: "Spem in Alium", region: "England", composer: "By Thomas Tallis", year: "1570 AD", youtube: "https://youtu.be/iT-ZAAi4UQQ", wikipedia: "https://en.wikipedia.org/wiki/Spem_in_alium", spotify: "", lyrics: "" },
  { id: 48, era: "Renaissance", title: "O Magnum Mysterium", region: "Italy", composer: "By Tomas Luis de Victoria", year: "1580 AD", youtube: "https://youtu.be/9xPh-fXYAc4", wikipedia: "", spotify: "", lyrics: "" },
  { id: 49, era: "Renaissance", title: "Moro, lasso, al mio duolo", region: "Italy", composer: "By Carlo Gesualdo", year: "1590 AD", youtube: "https://youtu.be/6dVPu71D8VI", wikipedia: "", spotify: "", lyrics: "" },
  { id: 50, era: "Renaissance", title: "Flow My Tears", region: "England", composer: "By John Dowland", year: "1600 AD", youtube: "https://youtu.be/9_HOKhNvLpw", wikipedia: "https://en.wikipedia.org/wiki/Flow,_my_tears", spotify: "", lyrics: "" },
  { id: 51, era: "Baroque", title: "Dido's Lament", region: "England", composer: "By Henry Purcell", year: "1600 AD", youtube: "https://youtu.be/uGQq3HcOB0Y", wikipedia: "https://en.wikipedia.org/wiki/Dido%27s_Lament", spotify: "", lyrics: "" },
  { id: 52, era: "Baroque", title: "L'Orfeo", region: "Italy", composer: "By Claudio Monteverdi", year: "1607 AD", youtube: "https://youtu.be/jb2TURdBeEQ", wikipedia: "https://en.wikipedia.org/wiki/L%27Orfeo", spotify: "", lyrics: "" },
  { id: 53, era: "Baroque", title: "Toccata and Fugue in D minor", region: "Germany", composer: "By J.S. Bach", year: "1610 AD", youtube: "https://youtu.be/ho9rZjlsyYY", wikipedia: "https://en.wikipedia.org/wiki/Toccata_and_Fugue_in_D_minor,_BWV_565", spotify: "", lyrics: "" },
  { id: 54, era: "Baroque", title: "Sacrae Symphoniae", region: "Italy", composer: "By Giovanni Gabrieli", year: "1615 AD", youtube: "https://youtu.be/CBobif_00UA", wikipedia: "", spotify: "", lyrics: "" },
  { id: 55, era: "Baroque", title: "Il Combattimento di Tancredi e Clorinda", region: "Italy", composer: "By Claudio Monteverdi", year: "1624 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 56, era: "Baroque", title: "Fiori musicali", region: "Italy", composer: "By Girolamo Frescobaldi", year: "1635 AD", youtube: "https://youtu.be/NZgqivymggQ", wikipedia: "https://en.wikipedia.org/wiki/Il_combattimento_di_Tancredi_e_Clorinda", spotify: "", lyrics: "" },
  { id: 57, era: "Baroque", title: "The Triumph of Peace", region: "UK", composer: "By Thomas Brewer", year: "1649 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 58, era: "Baroque", title: "Canon in D Major", region: "Germany", composer: "By Johann Pachelbel", year: "1680 AD", youtube: "https://youtu.be/NlprozGcs80", wikipedia: "https://en.wikipedia.org/wiki/Pachelbel%27s_Canon", spotify: "", lyrics: "" },
  { id: 59, era: "Baroque", title: "Music for the Funeral of Queen Mary", region: "UK", composer: "By Henry Purcell", year: "1695 AD", youtube: "https://youtu.be/kBP6Yxt5QTI", wikipedia: "https://en.wikipedia.org/wiki/Funeral_Sentences_and_Music_for_the_Funeral_of_Queen_Mary", spotify: "", lyrics: "" },
  { id: 60, era: "Baroque", title: "Brandenburg Concerto No. 3", region: "Germany", composer: "By J.S. Bach", year: "1721 AD", youtube: "https://youtu.be/Czsd13Mmcg0", wikipedia: "https://en.wikipedia.org/wiki/Brandenburg_Concertos", spotify: "", lyrics: "" },
  { id: 61, era: "Baroque", title: "The Four Seasons", region: "Italy", composer: "By Antonio Vivaldi", year: "1723 AD", youtube: "https://youtu.be/GRxofEmo3HA", wikipedia: "https://en.wikipedia.org/wiki/The_Four_Seasons_(Vivaldi)", spotify: "", lyrics: "" },
  { id: 62, era: "Baroque", title: "St. Matthew Passion", region: "Germany", composer: "By J.S. Bach", year: "1727 AD", youtube: "https://youtu.be/j4Efeafzv9c", wikipedia: "https://en.wikipedia.org/wiki/St_Matthew_Passion", spotify: "", lyrics: "" },
  { id: 63, era: "Baroque", title: "Coronation Anthem Zadok the Priest", region: "UK", composer: "By George Frideric Handel", year: "1727 AD", youtube: "https://youtu.be/5xWhclVLQyI", wikipedia: "https://en.wikipedia.org/wiki/Zadok_the_Priest", spotify: "", lyrics: "" },
  { id: 64, era: "Baroque", title: "Messiah", region: "UK/Ireland", composer: "By George Frideric Handel", year: "1742 AD", youtube: "https://youtu.be/juckXS8PktE", wikipedia: "https://en.wikipedia.org/wiki/Messiah_(Handel)", spotify: "", lyrics: "" },
  { id: 65, era: "Baroque", title: "Music for the Royal Fireworks", region: "UK", composer: "By George Frideric Handel", year: "1749 AD", youtube: "https://youtu.be/mEiyiZ6fhqY", wikipedia: "https://en.wikipedia.org/wiki/Music_for_the_Royal_Fireworks", spotify: "", lyrics: "" },
  { id: 66, era: "Classical", title: "Keyboard Concerto in D minor", region: "Austria", composer: "By C.P.E. Bach", year: "1760 AD", youtube: "", wikipedia: "", spotify: "https://en.wikipedia.org/wiki/C._P._E._Bach", lyrics: "" },
  { id: 67, era: "Classical", title: "Symphony No. 25", region: "Austria", composer: "By W.A. Mozart", year: "1773 AD", youtube: "", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._25_(Mozart)", spotify: "", lyrics: "" },
  { id: 68, era: "Classical", title: "Le nozze di Figaro", region: "Austria", composer: "By W.A. Mozart", year: "1786 AD", youtube: "https://youtu.be/lT7iLG-UCdE", wikipedia: "https://en.wikipedia.org/wiki/The_Marriage_of_Figaro", spotify: "", lyrics: "" },
  { id: 69, era: "Classical", title: "Symphony No. 40", region: "Austria", composer: "By W.A. Mozart", year: "1788 AD", youtube: "https://youtu.be/JTc1mDieQI8", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._40_(Mozart)", spotify: "", lyrics: "" },
  { id: 70, era: "Classical", title: "Symphony No. 94 Surprise", region: "Austria", composer: "By J. Haydn", year: "1791 AD", youtube: "https://youtu.be/tF5kr251BRs", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._94_(Haydn)", spotify: "", lyrics: "" },
  { id: 71, era: "Classical", title: "Piano Sonata No. 8 Pathétique", region: "Germany", composer: "By L. van Beethoven", year: "1798 AD", youtube: "https://youtu.be/0E0PzSe7wUU", wikipedia: "https://en.wikipedia.org/wiki/Piano_Sonata_No._8_(Beethoven)", spotify: "", lyrics: "" },
  { id: 72, era: "Classical", title: "Symphony No. 1", region: "Germany", composer: "By L. van Beethoven", year: "1800 AD", youtube: "https://youtu.be/example", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._1_(Beethoven)", spotify: "", lyrics: "" },
  { id: 73, era: "Classical", title: "Symphony No. 5", region: "Germany", composer: "By L. van Beethoven", year: "1808 AD", youtube: "https://youtu.be/example", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._5_(Beethoven)", spotify: "", lyrics: "" },
  { id: 74, era: "Classical", title: "Symphony No. 6 Pastoral", region: "Germany", composer: "By L. van Beethoven", year: "1808 AD", youtube: "https://youtu.be/example", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._6_(Beethoven)", spotify: "", lyrics: "" },
  { id: 75, era: "Classical", title: "Piano Concerto No. 5 Emperor", region: "Germany", composer: "By L. van Beethoven", year: "1810 AD", youtube: "https://youtu.be/example", wikipedia: "https://en.wikipedia.org/wiki/Piano_Concerto_No._5_(Beethoven)", spotify: "", lyrics: "" },
  { id: 76, era: "Classical", title: "Symphony No. 7", region: "Germany", composer: "By L. van Beethoven", year: "1812 AD", youtube: "https://youtu.be/example", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._7_(Beethoven)", spotify: "", lyrics: "" },
  { id: 77, era: "Classical", title: "Symphony No. 9", region: "Germany", composer: "By L. van Beethoven", year: "1820 AD", youtube: "https://youtu.be/example", wikipedia: "https://en.wikipedia.org/wiki/Symphony_No._9_(Beethoven)", spotify: "", lyrics: "" },
  { id: 78, era: "Romantic", title: "Romance in F Major", region: "Austria", composer: "By Franz Schubert", year: "1820 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 79, era: "Romantic", title: "Piano Sonata No. 21 Waldstein", region: "Germany", composer: "By L. van Beethoven", year: "1825 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 80, era: "Romantic", title: "Symphony No. 3 Eroica", region: "Germany", composer: "By L. van Beethoven", year: "1830 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 81, era: "Romantic", title: "Nocturne Op. 9 No. 2", region: "Poland", composer: "By Frédéric Chopin", year: "1832 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 82, era: "Romantic", title: "Symphony No. 4", region: "Germany", composer: "By Robert Schumann", year: "1841 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 83, era: "Romantic", title: "Liebesträume No. 3", region: "Hungary", composer: "By Franz Liszt", year: "1850 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 84, era: "Romantic", title: "Ride of the Valkyries", region: "Germany", composer: "By Richard Wagner", year: "1856 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 85, era: "Romantic", title: "The Blue Danube", region: "Austria", composer: "By Johann Strauss II", year: "1867 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 86, era: "Romantic", title: "Symphony No. 6 Pathétique", region: "Russia", composer: "By Pyotr Ilyich Tchaikovsky", year: "1893 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 87, era: "Romantic", title: "Piano Concerto No. 2", region: "Russia", composer: "By Sergei Rachmaninoff", year: "1900 AD", youtube: "", wikipedia: "", spotify: "", lyrics: "" },
  { id: 88, era: "Popular", title: "Danse Macabre", region: "France", composer: "By Camille Saint-Saëns", year: "1900 AD", youtube: "https://youtu.be/YyknBTm_YyM", wikipedia: "", spotify: "", lyrics: "" },
  { id: 89, era: "Popular", title: "The Rite of Spring", region: "Russia", composer: "By Igor Stravinsky", year: "1913 AD", youtube: "https://youtu.be/kr-wKqy5HnU", wikipedia: "https://en.wikipedia.org/wiki/The_Rite_of_Spring", spotify: "", lyrics: "" },
  { id: 90, era: "Popular", title: "Charleston", region: "USA", composer: "By James P. Johnson", year: "1925 AD", youtube: "https://youtu.be/4ajtCKLTOiM", wikipedia: "https://en.wikipedia.org/wiki/Charleston_(1923_song)", spotify: "", lyrics: "" },
  { id: 91, era: "Popular", title: "Over the Rainbow", region: "USA", composer: "By Judy Garland", year: "1939 AD", youtube: "https://youtu.be/YdvV-uKef_A", wikipedia: "https://en.wikipedia.org/wiki/Over_the_Rainbow", spotify: "https://open.spotify.com/track/568SEFtDjKr7N2PytpA6D5", lyrics: "https://genius.com/Judy-garland-over-the-rainbow-lyrics" },
  { id: 92, era: "Popular", title: "White Christmas", region: "USA", composer: "By Bing Crosby", year: "1942 AD", youtube: "https://youtu.be/v5ryZdpEHqM", wikipedia: "https://en.wikipedia.org/wiki/White_Christmas_(song)", spotify: "https://open.spotify.com/track/3hScEmuagcQ0TvoJa5oFyI", lyrics: "https://genius.com/Bing-crosby-white-christmas-lyrics" },
  { id: 93, era: "Popular", title: "Rock Around the Clock", region: "USA", composer: "By Bill Haley & His Comets", year: "1954 AD", youtube: "https://youtu.be/ZgdufzXvjqw", wikipedia: "https://en.wikipedia.org/wiki/Rock_Around_the_Clock", spotify: "https://open.spotify.com/track/34AmZ4PMz9iNZVp9AMIGZj", lyrics: "https://www.azlyrics.com/lyrics/billhaleyhiscomets/rockaroundtheclock.html" },
  { id: 94, era: "Popular", title: "I Want to Hold Your Hand", region: "UK", composer: "By The Beatles", year: "1963 AD", youtube: "https://youtu.be/jenWdylTtzs", wikipedia: "https://en.wikipedia.org/wiki/I_Want_to_Hold_Your_Hand", spotify: "https://open.spotify.com/track/4pbG9SUmWIvsROVLF0zF9s", lyrics: "https://genius.com/The-beatles-i-want-to-hold-your-hand-lyrics" },
  { id: 95, era: "Popular", title: "Stayin' Alive", region: "USA", composer: "By Bee Gees", year: "1977 AD", youtube: "https://youtu.be/fNFzfwLM72c", wikipedia: "https://en.wikipedia.org/wiki/Stayin%27_Alive", spotify: "https://open.spotify.com/track/4UDmDIqJIbrW0hMBQMFOsM", lyrics: "https://genius.com/Bee-gees-stayin-alive-lyrics" },
  { id: 96, era: "Popular", title: "Billie Jean", region: "USA", composer: "By Michael Jackson", year: "1983 AD", youtube: "https://youtu.be/Zi_XLOBDo_Y", wikipedia: "https://en.wikipedia.org/wiki/Billie_Jean", spotify: "https://open.spotify.com/track/7J1uxwnxfQLu4APicE5Rnj", lyrics: "https://genius.com/Michael-jackson-billie-jean-lyrics" },
  { id: 97, era: "Popular", title: "Smells Like Teen Spirit", region: "USA", composer: "By Nirvana", year: "1991 AD", youtube: "https://youtu.be/hTWKbfoikeg", wikipedia: "https://en.wikipedia.org/wiki/Smells_Like_Teen_Spirit", spotify: "https://open.spotify.com/track/4CeeEOM32jQcH3eN9Q2dGj", lyrics: "https://genius.com/Nirvana-smells-like-teen-spirit-lyrics" },
  { id: 98, era: "Popular", title: "Crazy in Love", region: "USA", composer: "By Beyoncé ft. Jay-Z", year: "2003 AD", youtube: "https://youtu.be/ViwtNLUqkMY", wikipedia: "https://en.wikipedia.org/wiki/Crazy_in_Love", spotify: "https://open.spotify.com/track/5IVuqXILoxVWvWEPm82Jxr", lyrics: "https://genius.com/Beyonce-crazy-in-love-lyrics" },
  { id: 99, era: "Popular", title: "Uptown Funk", region: "USA", composer: "By Mark Ronson ft. Bruno Mars", year: "2014 AD", youtube: "https://youtu.be/OPf0YbXqDm0", wikipedia: "https://en.wikipedia.org/wiki/Uptown_Funk", spotify: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS", lyrics: "https://genius.com/Mark-ronson-uptown-funk-lyrics" },
  { id: 100, era: "Popular", title: "Blinding Lights", region: "Canada", composer: "By The Weeknd", year: "2020 AD", youtube: "https://youtu.be/4NRXx6U8ABQ", wikipedia: "https://en.wikipedia.org/wiki/Blinding_Lights", spotify: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b", lyrics: "https://genius.com/The-weeknd-blinding-lights-lyrics" }
];

const parseYear = (yearString) => {
  if (!yearString) return null;
  const cleaned = yearString.trim();
  if (cleaned.includes('BC')) {
    return -parseInt(cleaned.replace('BC', '').trim());
  } else if (cleaned.includes('AD')) {
    return parseInt(cleaned.replace('AD', '').trim());
  }
  return parseInt(cleaned);
};

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Spruce API - Musical Time Travel",
    version: "1.0.0",
    endpoints: {
      songs: {
        getAll: "GET /api/songs",
        getById: "GET /api/songs/:id",
        getByYear: "GET /api/songs/year/:year",
        getByEra: "GET /api/songs/era/:era",
        search: "GET /api/songs/search?q=query"
      },
      eras: "GET /api/eras",
      stats: "GET /api/stats"
    },
    documentation: "https://github.com/spruce/api"
  });
});

app.get('/api/songs', (req, res) => {
  const { page = 1, limit = 100, sort = 'id' } = req.query;
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  
  let sortedData = [...musicData];
  
  if (sort === 'year') {
    sortedData.sort((a, b) => {
      const yearA = parseYear(a.year);
      const yearB = parseYear(b.year);
      return yearA - yearB;
    });
  } else if (sort === 'title') {
    sortedData.sort((a, b) => a.title.localeCompare(b.title));
  }
  
  const paginatedData = sortedData.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    count: paginatedData.length,
    total: musicData.length,
    page: parseInt(page),
    totalPages: Math.ceil(musicData.length / parseInt(limit)),
    data: paginatedData
  });
});

app.get('/api/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const song = musicData.find(s => s.id === id);
  
  if (!song) {
    return res.status(404).json({
      success: false,
      error: 'Song not found'
    });
  }
  
  res.json({
    success: true,
    data: song
  });
});

app.get('/api/songs/year/:year', (req, res) => {
  const targetYear = req.params.year;
  const songs = musicData.filter(s => s.year === targetYear);
  
  res.json({
    success: true,
    count: songs.length,
    data: songs
  });
});

app.get('/api/songs/closest/:year', (req, res) => {
  const eraParam = req.query.era || 'AD';
  const yearNum = parseInt(req.params.year);
  const targetYear = eraParam === 'BC' ? -yearNum : yearNum;
  
  let closest = null;
  let minDiff = Infinity;
  
  for (const song of musicData) {
    const songYear = parseYear(song.year);
    if (songYear === null) continue;
    
    const diff = Math.abs(songYear - targetYear);
    if (diff < minDiff) {
      minDiff = diff;
      closest = song;
    }
  }
  
  if (!closest) {
    return res.status(404).json({
      success: false,
      error: 'No songs found'
    });
  }
  
  res.json({
    success: true,
    searchYear: `${yearNum} ${eraParam}`,
    difference: minDiff,
    data: closest
  });
});

app.get('/api/songs/era/:era', (req, res) => {
  const era = req.params.era;
  const songs = musicData.filter(s => 
    s.era.toLowerCase() === era.toLowerCase()
  );
  
  res.json({
    success: true,
    era: era,
    count: songs.length,
    data: songs
  });
});

app.get('/api/songs/search', (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'Search query parameter "q" is required'
    });
  }
  
  const searchTerm = query.toLowerCase();
  const results = musicData.filter(song => 
    song.title.toLowerCase().includes(searchTerm) ||
    song.composer.toLowerCase().includes(searchTerm) ||
    song.region.toLowerCase().includes(searchTerm) ||
    song.era.toLowerCase().includes(searchTerm)
  );
  
  res.json({
    success: true,
    query: query,
    count: results.length,
    data: results
  });
});

app.get('/api/eras', (req, res) => {
  const eras = [...new Set(musicData.map(s => s.era))];
  const eraStats = eras.map(era => {
    const songs = musicData.filter(s => s.era === era);
    return {
      era: era,
      count: songs.length,
      songs: songs.map(s => ({ id: s.id, title: s.title, year: s.year }))
    };
  });
  
  res.json({
    success: true,
    count: eras.length,
    data: eraStats
  });
});

app.get('/api/stats', (req, res) => {
  const stats = {
    totalSongs: musicData.length,
    eras: [...new Set(musicData.map(s => s.era))].length,
    regions: [...new Set(musicData.map(s => s.region).filter(r => r))].length,
    withYouTube: musicData.filter(s => s.youtube).length,
    withWikipedia: musicData.filter(s => s.wikipedia).length,
    withSpotify: musicData.filter(s => s.spotify).length,
    withLyrics: musicData.filter(s => s.lyrics).length,
    byEra: {}
  };
  
  const eras = [...new Set(musicData.map(s => s.era))];
  eras.forEach(era => {
    stats.byEra[era] = musicData.filter(s => s.era === era).length;
  });
  
  res.json({
    success: true,
    data: stats
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Spruce API running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});