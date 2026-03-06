const MAX_IMPONIBLE = 3577178;
const MESES = 60;

function byId(id) {
  return document.getElementById(id);
}

function parseLocaleNumber(raw) {
  const txt = String(raw ?? "").trim();
  if (!txt) return NaN;

  // Soporta "1.234,56", "1,234.56", "1234,56" y "1234.56"
  const hasComma = txt.includes(",");
  const hasDot = txt.includes(".");

  if (hasComma && hasDot) {
    const lastComma = txt.lastIndexOf(",");
    const lastDot = txt.lastIndexOf(".");
    if (lastComma > lastDot) {
      return Number(txt.replace(/\./g, "").replace(",", "."));
    }
    return Number(txt.replace(/,/g, ""));
  }

  if (hasComma) {
    return Number(txt.replace(",", "."));
  }

  return Number(txt);
}

function annualPctToMonthlyRate(annualPct) {
  const annual = annualPct / 100;
  return Math.pow(1 + annual, 1 / 12) - 1;
}

function projectWithMonthlyDeposit({ initialAmount, monthlyDeposit, monthlyRate, months }) {
  let balance = initialAmount;
  for (let i = 0; i < months; i += 1) {
    balance += monthlyDeposit;
    balance *= (1 + monthlyRate);
  }
  return balance;
}

function formatClp(n) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(n);
}

const fieldRules = [
  { id: "sueldoBruto", label: "Sueldo bruto", min: 0 },
  { id: "ahorroActual", label: "Ahorro actual", min: 0 },
  { id: "comisionAfpActualPct", label: "Comisión AFP actual", min: 0 },
  { id: "comisionAfpDestinoPct", label: "Comisión AFP destino", min: 0 },
  { id: "rentAfpActualAnual", label: "Rentabilidad AFP actual", min: -99.99 },
  { id: "rentAfpDestinoAnual", label: "Rentabilidad AFP destino", min: -99.99 },
  { id: "rentAltAnual", label: "Rentabilidad alternativa", min: -99.99 }
];

function clearErrors() {
  byId("formError").textContent = "";
  fieldRules.forEach(({ id }) => {
    const input = byId(id);
    const err = byId(`err${id.charAt(0).toUpperCase()}${id.slice(1)}`);
    input.classList.remove("invalid");
    err.textContent = "";
  });
}

function showFieldError(id, msg) {
  const input = byId(id);
  const err = byId(`err${id.charAt(0).toUpperCase()}${id.slice(1)}`);
  input.classList.add("invalid");
  err.textContent = msg;
}

function validateInputs() {
  clearErrors();
  let ok = true;

  for (const rule of fieldRules) {
    const raw = byId(rule.id).value;
    const val = parseLocaleNumber(raw);

    if (raw.trim() === "" || !Number.isFinite(val)) {
      showFieldError(rule.id, `${rule.label}: ingresa un número válido.`);
      ok = false;
      continue;
    }

    if (val < rule.min) {
      showFieldError(rule.id, `${rule.label}: debe ser mayor o igual a ${rule.min}.`);
      ok = false;
    }
  }

  if (!ok) {
    byId("formError").textContent = "Corrige los campos marcados antes de calcular.";
  }
  return ok;
}

function getNum(id) {
  return parseLocaleNumber(byId(id).value);
}

function calcular() {
  if (!validateInputs()) return;

  const sueldoBruto = getNum("sueldoBruto");
  const ahorroActual = getNum("ahorroActual");
  const comisionAfpActualPct = getNum("comisionAfpActualPct");
  const comisionAfpDestinoPct = getNum("comisionAfpDestinoPct");
  const rentAltAnual = getNum("rentAltAnual");
  const rentAfpActualAnual = getNum("rentAfpActualAnual");
  const rentAfpDestinoAnual = getNum("rentAfpDestinoAnual");

  const baseImponible = Math.min(sueldoBruto, MAX_IMPONIBLE);
  const cotizacionMensual = baseImponible * 0.10;

  const rAfpActualMensual = annualPctToMonthlyRate(rentAfpActualAnual);
  const rAfpDestinoMensual = annualPctToMonthlyRate(rentAfpDestinoAnual);
  const rAltMensual = annualPctToMonthlyRate(rentAltAnual);

  const finalAfpActual = projectWithMonthlyDeposit({
    initialAmount: ahorroActual,
    monthlyDeposit: cotizacionMensual,
    monthlyRate: rAfpActualMensual,
    months: MESES
  });

  const finalAfpDestino = projectWithMonthlyDeposit({
    initialAmount: ahorroActual,
    monthlyDeposit: cotizacionMensual,
    monthlyRate: rAfpDestinoMensual,
    months: MESES
  });

  // Comisión como % de la base imponible mensual (respeta tope imponible)
  const comisionMensualActual = baseImponible * (comisionAfpActualPct / 100);
  const comisionMensualDestino = baseImponible * (comisionAfpDestinoPct / 100);

  const comision5Actual = comisionMensualActual * MESES;
  const comision5Destino = comisionMensualDestino * MESES;

  const difCostos5 = Math.abs(comision5Actual - comision5Destino);

  // Diferencia mensual de comisión invertida en cuenta alternativa
  const difComisionMensual = Math.abs(comisionMensualActual - comisionMensualDestino);
  const finalAlternativa = projectWithMonthlyDeposit({
    initialAmount: 0,
    monthlyDeposit: difComisionMensual,
    monthlyRate: rAltMensual,
    months: MESES
  });

  // Restar a cada AFP su costo respectivo
  const actualAjustada = finalAfpActual - comision5Actual;
  const destinoAjustada = finalAfpDestino - comision5Destino;

  // La diferencia de comisiones invertida se suma al escenario con menor comisión
  let actualPatrimonio = actualAjustada;
  let destinoPatrimonio = destinoAjustada;
  if (comisionMensualActual < comisionMensualDestino) {
    actualPatrimonio += finalAlternativa;
  } else if (comisionMensualDestino < comisionMensualActual) {
    destinoPatrimonio += finalAlternativa;
  }

  byId("outAfpActual").textContent = formatClp(finalAfpActual);
  byId("outAfpDestino").textContent = formatClp(finalAfpDestino);
  byId("outComision5Actual").textContent = formatClp(comision5Actual);
  byId("outComision5Destino").textContent = formatClp(comision5Destino);
  byId("outDifCostos5").textContent = formatClp(difCostos5);
  byId("outAltFinal").textContent = formatClp(finalAlternativa);
  byId("outActualAjustada").textContent = formatClp(actualPatrimonio);
  byId("outDestinoAjustada").textContent = formatClp(destinoPatrimonio);

  const ganador =
    actualPatrimonio > destinoPatrimonio ? "AFP actual" :
    destinoPatrimonio > actualPatrimonio ? "AFP destino" : "Empate";

  const mejorMonto = Math.max(actualPatrimonio, destinoPatrimonio);

  byId("outGanador").innerHTML =
    `Resultado final: <strong>${ganador}</strong> con ${formatClp(mejorMonto)} neto (descontando comisiones y sumando cuenta alternativa a la AFP con menor comisión).`;
}

function limpiarResultados() {
  clearErrors();
  [
    "outAfpActual",
    "outAfpDestino",
    "outComision5Actual",
    "outComision5Destino",
    "outDifCostos5",
    "outAltFinal",
    "outActualAjustada",
    "outDestinoAjustada"
  ].forEach((id) => {
    byId(id).textContent = "-";
  });
  byId("outGanador").textContent = "Resultado final: -";
}

byId("calcForm").addEventListener("submit", (e) => {
  e.preventDefault();
  calcular();
});

byId("btnLimpiar").addEventListener("click", limpiarResultados);
