import { UserHelper as BaseUserHelper, ApiHelper } from "../appBase/helpers"
import { ChurchInterface, UserContextInterface } from '.'
export class UserHelper extends BaseUserHelper {
    static isHost: boolean = false;
    static isGuest: boolean = false;

    static async loginAsGuest(churches: ChurchInterface[], context: UserContextInterface) {
        UserHelper.isGuest = true;
        /**
         * The api for fetching church (/churches/select) requires authentication.
         * That route's main authentication purpose is to know who is logging in 
         * and not from which church he/she belongs to, that's why we setup ApiHelper
         * with whatever church, the user is already part of, cause it doesn't matter
         * the jwt should just to the user info.
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

