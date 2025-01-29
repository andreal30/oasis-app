import { useParams } from "react-router-dom";
import MessageTable from "../components/Messages/MessageTable";
import MessageForm from "../components/Messages/MessageForm";

const FlatView = () => {
    const { id: flatId } = useParams();

    return (
        <div>
            <h1>Flat Details</h1>
            {/* Other flat details components */}
            <MessageTable flatId={flatId} />
            <MessageForm flatId={flatId} />
        </div>
    );
};

export default FlatView;
