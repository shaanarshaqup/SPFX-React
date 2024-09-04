import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";

let _sp: SPFI | undefined;

export const getSP = (context: WebPartContext): SPFI => {
    if (!_sp) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _sp;
};
