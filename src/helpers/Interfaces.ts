export type { RoleInterface, RoleMemberInterface, UserInterface, LoadCreateUserRequestInterface } from "../appBase/interfaces";

export interface LinkInterface { id?: number, churchId?: number, url?: string, text?: string, sort?: number, linkType: string, linkData: string, icon: string, category: string }
export interface PageInterface { id?: number, churchId?: number, name?: string, lastModified?: Date, content?: string }
export interface AdminServiceInterface { id?: number, churchId?: number, serviceTime?: Date, earlyStart?: number, duration: number, chatBefore: number, chatAfter: number, provider: string, providerKey: string, videoUrl: string, timezoneOffset: number, recurring: boolean, label: string }
export interface SettingInterface { id?: number, churchId?: number, homePageUrl?: string, logoUrl?: string, primaryColor?: string, contrastColor?: string, registrationDate?: Date }
