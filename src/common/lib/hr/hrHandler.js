import hrHelper from '../../helpers/hr.helper';
import bcrypt from "bcryptjs";
import { generateToken } from "../../util/authUtil";
import { getUserInfo } from "../../util/utilHelper.js";

export async function addNewHrHandler(input) {
    return await hrHelper.addObject(input);
}

export async function getHrDetailsHandler(input) {
    return await hrHelper.getObjectById(input);
}

export async function addNewUserSignupHandler(input) {

    // Hash the provided password.
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Prepare user data.
    const userData = {
        full_name: input.full_name,
        password: hashedPassword,
        email: input.email,
        email_verified: true,
    };

    // Check if user with the same email or phone already exists.
    const existingUser = await hrHelper.getObjectByQuery({
        query: { email: input.email },
    });
    if (existingUser) {
        throw "HR with this email already exists"
    }

    const newUser = await hrHelper.addObject(userData);

    const token = generateToken(newUser._id, 'HR');

    return { user: getUserInfo(newUser), token };
}

export async function userSigninHandler(input) {
    let user;

    if (input.email) {
        user = await hrHelper.getObjectByQuery({
            query: { email: input.email },
        });
    }

    if (!user) {
        throw "HR not found"
    }

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
        throw "Invalid credentials"
    }

    const token = generateToken(user._id, 'HR');

    return { user: getUserInfo(user), token };
}

export async function updateHrDetailsHandler(input) {
    return await hrHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getHrListHandler(input) {
    const list = await hrHelper.getAllObjects(input);
    const count = await hrHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteHrHandler(input) {
    return await hrHelper.deleteObjectById(input);
}

export async function getHrByQueryHandler(input) {
    return await hrHelper.getObjectByQuery(input);
}  
