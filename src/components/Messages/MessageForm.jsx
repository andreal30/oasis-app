import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { addMessage } from "../../api/messagesApi";
import useAuth from "../../hooks/useAuth";
import { Toast } from "primereact/toast";

const MessageForm = ({ flatId }) => {
    const [message, setMessage] = useState("");
    const { user } = useAuth();
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const validateMessage = () => {
        if (!message.trim()) {
            showToast("warn", "Warning", "Message content cannot be empty.");
            return false;
        }
        return true;
    };

    const sendMessage = async () => {
        try {
            await addMessage(flatId, {
                senderId: user.id,
                content: message.trim(),
            });
            setMessage("");
            showToast("success", "Success", "Message sent successfully.");
        } catch (error) {
            showToast("error", "Error", `Failed to send message: ${error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateMessage()) {
            await sendMessage();
        }
    };

    return (
        <div className="message-form">
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <InputTextarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    cols={30}
                    placeholder="Type your message here..."
                    className="message-input"
                />
                <Button label="Send Message" type="submit" className="send-button" />
            </form>
        </div>
    );
};

MessageForm.propTypes = {
    flatId: PropTypes.string.isRequired,
};

export default MessageForm;
