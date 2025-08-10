import { uploadOnCloudinary } from '../../../util/cloudinary';
import leaveHelper from '../../helpers/leave.helper';

export async function addNewLeaveHandler(input) {
    return await leaveHelper.addObject(input);
}

export async function addNewLeaveHandlerV2(input) {
    const { file, data } = input

    if (!file) {
        throw 'File not found';
    }

    if (!data.employee_id || !data.leave_date || !data.reason) {
        throw 'All fields are required';
    }

    let doc = await uploadOnCloudinary(file.path)

    if (!doc) {
        throw 'File upload failed'
    }

    const newData = {
        ...data,
        doc: doc.secure_url
    }

    return await leaveHelper.addObject(newData);
}

export async function getLeavesByMonth(input) {
    try {
        const currentDate = input.date ? new Date(input.date) : new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
        const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

        const input2 = {
            pageNum: 1,
            pageSize: 100,
            query: {
                leave_date: {
                    $gte: startOfMonth.toISOString().split('T')[0],
                    $lte: endOfMonth.toISOString().split('T')[0]
                },
                is_deleted: false
            },
            populatedQuery: [
                {
                    model: 'Employee',
                    path: 'employee_id',
                }
            ]
        };

        const list = await leaveHelper.getAllObjects(input2);

        return list;

    } catch (error) {
        console.error('Error fetching leaves by month:', error);
        throw error;
    }
}


export async function getLeaveDetailsHandler(input) {
    return await leaveHelper.getObjectById(input);
}

export async function updateLeaveDetailsHandler(input) {
    return await leaveHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getLeaveListHandler(input) {
    const list = await leaveHelper.getAllObjects(input);
    const count = await leaveHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteLeaveHandler(input) {
    return await leaveHelper.deleteObjectById(input);
}

export async function getLeaveByQueryHandler(input) {
    return await leaveHelper.getObjectByQuery(input);
}  
