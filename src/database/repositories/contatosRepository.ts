import { db } from '../connection';
import { Logger } from '../../utils/logger';
import { InternalServerError } from '../../utils/errors';

type ContatoInput = {
    id_usuario: number;
    nome: string;
    telefone: string;
    parentesco: string | null;
};

type ContatoSummary = {
    id: number;
    id_usuario: number;
    nome: string;
    telefone: string;
    parentesco: string | null;
};

export const createContato = async (data: ContatoInput): Promise<number | null> => {
    try {
        const [id] = await db('contatos').insert(data);
        return id;
    } catch (error) {
        Logger.error("Erro ao criar contato:", error);
        throw new InternalServerError('Erro ao salvar contato.');
    }
};

export const findContatosByUserId = async (userId: number): Promise<ContatoSummary[]> => {
    try {
        const rows = await db('contatos').select('*').where('id_usuario', userId);
        return rows as ContatoSummary[];
    } catch (error) {
        Logger.error("Erro ao buscar contatos por ID do usuário:", error);
        throw new InternalServerError('Erro ao buscar contatos.');
    }
};