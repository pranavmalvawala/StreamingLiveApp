export type { RoleInterface, RoleMemberInterface, UserInterface, LoadCreateUserRequestInterface, ChurchInterface, UserContextInterface, PersonInterface } from "../appBase/interfaces";

export interface LinkInterface { id?: string, churchId?: string, url?: string, text?: string, sort?: number, linkType: string, linkData: string, icon: string, category: string }
export interface PageInterface { id?: string, churchId?: string, name?: string, lastModified?: Date, content?: string, path?: string }
export interface AdminServiceInterface { id?: string, churchId?: string, serviceTime?: Date, earlyStart?: number, duration: number, chatBefore: number, chatAfter: number, provider: string, providerKey: string, videoUrl: string, timezoneOffset: number, recurring: boolean, label: string, sermonId?: string }
export interface SermonInterface { id?: string, churchId?: string, playlistId?: string, videoType?: string, videoData?: string, videoUrl?: string, title?: string, description?: string, publishDate?: Date, thumbnail?: string, duration?: number, permanentUrl?: boolean }
export interface PlaylistInterface { id?: string, churchId?: string, title?: string, description?: string, publishDate?: Date, thumbnail?: string }

export interface ConnectionInterface { churchId: string, conversationId: string, displayName: string, socketId: string }
export interface ViewerInterface { displayName: string, id: string }
export interface AttendanceInterface { viewers?: ViewerInterface[], totalViewers?: number, conversationId: string }
export interface ConversationInterface { id?: string, churchId?: string, contentType: string, contentId: string, title: string, dateCreated: Date }
export interface MessageInterface { id?: string, churchId?: string, conversationId?: string, userId?: string, displayName?: string, timeSent?: Date, messageType?: string, content?: string }
export type PayloadAction = "message" | "deleteMessage" | "callout" | "attendance" | "prayerRequest" | "socketId" | "privateMessage" | "privateRoomAdded" | "videoChatInvite";
export interface PayloadInterface { churchId: string, conversationId: string, action: PayloadAction, data: any }

export interface ChatEventsInterface {
  messageHandler: (message: MessageInterface) => void,
  deleteHandler: (messageId: string) => void,
  calloutHandler: (message: MessageInterface) => void,
  attendanceHandler: (attendance: AttendanceInterface) => void,
  prayerRequestHandler: (conversation: ConversationInterface) => void,
  privateMessageHandler: (conversation: ConversationInterface) => void,
  privateRoomAddedHandler: (conversation: ConversationInterface) => void,
  videoChatInviteHandler: (roomName: string) => void,
  disconnectHandler: () => void,
}

export interface ChatRoomInterface {
  //title: string,
  //conversationId: string,
  conversation: ConversationInterface
  attendance: AttendanceInterface,
  messages: MessageInterface[],
  callout: MessageInterface,
  prayerRequests?: ConversationInterface[],
  //contentId: string,
  joined: boolean
}

export interface ChatStateInterface { mainRoom: ChatRoomInterface, hostRoom: ChatRoomInterface, privateRooms: ChatRoomInterface[], chatEnabled: boolean, user: ChatUserInterface }
export interface ChatUserInterface { firstName: string, lastName: string, isHost: boolean }
