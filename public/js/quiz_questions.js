const QUIZ_DATABASE = [
  // ==========================================
  // 🟢 NIVEL JUNIOR (FÁCIL) - Preguntas 1 a 15
  // ==========================================
  {
    id: 1,
    difficulty: "facil",
    question: "¿Qué significa HTML?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    difficulty: "facil",
    question:
      "¿Cuál es el puerto por defecto para el tráfico web no seguro (HTTP)?",
    options: ["21", "443", "80", "8080"],
    correctIndex: 2,
  },
  {
    id: 3,
    difficulty: "facil",
    question:
      "En el mundo de los videojuegos, ¿qué estudio desarrolló 'League of Legends'?",
    options: ["Valve", "Blizzard", "Epic Games", "Riot Games"],
    correctIndex: 3,
  },
  {
    id: 4,
    difficulty: "facil",
    question:
      "¿Qué devuelve JavaScript si intentas dividir un número entre cero (ej. 10 / 0)?",
    options: ["0", "Infinity", "Error", "NaN"],
    correctIndex: 1,
  },
  {
    id: 5,
    difficulty: "facil",
    question:
      "¿Cuál es el lenguaje de programación conocido por tener una serpiente como logo?",
    options: ["Java", "Python", "C++", "Ruby"],
    correctIndex: 1,
  },
  {
    id: 6,
    difficulty: "facil",
    question:
      "En el universo de DC Comics, ¿cuál es el planeta natal de Superman?",
    options: ["Krypton", "Apokolips", "Oa", "Daxam"],
    correctIndex: 0,
  },
  {
    id: 7,
    difficulty: "facil",
    question: "¿Qué significan las siglas 'SQL' en bases de datos?",
    options: [
      "Server Query Language",
      "Structured Query Language",
      "System Question Language",
      "Standard Query Logic",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    difficulty: "facil",
    question:
      "En la serie 'Arcane', ¿cómo se llaman las dos ciudades gemelas enfrentadas?",
    options: [
      "Demacia y Noxus",
      "Piltover y Zaun",
      "Ionia y Freljord",
      "Shurima y Targon",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    difficulty: "facil",
    question:
      "¿Cuál es el atajo de teclado universal para 'Copiar' texto en la mayoría de sistemas operativos?",
    options: ["Ctrl + X", "Ctrl + V", "Ctrl + C", "Ctrl + Z"],
    correctIndex: 2,
  },
  {
    id: 10,
    difficulty: "facil",
    question: "¿Quién es la mascota oficial del sistema operativo Linux?",
    options: ["Un zorro", "Un demonio", "Un pingüino", "Un pez"],
    correctIndex: 2,
  },
  {
    id: 11,
    difficulty: "facil",
    question:
      "En hardware, ¿qué componente es considerado el 'cerebro' de la computadora?",
    options: [
      "La Memoria RAM",
      "El Disco Duro",
      "La GPU",
      "El Procesador (CPU)",
    ],
    correctIndex: 3,
  },
  {
    id: 12,
    difficulty: "facil",
    question: "¿Cuál es la identidad secreta de Batman?",
    options: ["Clark Kent", "Bruce Wayne", "Oliver Queen", "Barry Allen"],
    correctIndex: 1,
  },
  {
    id: 13,
    difficulty: "facil",
    question: "¿Qué extensión suelen tener los archivos de estilos web?",
    options: [".html", ".js", ".css", ".php"],
    correctIndex: 2,
  },

  // ==========================================
  // 🟡 NIVEL SEMI-SENIOR (INTERMEDIO) - Preguntas 14 a 27
  // ==========================================
  {
    id: 14,
    difficulty: "intermedio",
    question:
      "En sistemas ERP y de facturación como Odoo, ¿qué significan las siglas 'POS'?",
    options: [
      "Point of Sale",
      "Position of Server",
      "Process of System",
      "Program OS",
    ],
    correctIndex: 0,
  },
  {
    id: 15,
    difficulty: "intermedio",
    question:
      "¿Qué comando de Git se utiliza para enviar los commits locales al repositorio remoto?",
    options: ["git pull", "git commit", "git push", "git fetch"],
    correctIndex: 2,
  },
  {
    id: 16,
    difficulty: "intermedio",
    question:
      "El software open-source 'Blender' es utilizado principalmente para...",
    options: [
      "Editar hojas de cálculo",
      "Modelado 3D y animación",
      "Auditar redes Wi-Fi",
      "Compilar código C++",
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    difficulty: "intermedio",
    question:
      "¿Cuál es el código de estado HTTP que indica que una página 'No fue encontrada'?",
    options: ["200", "403", "500", "404"],
    correctIndex: 3,
  },
  {
    id: 18,
    difficulty: "intermedio",
    question:
      "En Call of Duty: Warzone, ¿cuál era el nombre del gigantesco mapa original del Battle Royale?",
    options: ["Caldera", "Verdansk", "Al Mazrah", "Rebirth Island"],
    correctIndex: 1,
  },
  {
    id: 19,
    difficulty: "intermedio",
    question:
      "En bases de datos relacionales, ¿qué es una 'Llave Foránea' (Foreign Key)?",
    options: [
      "Una contraseña encriptada",
      "Un índice único",
      "Un campo que enlaza dos tablas",
      "Una función de agrupamiento",
    ],
    correctIndex: 2,
  },
  {
    id: 20,
    difficulty: "intermedio",
    question:
      "En el 'Lore' de Arcane y LoL, ¿cómo se llama la tecnología mágica de cristales azules?",
    options: ["Magitech", "Hextech", "Cristalografía", "Energía del Vacío"],
    correctIndex: 1,
  },
  {
    id: 21,
    difficulty: "intermedio",
    question: "¿Qué significan las siglas 'API' en el desarrollo de software?",
    options: [
      "Advanced Programming Interface",
      "Application Programming Interface",
      "Automated Process Integration",
      "Asynchronous Program Internet",
    ],
    correctIndex: 1,
  },
  {
    id: 22,
    difficulty: "intermedio",
    question:
      "En estructuras de datos, ¿qué principio sigue una 'Pila' (Stack)?",
    options: [
      "FIFO (First In, First Out)",
      "LIFO (Last In, First Out)",
      "Random Access",
      "Binary Search",
    ],
    correctIndex: 1,
  },
  {
    id: 23,
    difficulty: "intermedio",
    question: "¿Qué empresa adquirió la plataforma GitHub en el año 2018?",
    options: ["Google", "Amazon", "Microsoft", "Meta"],
    correctIndex: 2,
  },
  {
    id: 24,
    difficulty: "intermedio",
    question:
      "¿Cuál es la dirección IP comúnmente utilizada para referirse al 'localhost'?",
    options: ["192.168.1.1", "127.0.0.1", "255.255.255.0", "8.8.8.8"],
    correctIndex: 1,
  },
  {
    id: 25,
    difficulty: "intermedio",
    question:
      "¿Qué comando se utiliza típicamente en Node.js para instalar dependencias de un proyecto?",
    options: ["node install", "npm get", "npm install", "git clone"],
    correctIndex: 2,
  },
  {
    id: 26,
    difficulty: "intermedio",
    question: "¿En qué ciudad ficticia opera principalmente Batman?",
    options: ["Metropolis", "Central City", "Star City", "Gotham City"],
    correctIndex: 3,
  },
  {
    id: 27,
    difficulty: "intermedio",
    question:
      "En SQL, ¿qué cláusula se usa para filtrar los resultados después de usar un GROUP BY?",
    options: ["WHERE", "ORDER BY", "HAVING", "FILTER"],
    correctIndex: 2,
  },

  // ==========================================
  // 🔴 NIVEL SENIOR/CTO (DIFÍCIL) - Preguntas 28 a 40
  // ==========================================
  {
    id: 28,
    difficulty: "dificil",
    question:
      "¿Cuál es la complejidad temporal (Notación Big O) promedio de un algoritmo de 'Búsqueda Binaria'?",
    options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
    correctIndex: 3,
  },
  {
    id: 29,
    difficulty: "dificil",
    question:
      "En Modelado 3D (como Blender), si una malla presenta sombras negras o caras invisibles tras extruir, suele ser un problema de...",
    options: [
      "Texturas sin UV mapping",
      "Normales invertidas",
      "Falta de iluminación",
      "Overclocking de la GPU",
    ],
    correctIndex: 1,
  },
  {
    id: 30,
    difficulty: "dificil",
    question:
      "En ciberseguridad, ¿qué significan las siglas 'DDoS' en un ataque de red?",
    options: [
      "Distributed Denial of Service",
      "Direct Data Overload System",
      "Digital Domain of Servers",
      "Dynamic Denial of Security",
    ],
    correctIndex: 0,
  },
  {
    id: 31,
    difficulty: "dificil",
    question:
      "¿Qué representa la 'S' en los principios de diseño 'SOLID' de la programación orientada a objetos?",
    options: [
      "Static Typing",
      "Single Responsibility",
      "Synchronous Execution",
      "System Security",
    ],
    correctIndex: 1,
  },
  {
    id: 32,
    difficulty: "dificil",
    question:
      "En League of Legends, ¿cada cuántos minutos reaparece el Dragón tras ser derrotado?",
    options: ["3 minutos", "4 minutos", "5 minutos", "6 minutos"],
    correctIndex: 2,
  },
  {
    id: 33,
    difficulty: "dificil",
    question: "¿Cuál de las siguientes es una base de datos de tipo 'NoSQL'?",
    options: ["PostgreSQL", "MySQL", "MongoDB", "MariaDB"],
    correctIndex: 2,
  },
  {
    id: 34,
    difficulty: "dificil",
    question:
      "¿Cuál es el valor máximo aproximado que puede almacenar un entero con signo (signed integer) de 32 bits?",
    options: ["2.14 mil millones", "4.29 mil millones", "65,535", "Infinito"],
    correctIndex: 0,
  },
  {
    id: 35,
    difficulty: "dificil",
    question: "¿Qué es una 'Promise' en JavaScript?",
    options: [
      "Un bucle infinito",
      "Un objeto que representa la finalización de una operación asíncrona",
      "Una variable inmutable",
      "Un tipo especial de Array",
    ],
    correctIndex: 1,
  },
  {
    id: 36,
    difficulty: "dificil",
    question: "En desarrollo de software corporativo, ¿qué significa 'ERP'?",
    options: [
      "Enterprise Resource Planning",
      "Electronic Retail Protocol",
      "External Routing Processor",
      "Entity Relational Programming",
    ],
    correctIndex: 0,
  },
  {
    id: 37,
    difficulty: "dificil",
    question:
      "¿Qué comando de Git guarda tus cambios locales temporalmente sin hacer un commit?",
    options: ["git save", "git temp", "git stash", "git hold"],
    correctIndex: 2,
  },
  {
    id: 38,
    difficulty: "dificil",
    question: "¿Quién es el creador principal del Kernel original de Linux?",
    options: ["Bill Gates", "Steve Jobs", "Richard Stallman", "Linus Torvalds"],
    correctIndex: 3,
  },
  {
    id: 39,
    difficulty: "dificil",
    question:
      "¿Cuál es el puerto estándar utilizado para establecer conexiones seguras mediante SSH?",
    options: ["21", "22", "23", "25"],
    correctIndex: 1,
  },
  {
    id: 40,
    difficulty: "dificil",
    question:
      "¿Cómo se llama la base secreta de Superman situada en el Ártico?",
    options: [
      "Atalaya",
      "Salón de la Justicia",
      "Fortaleza de la Soledad",
      "Cueva de Krypton",
    ],
    correctIndex: 2,
  },
];
