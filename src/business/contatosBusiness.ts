import * as contatosRepository from '../database/repositories/contatosRepository';
import { InternalServerError } from '../utils/errors';
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