import { Request, Response } from 'express';
// 1. Importação corrigida com chaves
import { db } from '../database/connection';

export const getContatos = async (req: Request, res: Response) => {
    // 1. Pega o ID do usuário que foi enviado pela URL (query param)
    const { id_usuario } = req.query;

    try {
        // 2. Filtra no banco: traz apenas os contatos ONDE o id_usuario for igual ao logado
        const linhas = await db('contatos').where({ id_usuario }).select('*');
        return res.status(200).json(linhas);
    } catch (error) {
        console.error("Erro ao buscar contatos:", error);
        return res.status(500).json({ erro: "Falha ao buscar contatos" });
    }
};

export const createContato = async (req: Request, res: Response) => {
    // 1. Agora esperamos receber o id_usuario no corpo da requisição
    const { nome, telefone, parentesco, id_usuario } = req.body;

    if (!nome || !telefone || !id_usuario) {
        return res.status(400).json({ erro: "Nome, telefone e ID do usuário são obrigatórios" });
    }

    try {
        // 2. Salva no banco vinculando o contato ao usuário
        const [insertId] = await db('contatos').insert({
            nome,
            telefone,
            parentesco,
            id_usuario 
        });

        return res.status(201).json({ id: insertId, nome, telefone, parentesco, id_usuario });
    } catch (error) {
        console.error("Erro ao inserir contato:", error);
        return res.status(500).json({ erro: "Falha ao salvar contato" });
    }
};