import { db } from '../connection';
import { IContactRelation } from '../../models/ContactModel';
import { Logger } from '../../utils/logger';
import { InternalServerError } from '../../utils/errors';

type ContactInput = Omit<IContactRelation, 'id_relacao'>;

type ContactSummary = {
    id_contato: number;
    whatsapp_numero: string;
    nome_contato: string;
    email_contato: string;
    nivel_permissao: string;
    fcm_token: string | null;
};

export const createContactRelation = async (data: ContactInput): Promise<number | null> => {
    try {
        const [id] = await db('contato_emergencia').insert(data);
        return id;
    } catch (error) {
        Logger.error("Erro ao criar relação de contato:", error);
        throw new InternalServerError('Erro ao salvar relação de contato.');
    }
};

export const findContactsByPatientId = async (patientId: number): Promise<ContactSummary[]> => {
    try {
        const rows = await db('contato_emergencia as ce')
            .join('usuario as u', 'ce.id_contato', 'u.id_usuario')
            .select('ce.id_contato', 'ce.whatsapp_numero', 'ce.nivel_permissao', 'u.nome as nome_contato', 'u.email as email_contato', 'u.fcm_token')
            .where('ce.id_paciente', patientId);
        return rows as ContactSummary[];
    } catch (error) {
        Logger.error("Erro ao buscar contatos:", error);
        throw new InternalServerError('Erro ao buscar contatos.');
    }
};

export const deleteContactRelation = async (relationId: number, patientId: number): Promise<boolean> => {
    try {
        const count = await db('contato_emergencia')
            .where({ id_relacao: relationId, id_paciente: patientId })
            .delete();
        return count > 0;
    } catch (error) {
        Logger.error("Erro ao deletar relação de contato:", error);
        throw new InternalServerError('Erro ao deletar relação de contato.');
    }
};