import { UserHelper as BaseUserHelper, ApiHelper } from "../appBase/helpers"
import { ChurchInterface, UserContextInterface } from "."
export class UserHelper extends BaseUserHelper {
    static isHost: boolean = false;
    static isGuest: boolean = false;

    static async loginAsGuest(churches: ChurchInterface[], context: UserContextInterface) {
      UserHelper.isGuest = true;
      /**
         * The api for fetching church (/churches/select) requires jwt.
         * Jwt is used only to check who the user is and not to check if he/she
         * belongs to the church, that's why we setup ApiHelper with whatever
         * church the user is already part of cause it doesn't matter,
         * the jwt is used only to find user details.
         */
      const currentChurch = churches[0];
      UserHelper.setupApiHelper(currentChurch);
      context.setChurchName(currentChurch.name);
      const keyName = window.location.hostname.split(".")[0];
      const church: ChurchInterface = await ApiHelper.post("/churches/select", { subDomain: keyName }, "AccessApi");
      UserHelper.churches.push(church);
      UserHelper.selectChurch(context, undefined, keyName);
      context.setUserName(UserHelper.currentChurch.id.toString());
    }
}

