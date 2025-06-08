/**
 * Сервис для управления API ключами
 * Предоставляет безопасные методы для доступа к API ключам,
 * с возможностью хранения в localStorage и обфускацией
 */

interface ApiKey {
    key: string;
    timestamp: number;
    source: 'localStorage' | 'server' | 'input';
}

// Срок действия ключа в localStorage (1 неделя в миллисекундах)
const KEY_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

// Функция простой обфускации ключа для хранения в localStorage
// Внимание: это не криптографическая защита, просто базовая обфускация
const obfuscateKey = (key: string): string => {
    return window.btoa(
        key.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join('')
    );
};

// Функция для деобфускации ключа
const deobfuscateKey = (obfuscatedKey: string): string => {
    try {
        const decoded = window.atob(obfuscatedKey);
        return decoded.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
    } catch (error) {
        console.error('Ошибка при деобфускации ключа:', error);
        return '';
    }
};

export const apiKeysService = {
    // Google Maps API Key
    async getGoogleMapsApiKey(): Promise<string> {
        try {
            // 1. Попытка получить ключ из переменных окружения на сервере через API
            const response = await fetch('/api/config/maps-api-key', {
                method: 'GET',
                credentials: 'include',
            });

            // Если API доступен и вернул ключ
            if (response.ok) {
                const data = await response.json();
                if (data.apiKey) {
                    // Сохраняем ключ в localStorage для кэширования
                    this.saveApiKey('google_maps', data.apiKey);
                    return data.apiKey;
                }
            }
        } catch (error) {
            console.log('API для получения ключа недоступен, проверяем localStorage...');
        }

        // 2. Если не удалось получить с сервера, пробуем взять из localStorage
        const storedKey = this.getApiKeyFromStorage('google_maps');
        if (storedKey) {
            return storedKey;
        }

        // 3. Используем запасной публичный ключ (использовать только для разработки)
        // Для production следует хранить ключ на сервере или запрашивать у пользователя
        return 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
    },

    // Сохранение API ключа в localStorage с обфускацией и сроком действия
    saveApiKey(name: string, key: string, source: ApiKey['source'] = 'input'): void {
        try {
            const apiKeyData: ApiKey = {
                key: key,
                timestamp: Date.now(),
                source
            };

            // Обфускация данных для хранения
            localStorage.setItem(
                `api_key_${name}`,
                obfuscateKey(JSON.stringify(apiKeyData))
            );

            console.log(`API ключ ${name} успешно сохранен в localStorage`);
        } catch (error) {
            console.error(`Ошибка при сохранении API ключа ${name}:`, error);
        }
    },

    // Получение API ключа из localStorage с проверкой срока действия
    getApiKeyFromStorage(name: string): string | null {
        try {
            const item = localStorage.getItem(`api_key_${name}`);
            if (!item) return null;

            // Деобфускация данных
            const apiKeyData: ApiKey = JSON.parse(deobfuscateKey(item));

            // Проверка срока действия
            if (Date.now() - apiKeyData.timestamp > KEY_EXPIRATION) {
                // Ключ устарел, удаляем его
                localStorage.removeItem(`api_key_${name}`);
                return null;
            }

            return apiKeyData.key;
        } catch (error) {
            console.error(`Ошибка при получении API ключа ${name}:`, error);
            return null;
        }
    },

    // Ввод API ключа пользователем
    promptForApiKey(name: string, message: string): Promise<string | null> {
        return new Promise((resolve) => {
            const key = window.prompt(message);
            if (key) {
                this.saveApiKey(name, key, 'input');
                resolve(key);
            } else {
                resolve(null);
            }
        });
    },

    // Удаление API ключа из localStorage
    removeApiKey(name: string): void {
        localStorage.removeItem(`api_key_${name}`);
        console.log(`API ключ ${name} удален из localStorage`);
    },

    // Проверка, есть ли сохраненный API ключ
    hasApiKey(name: string): boolean {
        return this.getApiKeyFromStorage(name) !== null;
    }
};