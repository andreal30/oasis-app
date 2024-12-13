import { useEffect, useState } from 'react';
// Import paths from your created Node backend

const useMessage = (flatId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError(null);

            try {
                // Replace this with a call to your Node backend to fetch messages
                const fetchedMessages = await fetch(`/api/messages?flatId=${flatId}`).then(res => res.json());

                // Replace this with a call to your Node backend to fetch user details
                const messagesWithUserDetails = await Promise.all(
                    fetchedMessages.map(async (message) => {
                        const user = await fetch(`/api/users?email=${message.userEmail}`).then(res => res.json());

                        return {
                            messageId: message.id,
                            ...message,
                            firstName: user.firstName || 'Not Found',
                            lastName: user.lastName || 'Not Found',
                            profile: user.profile || 'Not Found',
                        };
                    })
                );

                setMessages(messagesWithUserDetails);
            } catch (error) {
                setError('Failed to fetch messages and users');
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [flatId]);

    return { messages, loading, error };
};

export default useMessage;
