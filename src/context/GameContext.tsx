import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type AlgorithmStatus = 'locked' | 'available' | 'solved';

export interface AlgorithmDef {
  id: string;
  title: string;
  description: string;
  status: AlgorithmStatus;
  streak: number;
  maxStreakReq: number;
  templateCode: string; // the full correct code
  blanks: { line: number; index: number; expected: string }[]; // for fill-in-the-blank
}

interface GameContextType {
  score: number;
  addScore: (points: number) => void;
  algorithms: AlgorithmDef[];
  activeAlgorithmId: string | null;
  setActiveAlgorithmId: (id: string | null) => void;
  updateStreak: (id: string, success: boolean) => void;
  activeTab: 'practice' | 'lessons';
  setActiveTab: (tab: 'practice' | 'lessons') => void;
  completedLessons: string[];
  completeLesson: (lessonId: string) => void;
}

const defaultAlgos: AlgorithmDef[] = [
  {
    id: 'binary_search',
    title: 'Binary Search',
    description: 'Pronađi element u sortiranom nizu brže nego linearnom pretragom.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1`,
    blanks: [
      { line: 4, index: 0, expected: 'while low <= high:' },
      { line: 5, index: 0, expected: 'mid = (low + high) // 2' },
      { line: 6, index: 0, expected: 'if arr[mid] == target:' },
      { line: 8, index: 0, expected: 'elif arr[mid] < target:' },
      { line: 9, index: 0, expected: 'low = mid + 1' },
      { line: 11, index: 0, expected: 'high = mid - 1' }
    ]
  },
  {
    id: 'bubble_sort',
    title: 'Bubble Sort',
    description: 'Najjednostavniji algoritam za sortiranje nizova.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def bubble_sort(arr):
    n = len(arr)
    swapped = True
    while swapped:
        swapped = False
        for i in range(1, n):
            if arr[i-1] > arr[i]:
                arr[i-1], arr[i] = arr[i], arr[i-1]
                swapped = True
        if not swapped:
            break
    return arr`,
    blanks: [
      { line: 3, index: 0, expected: 'while swapped:' },
      { line: 5, index: 0, expected: 'for i in range(1, n):' },
      { line: 6, index: 0, expected: 'if arr[i-1] > arr[i]:' },
      { line: 7, index: 0, expected: 'arr[i-1], arr[i] = arr[i], arr[i-1]' },
      { line: 8, index: 0, expected: 'swapped = True' }
    ]
  },
  {
    id: 'merge_sort',
    title: 'Merge Sort',
    description: 'Divide and conquer algoritam za efikasno sortiranje.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    middle = len(arr) // 2
    left = merge_sort(arr[:middle])
    right = merge_sort(arr[middle:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    while len(left) > 0 and len(right) > 0:
        if left[0] <= right[0]:
            result += [left[0]]
            left = left[1:]
        else:
            result += [right[0]]
            right = right[1:]
    
    result += left
    result += right
    
    return result`,
    blanks: [
      { line: 1, index: 0, expected: 'if len(arr) <= 1:' },
      { line: 4, index: 0, expected: 'middle = len(arr) // 2' },
      { line: 5, index: 0, expected: 'left = merge_sort(arr[:middle])' },
      { line: 6, index: 0, expected: 'right = merge_sort(arr[middle:])' },
      { line: 12, index: 0, expected: 'while len(left) > 0 and len(right) > 0:' },
      { line: 13, index: 0, expected: 'if left[0] <= right[0]:' }
    ]
  },
  {
    id: 'quick_sort',
    title: 'Quick Sort',
    description: 'Sortiranje bazirano na particioniranju oko pivota (in-place).',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low
    for j in range(low, high):
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
            
    arr[i], arr[high] = arr[high], arr[i]
    return i`,
    blanks: [
      { line: 1, index: 0, expected: 'if low < high:' },
      { line: 2, index: 0, expected: 'pivot_index = partition(arr, low, high)' },
      { line: 7, index: 0, expected: 'pivot = arr[high]' },
      { line: 9, index: 0, expected: 'for j in range(low, high):' },
      { line: 10, index: 0, expected: 'if arr[j] <= pivot:' },
      { line: 11, index: 0, expected: 'arr[i], arr[j] = arr[j], arr[i]' },
      { line: 14, index: 0, expected: 'arr[i], arr[high] = arr[high], arr[i]' }
    ]
  },
  {
    id: 'circular_queue',
    title: 'Circular Queue (Enqueue/Dequeue)',
    description: 'Implementacija cirkularnog reda koristeći polje.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `class Queue:
    def __init__(self, max_size):
        self.items = [None] * max_size
        self.max_size = max_size
        self.front = -1
        self.size = 0

    def enqueue(self, item):
        if self.size == self.max_size:
            raise IndexError("The queue is full")
        else:
            if self.front == -1:
                self.front = 0
            self.items[(self.front + self.size) % self.max_size] = item
            self.size += 1

    def dequeue(self):
        if self.size == 0:
            raise IndexError("The queue is empty")
        else:
            first_element = self.items[self.front]
            self.items[self.front] = None
            self.front = (self.front + 1) % self.max_size
            self.size -= 1
            if self.size == 0:
                self.front = -1
            return first_element`,
    blanks: [
      { line: 13, index: 0, expected: 'self.items[(self.front + self.size) % self.max_size] = item' },
      { line: 20, index: 0, expected: 'first_element = self.items[self.front]' },
      { line: 22, index: 0, expected: 'self.front = (self.front + 1) % self.max_size' }
    ]
  },
  {
    id: 'binary_search_recursive',
    title: 'Binary Search (Recursive)',
    description: 'Rekurzivna implementacija binarnog pretraživanja iz vježbi (P5).',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def binary_search_recursive(arr, low, high, target):
    if low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] > target:
            return binary_search_recursive(arr, low, mid - 1, target)
        else:
            return binary_search_recursive(arr, mid + 1, high, target)
    else:
        return -1`,
    blanks: [
      { line: 1, index: 0, expected: 'if low <= high:' },
      { line: 2, index: 0, expected: 'mid = (low + high) // 2' },
      { line: 6, index: 0, expected: 'return binary_search_recursive(arr, low, mid - 1, target)' },
      { line: 8, index: 0, expected: 'return binary_search_recursive(arr, mid + 1, high, target)' }
    ]
  },
  {
    id: 'fact_recursive',
    title: 'Faktorijel (Recursive)',
    description: 'Izračun faktorijela korištenjem rekurzije (P5).',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def fact(n):
    if n==0:
        return 1
    else:
        return n * fact(n-1)`,
    blanks: [
      { line: 1, index: 0, expected: 'if n==0:' },
      { line: 2, index: 0, expected: 'return 1' },
      { line: 4, index: 0, expected: 'return n * fact(n-1)' }
    ]
  },
  {
    id: 'bst_max_depth',
    title: 'BST: Max Depth',
    description: 'Određivanje maksimalne dubine binarnog stabla (P9).',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
    blanks: [
      { line: 1, index: 0, expected: 'if root is None:' },
      { line: 2, index: 0, expected: 'return 0' },
      { line: 3, index: 0, expected: 'return 1 + max(max_depth(root.left), max_depth(root.right))' }
    ]
  },
  {
    id: 'selection_sort',
    title: 'Selection Sort',
    description: 'Sortiranje niza traženjem minimuma u ne-sortiranom dijelu.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def selection_sort(arr):
    for k in range(0,len(arr)-1):
        temp = arr[k]
        mn, mn_idx = find_min(arr[k:len(arr)])
        arr[k] = mn
        arr[k+mn_idx] = temp
    return arr`,
    blanks: [
      { line: 1, index: 0, expected: 'for k in range(0,len(arr)-1):' },
      { line: 3, index: 0, expected: 'mn, mn_idx = find_min(arr[k:len(arr)])' },
      { line: 5, index: 0, expected: 'arr[k+mn_idx] = temp' }
    ]
  },
  {
    id: 'bucket_sort',
    title: 'Bucket Sort',
    description: 'Sortiranje raspoređivanjem elemenata u pretince (buckets).',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def bucket_sort(niz):
    if len(niz) == 0:
        return niz
    min_val = min(niz)
    max_val = max(niz)
    broj_bucketa = len(niz)
    bucketi = [[] for _ in range(broj_bucketa)]
    
    for broj in niz:
        if max_val == min_val:
            indeks = 0
        else:
            indeks = int((broj - min_val) / (max_val - min_val) * (broj_bucketa - 1))
        bucketi[indeks].append(broj)
    
    sortirani_niz = []
    for bucket in bucketi:
        sortirani_bucket = sorted(bucket)
        sortirani_niz.extend(sortirani_bucket)
    
    return sortirani_niz`,
    blanks: [
      { line: 6, index: 0, expected: 'bucketi = [[] for _ in range(broj_bucketa)]' },
      { line: 12, index: 0, expected: 'indeks = int((broj - min_val) / (max_val - min_val) * (broj_bucketa - 1))' },
      { line: 13, index: 0, expected: 'bucketi[indeks].append(broj)' },
      { line: 18, index: 0, expected: 'sortirani_niz.extend(sortirani_bucket)' }
    ]
  },
  {
    id: 'insertion_sort',
    title: 'Insertion Sort',
    description: 'Jednostavno sortiranje umetanjem elemenata na pravo mjesto.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    blanks: [
      { line: 1, index: 0, expected: 'for i in range(1, len(arr)):' },
      { line: 4, index: 0, expected: 'while j >= 0 and key < arr[j]:' },
      { line: 5, index: 0, expected: 'arr[j + 1] = arr[j]' },
      { line: 7, index: 0, expected: 'arr[j + 1] = key' }
    ]
  },
  {
    id: 'stack_sll',
    title: 'Stack (Linked List)',
    description: 'Implementacija stoga koristeći jednostruko povezanu listu.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `class Stack:
    def __init__(self):
        self.SLL = SLL_simple()

    def is_empty(self):
        return self.SLL.head == None

    def push(self, item):
        self.SLL.add_first(item)

    def pop(self):
        if not self.is_empty():
            item = self.SLL.head.data
            self.SLL.delete_first()
            return item
        else:
            raise IndexError("Pop from an empty stack")`,
    blanks: [
      { line: 5, index: 0, expected: 'return self.SLL.head == None' },
      { line: 8, index: 0, expected: 'self.SLL.add_first(item)' },
      { line: 13, index: 0, expected: 'self.SLL.delete_first()' }
    ]
  },
  {
    id: 'bubble_sort_sll',
    title: 'Bubble Sort (SLL)',
    description: 'Bubble sort implementiran nad jednostruko povezanom listom.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def bubble_sort_sll(head):
    if head is None:
        return head
    swapped = True
    while swapped:
        swapped = False
        current = head
        while current.next is not None:
            if current.data > current.next.data:
                current.data, current.next.data = current.next.data, current.data
                swapped = True
            current = current.next
    return head`,
    blanks: [
      { line: 7, index: 0, expected: 'while current.next is not None:' },
      { line: 8, index: 0, expected: 'if current.data > current.next.data:' },
      { line: 9, index: 0, expected: 'current.data, current.next.data = current.next.data, current.data' },
      { line: 11, index: 0, expected: 'current = current.next' }
    ]
  },
  {
    id: 'is_bst',
    title: 'Je li stablo BST?',
    description: 'Provjera je li zadano binarno stablo ispravno binarno stablo pretraživanja.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def is_bst(node, min_val=float('-inf'), max_val=float('inf')):
    if node is None:
        return True
    if not (min_val < node.key < max_val):
        return False
    return is_bst(node.left, min_val, node.key) and is_bst(node.right, node.key, max_val)`,
    blanks: [
      { line: 3, index: 0, expected: 'if not (min_val < node.key < max_val):' },
      { line: 5, index: 0, expected: 'return is_bst(node.left, min_val, node.key) and is_bst(node.right, node.key, max_val)' }
    ]
  },
  {
    id: 'bst_traversals',
    title: 'BST Traversals (In, Pre, Post)',
    description: 'Tri načina obilaska binarnog stabla.',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def inorder(root):
    if root:
        inorder(root.left)
        print(root.key)
        inorder(root.right)

def preorder(root):
    if root:
        print(root.key)
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.key)`,
    blanks: [
      { line: 2, index: 0, expected: 'inorder(root.left)' },
      { line: 3, index: 0, expected: 'print(root.key)' },
      { line: 4, index: 0, expected: 'inorder(root.right)' },
      { line: 9, index: 0, expected: 'preorder(root.left)' },
      { line: 16, index: 0, expected: 'print(root.key)' }
    ]
  },
  {
    id: 'hash_word_freq',
    title: 'Hash: Učestalost riječi',
    description: 'Korištenje rječnika (hash tablice) za brojanje frekvencije riječi (P8).',
    status: 'available',
    streak: 0,
    maxStreakReq: 5,
    templateCode: `def word_frequency(text):
    word_freq = {}
    words = text.split()
    for word in words:
        if len(word) > 0:
            if word in word_freq:
                word_freq[word] += 1
            else:
                word_freq[word] = 1
    return word_freq`,
    blanks: [
      { line: 1, index: 0, expected: 'word_freq = {}' },
      { line: 5, index: 0, expected: 'if word in word_freq:' },
      { line: 6, index: 0, expected: 'word_freq[word] += 1' },
      { line: 8, index: 0, expected: 'word_freq[word] = 1' }
    ]
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [algorithms, setAlgorithms] = useState<AlgorithmDef[]>(defaultAlgos);
  const [activeAlgorithmId, setActiveAlgorithmId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'practice' | 'lessons'>('practice');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from DB on mount
  useEffect(() => {
    fetch('/api/db')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch from DB');
        return res.json();
      })
      .then(data => {
        if (data && typeof data.score === 'number') {
          setScore(data.score);
        }
        if (data && data.streaks && typeof data.streaks === 'object') {
          setAlgorithms(prev => prev.map(algo => {
            const savedStreak = data.streaks[algo.id];
            if (typeof savedStreak === 'number') {
              const newStatus = savedStreak >= algo.maxStreakReq ? 'solved' : 'available';
              return { ...algo, streak: savedStreak, status: newStatus };
            }
            return algo;
          }));
        }
        if (data && Array.isArray(data.completedLessons)) {
          setCompletedLessons(data.completedLessons);
        }
        setLoaded(true);
      })
      .catch(err => {
        console.warn("Failed to load local DB, falling back to localStorage:", err);
        const savedScore = localStorage.getItem('algolearn_score');
        const savedStreaks = localStorage.getItem('algolearn_streaks');
        const savedLessons = localStorage.getItem('algolearn_lessons');
        if (savedScore) setScore(parseInt(savedScore, 10));
        if (savedStreaks) {
          try {
            const streaksObj = JSON.parse(savedStreaks);
            setAlgorithms(prev => prev.map(algo => {
              const savedStreak = streaksObj[algo.id];
              if (typeof savedStreak === 'number') {
                const newStatus = savedStreak >= algo.maxStreakReq ? 'solved' : 'available';
                return { ...algo, streak: savedStreak, status: newStatus };
               }
               return algo;
             }));
          } catch(e) {}
        }
        if (savedLessons) {
          try {
            setCompletedLessons(JSON.parse(savedLessons));
          } catch(e) {}
        }
        setLoaded(true);
      });
  }, []);

  // Save to DB on updates (only after loaded)
  useEffect(() => {
    if (!loaded) return;
    const streaks: Record<string, number> = {};
    algorithms.forEach(algo => {
      streaks[algo.id] = algo.streak;
    });
    const payload = { score, streaks, completedLessons };

    localStorage.setItem('algolearn_score', score.toString());
    localStorage.setItem('algolearn_streaks', JSON.stringify(streaks));
    localStorage.setItem('algolearn_lessons', JSON.stringify(completedLessons));

    fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => {
      console.error("Failed to save to local DB:", err);
    });
  }, [score, algorithms, completedLessons, loaded]);

  const addScore = (points: number) => setScore(s => s + points);

  const updateStreak = (id: string, success: boolean) => {
    setAlgorithms(prev => prev.map(algo => {
      if (algo.id !== id) return algo;
      
      let newStreak = success ? algo.streak + 1 : 0;
      let newStatus = algo.status;
      
      if (newStreak >= algo.maxStreakReq) {
        newStatus = 'solved';
      }
      
      return { ...algo, streak: newStreak, status: newStatus };
    }));
  };

  const completeLesson = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  };

  return (
    <GameContext.Provider value={{
      score, addScore, algorithms, activeAlgorithmId, setActiveAlgorithmId, updateStreak,
      activeTab, setActiveTab, completedLessons, completeLesson
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
