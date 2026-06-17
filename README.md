# AlgoLearn 🧪

**AlgoLearn** je gamificirana web aplikacija dizajnirana za aktivno učenje i memoriranje programskog koda najvažnijih algoritama i struktura podataka. Aplikacija je posebno prilagođena za pripremu ispita koji se pišu na papiru, simulirajući stvarne uvjete pisanja koda.

---

## 🚀 Ključne Značajke

1. **Faza Memoriranja s Timerom (20s)**
   - Prije početka rješavanja svakog algoritma, ulazi se u fazu učenja gdje se na ekranu prikazuje ispravno rješenje uz pulsirajući kružni SVG timer.
   - Korisnik može proučiti logiku ili kliknuti na gumb "Preskoči" kako bi odmah krenuo s rješavanjem.

2. **Nevidljivi Textboxovi (Inline Blanks)**
   - Praznine za nadopunu u kodu više ne izgledaju kao standardni tekstualni okviri. Integrirane su direktno u linije koda, širina unosa se prilagođava duljini odgovora (`ch` monospace jedinice), a ispod njih se prikazuje samo suptilna isprekidana linija.

3. **Pulsirajući Brojevi Linija koda**
   - Broj linije koda za svaku prazninu koja još nije točno popunjena **pulsira u neon magenta/cyan boji**. Čim korisnik upiše točan odgovor, linija prestaje pulsirati i zasvijetli u neon zelenoj boji.

4. **Lokalna Baza Podataka (`database.json`)**
   - Integrirani Vite dev-server middleware automatski učitava i sprema tvoj progres (Score i Streaks) u lokalnu JSON datoteku. Napredak ostaje sačuvan čak i nakon osvježavanja stranice.

5. **Visokokontrastna Neon Glow Tema**
   - Cijeli UI koristi mračni "glassmorphism" dizajn s jarkim neon bojama, laganim efektima sjaja (glow) oko važnijih komponenti i glatkim mikro-animacijama.

6. **Automatsko Isključivanje Live Validacije**
   - Za lakše učenje, greške se crvene odmah u stvarnom vremenu. Međutim, čim postigneš *streak* od **3 ili više točnih rješenja**, live validacija se isključuje i točnost saznaješ tek nakon klika na "Predaj Rješenje".

---

## 🛠️ Tehnologije

- **Frontend**: React 19 + TypeScript + Vite
- **Stilovi**: Custom CSS (Neon Glow & Glassmorphism)
- **Ikone**: Lucide React
- **Baza podataka**: Lokalni JSON file sinkroniziran preko custom dev-server middlewarea

---

## 💻 Kako Pokrenuti Aplikaciju Lokalno

### Preduvjeti
Provjeri imaš li instaliran [Node.js](https://nodejs.org/) (verzija 18 ili novija) i npm.

### Koraci za pokretanje:

1. **Kloniraj repozitorij**:
   ```bash
   git clone https://github.com/epuljiz/algo-learn.git
   cd algo-learn
   ```

2. **Instaliraj ovisnosti**:
   ```bash
   npm install
   ```

3. **Pokreni dev server**:
   ```bash
   npm run dev
   ```

4. **Otvori aplikaciju**:
   U pregledniku posjeti [http://localhost:5173](http://localhost:5173).

Prilikom pokretanja, u korijenskom direktoriju projekta automatski će se kreirati datoteka `database.json` koja će pratiti tvoj napredak.

---

## 📂 Kako Dodati Nove Algoritme

Svi algoritmi i njihove praznine definirani su u datoteci `src/context/GameContext.tsx`. 
Kako bi dodao novi algoritam, kopiraj objekt u niz `defaultAlgos` prateći ovu strukturu:

```typescript
{
  id: 'jedinstveni_id_algoritma',
  title: 'Naslov Algoritma',
  description: 'Kratak opis onoga što algoritam radi.',
  status: 'available', // status: 'locked' | 'available' | 'solved'
  streak: 0,
  maxStreakReq: 5, // koliko je točnih rješavanja zaredom potrebno za "Solved"
  templateCode: `def moj_algoritam(x):
    # Cijeli ispravan kod algoritma
    return x`,
  blanks: [
    // linije se označavaju od 0 (0-indexed)
    { line: 1, index: 0, expected: 'return x' }
  ]
}
```
Vite će automatski osvježiti aplikaciju, a novi algoritam će se pojaviti na početnoj ploči.
