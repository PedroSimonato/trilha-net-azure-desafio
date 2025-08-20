// Configuração da API
const API_BASE_URL = 'http://localhost:5234'; // Ajuste conforme necessário

// Elementos do DOM
const funcionarioForm = document.getElementById('funcionario-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const funcionariosList = document.getElementById('funcionarios-list');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const loading = document.getElementById('loading');
const toast = document.getElementById('toast');

// Estado da aplicação
let editingFuncionarioId = null;
let funcionarioToDelete = null;

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadFuncionarios();
    
    funcionarioForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    
    // Fechar modal clicando fora
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
});

// Funções de utilidade
function showLoading() {
    loading.style.display = 'flex';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Funções da API
async function apiRequest(url, options = {}) {
    try {
        showLoading();
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = response.status !== 204 ? await response.json() : null;
        return data;
    } catch (error) {
        console.error('API Error:', error);
        showToast('Erro na comunicação com o servidor', 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

async function getFuncionario(id) {
    return await apiRequest(`${API_BASE_URL}/Funcionario/${id}`);
}

async function createFuncionario(funcionario) {
    return await apiRequest(`${API_BASE_URL}/Funcionario`, {
        method: 'POST',
        body: JSON.stringify(funcionario)
    });
}

async function updateFuncionario(id, funcionario) {
    return await apiRequest(`${API_BASE_URL}/Funcionario/${id}`, {
        method: 'PUT',
        body: JSON.stringify(funcionario)
    });
}

async function deleteFuncionario(id) {
    return await apiRequest(`${API_BASE_URL}/Funcionario/${id}`, {
        method: 'DELETE'
    });
}

// Funções de manipulação do formulário
function getFormData() {
    const formData = new FormData(funcionarioForm);
    const funcionario = {};
    
    for (let [key, value] of formData.entries()) {
        if (key === 'salario') {
            funcionario[key] = parseFloat(value);
        } else if (key === 'dataAdmissao') {
            funcionario[key] = new Date(value).toISOString();
        } else {
            funcionario[key] = value;
        }
    }
    
    return funcionario;
}

function populateForm(funcionario) {
    document.getElementById('nome').value = funcionario.nome || '';
    document.getElementById('endereco').value = funcionario.endereco || '';
    document.getElementById('ramal').value = funcionario.ramal || '';
    document.getElementById('emailProfissional').value = funcionario.emailProfissional || '';
    document.getElementById('departamento').value = funcionario.departamento || '';
    document.getElementById('salario').value = funcionario.salario || '';
    
    if (funcionario.dataAdmissao) {
        const date = new Date(funcionario.dataAdmissao);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        document.getElementById('dataAdmissao').value = localDate.toISOString().slice(0, 16);
    }
}

function clearForm() {
    funcionarioForm.reset();
    editingFuncionarioId = null;
    formTitle.textContent = 'Adicionar Funcionário';
    submitBtn.textContent = 'Adicionar';
    cancelBtn.style.display = 'none';
}

function cancelEdit() {
    clearForm();
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    try {
        const funcionario = getFormData();
        
        if (editingFuncionarioId) {
            await updateFuncionario(editingFuncionarioId, funcionario);
            showToast('Funcionário atualizado com sucesso!', 'success');
        } else {
            await createFuncionario(funcionario);
            showToast('Funcionário criado com sucesso!', 'success');
        }
        
        clearForm();
        loadFuncionarios();
    } catch (error) {
        showToast('Erro ao salvar funcionário', 'error');
    }
}

// Funções de busca
async function handleSearch() {
    const id = searchInput.value.trim();
    
    if (!id) {
        loadFuncionarios();
        return;
    }
    
    try {
        const funcionario = await getFuncionario(id);
        displayFuncionarios([funcionario]);
        showToast('Funcionário encontrado!', 'success');
    } catch (error) {
        showToast('Funcionário não encontrado', 'error');
        displayFuncionarios([]);
    }
}

// Funções de exibição
function displayFuncionarios(funcionarios) {
    if (!funcionarios || funcionarios.length === 0) {
        funcionariosList.innerHTML = `
            <div class="empty-state">
                <h3>Nenhum funcionário encontrado</h3>
                <p>Adicione um novo funcionário usando o formulário acima.</p>
            </div>
        `;
        return;
    }
    
    funcionariosList.innerHTML = funcionarios.map(funcionario => `
        <div class="funcionario-card">
            <div class="funcionario-header">
                <div class="funcionario-nome">${funcionario.nome}</div>
                <div class="funcionario-id">ID: ${funcionario.id}</div>
            </div>
            <div class="funcionario-details">
                <div class="funcionario-detail">
                    <strong>Endereço:</strong> ${funcionario.endereco}
                </div>
                <div class="funcionario-detail">
                    <strong>Ramal:</strong> ${funcionario.ramal}
                </div>
                <div class="funcionario-detail">
                    <strong>Email:</strong> ${funcionario.emailProfissional}
                </div>
                <div class="funcionario-detail">
                    <strong>Departamento:</strong> ${funcionario.departamento}
                </div>
                <div class="funcionario-detail">
                    <strong>Salário:</strong> ${formatCurrency(funcionario.salario)}
                </div>
                <div class="funcionario-detail">
                    <strong>Data de Admissão:</strong> ${formatDate(funcionario.dataAdmissao)}
                </div>
            </div>
            <div class="funcionario-actions">
                <button class="btn-edit" onclick="editFuncionario(${funcionario.id})">
                    Editar
                </button>
                <button class="btn-delete" onclick="showDeleteModal(${funcionario.id})">
                    Excluir
                </button>
            </div>
        </div>
    `).join('');
}

async function loadFuncionarios() {
    try {
        // Como a API não tem endpoint para listar todos, vamos simular
        // Em uma implementação real, você adicionaria um endpoint GET /Funcionario
        showToast('Para visualizar funcionários, use a busca por ID', 'info');
        displayFuncionarios([]);
    } catch (error) {
        showToast('Erro ao carregar funcionários', 'error');
        displayFuncionarios([]);
    }
}

// Funções de edição
async function editFuncionario(id) {
    try {
        const funcionario = await getFuncionario(id);
        populateForm(funcionario);
        editingFuncionarioId = id;
        formTitle.textContent = 'Editar Funcionário';
        submitBtn.textContent = 'Atualizar';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll para o formulário
        document.querySelector('.form-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    } catch (error) {
        showToast('Erro ao carregar dados do funcionário', 'error');
    }
}

// Funções de exclusão
function showDeleteModal(id) {
    funcionarioToDelete = id;
    deleteModal.style.display = 'block';
}

function closeDeleteModal() {
    funcionarioToDelete = null;
    deleteModal.style.display = 'none';
}

async function confirmDelete() {
    if (!funcionarioToDelete) return;
    
    try {
        await deleteFuncionario(funcionarioToDelete);
        showToast('Funcionário excluído com sucesso!', 'success');
        closeDeleteModal();
        loadFuncionarios();
    } catch (error) {
        showToast('Erro ao excluir funcionário', 'error');
    }
}

