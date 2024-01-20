import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';

interface AiTitleSuggestProps {
    question?: string,
    text: string,
    form: any,
}

export default function AiTitleSuggest({ question, text, form }: AiTitleSuggestProps) {
    const [chatId, setChatId] = useState(0);

    const { messages, setInput, handleSubmit, isLoading } = useChat({
        api: '/api/ai',
        id: `${chatId}`,
    });

    useEffect(() => {
        var compiledQuestion: string;

        if(!!text) {
            if(!!question) {
                compiledQuestion = `${question}: ${text}`;
            } else {
                compiledQuestion = text;
            }
            setInput(compiledQuestion);
        }
    },[question, text, setInput]);

    const generate = (e: any) => {
        handleSubmit(e);
        setChatId(prevChatId => prevChatId + 1);
    }

    useEffect(() => {
        if (messages.length > 1) {
            const lastMessage = messages[messages.length - 1];
            form.setValue('description', lastMessage.content || '');
        }
    }, [form, messages])

    return (
        <Button size={'sm'} onClick={generate} disabled={isLoading}>AI Generate</Button>
    );
}
