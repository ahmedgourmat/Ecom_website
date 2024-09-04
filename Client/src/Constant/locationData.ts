interface Baladiya {
    id: number;
    name: string;
}

interface Wilaya {
    id: number;
    name: string;
    baladiyas: Baladiya[];
}

const wilayas: Wilaya[] = [
    { id: 1, name: 'Adrar', baladiyas: [{ id: 1, name: 'Adrar' }, { id: 2, name: 'Reggane' }, { id: 3, name: 'Aoulef' }] },
    { id: 2, name: 'Chlef', baladiyas: [{ id: 4, name: 'Chlef' }, { id: 5, name: 'Tenes' }, { id: 6, name: 'El Karimia' }] },
    { id: 3, name: 'Laghouat', baladiyas: [{ id: 7, name: 'Laghouat' }, { id: 8, name: 'Aflou' }, { id: 9, name: 'Hassi R\'Mel' }] },
    { id: 4, name: 'Oum El Bouaghi', baladiyas: [{ id: 10, name: 'Oum El Bouaghi' }, { id: 11, name: 'Ain Beida' }, { id: 12, name: 'Meskiana' }] },
    { id: 5, name: 'Batna', baladiyas: [{ id: 13, name: 'Batna' }, { id: 14, name: 'Barika' }, { id: 15, name: 'Ain Touta' }] },
    { id: 6, name: 'Bejaia', baladiyas: [{ id: 16, name: 'Bejaia' }, { id: 17, name: 'Akbou' }, { id: 18, name: 'Tichy' }] },
    { id: 7, name: 'Biskra', baladiyas: [{ id: 19, name: 'Biskra' }, { id: 20, name: 'Tolga' }, { id: 21, name: 'El Kantara' }] },
    { id: 8, name: 'Bechar', baladiyas: [{ id: 22, name: 'Bechar' }, { id: 23, name: 'Taghit' }, { id: 24, name: 'Kenadsa' }] },
    { id: 9, name: 'Blida', baladiyas: [{ id: 25, name: 'Blida' }, { id: 26, name: 'Boufarik' }, { id: 27, name: 'Mouzaia' }] },
    { id: 10, name: 'Bouira', baladiyas: [{ id: 28, name: 'Bouira' }, { id: 29, name: 'Sour El Ghozlane' }, { id: 30, name: 'Lakhdaria' }] },
    { id: 11, name: 'Tamanrasset', baladiyas: [{ id: 31, name: 'Tamanrasset' }, { id: 32, name: 'In Salah' }, { id: 33, name: 'Abalessa' }] },
    { id: 12, name: 'Tebessa', baladiyas: [{ id: 34, name: 'Tebessa' }, { id: 35, name: 'Bir El Ater' }, { id: 36, name: 'Cheria' }] },
    { id: 13, name: 'Tlemcen', baladiyas: [{ id: 37, name: 'Tlemcen' }, { id: 38, name: 'Maghnia' }, { id: 39, name: 'Ghazaouet' }] },
    { id: 14, name: 'Tiaret', baladiyas: [{ id: 40, name: 'Tiaret' }, { id: 41, name: 'Sougueur' }, { id: 42, name: 'Frenda' }] },
    { id: 15, name: 'Tizi Ouzou', baladiyas: [{ id: 43, name: 'Tizi Ouzou' }, { id: 44, name: 'Azeffoun' }, { id: 45, name: 'Boghni' }] },
    { id: 16, name: 'Algiers', baladiyas: [{ id: 46, name: 'Bab El Oued' }, { id: 47, name: 'El Harrach' }, { id: 48, name: 'Hussein Dey' }] },
    { id: 17, name: 'Djelfa', baladiyas: [{ id: 49, name: 'Djelfa' }, { id: 50, name: 'Hassi Bahbah' }, { id: 51, name: 'Messaad' }] },
    { id: 18, name: 'Jijel', baladiyas: [{ id: 52, name: 'Jijel' }, { id: 53, name: 'El Milia' }, { id: 54, name: 'Taher' }] },
    { id: 19, name: 'Setif', baladiyas: [{ id: 55, name: 'Setif' }, { id: 56, name: 'El Eulma' }, { id: 57, name: 'Ain Azel' }] },
    { id: 20, name: 'Saida', baladiyas: [{ id: 58, name: 'Saida' }, { id: 59, name: 'Ain El Hadjar' }, { id: 60, name: 'Doui Thabet' }] },
    { id: 21, name: 'Skikda', baladiyas: [{ id: 61, name: 'Skikda' }, { id: 62, name: 'Collo' }, { id: 63, name: 'El Harrouch' }] },
    { id: 22, name: 'Sidi Bel Abbes', baladiyas: [{ id: 64, name: 'Sidi Bel Abbes' }, { id: 65, name: 'Tessala' }, { id: 66, name: 'Telagh' }] },
    { id: 23, name: 'Annaba', baladiyas: [{ id: 67, name: 'Annaba' }, { id: 68, name: 'El Hadjar' }, { id: 69, name: 'Seraidi' }] },
    { id: 24, name: 'Guelma', baladiyas: [{ id: 70, name: 'Guelma' }, { id: 71, name: 'Bouchegouf' }, { id: 72, name: 'Heliopolis' }] },
    { id: 25, name: 'Constantine', baladiyas: [{ id: 73, name: 'Constantine' }, { id: 74, name: 'El Khroub' }, { id: 75, name: 'Hamma Bouziane' }] },
    { id: 26, name: 'Medea', baladiyas: [{ id: 76, name: 'Medea' }, { id: 77, name: 'Berrouaghia' }, { id: 78, name: 'Ksar El Boukhari' }] },
    { id: 27, name: 'Mostaganem', baladiyas: [{ id: 79, name: 'Mostaganem' }, { id: 80, name: 'Ain Nouissy' }, { id: 81, name: 'Sidi Ali' }] },
    { id: 28, name: 'MSila', baladiyas: [{ id: 82, name: 'MSila' }, { id: 83, name: 'Boussaada' }, { id: 84, name: 'Ain El Melh' }] },
    { id: 29, name: 'Mascara', baladiyas: [{ id: 85, name: 'Mascara' }, { id: 86, name: 'Sig' }, { id: 87, name: 'Bouhanifia' }] },
    { id: 30, name: 'Ouargla', baladiyas: [{ id: 88, name: 'Ouargla' }, { id: 89, name: 'Hassi Messaoud' }, { id: 90, name: 'Touggourt' }] },
    { id: 31, name: 'Oran', baladiyas: [{ id: 91, name: 'Oran' }, { id: 92, name: 'Es Senia' }, { id: 93, name: 'Ain Turk' }] },
    { id: 32, name: 'El Bayadh', baladiyas: [{ id: 94, name: 'El Bayadh' }, { id: 95, name: 'Rogassa' }, { id: 96, name: 'Bougtob' }] },
    { id: 33, name: 'Illizi', baladiyas: [{ id: 97, name: 'Illizi' }, { id: 98, name: 'Djanet' }, { id: 99, name: 'Bordj Omar Driss' }] },
    { id: 34, name: 'Bordj Bou Arreridj', baladiyas: [{ id: 100, name: 'Bordj Bou Arreridj' }, { id: 101, name: 'Ras El Oued' }, { id: 102, name: 'Bordj Ghedir' }] },
    { id: 35, name: 'Boumerdes', baladiyas: [{ id: 103, name: 'Boumerdes' }, { id: 104, name: 'Thenia' }, { id: 105, name: 'Boudouaou' }] },
    { id: 36, name: 'El Tarf', baladiyas: [{ id: 106, name: 'El Tarf' }, { id: 107, name: 'Bouteldja' }, { id: 108, name: 'El Kala' }] },
    { id: 37, name: 'Tindouf', baladiyas: [{ id: 109, name: 'Tindouf' }, { id: 110, name: 'Oum El Assel' }] },
    { id: 38, name: 'Tissemsilt', baladiyas: [{ id: 111, name: 'Tissemsilt' }, { id: 112, name: 'Lardjem' }, { id: 113, name: 'Theniet El Had' }] },
    { id: 39, name: 'El Oued', baladiyas: [{ id: 114, name: 'El Oued' }, { id: 115, name: 'Robbah' }, { id: 116, name: 'Bayadha' }] },
    { id: 40, name: 'Khenchela', baladiyas: [{ id: 117, name: 'Khenchela' }, { id: 118, name: 'Bouhmama' }, { id: 119, name: 'Kais' }] },
    { id: 41, name: 'Souk Ahras', baladiyas: [{ id: 120, name: 'Souk Ahras' }, { id: 121, name: 'Sedrata' }, { id: 122, name: 'Mdaourouch' }] },
    { id: 42, name: 'Tipaza', baladiyas: [{ id: 123, name: 'Tipaza' }, { id: 124, name: 'Cherchell' }, { id: 125, name: 'Bou Ismail' }] },
    { id: 43, name: 'Mila', baladiyas: [{ id: 126, name: 'Mila' }, { id: 127, name: 'Chelghoum Laid' }, { id: 128, name: 'Grarem Gouga' }] },
    { id: 44, name: 'Ain Defla', baladiyas: [{ id: 129, name: 'Ain Defla' }, { id: 130, name: 'Miliana' }, { id: 131, name: 'El Attaf' }] },
    { id: 45, name: 'Naama', baladiyas: [{ id: 132, name: 'Naama' }, { id: 133, name: 'Ain Sefra' }, { id: 134, name: 'Mecheria' }] },
    { id: 46, name: 'Ain Temouchent', baladiyas: [{ id: 135, name: 'Ain Temouchent' }, { id: 136, name: 'El Amria' }, { id: 137, name: 'Beni Saf' }] },
    { id: 47, name: 'Ghardaia', baladiyas: [{ id: 138, name: 'Ghardaia' }, { id: 139, name: 'Berriane' }, { id: 140, name: 'Metlili' }] },
    { id: 48, name: 'Relizane', baladiyas: [{ id: 141, name: 'Relizane' }, { id: 142, name: 'Oued Rhiou' }, { id: 143, name: 'Mazouna' }] },
    { id: 49, name: 'Timimoun', baladiyas: [{ id: 144, name: 'Timimoun' }, { id: 145, name: 'Ouled Said' }, { id: 146, name: 'Tinerkouk' }] },
    { id: 50, name: 'Bordj Badji Mokhtar', baladiyas: [{ id: 147, name: 'Bordj Badji Mokhtar' }, { id: 148, name: 'Timiaouine' }] },
    { id: 51, name: 'Ouled Djellal', baladiyas: [{ id: 149, name: 'Ouled Djellal' }, { id: 150, name: 'Sidi Khaled' }, { id: 151, name: 'Doucen' }] },
    { id: 52, name: 'Beni Abbes', baladiyas: [{ id: 152, name: 'Beni Abbes' }, { id: 153, name: 'El Ouata' }, { id: 154, name: 'Igli' }] },
    { id: 53, name: 'In Salah', baladiyas: [{ id: 155, name: 'In Salah' }, { id: 156, name: 'In Ghar' }] },
    { id: 54, name: 'In Guezzam', baladiyas: [{ id: 157, name: 'In Guezzam' }, { id: 158, name: 'Tinzaouatine' }] },
    { id: 55, name: 'Touggourt', baladiyas: [{ id: 159, name: 'Touggourt' }, { id: 160, name: 'Temacine' }, { id: 161, name: 'Megarine' }] },
    { id: 56, name: 'Djanet', baladiyas: [{ id: 162, name: 'Djanet' }, { id: 163, name: 'Bordj El Haouas' }] },
    { id: 57, name: 'El M\'Ghair', baladiyas: [{ id: 164, name: 'El M\'Ghair' }, { id: 165, name: 'Djamaa' }, { id: 166, name: 'Sidi Amrane' }] },
    { id: 58, name: 'El Menia', baladiyas: [{ id: 167, name: 'El Menia' }, { id: 168, name: 'Hassi Gara' }, { id: 169, name: 'Mansoura' }] },
];

export default wilayas;
