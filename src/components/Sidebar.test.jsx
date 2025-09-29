import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

// Agrupa todos os testes relacionados ao componente Sidebar
describe('Sidebar Component', () => {

  // Função auxiliar para evitar repetição.
  // Ela renderiza o Sidebar já envolvido pelo MemoryRouter.
  const renderSidebar = () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
  };

  test('deve renderizar no modo recolhido por padrão', () => {
    // 1. Arrange
    renderSidebar();

    // 2. Assert
    // Verifica se os links estão presentes (pelo título, que serve como accessible name)
    expect(screen.getByTitle('Home')).toBeInTheDocument();
    expect(screen.getByTitle('Admin')).toBeInTheDocument();

    // No modo recolhido, os textos "Home", "Admin", etc., NÃO devem estar visíveis.
    // Usamos queryByText porque ele retorna null se não encontrar, ao invés de um erro.
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Registrar')).not.toBeInTheDocument();
  });

  test('deve expandir quando o mouse passar sobre ele e exibir os textos dos links', async () => {
    // 1. Arrange
    renderSidebar();
    
    // O elemento <aside> tem um role implícito de "complementary"
    const sidebarElement = screen.getByRole('complementary');
    
    // 2. Act
    // Simula o usuário movendo o mouse para cima do elemento da sidebar
    await userEvent.hover(sidebarElement);

    // 3. Assert
    // Agora, os textos dos links DEVEM estar visíveis.
    // Usamos findByText ou getByText. findByText é útil se houver uma pequena transição.
    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Registrar')).toBeInTheDocument();
  });

  test('deve recolher quando o mouse sair de cima dele', async () => {
    // 1. Arrange
    renderSidebar();
    const sidebarElement = screen.getByRole('complementary');

    // 2. Act
    // Primeiro, simulamos a entrada do mouse para garantir que ele está expandido
    await userEvent.hover(sidebarElement);
    
    // Verificação intermediária (opcional): garantir que expandiu antes de recolher
    expect(await screen.findByText('Home')).toBeInTheDocument();

    // Agora, simulamos a saída do mouse
    await userEvent.unhover(sidebarElement);

    // 3. Assert
    // Os textos devem desaparecer novamente.
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
  });
});