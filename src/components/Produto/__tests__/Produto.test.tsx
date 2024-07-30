import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

// Criar uma variável dentro do teste só para fazer rapidamente, chama-se "mock" de
// informações do backend
const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windows'],
  preco: 199.9,
  precoAntigo: 299.9,
  titulo: 'Hogwarts Legacy'
}

const jogo2 = {
  id: 1,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windows'],
  preco: 150.9,
  precoAntigo: 199.9,
  titulo: 'Elden Ring'
}

describe('Testes para o componente Produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
  })

  test('Deve adicionar um item ao carrinho', () => {
    renderizaComProvider(<Produto game={jogo2} />)
    const btnSelector = screen.getByTestId('add-game')
    fireEvent.click(btnSelector)
    expect(screen.getByText('Elden Ring')).toBeInTheDocument()
  })

  test('Deve adicionar um item ao carrinho, com leitura de estados', () => {
    // ler estado da aplicação
    const { store } = renderizaComProvider(<Produto game={jogo2} />)
    const btnSelector = screen.getByTestId('add-game')
    fireEvent.click(btnSelector)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
