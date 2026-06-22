import { Request, Response } from 'express';
// 1. Importação corrigida com chaves
import { db } from '../database/connection';

export const getContatos = async (req: Request, res: Response) => {
    try {
        const linhas = await db('contatos').select('*');
        return res.status(200).json(linhas);
    } catch (error) {
        console.error("Erro ao buscar contatos no banco:", error);
        return res.status(500).json({ erro: "Falha ao buscar contatos" });
    }
};

export const createContato = async (req: Request, res: Response) => {
    const { nome, telefone, parentesco } = req.body;

    if (!nome || !telefone) {
        return res.status(400).json({ erro: "Nome e telefone são obrigatórios" });
    }

    try {
        const [insertId] = await db('contatos').insert({
            nome,
            telefone,
            parentesco
        });

        return res.status(201).json({
            id: insertId,
            nome,
            telefone,
            parentesco
        });
    } catch (error) {
        console.error("Erro ao inserir novo contato:", error);
        return res.status(500).json({ erro: "Falha ao salvar contato" });
    }
};