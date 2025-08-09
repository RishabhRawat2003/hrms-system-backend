import { uploadOnCloudinary } from '../../../util/cloudinary';
import { SELECTED } from '../../constants/enum';
import candidateHelper from '../../helpers/candidate.helper';
import employeeHelper from '../../helpers/employee.helper';

export async function addNewCandidateHandler(input) {
    return await candidateHelper.addObject(input);
}

export async function addNewCandidateHandlerV2(input) {
    const { file, data } = input

    if (!file) {
        throw 'File not found';
    }

    if (!data.full_name || !data.email || !data.phone_number || !data.position || !data.experience) {
        throw 'All fields are required';
    }

    let resume_url = await uploadOnCloudinary(file.path)

    if (!resume_url) {
        throw 'File upload failed'
    }

    const newData = {
        ...data,
        resume_url: resume_url.secure_url
    }

    return await candidateHelper.addObject(newData);
}

export async function getCandidateDetailsHandler(input) {
    return await candidateHelper.getObjectById(input);
}

export async function updateCandidateDetailsHandler(input) {
    if (input.updateObject.status === SELECTED) {
        const candidate = await candidateHelper.getObjectById({ id: input.objectId });
        const data = {
            full_name: candidate.full_name,
            email: candidate.email,
            phone_number: candidate.phone_number,
            position: candidate.position,
        }

        const updateObject = {
            ...input.updateObject,
            is_deleted: true
        }

        await candidateHelper.directUpdateObject(input.objectId, updateObject);

        return await employeeHelper.addObject(data);
    }
    return await candidateHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getCandidateListHandler(input) {
    const list = await candidateHelper.getAllObjects(input);
    const count = await candidateHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteCandidateHandler(input) {
    return await candidateHelper.deleteObjectById(input);
}

export async function getCandidateByQueryHandler(input) {
    return await candidateHelper.getObjectByQuery(input);
}  
