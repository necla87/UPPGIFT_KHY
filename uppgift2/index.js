import Musician from './musician.js';
import Band from './band.js';


const musicians = Musician.loadMusiciansFromJSON('./musicians.json');
const bands = Band.loadBandsFromJSON('./bands.json');

const ajdaPekkan = new Musician('Ajda Pekkan', 'Turkish pop artist', 1946);
ajdaPekkan.addInstrument('Vocal');
ajdaPekkan.addBand('The Club Cats', 1961, ['Vocal']);
musicians.push(ajdaPekkan);

const ceza = new Musician('Ceza', 'Turkish rapper', 1977);
ceza.addInstrument('Rap');
ceza.addBand('Sinek Sekiz', 1999, ['Rap']);
musicians.push(ceza);

const duman2 = new Band('Duman', 'Turkish alternative rock band', 1999, null);
duman2.addMember('Kağan Yıldız', 1999, ['Vocal', 'Bass']);
bands.push(duman2);

const grizu = new Band('Grizu', 'Turkish hip-hop and electronic music project', 2017, null);
grizu.addMember('Gökalp Kanatsız', 2017, ['Electronic']);
bands.push(grizu);


const musicianToRemove = 'Barış Manço'; 
const bandToRemove = 'maNga'; 


const removedMusicianIndex = musicians.findIndex((musician) => musician.name === musicianToRemove);
if (removedMusicianIndex !== -1) {
  musicians.splice(removedMusicianIndex, 1);
}


const removedBandIndex = bands.findIndex((band) => band.name === bandToRemove);
if (removedBandIndex !== -1) {
  bands.splice(removedBandIndex, 1);
}


Musician.saveMusiciansToJSON('./musicians.json', musicians);
Band.saveBandsToJSON('./bands.json', bands);
