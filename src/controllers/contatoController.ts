import { Request, Response } from 'express';
import * as contatosBusiness from '../business/contatosBusiness';
import { AppError } from '../utils/errors';
import { Logger } from '../utils/logger';

export const handleAddContato = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const { nome, telefone, parentesco } = req.body;
        if (!nome || !telefone) {
            return res.status(400).json({ error: 'Nome e telefone são obrigatórios.' });
        }

        const id = await contatosBusiness.addContato(userId, {
            nome,
            telefone,
            parentesco: parentesco || null,
        });

        return res.status(201).json({ message: 'Contato adicionado com sucesso.', id });

    } catch (error: any) {
        Logger.error('Erro ao adicionar contato:', error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno ao adicionar contato.' });
    }
};

export const handleListContatos = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }

        const contatos = await contatosBusiness.listContatos(userId);
        return res.status(200).json(contatos);

    } catch (error: any) {
        Logger.error('Erro ao listar contatos:', error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro interno ao listar contatos.' });
    }
};