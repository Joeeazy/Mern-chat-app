import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const ShakeClass = message.shouldShake ? "shake" : "";

  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind css chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${ShakeClass} pb-1`}
      >
        {message.message}
      </div>
      <div className={"chat-footer opacity-50 text-cs flex gap-1 items-center"}>
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
