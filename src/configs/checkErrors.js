// Seta erro no formulário e atualiza o objeto de erros
const setFormError = (form, fieldName, fieldTitle, objErrors) => {
  form.setError(fieldName, {
    type: 'manual',
    message: 'Campo obrigatório'
  })
  // Adiciona o campo no array de erros e define o status como verdadeiro
  if (!objErrors.errors.includes(fieldTitle)) {
    objErrors.errors.push(fieldTitle)
    objErrors.status = true
  }
}

// Checa os erros nos campos estáticos
const checkErrorStaticHeader = (form, fieldName, title, objErrors) => {
  const fieldValue = form.getValues(fieldName)
  if (!fieldValue) setFormError(form, fieldName, title, objErrors)
}

// Checa os erros nos campos dinâmicos
const checkErrorsDynamicHeader = (form, fields, objErrors) => {
  if (!fields || !Array.isArray(fields)) return

  fields.forEach((field, index) => {
    const fieldName = field.tabela
      ? `header.fields[${index}].${field.tabela}`
      : `header.fields[${index}].${field.nomeColuna}`

    const fieldValue = form.getValues(fieldName)
    if (field.obrigatorio === 1 && !fieldValue) {
      setFormError(form, fieldName, field.nomeCampo, objErrors)
    }
  })
}

const checkErrorsBlocks = (form, blocos, objErrors) => {
  if (!blocos || !Array.isArray(blocos)) return

  blocos.forEach((block, indexBlock) => {
    block.itens.forEach((item, indexItem) => {
      // Valida resposta do item
      const fieldResposta = `blocos[${indexBlock}].itens[${indexItem}].resposta`
      const fieldValue = form.getValues(fieldResposta)

      if (item?.obrigatorio === 1 && !fieldValue) {
        setFormError(form, fieldResposta, item?.nome, objErrors)
      }

      // Valida anexos solicitados na resposta
      const resposta = item?.resposta
      if (resposta?.anexo === 1 && resposta?.anexosSolicitados?.length > 0) {
        resposta.anexosSolicitados.forEach((anexo, indexAnexo) => {
          const fieldAnexo = `blocos[${indexBlock}].itens[${indexItem}].resposta.anexosSolicitados[${indexAnexo}].anexos`
          const anexos = form.getValues(fieldAnexo) || []

          if (anexo.obrigatorio === 1 && (!anexos || anexos.length === 0)) {
            setFormError(form, fieldAnexo, `Anexo: ${item?.nome} / ${anexo?.nome}`, objErrors)
          }
        })
      }
    })
  })
}

// Retorna o status e os erros detectados
const getErrors = (objErrors) => ({
  status: objErrors.status,
  errors: [...objErrors.errors]
})

export { checkErrorStaticHeader, checkErrorsDynamicHeader, checkErrorsBlocks, getErrors, setFormError }
