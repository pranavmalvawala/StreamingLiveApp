import { ConfigurationInterface, ServiceInterface, ConfigHelper } from "."

export class ServicesHelper {
  static currentServiceChangedCallback: (currentService: ServiceInterface | null) => void;
  static currentService: ServiceInterface | null;
  static timer: NodeJS.Timeout;

  static checkService() {
    let cs;
    if (ConfigHelper.current !== undefined) {
      cs = ServicesHelper.determineCurrentService(ConfigHelper.current.services);
    }
    if (JSON.stringify(cs) !== JSON.stringify(ServicesHelper.currentService)) {
      ServicesHelper.currentService = cs;
      if (ServicesHelper.currentServiceChangedCallback !== undefined) ServicesHelper.currentServiceChangedCallback(cs);
    }
  }

  static initTimer(callback: (currentService: ServiceInterface | null) => void) {
    ServicesHelper.currentServiceChangedCallback = callback;
    if (ServicesHelper.timer !== undefined) clearInterval(ServicesHelper.timer);
    ServicesHelper.timer = setInterval(ServicesHelper.checkService, 1000);
  }

  static updateServiceTimes(config: ConfigurationInterface) {
    if (config.services != null) {
      for (let i = 0; i < config.services.length; i++) {
        let s = config.services[i];
        s.localCountdownTime = new Date(new Date(s.serviceTime).getTime());
        s.localStartTime = new Date(s.localCountdownTime.getTime());
        s.localStartTime.setSeconds(s.localStartTime.getSeconds() - this.getSeconds(s.earlyStart));
        s.localEndTime = new Date(s.localStartTime.getTime());
        s.localEndTime.setSeconds(s.localEndTime.getSeconds() + s.sermon?.duration || 5400);
        s.localChatStart = new Date(s.localStartTime.getTime());
        s.localChatStart.setSeconds(s.localChatStart.getSeconds() - this.getSeconds(s.chatBefore));
        s.localChatEnd = new Date(s.localEndTime.getTime());
        s.localChatEnd.setSeconds(s.localChatEnd.getSeconds() + this.getSeconds(s.chatAfter));
      }
    }
  }

  static getSeconds(displayTime: string) {
    try {
      let parts = displayTime.split(":");
      let seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      return seconds;
    } catch (ex) { return 0; }
  }

  static determineCurrentService(services: ServiceInterface[]) {
    let result = null;
    if (services !== undefined) {
      let currentTime = new Date();
      for (let i = 0; i < services.length; i++) {
        let s = services[i];
        if (s.localChatEnd !== undefined && s.localEndTime !== undefined) {
          if (currentTime <= s.localChatEnd) {
            if (result == null || (result.localEndTime === undefined || s.localEndTime < result.localEndTime)) result = s;
          }
        }
      }
    }
    return result;
  }

}

