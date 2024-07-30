import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'
import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['PS5', 'Xbox Series X/S'],
    preco: 150,
    precoAntigo: 230.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Nintendo'],
    preco: 189.9,
    precoAntigo: 299.9,
    titulo: 'Donkey Kong'
  }
]

// requisicao é o que foi enviado ao servidor
// resposta é o que iremos responder
// contexto é por onde a resposta é construída
const server = setupServer(
  rest.get('http://localhost:4000/produtos'),
  (requisicao, resposta, contexto) => {
    return resposta(contexto.json(mocks))
  }
)

describe('Testes para o container Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  // teste síncrono
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  // teste assíncrono
  test('Deve renderizar corretamente', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor( () => {
      debug()
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
    })
  })
})
