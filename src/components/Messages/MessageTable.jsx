import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAllMessages, getUserMessages } from "../../api/messagesApi";
import useAuth from "../../hooks/useAuth";
import { Toast } from "primereact/toast";

const MessageTable = ({ flatId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const toast = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                let response;
                if (user.isOwner) {
                    response = await getAllMessages(flatId);
                } else {
                    response = await getUserMessages(flatId, user.id);
                }
                setMessages(response);
            } catch (error) {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: `Failed to fetch messages: ${error.message}`,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [flatId, user]);

    return (
        <div>
            <Toast ref={toast} />
            {loading ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={messages}>
                    <Column
                        field="createdAt"
                        header="Timestamp"
                        body={(rowData) =>
                            new Date(rowData.createdAt).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                        }
                    />
                    <Column field="senderName" header="Sender Name" />
                    <Column field="senderEmail" header="Sender Email" />
                    <Column field="content" header="Message" />
                </DataTable>
            )}
        </div>
    );
};

MessageTable.propTypes = {
    flatId: PropTypes.string.isRequired,
};

export default MessageTable;
