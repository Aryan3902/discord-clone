import { ADD_MESSAGE } from "@/constants/Actions/Chat/ChatList";
import { ChatAction, ChatInterface } from "@/types/chat";

export default function chatListReducer(
  state: ChatInterface[],
  action: ChatAction
) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}
