import { UserHelper as BaseUserHelper, ApiHelper } from "../appBase/helpers"
import { ChurchInterface, UserContextInterface } from "."
import { PersonInterface } from "../components";
export class UserHelper extends BaseUserHelper {
  static isHost: boolean = false;
  static isGuest: boolean = false;

  /*
  static async loginAsGuestOld(churches: ChurchInterface[], context: UserContextInterface) {
    UserHelper.isGuest = true;
    church = churches[0];
    UserHelper.setupApiHelper(currentChurch);
    context.setChurchName(currentChurch.name);
    const keyName = window.location.hostname.split(".")[0];
    const church: ChurchInterface = await ApiHelper.post("/churches/select", { subDomain: keyName }, "AccessApi");
    UserHelper.churches.push(church);
    UserHelper.selectChurch(context, undefined, keyName);
    context.setUserName(UserHelper.currentChurch.id.toString());
  }*/

}

