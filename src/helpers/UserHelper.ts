import { PersonInterface } from ".";
import { UserHelper as BaseUserHelper } from "../appBase/helpers"
export class UserHelper extends BaseUserHelper {
  static isHost: boolean = false;
  static isGuest: boolean = false;
  static person: PersonInterface;
}
