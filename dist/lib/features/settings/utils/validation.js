import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from '$lib/features/core/constants';
export function validateProfileUpdate(data) {
    if (data.avatar) {
        if (!SUPPORTED_FILE_TYPES.includes(data.avatar.type)) {
            return 'Unsupported file type';
        }
        if (data.avatar.size > MAX_FILE_SIZE) {
            return 'File size too large';
        }
    }
    return null;
}
