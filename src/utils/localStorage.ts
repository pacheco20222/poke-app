export const getLocalStorage = (key: string): string | null => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Error getting localStorage key "${key}":`, error);
        return null;
    }
};

export const setLocalStorage = (key: string, value: string): boolean => {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
        return false;
    }
};

export const removeLocalStorage = (key: string): boolean => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
        return false;
    }
};

export const clearLocalStorage = (): boolean => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error(`Error clearing localStorage:`, error);
        return false;
    }
};

export const getLocalStorageJSON = <T>(key: string): T | null => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Error getting localStorage key "${key}":`, error);
        return null;
    }
};

export const setLocalStorageJSON = <T>(key: string, value: T): boolean => {
    try {
        const item = JSON.stringify(value);
        localStorage.setItem(key, item);
        return true;
    } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
        return false;
    }
};