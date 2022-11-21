export default interface MessageInterface {
    id: number;
    from_user_id: number;
    to_user_id: number;
    message_type: number;
    chat_id: number | null;
    msg: string;
    status: boolean;
    created_at: string;
    updated_at: string;

}