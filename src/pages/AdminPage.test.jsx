import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdminPage from './AdminPage';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

// 1. MOCKANDO TODAS AS DEPENDÊNCIAS EXTERNAS
jest.mock('../services/api');
jest.mock('jwt-decode');

// Mock do localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock do window.alert e window.confirm
global.alert = jest.fn();
global.confirm = jest.fn(() => true); // Simula o usuário sempre clicando "OK"

const mockPosts = [
  { _id: '1', titulo: 'Primeiro Post', conteudo: 'Conteúdo do primeiro post', autor: 'Admin' },
  { _id: '2', titulo: 'Segundo Post', conteudo: 'Conteúdo do segundo post', autor: 'Admin' },
];

describe('AdminPage Component', () => {
  
  // Limpa todos os mocks antes de cada teste para garantir isolamento
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configuração padrão dos mocks
    api.get.mockResolvedValue({ data: mockPosts });
    api.post.mockResolvedValue({ data: { _id: '3', titulo: 'Novo Post', conteudo: 'Conteúdo novo', autor: 'Admin Teste' } });
    api.put.mockResolvedValue({});
    api.delete.mockResolvedValue({});

    jwtDecode.mockReturnValue({ nome: 'Admin Teste' });
    localStorage.setItem('token', 'fake-token');
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );
  };

  test('deve renderizar, buscar e exibir os posts', async () => {
    renderComponent();

    // Verifica se o estado de carregamento é exibido
    expect(screen.getByText('Carregando posts...')).toBeInTheDocument();

    // Espera a UI ser atualizada após a busca de dados
    await waitFor(() => {
      expect(screen.getByText('Primeiro Post')).toBeInTheDocument();
      expect(screen.getByText('Segundo Post')).toBeInTheDocument();
    });

    // Verifica se o nome do autor do formulário foi preenchido via token
    expect(screen.getByLabelText('Autor:').value).toBe('Admin Teste');
  });

  test('deve permitir a criação de um novo post', async () => {
    renderComponent();
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1)); // Garante que o fetch inicial terminou

    // Preenche o formulário
    await userEvent.type(screen.getByLabelText('Título:'), 'Novo Post Criado');
    await userEvent.type(screen.getByLabelText('Conteúdo:'), 'Conteúdo do novo post.');

    // Simula o envio do formulário
    await userEvent.click(screen.getByRole('button', { name: /criar/i }));

    // Verifica se a API de post foi chamada com os dados corretos
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/posts', {
        titulo: 'Novo Post Criado',
        conteudo: 'Conteúdo do novo post.',
        autor: 'Admin Teste',
      });
    });

    // Verifica se a lista de posts foi atualizada
    expect(api.get).toHaveBeenCalledTimes(2);
    expect(global.alert).toHaveBeenCalledWith('Post criado com sucesso!');
  });

  test('deve permitir a edição de um post existente', async () => {
    renderComponent();
    await waitFor(() => expect(screen.getByText('Primeiro Post')).toBeInTheDocument());

    // Encontra o botão de editar do primeiro post e clica nele
    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    await userEvent.click(editButtons[0]);

    // Verifica se o formulário foi preenchido com os dados do post
    expect(screen.getByLabelText('Título:').value).toBe('Primeiro Post');
    expect(screen.getByLabelText('Conteúdo:').value).toBe('Conteúdo do primeiro post');
    expect(screen.getByRole('heading', { name: /editar post/i })).toBeInTheDocument();

    // Altera o título e envia
    await userEvent.clear(screen.getByLabelText('Título:'));
    await userEvent.type(screen.getByLabelText('Título:'), 'Título Atualizado');
    await userEvent.click(screen.getByRole('button', { name: /atualizar/i }));

    // Verifica se a API de PUT foi chamada corretamente
    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith('/posts/1', {
        titulo: 'Título Atualizado',
        conteudo: 'Conteúdo do primeiro post',
      });
    });

    expect(global.alert).toHaveBeenCalledWith('Post atualizado com sucesso!');
    expect(api.get).toHaveBeenCalledTimes(2); // Refetch
  });

  test('deve permitir a exclusão de um post', async () => {
    renderComponent();
    await waitFor(() => expect(screen.getByText('Primeiro Post')).toBeInTheDocument());

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i });
    await userEvent.click(deleteButtons[0]);

    // Verifica se a confirmação foi chamada
    expect(global.confirm).toHaveBeenCalledWith('Tem certeza que deseja excluir este post?');

    // Verifica se a API de delete foi chamada
    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/posts/1');
    });

    expect(global.alert).toHaveBeenCalledWith('Post excluído com sucesso!');
    expect(api.get).toHaveBeenCalledTimes(2);
  });

  test('deve filtrar os posts de acordo com o termo de busca', async () => {
    renderComponent();
    await waitFor(() => expect(screen.getByText('Primeiro Post')).toBeInTheDocument());

    // Ambos os posts estão visíveis inicialmente
    expect(screen.getByText('Primeiro Post')).toBeInTheDocument();
    expect(screen.getByText('Segundo Post')).toBeInTheDocument();

    // Digita no campo de busca
    const searchInput = screen.getByPlaceholderText('Buscar posts...');
    await userEvent.type(searchInput, 'Segundo');

    // Apenas o segundo post deve estar visível
    expect(screen.queryByText('Primeiro Post')).not.toBeInTheDocument();
    expect(screen.getByText('Segundo Post')).toBeInTheDocument();
  });
});