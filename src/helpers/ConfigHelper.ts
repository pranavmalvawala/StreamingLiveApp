import { ServicesHelper, EnvironmentHelper } from '.'
export interface ColorsInterface { primary: string, contrast: string, header: string }
export interface LogoInterface { url: string, image: string }
export interface ButtonInterface { text: string, url: string }
export interface TabInterface { text: string, url: string, icon: string, type: string, data: string, updated?: boolean }
export interface ServiceInterface { videoUrl: string, serviceTime: string, duration: string, earlyStart: string, chatBefore: string, chatAfter: string, provider: string, providerKey: string, localCountdownTime?: Date, localStartTime?: Date, localEndTime?: Date, localChatStart?: Date, localChatEnd?: Date, label: string }
export interface ConfigurationInterface { keyName?: string, churchId?: string, primaryColor?: string, primaryContrast?: string, secondaryColor?: string, secondaryContrast?: string, logoSquare?: string, logoHeader?: string, buttons?: ButtonInterface[], tabs?: TabInterface[], services?: ServiceInterface[] }


export class ConfigHelper {
    static current: ConfigurationInterface;

    static async load(keyName: string) {
        var result: ConfigurationInterface = await fetch(`${EnvironmentHelper.StreamingLiveApi}/preview/data/${keyName}`).then(response => response.json());
        
        // fetch theme colors and logo
        const church = await fetch(`${EnvironmentHelper.AccessApi}/churches/lookup/?subDomain=${keyName}`).then(res => res.json());
        const appearanceConfigs: ConfigurationInterface = await fetch(`${EnvironmentHelper.AccessApi}/settings/public/${church.id}`).then(response => response.json());
        result = { ...result, ...appearanceConfigs };
        
        ServicesHelper.updateServiceTimes(result);
        result.keyName = keyName;
        ConfigHelper.current = result;
        return result;
    }

    static setTabUpdated(tabType: string) {
        for (let i = 0; i < ConfigHelper.current.tabs.length; i++) {
            var t = ConfigHelper.current.tabs[i];
            if (t.type === tabType) t.updated = true;
        }
    }


}

