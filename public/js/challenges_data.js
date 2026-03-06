const DEBUG_CHALLENGES = [
  {
    id: 1,
    title: "E-Commerce: Procesamiento de Carrito",
    language: "JavaScript (Node.js)",
    code: `async function checkout(orderId) {
  const cart = await db.fetchCart(orderId);
  let total = 0;

  // Calculando el total con impuestos
  cart.items.forEach(async (item) => {
    const price = await api.getPrice(item.id);
    total += price * item.qty;
  });

  if (total > 0) {
    return await db.processPayment(orderId, total);
  }
  throw new Error("El carrito está vacío o el total es cero");
}`,
    description:
      "Este módulo debe sumar los precios de todos los productos y procesar el pago final.",
    errorLine: 7,
    hint: "El método .forEach() no espera a que las promesas (async) terminen. ¿Qué valor tendrá 'total' al llegar al IF?",
    explanation:
      "forEach no es compatible con await; el código sigue ejecutándose sin esperar la suma.",
  },
  {
    id: 2,
    title: "Ciberseguridad: Acceso Administrativo",
    language: "Python (Flask)",
    code: `def login_admin():
    user = request.form.get('user')
    pw = request.form.get('pass')
    
    # Buscando credenciales en la base de datos
    query = f"SELECT id FROM admins WHERE u = '{user}' AND p = '{pw}'"
    result = db.engine.execute(query).fetchone()

    if result:
        session['user_id'] = result[0]
        return redirect('/dashboard')
    return "Acceso Denegado", 401`,
    description:
      "Valida las credenciales de un administrador contra la base de datos para permitir el acceso.",
    errorLine: 6,
    hint: "Mira cómo se introducen las variables en la cadena SQL. ¿Qué pasa si el usuario escribe comillas simples?",
    explanation:
      "Vulnerabilidad de Inyección SQL por uso de f-strings en consultas.",
  },
  {
    id: 3,
    title: "Lógica de Nómina: Cálculo de Bonos",
    language: "Java",
    code: `public double calculateBonus(Employee emp) {
    double baseBonus = 500.0;
    
    // Antigüedad mayor a 5 años recibe 20% extra
    if (emp.getYears() > 5); {
        baseBonus += baseBonus * 0.20;
    }
    
    // Departamento IT recibe bono fijo
    if (emp.getDept().equals("IT")) {
        baseBonus += 100;
    }
    return baseBonus;
}`,
    description:
      "Asigna un bono base y añade un 20% extra solo si el empleado tiene más de 5 años en la empresa.",
    errorLine: 5,
    hint: "Observa el final de la línea 5. Hay un signo de puntuación que corta la conexión entre el IF y el código de abajo.",
    explanation:
      "El punto y coma después del IF anula la condición, ejecutando el bloque siempre.",
  },
  {
    id: 4,
    title: "Sistema de Inventario: Suma de Stock",
    language: "JavaScript",
    code: `function processInventory(items) {
  let totalStock = 0;
  
  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i];
    
    if (currentItem.name && currentItem.quantity >= 0) {
      console.log("Añadiendo: " + currentItem.name);
      
      totalSrock += currentItem.quantity;
    }
  }
  return totalStock;
}`,
    description:
      "Recorre una lista de productos y acumula la cantidad total de existencias en una variable.",
    errorLine: 9,
    hint: "Lee con mucho cuidado el nombre de la variable donde estás sumando el stock en la línea 9.",
    explanation: "Error de dedo (Typo): 'totalSrock' en lugar de 'totalStock'.",
  },
  {
    id: 5,
    title: "Control de Aforo: Auditorio UTP",
    language: "C++",
    code: `void checkEntry(int current, int max) {
    cout << "Validando entrada de estudiante..." << endl;

    // Si el aforo actual es menor al máximo, permitir
    if (current < max) {
        cout << "Acceso permitido." << endl;
    } else {
        cout << "Capacidad máxima. Espere afuera." << endl;
    }

    if (current = max) {
        sendAlertToSecurity();
    }
}`,
    description:
      "Permite el acceso si hay espacio y envía una alerta si el auditorio se llena exactamente al máximo.",
    errorLine: 12,
    hint: "En el último bloque, ¿estás comparando si son iguales o estás obligando a que sean iguales?",
    explanation: "Uso de '=' (asignación) en lugar de '==' (comparación).",
  },
  {
    id: 6,
    title: "UI: Toggle de Modo Oscuro",
    language: "JavaScript",
    code: `function toggleDarkMode() {
  const body = document.body;
  const isDark = body.classList.contains("dark-mode");

  if (isDark) {
    // Si ya está oscuro, quitarlo
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  } else {
    // Si está claro, ponerlo
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "dark");
  }
}`,
    description:
      "Detecta si el modo oscuro está activo para quitarlo, o activarlo si no lo está.",
    errorLine: 11,
    hint: "Mira la acción del bloque 'else'. Si la página NO es oscura, ¿qué deberías hacer con la clase?",
    explanation: "Lógica duplicada: se usa .remove() en ambos casos del IF.",
  },
  {
    id: 7,
    title: "Buscador de Estudiantes: Array Index",
    language: "Java",
    code: `public String findStudent(String[] students, int id) {
    System.out.println("Iniciando búsqueda...");

    for (int i = 0; i <= students.length; i++) {
        if (i == id) {
            return students[i];
        }
    }
    return "No encontrado";
}`,
    description:
      "Busca en un arreglo de nombres el estudiante que coincide con el índice proporcionado.",
    errorLine: 4,
    hint: "Si un arreglo tiene 10 elementos, el último índice es 9. ¿Qué pasa si el ciclo llega a 10?",
    explanation:
      "Error de índice fuera de rango (IndexOutOfBounds) por usar '<=' en el límite del array.",
  },
  {
    id: 8,
    title: "Calculadora VIP: Retorno de Valor",
    language: "Python",
    code: `def get_discounted_price(price, is_vip):
    discount = 0.05
    if is_vip:
        discount = 0.25
    
    savings = price * discount
    final_price = price - savings
    
    print("Descuento aplicado con éxito")
    return savings`,
    description:
      "Calcula el ahorro basado en el estatus del cliente y debe devolver el PRECIO FINAL a pagar.",
    errorLine: 9,
    hint: "La función promete el precio con descuento, pero mira qué variable está saliendo por el 'return'.",
    explanation:
      "La función devuelve el ahorro (savings) en lugar del precio final.",
  },
  {
    id: 9,
    title: "Filtro de Mensajes: Inmutabilidad",
    language: "Python",
    code: `def clean_text(user_input):
    bad_words = ["error", "fail", "null"]
    
    for word in bad_words:
        user_input.replace(word, "****")
    
    print("Texto procesado.")
    return user_input`,
    description:
      "Busca palabras prohibidas en un texto y las reemplaza por asteriscos antes de devolverlo.",
    errorLine: 5,
    hint: "En Python, los textos son inmutables. .replace() no cambia el original, genera uno nuevo.",
    explanation:
      "Falta reasignar la variable: user_input = user_input.replace(...).",
  },
  {
    id: 10,
    title: "Contador de Clics: Race Condition",
    language: "JavaScript (React)",
    code: `const handleLike = () => {
  // El usuario dio clic 3 veces rápido
  setLikes(likes + 1);
  setLikes(likes + 1);
  setLikes(likes + 1);
  
  console.log("Likes actualizados en el estado.");
};`,
    description:
      "Simula un botón de 'Like' que debería aumentar el contador en 3 unidades al ejecutarse.",
    errorLine: 3,
    hint: "Las actualizaciones de estado son asíncronas y usan el valor del cierre. ¿Qué valor de 'likes' ven las 3 líneas?",
    explanation:
      "Race condition: todas las llamadas ven el mismo valor inicial de 'likes'.",
  },
  {
    id: 11,
    title: "Validación de Registro: Edad",
    language: "C#",
    code: `public bool ValidateUser(int age, bool parentalPermission) {
    // Permitir si es mayor de 18
    // O si tiene 13 y permiso de los padres
    if (age >= 18) {
        return true;
    }

    if (age >= 13 && parentalPermission == false) {
        return true;
    }

    return false;
}`,
    description:
      "Verifica si un menor de edad puede registrarse basándose exclusivamente en el permiso de sus padres.",
    errorLine: 8,
    hint: "Mira la condición del segundo IF. Dice que si tiene permiso FALSO, entra. ¿Es eso correcto?",
    explanation: "Lógica booleana invertida: permite acceso sin permiso.",
  },
  {
    id: 12,
    title: "Gestión de Archivos: Exportación",
    language: "Python",
    code: `def export_data(data_list):
    try:
        f = open("data.txt", "w")
        for item in data_list:
            f.write(item + "\\n")
        print("Exportación completa.")
    except:
        print("Error al escribir.")
    
    f.close()`,
    description:
      "Abre un archivo, escribe una lista de datos y debe asegurarse de cerrar el archivo siempre.",
    errorLine: 10,
    hint: "Si ocurre un error al abrir el archivo (línea 3), la variable 'f' nunca se crea. ¿Qué pasará en la línea 10?",
    explanation:
      "Referencia a variable inexistente si el try falla en la apertura.",
  },
  {
    id: 13,
    title: "Sincronización: Temporizador Logout",
    language: "JavaScript",
    code: `function startTimer() {
  let timeLeft = 30;

  const countdown = setInterval(() => {
    timeLeft--;
    console.log("Cerrando en: " + timeLeft);

    if (timeLeft = 0) {
      clearInterval(countdown);
      doLogout();
    }
  }, 1000);
}`,
    description:
      "Reduce el tiempo cada segundo y ejecuta el cierre de sesión exactamente cuando llega a cero.",
    errorLine: 8,
    hint: "El signo '=' asigna el valor 0 a la variable, lo cual siempre se evalúa como falso. ¿Cómo comparas?",
    explanation: "Uso de asignación en lugar de comparación de igualdad (==).",
  },
  {
    id: 14,
    title: "Data Science: Promedio de Notas",
    language: "Python (Pandas)",
    code: `def get_average(scores):
    # scores es una lista de números
    total = sum(scores)
    count = len(scores)
    
    # Promedio = total dividido entre cantidad
    average = total / count - 1
    
    return average`,
    description:
      "Calcula el promedio aritmético simple de una lista de calificaciones estudiantiles.",
    errorLine: 7,
    hint: "Mira la fórmula matemática en la línea 7. Hay un elemento extra que no pertenece al cálculo del promedio.",
    explanation: "Operación matemática errónea (sobra el -1).",
  },
  {
    id: 15,
    title: "Buscador SQL: Filtro de Categoría",
    language: "SQL",
    code: `SELECT product_name, price 
FROM products 
WHERE category_id = 5 
   OR status = 'discontinued'
ORDER BY price DESC;`,
    description:
      "Debe mostrar productos de la categoría 5 que NO estén descontinuados para la venta.",
    errorLine: 4,
    hint: "El requerimiento dice que NO deben estar descontinuados, pero el código usa 'OR status = ...'.",
    explanation:
      "Lógica de filtrado incorrecta (debería ser AND status != ...).",
  },
  {
    id: 16,
    title: "Manejo de Memoria: Sensor Stream",
    language: "C++",
    code: `void processLogs() {
  for (int i = 0; i < 1000; i++) {
    Log* l = new Log(i);
    if (l->isCritical()) {
      saveToDisk(l);
      delete l;
    }
    sendToCloud(l);
  }
}`,
    description:
      "Crea logs en memoria, los guarda si son críticos y los envía a la nube en cada iteración.",
    errorLine: 4,
    hint: "Creas un objeto con 'new'. Solo lo borras con 'delete' si es crítico. ¿Qué pasa si no lo es?",
    explanation:
      "Fuga de memoria (Memory Leak): el objeto no se libera en el flujo normal.",
  },
  {
    id: 17,
    title: "Validación de Email: Formulario",
    language: "JavaScript",
    code: `function validateEmail(email) {
  if (email.includes("@")) {
    console.log("Formato correcto detectado.");
  }
  
  // Siempre devuelve inválido
  return "Email inválido por seguridad";
}`,
    description:
      "Comprueba si el texto contiene una @ y devuelve éxito si la validación es correcta.",
    errorLine: 7,
    hint: "Incluso si el email es válido y entra al IF, el código sigue de largo hasta la última línea.",
    explanation: "Falta de 'return' dentro del condicional exitoso.",
  },
  {
    id: 18,
    title: "Matemáticas: Factorial de un Número",
    language: "C#",
    code: `public int Factorial(int n) {
    int res = 1;
    for (int i = 1; i <= n; i++) {
        // Multiplicación acumulada
        res = res + i;
    }
    return res;
}`,
    description:
      "Debe calcular el factorial (n!) multiplicando todos los números desde 1 hasta n.",
    errorLine: 5,
    hint: "El factorial de 3 es 1 * 2 * 3. Mira la operación matemática que estás haciendo en la línea 5.",
    explanation: "Suma en lugar de multiplicación acumulada.",
  },
  {
    id: 19,
    title: "Control de Drone: Coordenadas",
    language: "Python",
    code: `def move_drone(coords):
    x = coords['x']
    y = coords['y']
    
    print(f"Moviendo a: {x}, {y}")
    # Error de tipos al intentar sumar a la coordenada
    new_x = x + "10.5"
    return new_x`,
    description:
      "Recibe coordenadas actuales y les suma un desplazamiento de 10.5 unidades en el eje X.",
    errorLine: 7,
    hint: "x es un número, pero '10.5' está entre comillas. ¿Puedes sumar un número y un texto?",
    explanation: "Error de tipo (TypeError) al intentar sumar float y string.",
  },
  {
    id: 20,
    title: "Servidor: Health Check",
    language: "Go",
    code: `func checkStatus() bool {
    status := getDBStatus()
    if status == "OFFLINE" {
        return false
    }
    return true
    fmt.Println("Status verificado con éxito")
}`,
    description:
      "Verifica el estado de la base de datos y muestra un mensaje de confirmación al finalizar.",
    errorLine: 7,
    hint: "Una vez que el código ejecuta un 'return', se sale de la función. ¿Se ejecutará alguna vez la línea 7?",
    explanation:
      "Código inalcanzable (Unreachable code) después de los retornos.",
  },
  {
    id: 21,
    title: "Seguridad: Password Length",
    language: "JavaScript",
    code: `function validatePass(p) {
  if (p.length > 8) {
    return "Password seguro";
  } else 
    console.log("Error de longitud detectado.");
    return "Password muy corto";
}`,
    description:
      "Valida que la contraseña sea mayor a 8 caracteres, de lo contrario devuelve un error.",
    errorLine: 6,
    hint: "Sin llaves {}, el 'else' solo afecta a la primera línea de abajo. El 'return corto' se ejecutará siempre.",
    explanation:
      "Falta de llaves en el bloque else causa ejecución incondicional del segundo return.",
  },
  {
    id: 22,
    title: "Conversor: USD a PAB",
    language: "JavaScript",
    code: `function convertToBalboas(usd) {
  const rate = 1.0;
  console.log("Calculando paridad...");
  
  const total = usdd * rate;
  return total;
}`,
    description:
      "Multiplica el monto en dólares por la tasa de cambio 1:1 de Panamá.",
    errorLine: 5,
    hint: "Revisa el nombre de la variable de entrada y cómo la escribiste en la fórmula matemática.",
    explanation: "Typo en variable: 'usdd' en lugar de 'usd'.",
  },
  {
    id: 23,
    title: "Hardware: Lectura de Temperatura",
    language: "C++",
    code: `float readTemp() {
    float raw = analogRead(A0);
    float celsius = (raw * 5.0) / 1024.0;
    
    if (celsius > 38.0) {
        alertOverheat();
    }
    
    // ERROR: Se le olvidó devolver el valor calculado
    return;
}`,
    description:
      "Lee el sensor, activa una alerta si hay sobrecalentamiento y devuelve la temperatura actual.",
    errorLine: 10,
    hint: "La función dice que devuelve un 'float', pero el return está vacío.",
    explanation: "Falta el valor de retorno en una función no-void.",
  },
  {
    id: 24,
    title: "Arreglos: Limpiar Datos Nulos",
    language: "JavaScript",
    code: `function cleanData(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null) {
      // Elimina elemento del arreglo
      arr.splice(i, 1);
    }
  }
  return arr;
}`,
    description: "Recorre una lista y elimina cualquier entrada que sea nula.",
    errorLine: 5,
    hint: "Cuando eliminas un elemento, los demás se mueven. Al saltar al siguiente 'i', ¡te saltas un elemento!",
    explanation:
      "Error de lógica al modificar el array mientras se itera hacia adelante.",
  },
  {
    id: 25,
    title: "Backend: Crear ID de Usuario",
    language: "Python",
    code: `def create_user_id(name, year):
    # El ID debe ser: Nombre + Año (ej: Ale2026)
    prefix = name
    suffix = year
    
    # Intento de unir texto y número
    user_id = prefix + suffix
    return user_id`,
    description:
      "Genera un identificador único concatenando el nombre del usuario y su año de registro.",
    errorLine: 7,
    hint: "A Python no le gusta sumar palabras y números. Debes convertir el año a texto primero.",
    explanation: "TypeError: concatenación de string e int sin cast.",
  },
  {
    id: 26,
    title: "React: Loop Infinito",
    language: "JavaScript (React)",
    code: `useEffect(() => {
  const newCount = count + 1;
  // Actualizando el mismo estado que dispara el efecto
  setCount(newCount);
}, [count]);`,
    description:
      "Debe actualizar un contador cada vez que el valor de 'count' cambie externamente.",
    errorLine: 4,
    hint: "El efecto depende de 'count'. Si dentro del efecto cambias 'count', el efecto se vuelve a disparar para siempre.",
    explanation: "Bucle infinito de renders (Infinite loop).",
  },
  {
    id: 27,
    title: "API: Carga de Datos JSON",
    language: "JavaScript",
    code: `async function getData() {
  const res = await fetch('https://api.devvibes.com/v1');
  const data = res.json();
  
  if (data.status === "OK") {
    return data.payload;
  }
}`,
    description:
      "Descarga datos de la red y accede a la propiedad 'payload' si el estatus es exitoso.",
    errorLine: 3,
    hint: "res.json() devuelve una PROMESA. Debes esperar a que los datos se procesen.",
    explanation: "Falta 'await' en el método .json().",
  },
  {
    id: 28,
    title: "Clases: Constructor de Carro",
    language: "Java",
    code: `public class Car {
    String model;
    
    public Car(String m) {
        // Asignando el modelo al atributo de la clase
        m = model;
    }
}`,
    description:
      "Recibe un modelo por parámetro y lo guarda en el atributo de la instancia del objeto.",
    errorLine: 6,
    hint: "Estás guardando el atributo vacío en el parámetro, en lugar de guardar el parámetro en el atributo.",
    explanation: "Asignación invertida en el constructor.",
  },
  {
    id: 29,
    title: "SQL: Eliminar duplicados",
    language: "SQL",
    code: `DELETE FROM users 
WHERE id NOT IN (
    SELECT id FROM users 
    GROUP BY email
);`,
    description:
      "Borra todos los usuarios excepto uno por cada correo electrónico único registrado.",
    errorLine: 4,
    hint: "Al usar GROUP BY, MySQL/SQL suele dar error si el ID no es parte de la agregación o es ambiguo.",
    explanation:
      "Error de sintaxis SQL: subconsulta inválida para borrado directo en algunas versiones.",
  },
  {
    id: 30,
    title: "Ciberseguridad: Comparación Hash",
    language: "Node.js",
    code: `function verify(input, storedHash) {
  const hashedInput = crypto.hash(input);
  
  // Comparación de tiempo constante
  if (hashedInput = storedHash) {
    return "Acceso total";
  }
  return "Invasor detectado";
}`,
    description:
      "Compara el hash generado del usuario con el de la base de datos para dar acceso.",
    errorLine: 5,
    hint: "Una vez más, revisa si estás comparando o estás sobrescribiendo el valor.",
    explanation: "Uso de '=' en lugar de '==' o '==='.",
  },
];
