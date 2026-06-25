import * as contatosRepository from '../database/repositories/contatosRepository';
import { AppError, InternalServerError } from '../utils/errors';
import { Logger } from '../utils/logger';

export const addContato = async (userId: number, data: { nome: string; telefone: string; parentesco: string | null }) => {
    try {
        const id = await contatosRepository.createContato({
            id_usuario: userId,
            nome: data.nome,
            telefone: data.telefone,
            parentesco: data.parentesco ?? null,
        });
        return id;
    } catch (error) {
        Logger.error("Erro no business ao adicionar contato:", error);
        throw new InternalServerError('Erro ao adicionar contato.');
    }
};

export const listContatos = async (userId: number) => {
    try {
        return await contatosRepository.findContatosByUserId(userId);
    } catch (error) {
        Logger.error("Erro no business ao listar contatos:", error);
        throw new InternalServerError('Erro ao listar contatos.');
    }
};

// Adicionar no contatosBusiness.ts (após listContatos)

export const deleteContato = async (userId: number, contatoId: number) => {
    try {
        const deleted = await contatosRepository.deleteContatoById(contatoId, userId);
        if (!deleted) {
            throw new AppError('Contato não encontrado ou sem permissão.', 404);
        }
        return deleted;
    } catch (error) {
        if (error instanceof AppError) throw error;
        Logger.error("Erro no business ao deletar contato:", error);
        throw new InternalServerError('Erro ao deletar contato.');
    }
};