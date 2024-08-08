
// Mascara para CNPJ
function cnpjMask(cnpj) {
  if (cnpj) {
    cnpj = cnpj.replace(/\D/g, '') // remove caracteres não numéricos
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2') // adiciona ponto após os dois primeiros dígitos
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // adiciona ponto após o terceiro dígito
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2') // adiciona barra após o quinto dígito
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2') // adiciona traço após o oitavo dígito
  }

  return cnpj
}


// Mascara para CPF
function cpfMask(cpf) {
  if (cpf) {
    cpf = cpf.replace(/\D/g, '') // remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // adiciona ponto após o terceiro dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // adiciona ponto após o terceiro dígito
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2') // adiciona ponto após o terceiro dígito
  }

  return cpf
}

function rgMask(rg) {
  if (rg) {
    rg = rg.replace(/\D/g, ''); // remove caracteres não numéricos
    rg = rg.replace(/(\d{2})(\d)/, '$1.$2'); // adiciona ponto após os dois primeiros dígitos
    rg = rg.replace(/(\d{3})(\d)/, '$1.$2'); // adiciona ponto após os três primeiros dígitos
    rg = rg.replace(/(\d{3})(\d)/, '$1-$2'); // adiciona traço após os três primeiros dígitos
  }
  return rg;
}

// Mascara telefone celular
function cellPhoneMask(cellPhone) {
  if (!cellPhone) return cellPhone

  cellPhone = cellPhone.replace(/\D/g, ''); // remove tudo que não é dígito
  cellPhone = cellPhone.replace(/^(\d{2})(\d)/g, '($1) $2'); // adiciona parênteses em volta dos dois primeiros dígitos
  cellPhone = cellPhone.replace(/(\d)(\d{4})$/, '$1-$2'); // adiciona hífen entre o quinto e o sexto dígitos
  // Remove o primeiro hífen após o código de área
  cellPhone = cellPhone.replace(/\)-/, ')');

  return cellPhone;
}

function cepMask(cep) {
  cep = cep.replace(/\D/g, '') // remove tudo que não é dígito
  cep = cep.replace(/^(\d{5})(\d)/, '$1-$2') // adiciona hífen após o quinto dígito

  return cep
}

function ufMask(uf) {
  uf = uf.toUpperCase(); // converte a string para letras maiúsculas
  uf = uf.replace(/[^A-Z]/g, ''); // remove todos os caracteres que não são letras

  return uf;
}

const currencyMask = (value) => {
  const cleanValue = value.replace(/\D/g, "");
  const numberValue = parseFloat(cleanValue);
  if (isNaN(numberValue)) {
    return "R$ 0,00";
  }
  const decimalValue = numberValue / 100;
  return decimalValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// Ex.: 1.580.000,587
const fractioned3Mask = (value) => {
  // Remove todos os caracteres que não são dígitos
  const cleanValue = value.replace(/\D/g, "");

  // Converte o valor limpo para número flutuante
  const numberValue = parseFloat(cleanValue);

  if (isNaN(numberValue)) {
    return "0,000";
  }

  // Converte o valor em uma string com 3 casas decimais
  const decimalValue = (numberValue / 1000).toFixed(3);

  // Separa a parte inteira da parte decimal
  const [integerPart, decimalPart] = decimalValue.split(".");

  // Adiciona os separadores de milhar
  const integerWithThousandSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Retorna o valor formatado
  return `${integerWithThousandSeparator},${decimalPart}`;
}

export { cnpjMask, cellPhoneMask, cepMask, ufMask, cpfMask, rgMask, currencyMask, fractioned3Mask }
