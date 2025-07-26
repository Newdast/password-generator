// Obtengo los elementos del DOM
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const passwordOutput = document.getElementById('password');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

// Actualizo la longitud del slider
lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

// Obtengo los caracteres aleatorios de diferentes tipos
const getRandom = {
  lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbol: () => "!@#$%^&*()_+-=[]{};:,.<>?".charAt(Math.floor(Math.random() * 20))
};

// Genera la contraseña cuando el usuario clickea el boton "Generar"
generateBtn.addEventListener('click', () => {
  const length = +lengthInput.value;
  const hasLower = lowercase.checked;
  const hasUpper = uppercase.checked;
  const hasNumber = numbers.checked;
  const hasSymbol = symbols.checked;

  const types = [
    { enabled: hasLower, fn: getRandom.lower },
    { enabled: hasUpper, fn: getRandom.upper },
    { enabled: hasNumber, fn: getRandom.number },
    { enabled: hasSymbol, fn: getRandom.symbol }
  ].filter(t => t.enabled);

  // En caso de que no selecciono ninguno, muestro un mensaje y no genera contraseña 
  if (types.length === 0) {
    passwordOutput.value = "Seleccioná al menos una opción.";
    return;
  }

  // Genera la contraseña con los tipos seleccionados por el usuario
  let password = "";
  for (let i = 0; i < length; i++) {
    const randType = types[Math.floor(Math.random() * types.length)];
    password += randType.fn();
  }
  
  passwordOutput.value = password;
});

// Copia la contraseña al portapapeles del usuario cuando se hacer click en "Copiar"
copyBtn.addEventListener('click', () => {
  const password = passwordOutput.value;
  if (!password) return;
  navigator.clipboard.writeText(password).then(() => {
    copyBtn.textContent = "✅ Copiado";
    setTimeout(() => copyBtn.textContent = "📋 Copiar", 1500);
  });
});
