export interface QuizQuestion {
  type: 'multiple-choice' | 'fill-in-the-blank';
  question: string;
  codeContext?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  bigO: string;
  content: string;
  codeSnippet: string;
  quiz?: QuizQuestion[];
}

export const lessonsData: Lesson[] = [
  {
    id: 'intro_big_o',
    title: 'Uvod u Big O i O(1)',
    description: 'Što je vremenska složenost i kako izgleda konstantno vrijeme.',
    bigO: 'O(1)',
    content: 'Big O notacija nam govori kako se vrijeme izvršavanja algoritma povećava s rastom ulaznih podataka. O(1) znači konstantno vrijeme - bez obzira na veličinu ulaza, algoritam treba isto vrijeme za izvršavanje.',
    codeSnippet: `def get_first_element(arr):\n    return arr[0] if len(arr) > 0 else None`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koja je vremenska složenost dohvaćanja prvog elementa niza?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)',
        explanation: 'Dohvaćanje prvog elementa niza preko indeksa traje konstantno vrijeme O(1) jer računalo direktno zna lokaciju u memoriji.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni kod za dohvaćanje prvog elementa niza:',
        codeContext: 'def get_first_element(arr):\n    return arr[___] if len(arr) > 0 else None',
        options: ['0', '1', '-1', 'len(arr)'],
        correctAnswer: '0',
        explanation: 'Indeksi u nizovima počinju od 0, pa je prvi element na indeksu 0.'
      },
      {
        type: 'multiple-choice',
        question: 'Koji od sljedećih primjera ima složenost O(1)?',
        options: ['Provjera parnosti broja (n % 2 == 0)', 'Traženje elementa u nesortiranom nizu', 'Sortiranje niza brojeva', 'Ispis svih elemenata matrice'],
        correctAnswer: 'Provjera parnosti broja (n % 2 == 0)',
        explanation: 'Provjera parnosti zahtijeva samo jednu aritmetičku operaciju n % 2 i usporedbu, bez obzira na veličinu broja.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni O(1) funkciju koja provjerava je li niz prazan:',
        codeContext: 'def is_empty(arr):\n    return ___ == 0',
        options: ['len(arr)', 'arr[0]', 'arr', 'None'],
        correctAnswer: 'len(arr)',
        explanation: 'Provjera duljine niza pomoću len(arr) traje O(1) vremena jer se veličina niza pohranjuje kao atribut u memoriji.'
      }
    ]
  },
  {
    id: 'linear_search',
    title: 'Linearna pretraga (O(n))',
    description: 'Najjednostavniji algoritam pretrage koji provjerava svaki element redom.',
    bigO: 'O(n)',
    content: 'Linearno vrijeme O(n) znači da ako se ulaz poveća 10 puta, i vrijeme izvršavanja će se povećati otprilike 10 puta. Moramo proći kroz sve elemente jednom.',
    codeSnippet: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'U najgorem slučaju, koliko elemenata mora provjeriti linearna pretraga?',
        options: ['Sve elemente (n)', 'Samo pola (n/2)', 'Samo prvi', 'Nijedan'],
        correctAnswer: 'Sve elemente (n)',
        explanation: 'U najgorem slučaju, traženi element je na samom kraju niza ili uopće nije u nizu, pa moramo pretražiti svih n elemenata.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni uvjet u linearnoj pretrazi da se usporedi trenutni element s ciljem (target):',
        codeContext: 'def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == ___:\n            return i\n    return -1',
        options: ['target', 'i', 'len(arr)', 'None'],
        correctAnswer: 'target',
        explanation: 'Uspoređujemo element niza `arr[i]` s traženom vrijednošću `target`.'
      },
      {
        type: 'multiple-choice',
        question: 'Kolika je vremenska složenost linearne pretrage u najboljem slučaju?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)',
        explanation: 'U najboljem slučaju, traženi element se nalazi na prvom mjestu u nizu (indeks 0), pa ga pronalazimo u samo jednom koraku.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni kod koji vraća indeks pronađenog elementa:',
        codeContext: 'for i in range(len(arr)):\n    if arr[i] == target:\n        return ___',
        options: ['i', 'arr[i]', 'target', 'True'],
        correctAnswer: 'i',
        explanation: 'Petlja prolazi kroz indekse `i`. Kada pronađemo traženu vrijednost, vraćamo njen indeks `i`.'
      }
    ]
  },
  {
    id: 'binary_search',
    title: 'Binary Search',
    description: 'Pronađi element u sortiranom nizu brže nego linearnom pretragom.',
    bigO: 'O(log n)',
    content: 'Binarna pretraga dijeli niz na pola u svakom koraku. To rezultira logaritamskom složenošću O(log n), što je iznimno brzo i za ogromne nizove.',
    codeSnippet: `def binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n            \n    return -1`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koji preduvjet mora biti zadovoljen da bismo koristili binarnu pretragu?',
        options: ['Niz mora biti sortiran', 'Niz mora biti prazan', 'Niz mora imati paran broj elemenata', 'Nema preduvjeta'],
        correctAnswer: 'Niz mora biti sortiran',
        explanation: 'Binarna pretraga radi na principu eliminacije polovine elemenata usporedbom sa srednjim, što je moguće samo ako je niz unaprijed sortiran.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni računanje srednjeg indeksa (mid) u binarnoj pretrazi:',
        codeContext: 'def binary_search(arr, target):\n    # ...\n    while low <= high:\n        mid = (low + high) ___\n        if arr[mid] == target:\n            return mid\n    # ...',
        options: ['// 2', '/ 2', '% 2', '* 2'],
        correctAnswer: '// 2',
        explanation: 'U Pythonu operator `//` označava cjelobrojno dijeljenje, što nam daje indeks u sredini bez decimala.'
      },
      {
        type: 'multiple-choice',
        question: 'Ako niz ima 8 elemenata, koliko je najviše koraka potrebno binarnoj pretrazi da pronađe element ili utvrdi da ga nema?',
        options: ['4 koraka', '8 koraka', '1 korak', '16 koraka'],
        correctAnswer: '4 koraka',
        explanation: 'Budući da je log2(8) = 3, u najgorem slučaju treba 3 ili 4 usporedbe (jer u svakom koraku smanjujemo prostor pretraživanja na pola: 8 -> 4 -> 2 -> 1).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni binarnu pretragu kada je element na sredini veći od traženog targeta:',
        codeContext: 'if arr[mid] == target:\n    return mid\nelif arr[mid] > target:\n    high = ___',
        options: ['mid - 1', 'mid + 1', 'mid', 'low + 1'],
        correctAnswer: 'mid - 1',
        explanation: 'Ako je srednji element veći od cilja, traženi element je u lijevom dijelu, pa gornju granicu (high) postavljamo na `mid - 1`.'
      }
    ]
  },
  {
    id: 'binary_search_recursive',
    title: 'Binary Search (Recursive)',
    description: 'Rekurzivna implementacija binarnog pretraživanja.',
    bigO: 'O(log n)',
    content: 'Rekurzija nam omogućava elegantniji kod, ali zauzima više memorije na call stacku. Vremenska složenost ostaje O(log n).',
    codeSnippet: `def binary_search_recursive(arr, low, high, target):\n    if low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] > target:\n            return binary_search_recursive(arr, low, mid - 1, target)\n        else:\n            return binary_search_recursive(arr, mid + 1, high, target)\n    else:\n        return -1`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Što se događa s prostornom složenošću kod rekurzivne verzije u usporedbi s iterativnom?',
        options: ['Veća je (O(log n)) zbog poziva na stogu', 'Ista je (O(1))', 'Manja je (O(1/n))', 'Raste eksponencijalno (O(2ⁿ))'],
        correctAnswer: 'Veća je (O(log n)) zbog poziva na stogu',
        explanation: 'Svaki rekurzivni poziv dodaje novi okvir (frame) na call stack sustava, trošeći dodatni memorijski prostor složenosti O(log n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni rekurzivni poziv kada je ciljni element manji od srednjeg:',
        codeContext: 'if arr[mid] > target:\n    return binary_search_recursive(arr, low, ___, target)',
        options: ['mid - 1', 'mid + 1', 'mid', 'high - 1'],
        correctAnswer: 'mid - 1',
        explanation: 'Ako je element manji, pretražujemo lijevu polovicu, stoga gornju granicu (high) postavljamo na `mid - 1`.'
      },
      {
        type: 'multiple-choice',
        question: 'Što je bazni slučaj (base case) za neuspješnu rekurzivnu binarnu pretragu?',
        options: ['Kada je low > high', 'Kada je low == high', 'Kada je mid == -1', 'Kada je niz prazan'],
        correctAnswer: 'Kada je low > high',
        explanation: 'Ako se granice preklapanja preokrenu (low postane veći od high), to znači da smo pretražili cijeli niz i nismo pronašli element, pa vraćamo -1.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni rekurzivni poziv za desni dio niza:',
        codeContext: 'elif arr[mid] < target:\n    return binary_search_recursive(arr, ___, high, target)',
        options: ['mid + 1', 'mid - 1', 'low + 1', 'mid'],
        correctAnswer: 'mid + 1',
        explanation: 'Budući da je srednji element manji od traženog, traženi element leži u desnoj polovici pa donju granicu (low) pomičemo na `mid + 1`.'
      }
    ]
  },
  {
    id: 'bubble_sort',
    title: 'Bubble Sort',
    description: 'Najjednostavniji algoritam za sortiranje nizova.',
    bigO: 'O(n²)',
    content: 'Bubble sort ima kvadratnu složenost O(n²), što znači da za niz od 1000 elemenata treba napraviti oko 1.000.000 usporedbi. Ovo ga čini vrlo sporim za velike nizove.',
    codeSnippet: `def bubble_sort(arr):\n    n = len(arr)\n    swapped = True\n    while swapped:\n        swapped = False\n        for i in range(1, n):\n            if arr[i-1] > arr[i]:\n                arr[i-1], arr[i] = arr[i], arr[i-1]\n                swapped = True\n        if not swapped:\n            break\n    return arr`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koja je vremenska složenost Bubble Sorta u najgorem slučaju?',
        options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
        correctAnswer: 'O(n²)',
        explanation: 'U najgorem slučaju (obrnuto sortiran niz), moramo proći kroz dvostruku petlju, što daje kvadratnu složenost O(n²).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni uvjet zamjene susjednih elemenata kod uzlaznog sortiranja:',
        codeContext: 'for i in range(1, n):\n    if arr[i-1] ___ arr[i]:\n        arr[i-1], arr[i] = arr[i], arr[i-1]',
        options: ['>', '<', '==', '!='],
        correctAnswer: '>',
        explanation: 'Ako je prethodni element veći od trenutnog (`arr[i-1] > arr[i]`), moramo im zamijeniti mjesta.'
      },
      {
        type: 'multiple-choice',
        question: 'Može li Bubble Sort imati složenost O(n)?',
        options: ['Da, u najboljem slučaju ako je niz već sortiran i koristimo zastavicu (swapped)', 'Ne, uvijek je O(n²)', 'Da, ali samo za nizove s manje od 5 elemenata', 'Da, ako koristimo rekurziju'],
        correctAnswer: 'Da, u najboljem slučaju ako je niz već sortiran i koristimo zastavicu (swapped)',
        explanation: 'Ako nakon prvog prolaza zastavica `swapped` ostane `False`, to znači da nije bilo zamjena te je niz već sortiran, pa odmah prekidamo rad nakon O(n) operacija.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni inicijalizaciju zastavice prije prolaska kroz niz:',
        codeContext: 'while swapped:\n    swapped = ___\n    for i in range(1, n):\n        if arr[i-1] > arr[i]:',
        options: ['False', 'True', 'None', '0'],
        correctAnswer: 'False',
        explanation: 'Prije svakog prolaza pretpostavljamo da neće biti zamjena (`swapped = False`). Ako se dogodi barem jedna zamjena, zastavicu postavljamo na `True`.'
      }
    ]
  },
  {
    id: 'selection_sort',
    title: 'Selection Sort',
    description: 'Sortiranje niza traženjem minimuma u ne-sortiranom dijelu.',
    bigO: 'O(n²)',
    content: 'Kao i Bubble sort, Selection sort ima O(n²) složenost, ali generalno izvodi manje zamjena (swap operacija).',
    codeSnippet: `def selection_sort(arr):\n    for k in range(0,len(arr)-1):\n        temp = arr[k]\n        mn, mn_idx = find_min(arr[k:len(arr)])\n        arr[k] = mn\n        arr[k+mn_idx] = temp\n    return arr`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koja je ključna razlika u operacijama između Selection Sorta i Bubble Sorta?',
        options: ['Selection Sort radi znatno manje zamjena (swapova)', 'Selection Sort je O(n log n)', 'Bubble Sort radi manje usporedbi', 'Nema nikakve razlike'],
        correctAnswer: 'Selection Sort radi znatno manje zamjena (swapova)',
        explanation: 'Dok Bubble sort neprestano mijenja susjedne elemente u svakom prolazu, Selection sort pronalazi minimum i radi najviše jednu zamjenu po vanjskoj petlji.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni kod za zamjenu kako bi se nađeni minimum (`mn`) stavio na poziciju `k`:',
        codeContext: 'for k in range(0,len(arr)-1):\n    temp = arr[k]\n    # ...\n    arr[k] = mn\n    arr[k+mn_idx] = ___',
        options: ['temp', 'mn', 'k', 'arr[k]'],
        correctAnswer: 'temp',
        explanation: 'Da bismo očuvali vrijednost koja je bila na indeksu `k`, privremeno smo je spremili u `temp`, te je sada stavljamo na mjesto gdje je bio minimum.'
      },
      {
        type: 'multiple-choice',
        question: 'Koja je vremenska složenost Selection Sorta u najboljem slučaju (već sortiran niz)?',
        options: ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 'O(n²)',
        explanation: 'Selection Sort uvijek mora pronaći najmanji element u preostalom nesortiranom dijelu niza, pa čak i za potpuno sortiran niz mora proći kroz dvostruku petlju, što daje O(n²).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni Selection Sort petlju. Koliko koraka k radimo?',
        codeContext: 'for k in range(0, ___):\n    temp = arr[k]\n    mn, mn_idx = find_min(arr[k:len(arr)])',
        options: ['len(arr)-1', 'len(arr)', 'len(arr)+1', '1'],
        correctAnswer: 'len(arr)-1',
        explanation: 'Vanjska petlja ide do `len(arr)-1` jer zadnji preostali element mora biti na ispravnom mjestu ako su svi ostali već na svojim pozicijama.'
      }
    ]
  },
  {
    id: 'insertion_sort',
    title: 'Insertion Sort',
    description: 'Jednostavno sortiranje umetanjem elemenata na pravo mjesto.',
    bigO: 'O(n²)',
    content: 'Insertion sort je brz na malim ili već gotovo sortiranim nizovima, gdje se približava O(n) složenosti u najboljem slučaju. U najgorem je O(n²).',
    codeSnippet: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koja je vremenska složenost Insertion Sorta u najboljem slučaju (već sortiran niz)?',
        options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'],
        correctAnswer: 'O(n)',
        explanation: 'Ako je niz već sortiran, unutarnja `while` petlja se nikada ne izvršava, pa algoritam radi u linearnom vremenu O(n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni uvjet u petlji koji pomiče elemente udesno kako bi napravio mjesto za `key`:',
        codeContext: 'while j >= 0 and key ___ arr[j]:\n    arr[j + 1] = arr[j]\n    j -= 1',
        options: ['<', '>', '==', '>='],
        correctAnswer: '<',
        explanation: 'Elemente pomičemo udesno sve dok su veći od vrijednosti `key` koju umećemo (odnosno dok je `key < arr[j]`).'
      },
      {
        type: 'multiple-choice',
        question: 'U kojem slučaju Insertion Sort ima najgoru složenost O(n²)?',
        options: ['Kada je niz sortiran obrnuto', 'Kada je niz već sortiran', 'Kada niz sadrži samo duplikate', 'Kada je niz nasumičan'],
        correctAnswer: 'Kada je niz sortiran obrnuto',
        explanation: 'Ako je niz sortiran u obrnutom redoslijedu, svaki novi element moramo usporediti i pomaknuti skroz na početak niza, što zahtijeva maksimalan broj operacija.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni postavljanje izdvojenog ključa (key) na njegovu ispravnu poziciju nakon pomicanja elemenata:',
        codeContext: 'while j >= 0 and key < arr[j]:\n    arr[j + 1] = arr[j]\n    j -= 1\narr[___] = key',
        options: ['j + 1', 'j', 'i', 'j - 1'],
        correctAnswer: 'j + 1',
        explanation: 'Petlja se prekida kada je `j < 0` ili kada naiđemo na element manji ili jednak ključu. Ključ moramo umetnuti na prvu slobodnu poziciju ispred tog elementa, što je `j + 1`.'
      }
    ]
  },
  {
    id: 'merge_sort',
    title: 'Merge Sort',
    description: 'Divide and conquer algoritam za efikasno sortiranje.',
    bigO: 'O(n log n)',
    content: 'Merge sort nudi garantiranu O(n log n) složenost u svim slučajevima, no zahtijeva O(n) dodatnog prostora u memoriji.',
    codeSnippet: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    middle = len(arr) // 2\n    left = merge_sort(arr[:middle])\n    right = merge_sort(arr[middle:])\n    \n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    while len(left) > 0 and len(right) > 0:\n        if left[0] <= right[0]:\n            result += [left[0]]\n            left = left[1:]\n        else:\n            result += [right[0]]\n            right = right[1:]\n    \n    result += left\n    result += right\n    \n    return result`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Merge Sort ima odlično vrijeme, ali koji mu je glavni nedostatak?',
        options: ['Zahtijeva O(n) dodatne memorije za spajanje', 'Složenost mu raste na O(n²) u najgorem slučaju', 'Jako je težak za implementaciju rekurzijom', 'Ne radi s decimalnim brojevima'],
        correctAnswer: 'Zahtijeva O(n) dodatne memorije za spajanje',
        explanation: 'Merge sort stvara nove podnizove tijekom spajanja, što zahtijeva dodatnu memoriju linearne složenosti O(n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni rekurzivni dio Merge Sorta koji spaja lijevu i desnu polovinu:',
        codeContext: 'middle = len(arr) // 2\nleft = merge_sort(arr[:middle])\nright = merge_sort(arr[middle:])\nreturn ___(left, right)',
        options: ['merge', 'join', 'combine', 'add'],
        correctAnswer: 'merge',
        explanation: 'Pomoćna funkcija `merge` uzima dva sortirana podniza i spaja ih u jedan sortirani niz.'
      },
      {
        type: 'multiple-choice',
        question: 'Na kojem se principu (dizajnu algoritama) temelji Merge Sort?',
        options: ['Podijeli pa vladaj (Divide and Conquer)', 'Pohlepni pristup (Greedy)', 'Dinamičko programiranje', 'Pretraživanje s vraćanjem (Backtracking)'],
        correctAnswer: 'Podijeli pa vladaj (Divide and Conquer)',
        explanation: 'Merge Sort dijeli problem na manje podprobleme (polovice niza), rekurzivno ih rješava (sortira) i na kraju spaja rješenja.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni cjelobrojno dijeljenje niza na dvije polovice:',
        codeContext: 'def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    middle = len(arr) ___\n    left = merge_sort(arr[:middle])',
        options: ['// 2', '/ 2', '% 2', '- 2'],
        correctAnswer: '// 2',
        explanation: 'Koristimo cjelobrojno dijeljenje `// 2` kako bismo dobili cijeli broj za indeks sredine.'
      }
    ]
  },
  {
    id: 'quick_sort',
    title: 'Quick Sort',
    description: 'Sortiranje bazirano na particioniranju oko pivota (in-place).',
    bigO: 'O(n log n)',
    content: 'Quick sort je prosječno O(n log n) i to bez dodatnog memorijskog overhead-a poput merge sorta, stoga se često koristi u praksi. Najgori slučaj mu je O(n²).',
    codeSnippet: `def quick_sort(arr, low, high):\n    if low < high:\n        pivot_index = partition(arr, low, high)\n        quick_sort(arr, low, pivot_index - 1)\n        quick_sort(arr, pivot_index + 1, high)\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            arr[i], arr[j] = arr[j], arr[i]\n            i += 1\n            \n    arr[i], arr[high] = arr[high], arr[i]\n    return i`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Kada Quick Sort pfostiže svoju najgoru vremensku složenost O(n²)?',
        options: ['Kada je pivot najgori mogući (npr. već sortiran niz bez dobre selekcije pivota)', 'Kada je niz potpuno nasumičan', 'Kada su svi elementi nule', 'Uvijek, jer je O(n²) njegova prosječna složenost'],
        correctAnswer: 'Kada je pivot najgori mogući (npr. već sortiran niz bez dobre selekcije pivota)',
        explanation: 'Ako stalno odabiremo najmanji ili najveći element za pivot (npr. u već sortiranom nizu s pivotom na kraju), particioniranje dijeli niz na podnizove veličina 0 i n-1, što vodi do O(n²) složenosti.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni funkciju particioniranja tako da vrati indeks na kojem se pivot sada nalazi:',
        codeContext: 'def partition(arr, low, high):\n    # ...\n    arr[i], arr[high] = arr[high], arr[i]\n    return ___',
        options: ['i', 'high', 'low', 'pivot'],
        correctAnswer: 'i',
        explanation: 'Varijabla `i` prati granicu elemenata koji su manji ili jednaki pivotu, pa nakon zamjene pivota s `arr[i]`, pivot se nalazi na indeksu `i`.'
      },
      {
        type: 'multiple-choice',
        question: 'Koja je prosječna vremenska složenost Quick Sorta?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correctAnswer: 'O(n log n)',
        explanation: 'U prosječnom slučaju Quick Sort dijeli niz na približno jednake dijelove, što rezultira iznimno brzim vremenom O(n log n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni rekurzivne pozive u Quick Sortu nakon particioniranja:',
        codeContext: 'pivot_index = partition(arr, low, high)\nquick_sort(arr, low, pivot_index - 1)\nquick_sort(arr, ___, high)',
        options: ['pivot_index + 1', 'pivot_index', 'low', 'high - 1'],
        correctAnswer: 'pivot_index + 1',
        explanation: 'Nakon particioniranja, element na `pivot_index` je na svom konačnom mjestu. Zatim sortiramo desni podniz koji počinje od `pivot_index + 1`.'
      }
    ]
  },
  {
    id: 'circular_queue',
    title: 'Circular Queue (Enqueue/Dequeue)',
    description: 'Implementacija cirkularnog reda koristeći polje.',
    bigO: 'O(1)',
    content: 'Cirkularni red omogućava ubacivanje i izbacivanje elemenata u strogo konstantnom vremenu O(1).',
    codeSnippet: `class Queue:\n    def __init__(self, max_size):\n        self.items = [None] * max_size\n        self.max_size = max_size\n        self.front = -1\n        self.size = 0\n\n    def enqueue(self, item):\n        if self.size == self.max_size:\n            raise IndexError("The queue is full")\n        else:\n            if self.front == -1:\n                self.front = 0\n            self.items[(self.front + self.size) % self.max_size] = item\n            self.size += 1\n\n    def dequeue(self):\n        if self.size == 0:\n            raise IndexError("The queue is empty")\n        else:\n            first_element = self.items[self.front]\n            self.items[self.front] = None\n            self.front = (self.front + 1) % self.max_size\n            self.size -= 1\n            if self.size == 0:\n                self.front = -1\n            return first_element`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koja je prednost cirkularnog reda nad običnim redom implementiranim preko običnog polja s pomicanjem?',
        options: ['Enqueue i dequeue su O(1) jer nema pomicanja elemenata', 'Cirkularni red troši manje memorije', 'Cirkularni red podržava beskonačno mnogo elemenata', 'Brži je u pretraživanju'],
        correctAnswer: 'Enqueue i dequeue su O(1) jer nema pomicanja elemenata',
        explanation: 'Kod običnog polja, dequeue zahtijeva pomicanje svih preostalih elemenata ulijevo (što je O(n)). Cirkularni red koristi modularnu aritmetiku za pomicanje pokazivača, što je O(1).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni izračun indeksa za dodavanje elementa (enqueue) u cirkularnom redu:',
        codeContext: 'self.items[(self.front + self.size) ___ self.max_size] = item',
        options: ['%', '//', '/', '*'],
        correctAnswer: '%',
        explanation: 'Operator `%` (modulo) nam omogućuje cirkularno "omotavanje" indeksa natrag na početak polja kada se prijeđe `max_size`.'
      },
      {
        type: 'multiple-choice',
        question: 'Kako detektiramo je li cirkularni red prazan?',
        options: ['Kada je size == 0', 'Kada je size == max_size', 'Kada je front == -1 i size > 0', 'Kada su svi elementi None'],
        correctAnswer: 'Kada je size == 0',
        explanation: 'Atribut `size` prati stvarni broj elemenata u redu. Ako je on 0, red je prazan.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni dequeue operaciju. Kako se pomiče pokazivač front?',
        codeContext: 'first_element = self.items[self.front]\nself.items[self.front] = None\nself.front = (self.front + 1) ___ self.max_size',
        options: ['%', '//', '/', '+'],
        correctAnswer: '%',
        explanation: 'Modularni operator `%` osigurava da se pokazivač `front` vrati na 0 kada prijeđe kraj polja.'
      }
    ]
  },
  {
    id: 'stack_sll',
    title: 'Stack (Linked List)',
    description: 'Implementacija stoga koristeći jednostruko povezanu listu.',
    bigO: 'O(1)',
    content: 'Stog u povezanoj listi sve operacije (push, pop) vrši na prvom elementu (head), što rezultira O(1) vremenskom složenošću.',
    codeSnippet: `class Stack:\n    def __init__(self):\n        self.SLL = SLL_simple()\n\n    def is_empty(self):\n        return self.SLL.head == None\n\n    def push(self, item):\n        self.SLL.add_first(item)\n\n    def pop(self):\n        if not self.is_empty():\n            item = self.SLL.head.data\n            self.SLL.delete_first()\n            return item\n        else:\n            raise IndexError("Pop from an empty stack")`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Zašto je za stog povoljnije dodavati i uklanjati elemente s početka (head) jednostruko povezane liste?',
        options: ['Zato što je ta operacija O(1), dok bi rad na kraju (tail) zahtijevao prolazak kroz cijelu listu (O(n))', 'Zato što se stog mora puniti od nultog indeksa', 'Zato što je to jedini način rada s povezanim listama', 'Jer to troši manje memorije'],
        correctAnswer: 'Zato što je ta operacija O(1), dok bi rad na kraju (tail) zahtijevao prolazak kroz cijelu listu (O(n))',
        explanation: 'Kod jednostruko povezane liste nemamo direktan pokazivač na pretposljednji element, pa bi uklanjanje s kraja zahtijevalo prolaz kroz cijelu listu da nađemo novi kraj. Rad na početku (head) je uvijek O(1).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni push metodu na stogu:',
        codeContext: 'def push(self, item):\n    self.SLL.___(item)',
        options: ['add_first', 'add_last', 'insert', 'append'],
        correctAnswer: 'add_first',
        explanation: 'Stog funkcionira po principu LIFO (Last In, First Out). Element koji zadnji uđe mora biti prvi na redu, pa ga stavljamo na početak liste (`add_first`).'
      },
      {
        type: 'multiple-choice',
        question: 'Koji princip organizacije podataka koristi stog (Stack)?',
        options: ['LIFO (Last In, First Out)', 'FIFO (First In, First Out)', 'LILO (Last In, Last Out)', 'Random Access'],
        correctAnswer: 'LIFO (Last In, First Out)',
        explanation: 'Stog radi po principu da se zadnji dodani element prvi uklanja (npr. hrpa tanjura).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni pop operaciju na stogu (provjera je li stog prazan):',
        codeContext: 'def pop(self):\n    if not self.___():\n        item = self.SLL.head.data\n        self.SLL.delete_first()\n        return item',
        options: ['is_empty', 'is_full', 'has_elements', 'clear'],
        correctAnswer: 'is_empty',
        explanation: 'Prije nego uklonimo element sa stoga, moramo provjeriti da stog nije prazan pomoću metode `is_empty`.'
      }
    ]
  },
  {
    id: 'fact_recursive',
    title: 'Faktorijel (Recursive)',
    description: 'Izračun faktorijela korištenjem rekurzije.',
    bigO: 'O(n)',
    content: 'Računanje faktorijela množi sve brojeve do n, što traje O(n) vremena.',
    codeSnippet: `def fact(n):\n    if n==0:\n        return 1\n    else:\n        return n * fact(n-1)`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koliko puta će se rekurzivna funkcija `fact` pozvati za parametar `n`?',
        options: ['n + 1 puta', 'n puta', 'log n puta', '2ⁿ puta'],
        correctAnswer: 'n + 1 puta',
        explanation: 'Funkcija se poziva za `n`, `n-1`, ..., `1` i konačno za bazni slučaj `0`. To je ukupno `n + 1` poziva.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni bazni slučaj za rekurzivnu funkciju faktorijela:',
        codeContext: 'def fact(n):\n    if n == 0:\n        return ___\n    else:\n        return n * fact(n-1)',
        options: ['1', '0', '-1', 'None'],
        correctAnswer: '1',
        explanation: 'Faktorijel od 0 je po definiciji 1, što sprječava beskonačnu rekurziju i omogućava množenje.'
      },
      {
        type: 'multiple-choice',
        question: 'Što će se dogoditi ako zaboravimo bazni slučaj u rekurzivnom faktorijelu?',
        options: ['Dogodit će se beskonačna rekurzija i Stack Overflow greška', 'Funkcija će vratiti 0', 'Funkcija će vratiti None', 'Kôd se neće kompajlirati'],
        correctAnswer: 'Dogodit će se beskonačna rekurzija i Stack Overflow greška',
        explanation: 'Bez baznog slučaja rekurzivni pozivi nikada ne prestaju, što uzrokuje prepunjavanje memorijskog stoga (call stack).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni rekurzivni korak za faktorijel broja n:',
        codeContext: 'def fact(n):\n    if n == 0:\n        return 1\n    else:\n        return n * ___',
        options: ['fact(n-1)', 'fact(n)', 'fact(n+1)', 'n-1'],
        correctAnswer: 'fact(n-1)',
        explanation: 'Faktorijel od n je umnožak n i faktorijela od n-1, tj. `n * fact(n-1)`.'
      }
    ]
  },
  {
    id: 'fibonacci_recursive',
    title: 'Fibonacci (Eksponencijalno)',
    description: 'Izračun Fibonaccijevog niza čistom rekurzijom.',
    bigO: 'O(2ⁿ)',
    content: 'Eksponencijalna složenost O(2ⁿ) znači da dodavanjem samo jednog elementa, vrijeme računanja se udvostručuje. Algoritam jako brzo postaje neupotrebljiv!',
    codeSnippet: `def fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Zašto je rekurzivna implementacija Fibonaccija bez predmemoriranja (memoization) izrazito neefikasna?',
        options: ['Izvodi ogroman broj ponovljenih izračuna za iste podprobleme', 'Zato što rekurzija ne radi u Pythonu za brojeve veće od 10', 'Zato što koristi previše niti (threads)', 'Zato što je logaritamska'],
        correctAnswer: 'Izvodi ogroman broj ponovljenih izračuna za iste podprobleme',
        explanation: 'Da bi izračunao `fib(5)`, algoritam mora izračunati `fib(4)` i `fib(3)`. Međutim, računanje `fib(4)` ponovno poziva izračun `fib(3)`, što dovodi do preklapanja podproblema i eksponencijalnog rasta broja poziva.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni bazni slučaj u Fibonaccijevoj rekurziji:',
        codeContext: 'def fib(n):\n    if n <= 1:\n        return ___\n    return fib(n-1) + fib(n-2)',
        options: ['n', '1', '0', 'None'],
        correctAnswer: 'n',
        explanation: 'Za `n = 0` funkcija treba vratiti 0, a za `n = 1` treba vratiti 1. Zato vraćamo sam parametar `n`.'
      },
      {
        type: 'multiple-choice',
        question: 'Kolika je prostorna složenost rekurzivnog Fibonaccija na call stacku?',
        options: ['O(n)', 'O(2ⁿ)', 'O(1)', 'O(log n)'],
        correctAnswer: 'O(n)',
        explanation: 'Iako ima eksponencijalno mnogo poziva, maksimalna dubina rekurzivnog stabla (i time stoga) iznosi n, pa je prostorna složenost O(n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni zbroj dva prethodna člana u Fibonacci rekurziji:',
        codeContext: 'def fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + ___',
        options: ['fib(n-2)', 'fib(n-1)', 'fib(n)', 'n-2'],
        correctAnswer: 'fib(n-2)',
        explanation: 'Fibonaccijev broj je zbroj prethodna dva člana: `fib(n-1)` i `fib(n-2)`.'
      }
    ]
  },
  {
    id: 'bst_max_depth',
    title: 'BST: Max Depth',
    description: 'Određivanje maksimalne dubine binarnog stabla.',
    bigO: 'O(n)',
    content: 'Budući da moramo obići sve čvorove da bismo bili sigurni u dubinu, algoritam traje proporcionalno broju čvorova u stablu, tj. O(n).',
    codeSnippet: `def max_depth(root):\n    if root is None:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Kakva je vremenska složenost traženja dubine binarnog stabla s n čvorova u najgorem slučaju?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'U najgorem slučaju moramo proći kroz sve čvorove stabla (svaki čvor posjetimo jednom), pa je složenost O(n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni kod koji računa maksimalnu dubinu odabirom veće dubine podstabala:',
        codeContext: 'return 1 + ___(max_depth(root.left), max_depth(root.right))',
        options: ['max', 'min', 'sum', 'add'],
        correctAnswer: 'max',
        explanation: 'Dubina stabla određena je najduljim putem od korijena do lista, pa koristimo funkciju `max` da bismo dobili veću vrijednost između lijevog i desnog podstabla.'
      },
      {
        type: 'multiple-choice',
        question: 'Kolika je dubina praznog binarnog stabla (root is None)?',
        options: ['0', '1', '-1', 'Beskonačno'],
        correctAnswer: '0',
        explanation: 'Prazno stablo nema nijedan čvor niti razinu, pa mu je dubina 0.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni provjeru praznog stabla u max_depth:',
        codeContext: 'def max_depth(root):\n    if root ___:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))',
        options: ['is None', 'is not None', '== 0', 'is Empty'],
        correctAnswer: 'is None',
        explanation: 'Provjeravamo je li trenutni čvor prazan pomoću operatora `is None`.'
      }
    ]
  },
  {
    id: 'is_bst',
    title: 'Je li stablo BST?',
    description: 'Provjera je li zadano binarno stablo ispravno binarno stablo pretraživanja.',
    bigO: 'O(n)',
    content: 'Ponovo moramo posjetiti svaki čvor i provjeriti ispunjava li uvjete minimuma i maksimuma. Dakle, vrijeme raste linearno s brojem čvorova, O(n).',
    codeSnippet: `def is_bst(node, min_val=float('-inf'), max_val=float('inf')):\n    if node is None:\n        return True\n    if not (min_val < node.key < max_val):\n        return False\n    return is_bst(node.left, min_val, node.key) and is_bst(node.right, node.key, max_val)`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koji je osnovni uvjet za Binarno Stablo Pretraživanja (BST)?',
        options: ['Svi elementi u lijevom podstablu su manji, a u desnom veći od trenutnog čvora', 'Lijevo i desno podstablo moraju biti jednake dubine', 'Stablo mora imati paran broj elemenata', 'Čvorovi moraju biti sortirani silazno'],
        correctAnswer: 'Svi elementi u lijevom podstablu su manji, a u desnom veći od trenutnog čvora',
        explanation: 'To je definicija BST-a koja omogućava brzo pretraživanje u logaritamskom vremenu O(log n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni rekurzivni poziv za provjeru desnog podstabla (gdje je donja granica vrijednost trenutnog čvora):',
        codeContext: 'return is_bst(node.left, min_val, node.key) and is_bst(node.right, ___, max_val)',
        options: ['node.key', 'min_val', 'node.left.key', 'max_val'],
        correctAnswer: 'node.key',
        explanation: 'Za desno podstablo, svi ključevi moraju biti veći od roditeljskog čvora. Stoga donja granica (`min_val`) postaje `node.key`.'
      },
      {
        type: 'multiple-choice',
        question: 'Zašto u provjeri BST-a prosljeđujemo `min_val` i `max_val` umjesto da samo uspoređujemo roditelja s djecom?',
        options: ['Jer čvor mora biti veći/manji od SVIH čvorova u pripadajućem podstablu, a ne samo direktne djece', 'Jer je tako kod kraći', 'Tako zahtijeva Python compiler', 'Da bismo smanjili složenost na O(log n)'],
        correctAnswer: 'Jer čvor mora biti veći/manji od SVIH čvorova u pripadajućem podstablu, a ne samo direktne djece',
        explanation: 'Samo uspoređivanje s djecom nije dovoljno jer npr. lijevo dijete može imati desno dijete koje je veće od roditelja/korijena, što krši pravilo BST-a. Granice `min_val` i `max_val` osiguravaju globalnu ispravnost.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni provjeru je li ključ čvora izvan dopuštenih granica:',
        codeContext: 'def is_bst(node, min_val, max_val):\n    # ...\n    if not (min_val < ___ < max_val):\n        return False',
        options: ['node.key', 'node', 'node.left', 'node.right'],
        correctAnswer: 'node.key',
        explanation: 'Uspoređujemo vrijednost ključa trenutnog čvora (`node.key`) s dopuštenim granicama.'
      }
    ]
  },
  {
    id: 'bst_traversals',
    title: 'BST Traversals (In, Pre, Post)',
    description: 'Tri načina obilaska binarnog stabla.',
    bigO: 'O(n)',
    content: 'Svi standardni obilasci stabla prolaze kroz svaki čvor točno jednom i stoga su složenosti O(n).',
    codeSnippet: `def inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.key)\n        inorder(root.right)\n\ndef preorder(root):\n    if root:\n        print(root.key)\n        preorder(root.left)\n        preorder(root.right)\n\ndef postorder(root):\n    if root:\n        postorder(root.left)\n        postorder(root.right)\n        print(root.key)`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koji redoslijed obilaska BST stabla će ispisati elemente u rastućem redoslijedu?',
        options: ['In-order (Lijevo, Korijen, Desno)', 'Pre-order (Korijen, Lijevo, Desno)', 'Post-order (Lijevo, Desno, Korijen)', 'Level-order (po razinama)'],
        correctAnswer: 'In-order (Lijevo, Korijen, Desno)',
        explanation: 'Budući da su u BST-u svi manji elementi lijevo, a veći desno, In-order obilazak posjećuje čvorove točno po rastućem redoslijedu.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni inorder obilazak (posjet desnom podstablu na kraju):',
        codeContext: 'def inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.key)\n        ___',
        options: ['inorder(root.right)', 'inorder(root.left)', 'preorder(root.right)', 'postorder(root.right)'],
        correctAnswer: 'inorder(root.right)',
        explanation: 'Nakon što obiđe lijevo podstablo i ispiše vrijednost trenutnog čvora, inorder obilazi desno podstablo (`inorder(root.right)`).'
      },
      {
        type: 'multiple-choice',
        question: 'Koji obilazak stabla prvo posjećuje roditelja, a tek onda djecu?',
        options: ['Pre-order (Korijen, Lijevo, Desno)', 'In-order (Lijevo, Korijen, Desno)', 'Post-order (Lijevo, Desno, Korijen)', 'Level-order'],
        correctAnswer: 'Pre-order (Korijen, Lijevo, Desno)',
        explanation: 'Pre-order (pre = prije) znači da se trenutni čvor (roditelj) posjećuje/ispisuje prije rekurzivnih poziva za lijevo i desno dijete.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni postorder obilazak (roditelj na samom kraju):',
        codeContext: 'def postorder(root):\n    if root:\n        postorder(root.left)\n        postorder(root.right)\n        ___',
        options: ['print(root.key)', 'print(root)', 'inorder(root)', 'return 0'],
        correctAnswer: 'print(root.key)',
        explanation: 'U postorderu (post = poslije) trenutni čvor se posjećuje/ispisuje poslije obilaska oba podstabla.'
      }
    ]
  },
  {
    id: 'bucket_sort',
    title: 'Bucket Sort',
    description: 'Sortiranje raspoređivanjem elemenata u pretince (buckets).',
    bigO: 'O(n + k)',
    content: 'Kada su podaci ravnomjerno raspodijeljeni, Bucket Sort postiže skoro linearno vrijeme O(n+k), gdje je n broj elemenata, a k broj pretinaca.',
    codeSnippet: `def bucket_sort(niz):\n    if len(niz) == 0:\n        return niz\n    min_val = min(niz)\n    max_val = max(niz)\n    broj_bucketa = len(niz)\n    bucketi = [[] for _ in range(broj_bucketa)]\n    \n    for broj in niz:\n        if max_val == min_val:\n            indeks = 0\n        else:\n            indeks = int((broj - min_val) / (max_val - min_val) * (broj_bucketa - 1))\n        bucketi[indeks].append(broj)\n    \n    sortirani_niz = []\n    for bucket in bucketi:\n        sortirani_bucket = sorted(bucket)\n        sortirani_niz.extend(sortirani_bucket)\n    \n    return sortirani_niz`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koja je složenost Bucket Sorta ako su svi elementi raspoređeni u samo jedan pretinac (bucket)?',
        options: ['Ovisi o algoritmu koji sortira taj pretinac (npr. O(n²))', 'O(1)', 'O(n + k)', 'O(log n)'],
        correctAnswer: 'Ovisi o algoritmu koji sortira taj pretinac (npr. O(n²))',
        explanation: 'Ako svi elementi završe u jednom pretincu, Bucket sort degenerira u algoritam kojim se taj pojedinačni pretinac sortira (što je obično O(n²) ili O(n log n)).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni spajanje sortiranih pretinaca u konačni niz:',
        codeContext: 'sortirani_niz = []\nfor bucket in bucketi:\n    sortirani_bucket = sorted(bucket)\n    sortirani_niz.___(sortirani_bucket)',
        options: ['extend', 'append', 'insert', 'add'],
        correctAnswer: 'extend',
        explanation: 'Metoda `extend` dodaje sve elemente iz jedne liste na kraj druge liste, za razliku od `append` koja bi dodala cijelu listu kao jedan pod-element.'
      },
      {
        type: 'multiple-choice',
        question: 'Koji je najveći prostorni nedostatak Bucket Sorta?',
        options: ['Zahtijeva dodatnu memoriju za pretince (buckets)', 'Spor je za sortiranje cijelih brojeva', 'Ima prostornu složenost O(2ⁿ)', 'Troši puno call stack memorije'],
        correctAnswer: 'Zahtijeva dodatnu memoriju za pretince (buckets)',
        explanation: 'Bucket Sort stvara niz listi (pretinaca), što zahtijeva dodatni memorijski prostor ovisan o broju pretinaca i broju elemenata.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni dodavanje elementa u pripadajući pretinac:',
        codeContext: 'for broj in niz:\n    indeks = ...\n    bucketi[indeks].___(broj)',
        options: ['append', 'extend', 'add', 'insert'],
        correctAnswer: 'append',
        explanation: 'U Pythonu koristimo `append` za dodavanje pojedinačnog elementa na kraj liste (pretinca).'
      }
    ]
  },
  {
    id: 'hash_word_freq',
    title: 'Hash: Učestalost riječi',
    description: 'Korištenje rječnika (hash tablice) za brojanje frekvencije riječi.',
    bigO: 'O(n)',
    content: 'Traženje i dodavanje elemenata u hash tablicu/rječnik uzima O(1) u prosjeku. Ako pročitamo n riječi u tekstu, složenost će biti O(n).',
    codeSnippet: `def word_frequency(text):\n    word_freq = {}\n    words = text.split()\n    for word in words:\n        if len(word) > 0:\n            if word in word_freq:\n                word_freq[word] += 1\n            else:\n                word_freq[word] = 1\n    return word_freq`,
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Koja je prosječna vremenska složenost provjere postoji li riječ u rječniku (hash tablici)?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)',
        explanation: 'Hash tablice nam omogućavaju prosječnu vremensku složenost O(1) za pretraživanje, umetanje i brisanje zahvaljujući izravnom mapiranju preko hash funkcije.'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni kod za povećanje brojača ako riječ već postoji u rječniku:',
        codeContext: 'if word in word_freq:\n    word_freq[word] ___\nelse:\n    word_freq[word] = 1',
        options: ['+= 1', '= 1', '++', '+ 1'],
        correctAnswer: '+= 1',
        explanation: 'U Pythonu koristimo `+= 1` da bismo uvećali trenutnu vrijednost brojača za 1.'
      },
      {
        type: 'multiple-choice',
        question: 'Koji je najgori slučaj vremenske složenosti pretraživanja u Hash tablici (npr. kod velikog broja kolizija)?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'Ako sve vrijednosti imaju isti hash ključ (kolizija), moramo pretražiti lanac dužine n, što vodi do vremenske složenosti O(n).'
      },
      {
        type: 'fill-in-the-blank',
        question: 'Dopuni pretvaranje teksta u listu riječi pomoću separatora praznina:',
        codeContext: 'def word_frequency(text):\n    word_freq = {}\n    words = text.___()\n    for word in words:',
        options: ['split', 'join', 'strip', 'replace'],
        correctAnswer: 'split',
        explanation: 'Metoda `split()` dijeli niz znakova na pojedinačne riječi koristeći bjelinu (razmak) kao zadani razdjelnik.'
      }
    ]
  }
];
