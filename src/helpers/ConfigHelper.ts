import { AppearanceHelper, AppearanceInterface } from "../appBase/helpers/AppearanceHelper";
import { ServicesHelper, EnvironmentHelper } from "."
import { ChatHelper, SermonInterface } from "../components";
export interface ColorsInterface { primary: string, contrast: string, header: string }
export interface LogoInterface { url: string, image: string }
export interface ButtonInterface { text: string, url: string }
export interface TabInterface { text: string, url: string, icon: string, type: string, data: string, updated?: boolean }
export interface ServiceInterface { videoUrl: string, serviceTime: string, duration: string, earlyStart: string, chatBefore: string, chatAfter: string, provider: string, providerKey: string, localCountdownTime?: Date, localStartTime?: Date, localEndTime?: Date, localChatStart?: Date, localChatEnd?: Date, label: string, id?: string, sermon?: SermonInterface }
export interface ConfigurationInterface { keyName?: string, churchId?: string, appearance: AppearanceInterface, buttons?: ButtonInterface[], tabs?: TabInterface[], services?: ServiceInterface[], switchToConversationId: string, jitsiRoom: string }

export class ConfigHelper {
  static current: ConfigurationInterface;

  static loadCached(keyName: string) {
    const json = localStorage.getItem("config_" + keyName);
    if (!json) return null;
    else return JSON.parse(json) as ConfigurationInterface;
  }

  static async load(keyName: string) {
    let result: ConfigurationInterface = await fetch(`${EnvironmentHelper.StreamingLiveApi}/preview/data/${keyName}`).then(response => response.json());
    result.appearance = await AppearanceHelper.load(result.churchId);
    ServicesHelper.updateServiceTimes(result);
    result.keyName = keyName;
    ConfigHelper.current = result;
    localStorage.setItem("config_" + keyName, JSON.stringify(ConfigHelper.current));
    return result;
  }

  static setTabUpdated(tabType: string) {
    for (let i = 0; i < ConfigHelper.current.tabs.length; i++) {
      let t = ConfigHelper.current.tabs[i];
      if (t.type === tabType) t.updated = true;
    }
  }

  static addMissingPrivateTab() {
    let prayerTabIndex = -1;
    for (let i = 0; i < ConfigHelper.current.tabs.length; i++) {
      const t = ConfigHelper.current.tabs[i];
      if (t.type === "prayer") prayerTabIndex = i;
    }
    if (prayerTabIndex === -1) {
      ConfigHelper.current.tabs.push({ type: "prayer", icon: "mail_outline", text: "Private Messages", url: "", data: "" })
      ChatHelper.onChange();
    }
  }

}

