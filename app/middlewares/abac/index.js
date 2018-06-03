import {Policy} from "policyline";
import env from './env';
import statuses from '../../config/statuses';

const index = (rules) => {

    const policy = new Policy(rules);

    return async (req, res, next) => {
        const user = res.user, action = null, resource = null;
        try {
            if (policy.check(user, action, env, resource)) {
                next();
            } else {
                return res.status(401).send(statuses[401]);
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    };
};

export default index;