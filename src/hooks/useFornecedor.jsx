import { create } from 'zustand'

export const useFornecedor = create(set => ({
    fornecedores: [],
    setFornecedores: fornecedores => set({ fornecedores })
}))
